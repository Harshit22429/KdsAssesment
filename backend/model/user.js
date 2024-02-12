const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:[true, "Please Enter email"],
    },
    password:{
        type:String,
        required:[true, "please enter password"],
        select:false,
    }, 
})

const User = mongoose.model('User', userSchema);

module.exports = User;