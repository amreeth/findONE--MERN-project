import Conversation from "../models/conversationModel.js";
import asyncHandler from "express-async-handler";



//@desc user new conversation
//@route POST /api/conversation
//@access USER

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



//@desc user get all conversation
//@route GET /api/conversation/:userId
//@access USER

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




//@desc user get conversation between other peson
//@route GET /api/conversation/find/:firstuser/:seconduser
//@access USER

const getConversationTwoUser = asyncHandler(async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      $and:[{members:{$in:[req.params.firstuser]}},{members:{$in:[req.params.seconduser]}}] 
    });
  
    if (conversation) {
      res.status(200).json(conversation);
    } else {
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
