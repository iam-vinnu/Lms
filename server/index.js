import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js';
import userRoute from './routs/user.rout.js'
dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/api/v1/user' ,userRoute );
app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server litsen at port ${PORT}`);
    });