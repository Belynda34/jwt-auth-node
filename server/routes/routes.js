import express from "express"
import { login, register } from "../controllers/UserController.js";




const router = express.Router()


router.post('/api/auth/register',register)
router.post('/api/auth/login',login)


export default router;
