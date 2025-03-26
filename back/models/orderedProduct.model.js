import { model, Schema } from "mongoose";

const orderSchema  = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
    paymentMethod: { type: String, required: true }, 
    shippingAddress: { type: String, required: true },
    },
    { timestamps: true }
);
const Order = model('Order', orderSchema );
export default Order;