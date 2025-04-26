import express from "express";
import dotenv from "dotenv";
import { sequelize,connectDB } from "./model/Users.js";
import router from "./routes/routes.js";
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 4001

const app = express();

app.use(express.json())

app.use(cors())

app.use('/',router)


const startServer = async () => {
    try {
        await connectDB(); 
        await sequelize.sync({ alter: true }); 
        console.log("Database synchronized successfully");

        
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})



