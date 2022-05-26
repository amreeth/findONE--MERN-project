import mongoose from "mongoose";

const userDetailsSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    height:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
     job:{
         type:String,
         required:true
     },
     location:{
         type:String,
         required:true,
     },
     profilepic:{
         type:String,
         default:null
     },
     images:[{
         type:String,
       
     }],
     answers:[{
         question:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Question",
             
         },
         answer:{
             type:mongoose.Schema.Types.ObjectId,
             
         }
     }],
    
     
})

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;