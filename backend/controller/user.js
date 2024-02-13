const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SendMail1 = require('../middleware/sendMail');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name, !email, !password) {
            console.log("all fields required !!!");
            res.status(400).send("all fields required !!!");
        }

        const pwd = await bcrypt.hash(password, 10);

        const newUser = new User({
            name, email, password: pwd
        })
        await newUser.save();
        return res.status(200).json({ message: "register successfully." });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email, !password) {
            throw createError(400, 'all fields are mandatory');
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid user and password"
            })
        }
        console.log(user.email, user.password);
        const verifyPassword = await bcrypt.compare(password, user.password);
        console.log(verifyPassword);
        if (verifyPassword) {
            const userToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            return res.status(200).cookie("userToken", userToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 3 )
            }).json({
                message: "Logged in successfully",
                Token: userToken
            });
        } else {
            throw createError(400, 'Invalid user and password');
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const contact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name, !email, !phone, !message) {
            return res.status(400).json("all fields are mandatory");
        }
        const userMessage = `hello I'm ${name}, my email ${email} and phone ${phone}. 
                        message : ${message}.`

        await SendMail1(userMessage);
        return res.status(200).json({
            success: true,
            message: "message sent successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = { register, login, contact };