const prisma = require('../config/db.js')


const authorize = (roles = []) => async (req,res,next) => {
    try{
        const  user = await prisma.users.findUnique({where:{id :req.user.id}})
        if(!user || !roles.includes(user.role)){
           return  res.status(403).json({message:"Access Denied"})
        }
        next()
    }catch{
        console.error("Error in Authorization:",error.message)
        return res.status(500).json({message:'Internal Server Error'})
    }
}

module.exports= { authorize }