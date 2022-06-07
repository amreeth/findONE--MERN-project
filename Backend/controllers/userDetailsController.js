import asyncHandler from "express-async-handler";
import UserDetails from "../models/userDetailsModel.js";
import User from "../models/userModel.js";
import { uploadFile } from "../utils/s3bucket.js";
import Photos from "../models/ImagesModel.js";
import cloudinary from "cloudinary";

//====user personal details registration===//

const registerUserDetails = asyncHandler(async (req, res) => {
  const { userId, height, weight, job, location, answers } = req.body;

  const userdetail = await UserDetails.create({
    userId,
    height,
    weight,
    job,
    location,
    answers,
  });

  if (userdetail) {
    res.status(200).json({ userdetail });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

//=======user add photos====//

const mutltipleImageUpload = asyncHandler(async (req, res) => {
  console.log(req.body,"here");
 

});

let images = [];

  // if (req.body.image) {
  //   images.push(req.body.image);
  // }
  // if (req.body.image2) {
  //   images.push(req.body.image2);
  // }
  // if (req.body.image3) {
  //   images.push(req.body.image3);
  // }
  
  // const userId = "123";

  // let imagesLinks = [];

  // // let length=images.length
  // // console.log(length);

  // console.log(images);

  // for (let i = 0; i < images.length; i++) {
  //   // console.log('hereeeeeee');
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "multipleimage",
  //   });
  //   console.log(result);
  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }
  // console.log(imagesLinks, "images linksss");

  // const userImages = await Photos.create({
  //   userId: userId,
  //   images: imagesLinks,
  // });

  // // if (userImages) {
  // //   console.log('photos uploaded');

   
  // // } else {
  // //   res.status(400);
  // //   throw new Error("images not uploaded");
  // // }

  // res.status(200).json({
  //   message: "photos upload succesfully",
  //   // userImages,
  // });

//===============AWS ===================================//

const imagesUpload = asyncHandler(async (req, res) => {
  const file = req.file;
  //    console.log(file,'fiiilllleeeeee');
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
