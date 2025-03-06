import { User } from "../model/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const currentUser = await User.findOne({where:{email}})

    if(currentUser){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in creating user:", error.message);
  }
};



export const login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please fill in all fields "})
        }
        const currentUser = await User.findOne({where:{email}})

        if(!currentUser){
            return res.status(401).json({message:"Email or password invalid"})
        }

        const passwordMatch = bcrypt.compare(password,currentUser.password)

        if(!passwordMatch){
            return res.status(401).json({message:"Email or password invalid"})
        }

        const accessToken = jwt.sign({user_id:currentUser.id,email:currentUser.email},process.env.JWT_SECRET,{expiresIn:'1h'}) 

        res.status(200).json({id:currentUser.id,email:currentUser.email,accessToken})

    } catch (error) {
        res.status(500).json({message:"Internal sever error"})
        console.error("Error:",error.message)
    }
}


// export 