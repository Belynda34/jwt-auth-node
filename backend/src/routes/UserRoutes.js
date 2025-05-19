const express = require("express");
const { getAllUsers, getUser, login, register, verifyOTP } = require("../controllers/UserController.js");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const { authorize } = require("../middlewares/authorize.js");


const router = express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/users',getAllUsers)


router.post("/verify-otp", verifyOTP);

router.use(isAuthenticated);

router.get('/users/current',getUser);
// router.get('/admin',authorize(['admin']),OnlyAdmins);


module.exports= router;
