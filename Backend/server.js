import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Config/db.js'
import userRoutes from './routes/userRouter.js'
import adminRoutes from './routes/adminRoutes.js'
import matchRoutes from './routes/matchRouter.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

const app=express()

app.use(cors()) 



//body parser
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
//==============//  

dotenv.config()
connectDB()


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})




app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/match',matchRoutes)


//error handling middleware
app.use(notFound)
app.use(errorHandler)
//==================//


const PORT=process.env.PORT||4000
app.listen(PORT,console.log(`server running on port ${PORT}`))