import express from "express";
import { 
    createProducts,
    deleteProducts,
    shortProducts,
    searchProducts,
    deleteImage,
    getProducts,
    updateProducts,
    getSingleProduct,
    updateImage,
    getSpecsProduct,
    getShadesProduct,
    getRelatedProducts,
    getPopularProduct,
    getChildProduct,
    getWomenProduct,
    getMenProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get('/',getProducts);
router.get("/short",shortProducts);
router.get("/search",searchProducts);
router.get("/specs",getSpecsProduct);
router.get("/popular",getPopularProduct);
router.get("/child",getChildProduct);
router.get("/women",getWomenProduct);
router.get("/men",getMenProduct);
router.get("/shades",getShadesProduct);
router.get('/:id',getSingleProduct);
router.get('/:id/related',getRelatedProducts);
router.post("/",createProducts);
router.put("/images/:id",updateImage);
router.put("/:id",updateProducts);
router.delete("/deleteImage",deleteImage);
router.delete("/:id",deleteProducts);

export default router;