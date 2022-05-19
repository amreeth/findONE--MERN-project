import express from 'express'
import { authAdmin} from  "../controllers/adminController.js"
import {getUsers,
} from '../controllers/userController.js'
import { protectAdmin } from '../middleware/authMiddleware.js';


const router=express.Router();


// router.route("/register").post(registerAdmin)
router.route("/login").post(authAdmin)
router.route('/').get()
router.route('/usermanagement').get(protectAdmin,getUsers)

export default router