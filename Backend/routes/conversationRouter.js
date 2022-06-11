import express from "express";
import {
  newConversation,
  getUserConversation,
  getConversationTwoUser,
} from "../controllers/conversationController.js";
const router = express.Router();

router.route("/").post(newConversation);
router.route("/:userId").get(getUserConversation);
router.route("/find/:firstuser/:seconduser").get(getConversationTwoUser);

export default router;
