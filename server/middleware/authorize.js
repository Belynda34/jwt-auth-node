import { User } from "../model/Users.js";




export const authorize = (roles = []) => async (req,res,next) => {
    try{
        const  user = await User.findOne({id :req.user.id})
        if(!user || !roles.includes(user.role)){
            return res.status(403).json({message:'Access Denied'})
        }
        next()
    }catch{
        console.error("Error in Authorization:",error.message)
        return res.status(500).json({message:'Internal Server Error'})
    }
}