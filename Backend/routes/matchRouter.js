import express from "express";
const router = express.Router();


router.route('/allMatches').get()

router.route('/match').get()

export default router