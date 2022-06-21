import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Premium from "../models/premiumModel.js";
import PremiumUsers from "../models/premiumUsersModel.js";

// const registerAdmin = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body
//     const adminExists = await Admin.findOne({ email })
//     if (adminExists) {
//         res.status(400)
//         throw new Error("admin already exists")
//     }
//     const admin = await Admin.create({
//         name, email, password,
//     })
//     if (admin) {
//         res.status(201).json({
//             _id: admin._id,
//             name: admin.name,
//             email: admin.email,
//             token: generateToken(admin._id)
//         })
//     } else {
//         res.status(400)
//         throw new Error("new error")
//     }
// })

//=========admin login============//

const authAdmin = asyncHandler(async (req, res) => {
  // res.send('hiii')
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    throw new Error("Invalid login");
  }
});

//=======all users===========//

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("users not found");
  }
});

//=======all premium status===========//

const allPremiumStatus = asyncHandler(async (req, res) => {
  const allPremiumLists = await Premium.find({});

  //   console.log(allPremiumLists,'sss');

  if (allPremiumLists) {
    res.status(200).json(allPremiumLists);
  } else {
    res.status(400);
    throw new Error("No data found");
  }
});

//===========add premium ==================//

const addPremium = asyncHandler(async (req, res) => {
  const { name, category, price, days } = req.body;
  const exist = await Premium.findOne({ name });

  if (exist) {
    res.status(400);
    throw new Error("This premium already exist");
  } else {
    // console.log("elsee");
    const premium = await Premium.create({
      name: name,
      category: category,
      price: price,
      days: days,
    });
    if (premium) {
      res.status(201).json({
        premium,
      });
    } else {
      res.status(400);
      throw new Error("invalid data");
    }
  }
});

//===========get all premium users======//

const getAllPremiumUsers = asyncHandler(async (req, res) => {
  const allPremiumUsers = await PremiumUsers.find({});
  if (allPremiumUsers) {
    res.status(200).json(allPremiumUsers);
  } else {
    res.status(500);
    throw new Error("Premium users not found");
  }
});

const allProfit = asyncHandler(async (req, res) => {
  try {
    const [{ total }] = await PremiumUsers.aggregate([
      { $group: { _id: "$price", total: { $sum: "$price" } } },
    ]);
  
    if (total) {
      res.status(200).json(total);
    }
  } catch (error) {
    res.status(400).json(error);
  }
  // let data = premiumuser.reduce((acc,data)=>parseInt(data.price)+acc,0)
});






const totalUser=asyncHandler(async(req,res)=>{
  try {
    const users=await User.find().count()
    // console.log(users);
    if(users){
      res.status(200).json(users)
    }
  } catch (error) {
    res.status(400).json(error)
  }
})






export {
  authAdmin,
  getUsers,
  allPremiumStatus,
  addPremium,
  getAllPremiumUsers,
  allProfit,
  totalUser
};
