import mongoose from "mongoose";

const userDetailsSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    height:{
        type:String,

    },
    weight:{
        type:String,
       
    },
     job:{
         type:String,
         
     },
     location:{
         type:String,
         
     },
     answers:[{
         question:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Question",
             
         },
         answer:{
             type:mongoose.Schema.Types.ObjectId,
         }
     }],

     images: [
        {
          publicId:{
            type:String,
          },
          url:{
            type:String,
          }
        }
      ]

})

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;