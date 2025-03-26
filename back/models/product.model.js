import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    imagesURl:[{type:String}],
    name: {type:String,require:true,},
    size: {type:String,require:true,},
    brand: {type:String,require:true,},
    model: {type:String,require:true,},
    stock: {type:Number,require:true,},
    price: {type:Number,require:true,},
    color: {type:[String],require:true,},
    description: {type:String,require:true,},
},{timestamps:true});

const Product = model('Product', ProductSchema);

export default Product;