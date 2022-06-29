import express from "express";
import {
  authAdmin,
  getUsers,
  allPremiumStatus,
  addPremium,
  getAllPremiumUsers,
  allProfit,
  totalUser
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import {
  addQuestion,
  allQuestions,
  deleteQuestion,
  editQuestion,
} from "../controllers/questionsController.js";
const router = express.Router();




// router.route("/register").post(registerAdmin)
router.route("/login").post(authAdmin);
router.route("/usermanagement").get(protectAdmin, getUsers);
router
  .route("/question/:id")
  .post(protectAdmin, addQuestion)
  .delete(protectAdmin, deleteQuestion)
  .put(protectAdmin, editQuestion); 
router.route("/allquestions").get(allQuestions);
router.route("/allPremiumStatus").get(protectAdmin, allPremiumStatus);
router.route("/addpremium").post(protectAdmin, addPremium);
router.route("/allpremiumusers").get(protectAdmin, getAllPremiumUsers);
router.route("/profit").get(protectAdmin,allProfit);
router.route('/totalusers').get(totalUser)


export default router;
