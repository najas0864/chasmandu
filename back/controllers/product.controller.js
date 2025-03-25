import { isValidObjectId } from "mongoose";
import { upload } from "../config/coludy.js";
import Product from "../models/product.model.js";

export const shortProducts = async (req, res) => {
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
};
export const searchProducts = async (req, res) => {
  const {query} = req.query;
  const results = await Product.find({
	  $or: [
		{ name: { $regex: query, $options: "i" } },
		{ description: { $regex: query, $options: "i" } }
	  ]
  });
  res.json(results);
};
export const getProducts = async (req,res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const getSingleProduct = async (req,res) => {
	const {id} = req.params;
	if (!isValidObjectId(id)) {return  res.status(400).json({ error: "Invalid item ID format" })}
	try {
		const products = await Product.findById(id);
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
export const updateImage = [upload.array('imageURL', 20), async (req,res) => {
	const {id} = req.params;	
	const urls = req.files.map(file => file.path);
	try {
    const updatedProduct = await Product.findByIdAndUpdate(
		id,
		{ $push: { imageUrl : { $each : urls }  } },
		{ new: true }
	  );
	  if (!updatedProduct) {
		return res.status(404).json({ success: false ,message: 'Image added successfully',});
	  }
		res.status(200).json({ success: true, message: 'Image added successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message:error.message });
	}
}];
export const createProducts = [upload.array('imageURL', 20), async (req,res) => {
	const {name,price,brand,model,color,size,stock,description} = req.body;
	if (!name||!price||!brand||!model||!color||!size||!stock||!description||req.files.length===0) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
	try {
		const imageUrls = req.files.map(file => file.path);
		const newProduct = new Product({name,price,brand,model,color,size,stock,description,imagesURl:imageUrls});
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: `Server Error ${error}` });
	}
}]
export const updateProducts = async (req,res) => {
	const { id } = req.params;

	const product = req.body;

	if (!isValidObjectId(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
}
export const deleteProducts = async (req,res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) return res.status(404).json({ success: false, message: "Invalid Product Id" });
	try {
		const resdata = await Product.findByIdAndDelete(id);
		if(resdata){
			res.status(200).json({ success: true, message: "Product deleted" })
		}else{
			res.status(200).json({ success: false, message: "Error deleting Product!" })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const deleteImage = async (req, res) => {
  const { id } = req.params.id;
  if(!isValidObjectId(id)) return res.status(400).json({ error: "Invalid item ID format" }); 
  try {
	const image = await Image.findById(id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
	const publicId = image.images[0].split('/').pop().split('.')[0];
	await cloudinary.uploader.destroy(publicId);
	await Product.updateOne(
	  { _id:id },
	  { $pull: { files: req.params.filename } }
	);
	res.json({ message:`Image removed successfully`});
  } catch (error) {
	console.error("Error removing image:", error);
  }
};


export const placeOrder = async (req, res) => {
  const {item} = req.params;
  const cookieUser = req.cookies.User;
  const decoded = jwt.verify(cookieUser, MY_SECRET);
  const id = decoded.id;
  if (!isValidObjectId(id)) {return res.status(400).json({ error: "Invalid item ID format" })}
  await User.findByIdAndUpdate(
	id,
	{ $push: { orderItem: item } },
	{ new: true, runValidators: true }
  );
  res.json({message:'Order Placed.',sucess:true})
};