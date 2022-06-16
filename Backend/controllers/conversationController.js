import Conversation from "../models/conversationModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//============new conversation==========//

const newConversation = asyncHandler(async (req, res) => {
  const newconversations = new Conversation({
    memebers: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newconversations.save();

    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//=======get user conversation===========//

const getUserConversation = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.find({
      memebers: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

//==========get conversation includes two user id======//

const getConversationTwoUser = asyncHandler(async (req, res) => {
  try {
    // console.log(req.params.firstuser);
    // console.log(req.params.seconduser);
    const conversation = await Conversation.findOne({
      $and:[{members:{$in:[req.params.firstuser]}},{members:{$in:[req.params.seconduser]}}] 
    });

    console.log(conversation,'conversationssssss');

    if (conversation) {
      res.status(200).json(conversation);
    } else {

      console.log('new conversation');

      const newConversation = new Conversation({
        members: [req.params.firstuser, req.params.seconduser],
      });

      try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export { newConversation, getUserConversation, getConversationTwoUser };
