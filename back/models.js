import { model, Schema } from "mongoose";
const ItemSchema = new Schema({
    files:[{type:String}],
    brand:{type:String,require:true,},
    model:{type:String,require:true,},
    stock:{type:Number,require:true,},
    price:{type:Number,require:true,},
    size:[{type:String,require:true,}],
    color:[{type:String,require:true,}],
    description: {type:String,require:true,},
    name: {type:String,require:true,unique: true,},
},{timestamps:true});
const CommentSchema = new Schema({
    comment:{type:String, default: null},
    userId:{ type: Schema.Types.ObjectId, ref: "User" },
    itemId:{ type: Schema.Types.ObjectId, ref: "Item",require:true },
});
const ReviewSchema = new Schema({
    review:{type:Number,default: null},
    userId:{type: Schema.Types.ObjectId,ref: "User" },
    itemId:{type: Schema.Types.ObjectId,ref: "Item",require:true },
});
const UserSchema = new Schema({
    name:{type:String,require:true},
    otp:{type:Number,default: null},
    gender:{type:String,require:true},
    password:{type:String,require:true},
    verified:{type:String,default: null},
    email:{type:String,require:true,unique: true,},
    orderItem:[{type:String}],
},{timestamps:true});

const User = model('Users',UserSchema);
const Data = model('Datas', ItemSchema);
const Review = model('Reviews',ReviewSchema);
const Comment = model('Comments',CommentSchema);

export  {Data,User,Review,Comment};