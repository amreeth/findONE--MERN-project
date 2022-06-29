import Message from '../models/messageModel.js'
import asyncHandler from 'express-async-handler'




//@desc user sent new message
//@route POST /api/message
//@access USER

const newMessage=asyncHandler(async(req,res)=>{
    const newmessages=new Message(req.body)
    try {
        const savedMessage=await newmessages.save()

        if(savedMessage){
            const replyMessage = await Message.findOne({ _id : savedMessage._id }).populate('sender');
            if(replyMessage){
                res.status(200).json(replyMessage);
            }else{
                res.status(500).json({ err:'error' });
            }
        }else{
            res.status(500).json({ error :'error' });
        }

    } catch (error) {
        res.status(500).json(error)
    }
})




//@desc user get all messages
//@route GET /api/message/:conversationId
//@access USER

const getMessages=asyncHandler(async(req,res)=>{
    try {
        const messages=await Message.find({
            conversationId:req.params.conversationId
        }).populate("sender")

        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})




export {newMessage,getMessages}