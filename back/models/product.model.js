import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
    imagesURl:[{type:String}],
    name: {type:String,require:true,},
    brand: {type:String,require:true,},
    model: {type:String,require:true,},
    stock: {type:Number,require:true,},
    price: {type:Number,require:true,},
    size: {type:[String],require:true,},
    color: {type:[String],require:true,},
    description: {type:String,require:true,},
    type: {type: String,enum: ['shades', 'specs'],required: true,},
    forThem: {type: String,enum: ['men', 'women','child','unisex'],required: true,},
    material: {type:String,enum: ['Metals','Titanium','Acetate','Plastic','Semi','Aluminium','TR',],require:true,},
    shape: {type:String,enum: ['Cateye','Circle','Oval','Aviator','Rectangle','Sporty','Clubmaster','Butterfly','Rimless',],require:true,},
},{timestamps:true});

const Product = model('Product', ProductSchema);

export default Product;