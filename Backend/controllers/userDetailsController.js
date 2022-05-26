import asyncHandler from "express-async-handler";
import UserDetails from "../models/userDetailsModel.js";
import User from "../models/userModel.js";
import { uploadFile } from "../utils/s3bucket.js";




//====user personal details registration===//

const registerUserDetails=asyncHandler(async(req,res)=>{
    const {userId,height,weight,job,location,answers,friends}=req.body;

    const userdetail=await UserDetails.create({
        userId,
        height,
        weight,
        job,
        location,
        answers,
    })

    if(userdetail){
        res.status(200).json({userdetail})
    }else{
        res.status(400)
        throw new Error('invalid data')
    }

})


//=======user add photos====//


const imagesUpload=asyncHandler(async(req,res)=>{

   const file=req.file;

   console.log(file,'fiiilllleeeeee');

   const description=req.description;

   const result=await uploadFile(file)

   console.log(result,'resultttttttt');

   if(result){
       res.status(200).json({success:"success"})
   }else{
       res.status(400)
       throw new Error('error')
   }
    
})






export {registerUserDetails,imagesUpload}