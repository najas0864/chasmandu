import express from "express";
import { createProducts, deleteProducts, shortProducts, searchProducts, deleteImage, getProducts, updateProducts, placeOrder, getSingleProduct, updateImage } from "../controllers/product.controller.js";

const router = express.Router();

router.get('/',getProducts);
router.post("/",createProducts);
router.put("/:id",updateProducts);
router.get('/:id',getSingleProduct);
router.post("/short",shortProducts);
router.delete("/:id",deleteProducts);
router.post("/order/:id",placeOrder);
router.put("/images/:id",updateImage);
router.post("/search",searchProducts);
router.delete("/deleteImage/:id",deleteImage);

export default router;