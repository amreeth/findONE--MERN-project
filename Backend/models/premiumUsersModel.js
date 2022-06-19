import mongoose from 'mongoose'


const premiumUsersSchema=mongoose.Schema({

    category:{
        type:String,
        
    },
    price:{
        type:Number,
    },
    premiumId:{
        type:mongoose.Schema.ObjectId,
        ref:"Premium"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    userName:{
        type:String,
    },
    valid:{
        type:String
    },
    status:{
        type:String,
    } 
},{
    timestamps:true,
})


const PremiumUsers=mongoose.model("PremiumUser",premiumUsersSchema)

export default PremiumUsers