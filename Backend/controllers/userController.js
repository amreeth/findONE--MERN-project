import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.js";
import verifyEmail from "../utils/verifyEmail.js";
import crypto from 'crypto'



//==========user registration========//

const registerUser = asyncHandler(async (req, res) => {
  
  console.log(req.body, "user register");

  const {
    name,
    email,
    dob,
    gender,
    oppGender,
    phonenumber,
    password,
    cpassword,
  } = req.body;

  console.log(req.body);

  const userExist = await User.findOne({ email });

  // console.log(userExist,'eddksmldmsadm');

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // console.log('no user exist');

  const user = await User.create({
    name: name,
    email: email,
    phonenumber: phonenumber,
    dob: dob,
    gender: gender,
    oppGender: oppGender,
    password: password,
    cpassword: cpassword,
  });


  // console.log("user created");

  let token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  // console.log(token,'tokennnnnnn');


  const message = `http://localhost:3000/api/users/verify/${user.id}/${token.token}`;

  // console.log(message);

  await verifyEmail(user.email, "Verify Email", message);

  // res.send("An Email sent to your account please verify");


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



const emailVerify=asyncHandler(async(req,res)=>{
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
})



//===========user login======//

const authUser = asyncHandler(async (req, res) => {
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
  // console.log(req.body.email, "adsfsdgdghj");

  const user = await User.findOne({ email: req.body.email });

  // console.log(user);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const resetToken = user.getResetPasswordToken();

  // console.log(resetToken,'sdd');

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/password/reset/${resetToken}`;

  // console.log(resetPasswordUrl,'ssdsdddsd');

  const message = `Your password token is :\n\n ${resetPasswordUrl} \n\n if you are not requested this email the please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `FindOne Password recovery`,
      message,
    });

    // console.log("hiiiiiiiiii");      

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {

    console.log("errorrrrrrrr");

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(401);
    throw new Error("User not found");
  }
});



//=====user profile=======//




const getUserProfile = asyncHandler(async (req, res) => {
  // console.log('hiiii');

  const user = await User.findById(req.user._id);

  // console.log(user);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
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

const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log('hii from update profile');

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      isblocked: updateUser.isblocked,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("user");
  }
});




export {
  getUsers,
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPassword,
  emailVerify
};
