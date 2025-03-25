import { model, Schema } from "mongoose";

const ReviewSchema = new Schema({
    review:{type:String,require:true},
    userId:{type: Schema.Types.ObjectId,ref: "User",default: null },    //,require:true
    itemId:{type: Schema.Types.ObjectId,ref: "Product",default: null },    //,require:true
});

const Review = model('Review',ReviewSchema);

export default Review;