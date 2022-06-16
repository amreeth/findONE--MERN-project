import asyncHandler from "express-async-handler";
import UserDetails from "../models/userDetailsModel.js";
import User from "../models/userModel.js";
import { uploadFile } from "../utils/s3bucket.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

//====user personal details registration===//

const registerUserDetails = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { height, weight, job, location, answers } = req.body;
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
      if (answers) {
        userdetails.answers = answers;
      }

      await userdetails.save();
      return res.status(200).json({
        userdetails,
        message: "profile updated successfully",
      });
    } else {
      const userdetail = await UserDetails.create({
        height,
        weight,
        job,
        location,
        answers,
      });

      if (userdetail) {
        res.status(200).json({ userdetail });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "user not found",
    });
  }
});

//=======user add photos====//

const mutltipleImageUpload = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(500).json({
        message: "user not found",
      });
    }

    let images = [];
    if (req.body.image) {
      images.push(req.body.image);
    }
    if (req.body.image2) {
      images.push(req.body.image2);
    }
    if (req.body.image3) {
      images.push(req.body.image3);
    }
    // console.log(images, "imagesss");
    let imagesLinks = [];

    const userDetail = await UserDetails.findOne({
      userId: ObjectId(user._id),
    });

    if (userDetail) {
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "multipleimage",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      // console.log(imagesLinks, "images linksss");
      userDetail.images = imagesLinks;
      await userDetail.save();

      return res.status(200).json({
        userDetail,
        message: "images updated",
      });

    } else {
      // console.log("else");
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "multipleimage",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const userImages = await UserDetails.create({
        userId: user._id,
        images: imagesLinks,
      });
      console.log("new user created");

      res.status(200).json({
        userImages,
        message: "new images uploaded",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

//===============AWS ===================================//

const imagesUpload = asyncHandler(async (req, res) => {
  const file = req.file;

  const description = req.description;
  
  const result = await uploadFile(file);
  console.log(result);

  req.file = { path: data.Location };

  console.log(result, "resultttttttt");

  if (result) {
    res.status(200).json({ success: "success" });
  } else {
    res.status(400);
    throw new Error("error");
  }
});

export { registerUserDetails, imagesUpload, mutltipleImageUpload };
