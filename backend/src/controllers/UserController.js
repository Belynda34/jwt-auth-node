const prisma = require('../config/db.js')
const  bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
const {registerSchema } = require("../schemas/RegisterSchema.js")
const nodemailer = require("nodemailer")
const crypto = require("crypto")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};


const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Email Verification",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending OTP email:", error);
    } else {
      console.log("OTP email sent:", info.response);
    }
  });
};


const register = async (req, res) => {
  try {

    const { error } = registerSchema.validate(req.body);

    if (error) {
      // const errorMessages = error.details.map((err) => err.message);
      // return res.status(400).json({ message: 'Validation error', errors: errorMessages });
      return res.status(400).json({ message: error.details[0].message });
    }

    const {username,email,password,role} = req.body

    // if (!username || !email || !password) {
    //   return res.status(400).json({ message: "Please fill in all fields" });
    // }

    const currentUser = await prisma.users.findUnique({ where: { email } });

    if(currentUser){
      return res.status(409).json({ message: "User already exists" });
    }

 if (currentUser) {
      // If the user exists, check if the OTP is still valid
      if (currentUser.otpExpiry && currentUser.otpExpiry > new Date()) {
        return res.status(409).json({ message: "User already exists. Check your email for the OTP." });
      }

      // OTP expired or not generated, resend a new OTP
      const newOtp = generateOTP();
      const newOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.users.update({
        where: { email },
        data: {
          otp: newOtp,
          otpExpiry: newOtpExpiry,
        },
      });

      sendOTPEmail(email, newOtp);

      return res.status(200).json({ message: "New OTP sent. Check your email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    const newUser = await prisma.users.create({
      data:{
        username: username,
        email: email,
        password: hashedPassword,
        role: role || "member",
        otp,
        otpExpiry,
      }
    });

    
    sendOTPEmail(email,otp)
  
    res
      .status(201)
      .json({ message: "User registered successfully. Check your email for OTP", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in creating user:", error.message);
  }
};



const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Clear OTP after successful verification
    await prisma.users.update({
      where: { email },
      data: {
        otp: null,
        otpExpiry: null,
      },
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in OTP verification:", error.message);
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields " });
    }
    const currentUser = await prisma.users.findUnique({ where: { email } });

    if (!currentUser) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const passwordMatch = await bcrypt.compare(password, currentUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const accessToken = jwt.sign(
      { id: currentUser.id, email: currentUser.email },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: "60m" }
    );


    res
      .status(200)
      .json({ id: currentUser.id, email: currentUser.email, accessToken});
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
    console.error("Error:", error.message);
  }
};




const getUser = async (req, res) => {
  try {
    // console.log("User from token:",req.user)

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "Invalid token or missing user ID" });
    }
    const currentUser = await prisma.users.findUnique({ where: { id: req.user.id } });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res
      .status(200)
      .json({
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error:", error.message);
  }
};

const OnlyAdmins = async (req, res) => {
  try {
    // await authorize(['admin'])(req,res, () => {});
    res.status(200).json({ message: "Only admins are allowed here😁" });
  } catch (error) {
    res.status(403).json({ message: "Access Denied" });
    console.error("Error:", error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await prisma.users.findMany({});
    res.status(200).json({ users: data });
  } catch (error) {
    console.log('Error in fetching users',error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {register,login,getUser,OnlyAdmins,getAllUsers,verifyOTP}