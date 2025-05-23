import Order from "../models/orderedProduct.model.js";

export const placeOrder = async (req, res) => {
  const { userId, items, totalAmount, paymentMethod, shippingAddress } = req.body;
  try {
    if (!userId || !items.length || !totalAmount || !paymentMethod || !shippingAddress) {
          return res.status(400).json({ message: "Missing required fields" });
    }
    const newOrder = new Order({
        userId,
        items,
        totalAmount,
        paymentMethod,
        shippingAddress,
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully",sucess:true, order: newOrder });
  } catch (error) {res.status(500).json({ message: "Internal Server Error",sucess:false })}
};
export const cancleOrder = async (req, res) => {
  try {
    const products = await Order.find({});
    res.status(201).json({ message: "Order cancled successfully",sucess:true, order: newOrder });
  } catch (error) {res.status(500).json({ message: "Internal Server Error",sucess:false })}
};
export const getOrder = async (req, res) => {
  try {
    const products = await Order.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {res.status(500).json({ success: false, message: `Server Error:${error.message}` })}
};