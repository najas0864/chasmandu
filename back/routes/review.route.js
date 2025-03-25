import express from "express";
import { getReviews, createReviews, updateReviews, deleteReviews, } from "../controllers/review.controller.js";

const router = express.Router();

router.get('/',getReviews);
router.post("/",createReviews);
router.put("/:id",updateReviews);
router.delete("/:id",deleteReviews);

export default router;