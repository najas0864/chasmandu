import express from "express";
import { cancleOrder, getOrder, placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/",placeOrder);
router.post("/",cancleOrder);
router.post("/",getOrder);

export default router;
