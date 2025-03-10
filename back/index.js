import express from "express";
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from "dotenv";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import randomize from 'randomatic';
import { createServer } from "http";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import { Data, Review, User } from "./models.js";
import { createTransport } from "nodemailer";

const app = express();
const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: path.join(__dirname,'uploads'),
  filename: (req, file, cb)=>{
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({storage: storage});

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",methods: "GET,POST,PUT,DELETE",allowedHeaders: "Content-Type,Authorization",credentials: true}));
app.use(express.urlencoded({limit:"150mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set('trust proxy', 1) // trust first proxy

const MY_SECRET = process.env.SECRET_TOKEN_KEY;
const PORT = process.env.PORT || 10000;
const host = process.env.HOST;
const mongoURL = process.env.MONGOURL;
mongoose.connect(mongoURL)
const sendOtpEmail = async (email,otp)=> {
  try {
    const transporter = createTransport({
        host:'smtp.gmail.com',
        service: 'gmail',
        port:465,
        secure:true,
        tls:{
          servername:'smtp.gmail.com',
          rejectUnauthorized: true,
        },
        auth: {
          user: 'najas0864@gmail.com',
          pass: 'legt bipn cawc rukk',
        },
    });
    await transporter.sendMail({
      from: 'najas0864@gmail.com',
      to: email,
      subject: 'OTP Verification',
      html: `<h1>Your OTP is: ${otp}</h1>`,
    });
    console.log(`Email sent to :${email} `);
  } catch (error) {
      console.log(`error semding email to ${email}`);
  }
}



/* GET */
app.get('/', (req, res) => {
  res.send("<h1>Dashboard</h1><a href='https://chasmandu-ade3.onrender.com'>Go to Clint side</a>");
});
app.get('/items', async (req, res) => {
  const items = await Data.find({});
  res.send(items);
});
app.post('/placeOrder', async (req, res) => {
  const {item} = req.body;
  const cookieUser = req.cookies.User;
  const decoded = jwt.verify(cookieUser, MY_SECRET);
  const id = decoded?.id
  if (!mongoose.Types.ObjectId.isValid(id)) {return  res.status(400).json({ error: "Invalid item ID format" })}

  await User.findByIdAndUpdate(
    id,
    { $push: { orderItem: item } },
    { new: true, runValidators: true }
  );
  console.log(item)
  res.json({message:'Order Placed.',sucess:true})
});
app.get('/items/:id', async (req, res) => {
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {return  res.status(400).json({ error: "Invalid item ID format" })}
  const item = await Data.findById(id);
  if (!item) {return res.status(404).json({ error: "Data not found" })}
  res.json(item);
});
app.get("/validate-cookie", (req, res) => {
  try {
    const token = req.cookies.User;
    const decoded = jwt.verify(token, MY_SECRET);
    res.json({ valid: true, userId: decoded.id });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});


// FIT IT FIRST
app.get("/short", async (req, res) => {
  let { category, brand, minPrice, maxPrice, minRating, sort } = req.query;
  let filter = {};
  if (category) filter.category = category;
  if (brand) filter.brand = brand;
  if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (minRating) filter.rating = { $gte: Number(minRating) };

  let query = Product.find(filter);

  // Sorting: price (low to high or high to low), rating, or newest
  if (sort) {
      const sortOptions = {
          price_asc: { price: 1 },
          price_desc: { price: -1 },
          rating: { rating: -1 },
          newest: { createdAt: -1 }
      };
      query = query.sort(sortOptions[sort] || {});
  }

  const products = await query;
  res.json(products);
});



app.get("/search", async (req, res) => {
  const {query} = req.query;
  const results = await Data.find({
      $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
      ]
  });
  res.json(results);
});
/*POST*/
app.post('/items', upload.array('file', 20),async (req, res) => {
  const {name,brand,model,color,size,price,stock,description,}=req.body;
  const fileUrls = req.files?.map(file =>file.filename);
  if(!name|| !brand|| !model|| !color|| !size|| !price|| !stock|| !description){
    return res.status(400).json({ message: "All input field required!!" })
  }
  try {
    const item = new Data({
      name:name,
      brand:brand,
      model:model,
      color:color,
      size:size,
      price:price,
      stock:stock,
      description:description,
      files: fileUrls,
    });
    await item.save();
    res.json({ message: "Files Uploaded", item });
  } catch (error) {res.status(500).json({ message: "Error saving data", error })}
});
app.post("/items/:id", upload.array("file", 20), async (req, res) => {
  const {id} = req.params;
  const filePaths = req.files?.map(file => file.filename);
  if(!mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({ error: "Invalid item ID format" })} 
  try {
    await Data.findByIdAndUpdate(
      id,
      {$addToSet:{files: { $each: filePaths }}},
      {new:true}
    )
    res.status(201).json({ message: "Files uploaded successfully", files: filePaths });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
});
/*sign-log*/
app.post('/auth/verify-otp', async (req, res) => {
  const { otp } = req.body;
  if (!otp) return res.json({ success: false, message: 'Enter OTP First!' });
  const user = await User.findOne({ otp });
  if (!user) return res.json({ success: false, message: 'Invalid OTP !' });
  const token = jwt.sign({ id: user._id }, MY_SECRET, {expiresIn: "96h"});
  res.cookie("User", token, {
    httpOnly: true,
    sameSite: "lax",
    secure:true,
    maxAge: 96 * 60 * 60 * 1000,
  });
  user.otp = '';
  user.verified=true;
  const verifiedUser = await user.save();
  if(!verifiedUser){
    return res.status(500).json({sucess: false,message: 'An error occurred during OTP verification'});
  }else{
    res.json({ sucess: true, message: 'OTP veryfied' });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password, gender } = req.body;
  const existingUser = await User.findOne({ email });
  if(!name||!email||!password||!gender) return res.status(400).json({ error: "all filed required!" });
  if (existingUser) return res.status(400).json({ error: "Email already in use!" });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, gender });
    const generatedOtp = randomize('0', 6);
    newUser.otp = generatedOtp;
    await newUser.save();
    sendOtpEmail(email, generatedOtp);
    res.json({ message:'Sign up Sucessfully.',sucess:true, email });
  } catch (error) {
    res.status(400).json({ error: "User already exists!",sucess:false });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({ error: "wrong email" });
    const token = jwt.sign({ id: user._id }, MY_SECRET, {expiresIn: "96h",});
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) { return res.status(400).json({ error: "!!!Invalid password!!!" })}
    res.cookie("User", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 96 * 60 * 60 * 1000,
    });
    res.status(201).json({ message:'login sucess.',data:token,cooke:token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.post('/forget-password', async(req,res)=>{
  const {email} = req.body;  
  const user = await User.findOne({email});
  if(!user) return res.json({error:'invalid Email.'})
  const newOtp = randomize('0', 6);
  user.otp=newOtp
  sendOtpEmail(email,newOtp)
  await user.save();
  res.json({message:'OTP Sent',sucess:true})
})
app.post('/update-password',async(req,res)=>{
  const {password, rePassword, email} = req.body;
  if(!password||!rePassword||!email) return res.json("Both field required.");
  if(password!== rePassword) return res.json("Password dosen't matched.");
  const user = await User.findOne({email});
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password=hashedPassword;
  await user.save();
  res.json({message:'Password Reset Sucess.',sucess:true})
})
app.post("/logout", (req, res) => {
  res.clearCookie("User",{
    httpOnly: true, 
    sameSite: "lax", 
  });
  res.json({ message: "Logged out successfully" });
});
app.post("/userReview/:id", async (req, res) => {
  const {id} = req.params;  
  if(!mongoose.Types.ObjectId.isValid(id)) {return res.status(400).json({ error: "Invalid item ID format" })} 
  try {
    const review = new Review({
      review: req.body.review,
      itemId:id,
      userId:"user id",
    });
    await review.save();
    res.status(201).json({ message: "Files uploaded successfully", files: filePaths });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
});


// PUT
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  let updateData = { ...req.body };
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid item ID format" });
  }
  try {
    delete updateData.files;
    const updatedItem = await Data.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(updatedItem);
  } catch (err) {res.status(500).json({ error: "Internal server error" })}
});

// DELETE
app.delete('/items/:id', async (req, res) => {
  await Data.findByIdAndDelete(req.params.id);
  res.status(204).send();
});
app.delete("/delete/:id/:filename", async(req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid item ID format" }); 
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (filePath) {
    fs.unlink(filePath,err=>{if(err) return res.status(404).json({ error: "File not found" })});
  }
  try {
    await Data.updateOne(
      { _id:id },
      { $pull: { files: req.params.filename } }
    );
    res.json({ message:`File removed successfully`});
  } catch (error) {
    console.error("Error removing file:", error);
  }
});
server.listen(PORT,host, () => console.log(`http://${host}:${PORT}`));