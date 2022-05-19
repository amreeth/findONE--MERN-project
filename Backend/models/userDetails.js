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
     images:[{
         type:String,
         required:true
     }],
     Answers:[{
         Question:{
             type:mongoose.Schema.Types.ObjectId,
             required:true
         },
         Answers:{
             type:ObjectId,
             required:true
         }
     }]
     

})

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;