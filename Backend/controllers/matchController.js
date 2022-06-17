import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import UserDetails from "../models/userDetailsModel.js";
import mongoose from "mongoose";


const ObjectId = mongoose.Types.ObjectId;


//================get all matches ===============//

const getAllMatches = asyncHandler(async (req, res) => {

  try {
    const user = await User.findById(req.user._id);
    const looking = user.oppGender;
    const matches = await User.find({ gender: looking });

    // console.log(matches,'matches are')
    if (matches.length>0) {
      res.status(200).json({
        success: true,
        messsage: "matches are ",
        matches,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "not matches found",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "error.message",
    });
  }
});

//=============match detail====================//

const matchDetail=asyncHandler(async(req,res)=>{
  try {
    const id=req.params.id
    const match=await User.findById(id)
    // console.log(match);
    const moreDetails=await UserDetails.findOne({userId:ObjectId(id)})
    // console.log(moreDetails,'moredetailss');

    if(match){
      res.status(200).json({
        match,
        moreDetails,
        messge:"match details are"
      })
    }
  } catch (error) {
    res.status(400)
    throw new Error("Match not found")
  }
})







export { getAllMatches,matchDetail};
