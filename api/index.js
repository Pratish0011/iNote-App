import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose';
import noteRouter from './routes/notes.route.js'
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    try {
        console.log("Connected to DB successfully");
        
    } catch (error) {
        console.log(error)
    }
})

const __dirname = path.resolve();


const app = express()

app.use(express.json())
app.use(cookieParser());

app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`)
})



app.use('/api/notes', noteRouter)
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.use((err,req,res, next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  return res.status(statusCode).json({
    success:false,
    status:statusCode,
    message:message
  })
})




