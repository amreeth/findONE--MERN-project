import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";

const protect = asyncHandler(async (req, res, next) => {

  // console.log('hi from auth ');
    
  let token;
  // console.log(req.headers.authorization,'header');
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");

    try {
        token=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded);

        req.user=await User.findById(decoded.id).select('-password')

        next()

    } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('not authorized token failed')
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }

  
})

const protectAdmin=asyncHandler(async(req,res,next)=>{
  
// console.log("admin auth middleware");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log("token found");
    try {
        token=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded);
        req.admin=await Admin.findById(decoded.id).select('-password')

        // console.log("admin auth PASSED");
        next()
    } catch (error) {
        // console.error(error)
        res.status(401)
        throw new Error('not authorized token failed')
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }

})



export {protect,protectAdmin}