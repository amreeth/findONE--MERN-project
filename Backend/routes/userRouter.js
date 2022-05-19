import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  forgotPassword,
  emailVerify
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/register").post(registerUser);

router.route("/login").post(authUser);

router.route('/password/forgot').post(forgotPassword)

router.route("/profile/:id")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/verify/:id/:token').get(emailVerify)


export default router;
