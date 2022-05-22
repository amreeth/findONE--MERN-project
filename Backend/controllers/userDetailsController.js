import asyncHandler from "express-async-handler";
import UserDetails from "../models/userDetailsModel.js";



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
        friends
    })

    if(userdetail){
        res.status(200).json({userdetail})
    }else{
        res.status(400)
        throw new Error('invalid data')
    }

})



export {registerUserDetails}