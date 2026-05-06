import { connect } from "mongoose";
import Product from "../models/product.model.js";

export const conectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URL);
        await Product.createIndexes({ "slug": 1}, {unique: true});
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}