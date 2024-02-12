const { login, register, contact } = require('../controller/user');
const express = require('express');
const isAuthentication = require('../middleware/auth');


const userRouter = express.Router();

userRouter.route("/userRegister").post(register);
userRouter.route("/userLogin").post(login);
userRouter.route("/contact").post(isAuthentication, contact)
module.exports = userRouter;