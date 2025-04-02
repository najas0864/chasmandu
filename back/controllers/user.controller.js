import { isValidObjectId } from "mongoose";
import { compare } from "bcryptjs";
import User from "../models/user.model.js";

export const getUsers = async (req,res) => {
    try {
		const users = await User.find({});
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
}
export const createUsers = async (req,res) => {
	const {name,email,password,gender} = req.body;
	const existingEmail = User.findOne({email});
	if (!existingEmail) return res.status(400).json({ message: "Email already in use!" });

	if (!name || !email || !password || !gender) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
	const newUser = new User({name,email,password,gender});
	try {
		await newUser.save();
		res.status(201).json({ success: true, data: newUser });
	} catch (error) {
		console.error("Error in Create user:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}
export const updateUserPassword = async(req,res)=>{
  const {password, email} = req.body;
  if(!password||!email) return res.json("Both field required.");
  const user = await User.findOne({email});
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password=hashedPassword;
  await user.save();
  res.json({message:'Password Reset Sucess.',sucess:true})
};
export const logout = (req, res) => {
  res.clearCookie("User",{
	httpOnly: true, 
	sameSite: "lax", 
  });
  res.json({ message: "Logged out successfully" });
};

export const deleteUsers = async (req,res) => {
    const { id } = req.params;
	if (!isValidObjectId(id)) return res.status(404).json({ success: false, message: "Invalid user Id" });
	try {
		await User.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "user deleted" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const loginUser =  async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({email});
		if (!user) return res.status(400).json({ error: "wrong email" });
		const isMatch = await compare(password, user.password);
		if (!isMatch) { return res.status(400).json({ error: "!!!Invalid password!!!" })}
		res.status(201).json({ message:'login sucess.',data:token,cooke:token });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};
export const forgetPassword = async(req,res)=>{
  const {email} = req.body;  
  const user = await User.findOne({email});
  if(!user) return res.json({error:'invalid Email.'})
  const newOtp = randomize('0', 6);
  user.otp=newOtp
  sendOtpEmail(email,newOtp)
  await user.save();
  res.json({message:'OTP Sent',sucess:true})
};