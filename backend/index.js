import express from 'express'
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js'
import messageRoute from './routes/messageRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {app,server} from './socket/socket.js'
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:process.env.BASE_URL,
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});