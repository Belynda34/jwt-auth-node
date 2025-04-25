import express from "express"
import { getAllUsers, getUser, login, OnlyAdmins, register } from "../controllers/UserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { authorize } from "../middleware/authorize.js";




const router = express.Router()


router.post('/api/auth/register',register)
router.post('/api/auth/login',login)
router.get('/api/users',getAllUsers)


router.use(isAuthenticated);

router.get('/api/users/current',getUser);
router.get('/api/admin',authorize(['admin']),OnlyAdmins);


export default router;
