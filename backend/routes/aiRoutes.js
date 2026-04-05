import express from "express";
import {
  generateInterviewQuestions,
  generateConceptExplanation,
} from "../controller/ai-controller.js";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

// 🔥 Generate interview questions (uses sessionId)
router.post("/generate-questions", protect, generateInterviewQuestions);

// 🔥 Generate explanation for a question
router.post("/generate-explanation", protect, generateConceptExplanation);

export default router;
