import { User } from "../model/Users.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const currentUser = await User.findOne({ where: { email } });

    if (currentUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role || "member",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in creating user:", error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields " });
    }
    const currentUser = await User.findOne({ where: { email } });

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
      { expiresIn: "1h" }
    );


    res
      .status(200)
      .json({ id: currentUser.id, email: currentUser.email, accessToken});
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
    console.error("Error:", error.message);
  }
};




export const getUser = async (req, res) => {
  try {
    // console.log("User from token:",req.user)

    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "Invalid token or missing user ID" });
    }
    const currentUser = await User.findOne({ where: { id: req.user.id } });
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

export const OnlyAdmins = async (req, res) => {
  try {
    // await authorize(['admin'])(req,res, () => {});
    res.status(200).json({ message: "Only admins are allowed here😁" });
  } catch (error) {
    res.status(403).json({ message: "Access Denied" });
    console.error("Error:", error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll({});
    res.status(200).json({ message: data });
  } catch (error) {}
};
