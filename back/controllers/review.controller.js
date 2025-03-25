import { isValidObjectId } from "mongoose";
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

export const getReviews = async (req,res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export const createReviews = async (req,res) => {
    const {review} = req.body;
    if (!review) {
        return res.status(400).json({ success: false, message: "Please write review first" });
    }
    const data = {
        review:review,
        // userId: userId,
        // itemId: itemId
    }
    const newUser = new Review(data);
    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export const updateReviews = async (req,res) => {
    const { id } = req.params;
    const user = req.body;
    if (!isValidObjectId(id)) return res.status(404).json({ success: false, message: "Invalid user Id" });
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export const deleteReviews = async (req,res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(404).json({ success: false, message: "Invalid user Id" });
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "user deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}