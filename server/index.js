import express from 'express'  
import dotenv from 'dotenv'
import cors from "cors"
import connectDB from './database/db.js';
import userRoute from './routs/user.rout.js'
import cookieParser from 'cookie-parser';
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use('/api/v1/user',userRoute);



app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server litsen at port ${PORT}`);
    });