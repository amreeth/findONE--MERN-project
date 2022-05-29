import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.js";
import verifyEmail from "../utils/verifyEmail.js";
import crypto from "crypto";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

const ObjectId = mongoose.Types.ObjectId;

//==========user registration========//

// const registerUser=asyncHandler(async(req,res)=>{

//   console.log('jiiiii');

// })

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body, "user register");

  const {
    name,
    email,
    dob,
    gender,
    oppGender,
    phonenumber,
    image,
    password,
    cpassword,
  } = req.body;

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const age = getAge(dob);
  // console.log(age);

  const userExist = await User.findOne({ email });
  // console.log(userExist, "eddksmldmsadm");

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  console.log("no user exist");
let myCloud;
  if (image) {

    console.log('hoiii image ');

     myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "newpropic",
      crop:"scale"
    });

    

  } else {
    res.status(400);
    throw new Error("image not found");
  }

  const user = await User.create({
    name: name,
    email: email,
    phonenumber: phonenumber,
    dob: age,
    gender: gender,
    oppGender: oppGender,
    password: password,
    cpassword: cpassword,
    avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });

  console.log("user created");

  let token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  const message = `http://localhost:3000/verify/${user.id}/${token.token}`;

  await verifyEmail(user.email, "Verify Email", message);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//===============email===============//

const emailVerify = asyncHandler(async (req, res) => {
  console.log(req.params);

  try {
    const user = await User.findOne({ _id: ObjectId(req.params.id) });

    console.log(user);

    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: ObjectId(user._id),
      token: req.params.token,
    });

    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne(
      { _id: ObjectId(user._id) },
      { $set: { verified: true } }
    );

    await Token.findByIdAndRemove(ObjectId(token._id));

    res
      .status(200)
      .json({ status: true, message: "email verified sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
});

//===========user login======//

const authUser = asyncHandler(async (req, res) => {
  // console.log('hiii');
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist && (await userExist.matchPassword(password))) {
    res.json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password");
  }
});

//==========forgot password=========//

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/password/reset/${resetToken}`;

  const message = `Reset your password by clicking on the link below :\n\n ${resetPasswordUrl} \n\n if you are not requested this email the please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `FindOne Password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(401);
    throw new Error("User not found");
  }
});

//========reset password==========//

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .Hash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token invalid or has expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "error.message",
    });
  }
});

//=====user profile=======//

const getUserProfile = asyncHandler(async (req, res) => {
  // console.log('hiiii');
  const user = await User.findById(req.user._id);
  // console.log(user);
  if (user) {
    res.json({
      // _id: user._id,
      // name: user.name,
      // email: user.email,
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//=====all users===========//

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

//==========update user profile==========//

// const updateUserProfile = asyncHandler(async (req, res) => {
//   // console.log('hii from update profile');

//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updateUser = await user.save();

//     res.json({
//       _id: updateUser._id,
//       name: updateUser.name,
//       isblocked: updateUser.isblocked,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("user");
//   }
// });

//============update password================//

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { oldPassword, newPassword } = req.body;

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "incorrect password",
      });
    }
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "password updated",
    });
  } catch (error) {}
});

//============ new update profile =============//

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await user.save();

    res.status(200).json({
      success: true,
      messsge: "profile updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//==========add favourites====================//

const addandRemoveFavourites = asyncHandler(async (req, res) => {
  // console.log('add remove favorite');

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.favourites.includes(req.params.id)) {
      const index = user.favourites.indexOf(req.params.id);

      user.favourites.splice(index, 1);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Removed from favourites",
      });
    } else {
      user.favourites.push(req.params.id);
      await user.save();

      return res.status(200).json({
        success: true,
        message: "added to favourites",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

//======send a request =====//

const sendRequest = asyncHandler(async (req, res) => {
  try {
    const userFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userFollow) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (loggedInUser.sentrequests.includes(userFollow._id)) {
      const indexsent = loggedInUser.sentrequests.indexOf(userFollow._id);
      loggedInUser.sentrequests.splice(indexsent, 1);

      const indexincoming = userFollow.incomingrequests.indexOf(
        loggedInUser._id
      );
      userFollow.incomingrequests.splice(indexincoming, 1);

      await loggedInUser.save();
      await userFollow.save();

      res.status(200).json({
        success: false,
        message: "user remove request",
      });
    } else {
      loggedInUser.sentrequests.push(userFollow._id);
      userFollow.incomingrequests.push(loggedInUser._id);

      await loggedInUser.save();
      await userFollow.save();

      res.status(200).json({
        success: true,
        message: "user sent request",
        match: userFollow,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

//======== all sent requests=====//

const allSentRequests = asyncHandler(async (req, res) => {
  try {
    const dets = req.user.sentrequests;
    const users = [];

    for (let i = 0; i < dets.length; i++) {
      users.push(await User.findById(dets[i]));
    }
    // console.log(users);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

//====all incoming request ====//

const allReceivedRequest = asyncHandler(async (req, res) => {
  // console.log("hoo");
  try {
    const dets = req.user.incomingrequests;
    const users = [];

    for (let i = 0; i < dets.length; i++) {
      users.push(await User.findById(dets[i]));
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

export {
  getUsers,
  authUser,
  getUserProfile,
  registerUser,
  updateProfile,
  forgotPassword,
  emailVerify,
  addandRemoveFavourites,
  sendRequest,
  allSentRequests,
  allReceivedRequest,
  updatePassword,
  resetPassword,
};
