import express from "express";
const router = express.Router();
import {getAllMatches} from '../controllers/matchController.js'
import { protect } from "../middleware/authMiddleware.js";


router.route('/allMatches').get(protect,getAllMatches)

// router.route('/match').get()

export default router