import express from "express";
const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage({
  destination: (req, res, cb) => {
      cb(null, "")
  }
})
const upload = multer({ storage })

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
  resetPassword,
  acceptRequest,
  deleteRequest
} from "../controllers/userController.js";

import { registerUserDetails,imagesUpload,mutltipleImageUpload} from "../controllers/userDetailsController.js";
import { protect } from "../middleware/authMiddleware.js";



router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route('/verify/:id/:token').get(emailVerify)



router.route('/forgotpassword').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/updatepassword').put(protect,updatePassword)  
router.route("/profile").put(protect, updateProfile);


router.route('/favadd/:id').get(protect,addandRemoveFavourites)
router.route('/sentrequest/:id').get(protect,sendRequest)
router.route('/allsentrequest').get(protect,allSentRequests)
router.route('/allrequests').get(protect,allReceivedRequest)


router.route('/acceptrequest/:id').get(protect,acceptRequest)
router.route('/deleterequest/:id').get(protect,deleteRequest)



router.route('/userpersonaldetails').post(registerUserDetails).put(protect,upload.single('image'),imagesUpload)

router.route('/multipleimages').post(mutltipleImageUpload)





export default router;
