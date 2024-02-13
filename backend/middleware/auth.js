const User = require('../model/user')
const jwt = require('jsonwebtoken');

const isAuthentication = async(req, res, next)=>{
    try {
        // console.log(req.cookies)
        const {userToken} = req.cookies;
        if(!userToken){
            console.log("from token" ,userToken);
            return res.status(400).json({
                success:false,
                message:"User should logged in for this request",
            })
        }
        const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);
        if(user){
            req.user = user;
            next();
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}


module.exports = isAuthentication;