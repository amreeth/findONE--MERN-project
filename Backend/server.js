import express from 'express'
import dotenv from 'dotenv'
import connectDB from './Config/db.js'
import userRoutes from './routes/userRouter.js'
import adminRoutes from './routes/adminRoutes.js'
import matchRoutes from './routes/matchRouter.js'
import messageRoutes from './routes/messagesRouter.js'
import conversationRoutes from './routes/conversationRouter.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import cors from 'cors'
import cloudinary from 'cloudinary'
import bodyParser from 'body-parser'
import path from 'path'

const app=express()
app.use(cors()) 





//body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
app.use('/api/message',messageRoutes)
app.use('/api/conversation',conversationRoutes)
app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()




if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, './frontend/build')))

  app.get('*', (req, res) =>{

// console.log("all request");

  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
}
)
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


//error handling middleware
app.use(notFound)
app.use(errorHandler)
//==================//


const PORT=process.env.PORT||4000
app.listen(PORT,console.log(`server running on port ${PORT}`))