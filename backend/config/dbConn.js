const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connected = await mongoose.connect(process.env.URI);
        if(connected){
            console.log("mongodb connected")
        }        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = connectDB;