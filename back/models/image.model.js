import { model, Schema } from "mongoose";

const ImageSchema = new Schema({
    imagesURl:[{type:String}],
},{timestamps:true});

const Image = model('Image', ImageSchema);

export default Image;