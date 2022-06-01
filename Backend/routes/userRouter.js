import express from "express";
const router = express.Router();
import multer from "multer";
const upload=multer({dest:'uploads/'})
import {
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
  resetPassword
} from "../controllers/userController.js";

import { registerUserDetails,imagesUpload} from "../controllers/userDetailsController.js";

import { protect } from "../middleware/authMiddleware.js";





router.route("/register").post(registerUser);

router.route('/userpersonaldetails').post(registerUserDetails).put(protect,upload.single('image'),imagesUpload)

router.route("/login").post(authUser);

router.route('/forgotpassword').post(forgotPassword)

router.route('/password/reset/:token').put(resetPassword)

router.route("/profile").put(protect, updateProfile);

router.route('/updatepassword').put(protect,updatePassword)  

router.route('/verify/:id/:token').get(emailVerify)


router.route('/favadd/:id').get(protect,addandRemoveFavourites)

router.route('/sentrequest/:id').get(protect,sendRequest)

router.route('/usersend').get(protect,allSentRequests)

router.route('/allrequests').get(protect,allReceivedRequest)



export default router;
