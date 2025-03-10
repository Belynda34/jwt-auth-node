import express from "express"
import { getUser, login, register } from "../controllers/UserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";




const router = express.Router()


router.post('/api/auth/register',register)
router.post('/api/auth/login',login)


router.use(isAuthenticated)

router.get('/api/users/current',getUser)


export default router;
