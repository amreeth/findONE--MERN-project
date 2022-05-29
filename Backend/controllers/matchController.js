import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getAllMatches = asyncHandler(async (req, res) => {
  // console.log('hi from  getall matchess');
  try {
    // console.log(req.user,'dzxzxfzfzdfdsas');
    const user = await User.findById(req.user._id);
    const looking = user.oppGender;

    // console.log(looking);
    const matches = await User.find({ gender: looking });

    // console.log(matches,'matches are');

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

export { getAllMatches };
