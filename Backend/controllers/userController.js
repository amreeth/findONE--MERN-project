import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import Token from "../models/token.js";
import verifyEmail from "../utils/verifyEmail.js";
import crypto from "crypto";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import PremiumUsers from "../models/premiumUsersModel.js";
import Premium from "../models/premiumModel.js";

const ObjectId = mongoose.Types.ObjectId;

//==========user registration========//

const registerUser = asyncHandler(async (req, res) => {
  // console.log("here");
    // console.log(req.body, "user register");
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
  
    const userExist = await User.findOne({ email });
    if (userExist) {
      // console.log('user exist');
      res.status(400);
      throw new Error("User already exists");
    }

    console.log("no user exist");

    let myCloud;
    if (image) {
      myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "newpropic",
        crop: "scale",
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
        phonenumber: user.phonenumber,
        dob: user.dob,
        gender: user.gender,
        oppGender: user.oppGender,
        avatar: user.avatar,
        friends: user.friends,
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
      phonenumber: userExist.phonenumber,
      dob: userExist.dob,
      gender: userExist.gender,
      oppGender: userExist.oppGender,
      avatar: userExist.avatar,
      friends: userExist.friends,
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
    console.log("user not found");
    res.status(401);
    throw new Error("Enter valid email id");
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;

  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Reset your password by clicking on the link below :\n\n ${resetPasswordUrl} \n\n if you are not requested this email the please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: `FindOne Password recovery`,
      message,
    });

    console.log("email sent successfully");

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
    console.log("reached here");
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
    user.cpassword = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    console.log("password reset successfully");

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

//============update password================//

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Old password not matching ",
      });
    }

    if (newPassword == confirmPassword) {
      user.password = newPassword;
      user.cpassword = confirmPassword;

      await user.save();
      res.status(200).json({
        success: true,
        message: "password updated",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "New passwords are not match",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//============ new update profile =============//

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, avatar, phonenumber, dob, gender, oppGender } = req.body;

    if (name || phonenumber || dob || gender || oppGender) {
      if (name) {
        user.name = name;
      }
      if (phonenumber) {
        user.phonenumber = phonenumber;
      }
      if (dob) {
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

        user.dob = age;
      }
      if (gender) {
        user.gender = gender;
      }
      if (oppGender) {
        user.oppGender = oppGender;
      }

      if (avatar) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "newpropic",
        });

        user.avatar.public_id = myCloud.public_id;
        user.avatar.url = myCloud.secure_url;
      }

      await user.save();

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
        dob: user.dob,
        gender: user.gender,
        oppGender: user.oppGender,
        avatar: user.avatar,
        token: generateToken(user._id),
        success: true,
        messsge: "profile updated",
      });
    } else {
      res.status(400);
      throw new Error("No data found for update");
    }
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

//===============get all favorites=======================//

const getAllFavourites = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let allFavourites;
    if (user) {
      allFavourites = user.favourites;
    }

    if (allFavourites.length < 1) {
      res.status(200).json({
        message: "You have no favourites ",
      });
    } else {
      res.status(200).json({
        allFavourites,
        message: "Your favourites are..",
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("User not found");
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

//======== all sent requests============//

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

//==============all incoming request ===============//

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

//===================accept request=====================//

const acceptRequest = asyncHandler(async (req, res) => {
  try {
    const requestedUser = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    // console.log(userFollow);
    if (!requestedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (loggedInUser.incomingrequests.includes(requestedUser._id)) {
      requestedUser.friends.push(loggedInUser._id);
      loggedInUser.friends.push(requestedUser._id);

      const indexsent = requestedUser.sentrequests.indexOf(loggedInUser._id);
      // console.log(indexsent, "ddddd");
      requestedUser.sentrequests.splice(indexsent, 1);

      const indexincoming = loggedInUser.incomingrequests.indexOf(
        requestedUser._id
      );
      // console.log(indexincoming, "eee");
      loggedInUser.incomingrequests.splice(indexincoming, 1);

      await loggedInUser.save();
      await requestedUser.save();

      res.status(200).json({
        success: true,
        message: "Friend request accepted",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

//========================delete request==================//

const deleteRequest = asyncHandler(async (req, res) => {
  try {
    // console.log("hey reached here");

    const requestedUser = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!requestedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (loggedInUser.incomingrequests.includes(requestedUser._id)) {
      const indexsent = loggedInUser.incomingrequests.indexOf(
        requestedUser._id
      );
      loggedInUser.incomingrequests.splice(indexsent, 1);

      const indexincoming = requestedUser.sentrequests.indexOf(
        loggedInUser._id
      );
      requestedUser.sentrequests.splice(indexincoming, 1);

      await loggedInUser.save();
      await requestedUser.save();

      res.status(200).json({
        success: false,
        message: "user remove request",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

//=============get all friends==========//

const allFriends = asyncHandler(async (req, res) => {
  try {
    const friendsIdArray = req.user.friends;
    const friends = [];

    for (let i = 0; i < friendsIdArray.length; i++) {
      let a = await User.findById(friendsIdArray[i]);
      friends.push(a);
    }
    if (friends.length > 0) {
      res.status(200).json(friends);
    } else {
      res.status(200).json({
        friends,
        message: "You have no friends...",
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//======get recent ==============//

const getUserFriend = asyncHandler(async (req, res) => {
  const userId = req.query.userId;

  try {
    const recent = await User.findById(userId);

    res.status(200).json(recent);
  } catch (error) {
    res.status(500);
    throw new Error("Recent friends not found");
  }
});

//=======all premium status===========//

const allPremiumsStatus = asyncHandler(async (req, res) => {
  const allPremiumLists = await Premium.find({});
  if (allPremiumLists) {
    res.status(200).json(allPremiumLists);
  } else {
    res.status(400);
    throw new Error("No data found");
  }
});

//==========premium purchase=========//

const premiumPurchase = asyncHandler(async (req, res) => {
  try {
    const { premiumId, paymentResult } = req.body;
    const premiumDetails = await Premium.findById(ObjectId(req.body.premiumId));

    const user = await User.findById(req.user._id);

    if (premiumDetails) {
      const premiumUser = await PremiumUsers.create({
        premiumId: premiumDetails._id,
        price: premiumDetails.price,
        category: premiumDetails.category,
        valid: premiumDetails.days,
        userId: user._id,
        userName: user.name,
        status: paymentResult.status,
      });

      user.premium = true;
      await user.save();

      if (premiumUser) {
        console.log("premiumUser created");
        res.status(200).json(premiumUser);
      } else {
        console.log("something went wrong");
        res.status(500);
        throw new Error("Premium details not found");
      }
    } else {
      res.status(500);
      throw new Error("premium was not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error("invalid data");
  }
});

export {
  authUser,
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
  acceptRequest,
  deleteRequest,
  allFriends,
  getUserFriend,
  allPremiumsStatus,
  premiumPurchase,
  getAllFavourites,
};
