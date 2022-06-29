import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Premium from "../models/premiumModel.js";
import PremiumUsers from "../models/premiumUsersModel.js";





//@desc admin register
//@route POST /api/admin/register

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




//@desc admin login
//@route POST /api/admin/login

const authAdmin = asyncHandler(async (req, res) => {
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




//@desc Admin get All users 
//@route GET /api/admin/usermanagement
//@access Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("users not found");
  }
});



//@desc Admin get All Premiums details
//@route GET /api/admin/allPremiumStatus
//@access Admin

const allPremiumStatus = asyncHandler(async (req, res) => {
  const allPremiumLists = await Premium.find({});

  if (allPremiumLists) {
    res.status(200).json(allPremiumLists);
  } else {
    res.status(400);
    throw new Error("No data found");
  }
});



//@desc Admin add Premium  
//@route POST /api/admin/addpremium
//@access Admin

const addPremium = asyncHandler(async (req, res) => {
  const { name, category, price, days } = req.body;
  const exist = await Premium.findOne({ name });

  if (exist) {
    res.status(400);
    throw new Error("This premium already exist");
  } else {
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



//@desc Admin get Premium users  
//@route GET /api/admin/allpremiumusers
//@access Admin

const getAllPremiumUsers = asyncHandler(async (req, res) => {
  const allPremiumUsers = await PremiumUsers.find({});
  if (allPremiumUsers) {
    res.status(200).json(allPremiumUsers);
  } else {
    res.status(500);
    throw new Error("Premium users not found");
  }
});



//@desc Admin get total profit
//@route GET /api/admin/profit
//@access Admin

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




//@desc Admin get total users 
//@route GET /api/admin/totalusers
//@access Admin

const totalUser=asyncHandler(async(req,res)=>{
  try {
    const users=await User.find().count()
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
