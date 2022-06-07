import mongoose from 'mongoose'


const premiumSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true
    }
})


const Premium=mongoose.model("Premium",premiumSchema)

export default Premium