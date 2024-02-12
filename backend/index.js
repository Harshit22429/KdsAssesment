const epxress = require('express');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = epxress();

const connectDB = require('./config/dbConn');
const userRouter = require("./routes/routes")

dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT;
connectDB();

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    withCredentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(epxress.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/v1', userRouter);

app.listen(PORT, ()=>{
    console.log(`server running on https:localhost http://localhost:${PORT}`)
})

