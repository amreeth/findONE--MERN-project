import asyncHandler from "express-async-handler";
import UserDetails from "../models/userDetailsModel.js";
import { uploadFile } from "../utils/s3bucket.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;


//@desc user add more details
//route POST api/users/personaldetails
//access USER

const registerUserDetails = asyncHandler(async (req, res) => {
  try {

    const userId = req.user._id;
    const { height, weight, job, location, questanswers, image1, image2, image3 } =req.body;

    let myCloud1;
    let myCloud2;
    let myCloud3;


    if (image1) {
      myCloud1 = await cloudinary.v2.uploader.upload(image1, {
        folder: "image1",
        crop: "scale",
      });
    }
    if (image2) {
      myCloud2 = await cloudinary.v2.uploader.upload(image2, {
        folder: "image2",
        crop: "scale",
      });
    }
    if (image3) {
      myCloud3 = await cloudinary.v2.uploader.upload(image3, {
        folder: "image3",
        crop: "scale",
      });
    }

    

    const userdetail = await UserDetails.create({
      userId,
      height,
      weight,
      job,
      location,
      answers:questanswers,
      image1: {
        public_id: myCloud1.public_id,
        url: myCloud1.secure_url,
      },
      image2: {
        public_id: myCloud2.public_id,
        url: myCloud2.secure_url,
      },
      image3: {
        public_id: myCloud3.public_id,
        url: myCloud3.secure_url,
      },
    });

    if (userdetail) {
      res.status(200).json(userdetail);
    }
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
});



//@desc user get all details
//route GET api/users/personaldetails
//access USER

const getMoreDetails=asyncHandler(async(req,res)=>{
  try {
    const userId=req.user._id
    const moreDetails=await UserDetails.findById(userId)
    res.status(200).json(moreDetails)

  } catch (error) {
    res.status(400).json("user not found")
  }
})


//@desc user update details
//route PUT api/users/personaldetails
//access USER

const updateMoredetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { height, weight, job, location, questanswers, image1, image2, image3 } =req.body;

    let myCloud1;
    let myCloud2;
    let myCloud3;

    const userdetails = await UserDetails.findOne({ userId: ObjectId(userId) });

    if (userdetails) {
      if (height) {
        userdetails.height = height;
      }
      if (weight) {
        userdetails.weight = weight;
      }
      if (job) {
        userdetails.job = job;
      }
      if (location) {
        userdetails.location = location;
      }
      if (questanswers) {
       userdetails.answers.push({
        question:questionId,
        answer:answer
       })
      }

      if (image1) {
        myCloud1 = await cloudinary.v2.uploader.upload(image1, {
          folder: "image1",
          crop: "scale",
        });

        userdetails.image1 = {
          public_id: myCloud1.public_id,
          url: myCloud1.secure_url,
        };
      }
      if (image2) {
        myCloud2 = await cloudinary.v2.uploader.upload(image2, {
          folder: "image2",
          crop: "scale",
        });

        userdetails.image2 = {
          public_id: myCloud2.public_id,
          url: myCloud2.secure_url,
        };
      }
      if (image3) {
        myCloud3 = await cloudinary.v2.uploader.upload(image3, {
          folder: "image3",
          crop: "scale",
        });

        userdetails.image3 = {
          public_id: myCloud3.public_id,
          url: myCloud3.secure_url,
        };
      }

      await userdetails.save();
      return res.status(200).json({
        userdetails,
        message: "profile updated successfully",
      });
    }else{
      res.status(404).json('user not found')
    }

  } catch (error) {
    res.status(500).json('user not found')
  }
});



//@desc user upload image
//route GET api/users/uploadimge
//access USER


const imagesUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  const description = req.description;
  const result = await uploadFile(file);

  req.file = { path: data.Location };
  if (result) {
    res.status(200).json({ success: "success" });
  } else {
    res.status(400);
    throw new Error("error");
  }
});

export { registerUserDetails, imagesUpload, updateMoredetails,getMoreDetails };
