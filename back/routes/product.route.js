import express from "express";
import { createProducts, deleteProducts, shortProducts, searchProducts, deleteImage, getProducts, updateProducts, getSingleProduct, updateImage } from "../controllers/product.controller.js";

const router = express.Router();

router.delete("/deleteImage",deleteImage);
router.post("/search",searchProducts);
router.put("/images/:id",updateImage);
router.delete("/:id",deleteProducts);
router.get('/:id',getSingleProduct);
router.post("/short",shortProducts);
router.put("/:id",updateProducts);
router.post("/",createProducts);
router.get('/',getProducts);

export default router;