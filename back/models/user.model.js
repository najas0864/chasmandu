import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    name:{type:String,require:true},
    otp:{type:Number,default: null},
    gender:{type:String,require:true},
    password:{type:String,require:true},
    verified:{type:String,default: null},
    email:{type:String,require:true,unique: true,},
    orderItem: [
        {
            id: Schema.Types.ObjectId,
            file: String,
            name: String,
            price: Number,
            quantity: Number,
            sum: Number,
        },
    ],
},{timestamps:true});

const User = model('User',UserSchema);

export default User;