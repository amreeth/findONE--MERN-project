import express from 'express'
import { newMessage,getMessages } from '../controllers/messageController.js';
const router = express.Router();




router.route('/').post(newMessage)
router.route('/:conversationId').get(getMessages)




export default router