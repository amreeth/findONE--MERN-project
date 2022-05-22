import express from 'express'
import { authAdmin} from  "../controllers/adminController.js"
import {getUsers,
} from '../controllers/userController.js'
import { protectAdmin } from '../middleware/authMiddleware.js';

import {addQuestion,allQuestions,deleteQuestion} from  '../controllers/questionsController.js';


const router=express.Router();


// router.route("/register").post(registerAdmin)
router.route("/login").post(authAdmin)
// router.route('/').get()
router.route('/usermanagement').get(protectAdmin,getUsers)
router.route('/question/:id').post(protectAdmin,addQuestion).delete(deleteQuestion)
router.route('/allquestions').get(allQuestions)



export default router