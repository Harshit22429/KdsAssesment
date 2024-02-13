const nodemailer = require("nodemailer");



const SendMail1 = async(userMessage)=>{  
    try{
        //console.log(process.env.USER, '  ', process.env.APP_PASSWORD);
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            auth:{
                user:process.env.FROM_EMAIL, // sender gmail address
                pass:process.env.APP_PASSWORD
            },
        });

        const mailOptions = {
            from:{
                name:"KDS Assesment Contact",
                address: process.env.FROM_EMAIL
            },// sender addres
            to:process.env.TO_EMAIL,
            subject:"send email using nodemailer and gmail! ",
            text:userMessage
        }
        transporter.sendMail(mailOptions);
        
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

module.exports = SendMail1;
