import express from "express";
const router = express.Router();
import {getAllMatches,matchDetail} from '../controllers/matchController.js'
import { protect } from "../middleware/authMiddleware.js";


router.route('/allMatches').get(protect,getAllMatches)
router.route('/:id').get(protect,matchDetail)

export default router