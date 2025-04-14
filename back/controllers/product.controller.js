import { isValidObjectId } from "mongoose";
import { upload } from "../config/coludy.js";
import { v2 as cloudinary } from 'cloudinary';
import Product from "../models/product.model.js";

export const shortProducts = async (req, res) => {
	const { brand, color, minPrice, maxPrice, type, sort } = req.query;
	try{
		let filter = {};
		if (color) filter.color = color;
		if (type) filter.type = type;
		if (brand) filter.brand = brand;
		if (minPrice || maxPrice) {
			filter.price = {};
			if (minPrice) filter.price.$gte = Number(minPrice);
			if (maxPrice) filter.price.$lte = Number(maxPrice);
		}
		const sortOptions = {
			price_asc: { price: 1 },
			price_desc: { price: -1 },
			newest: { createdAt: -1 }
		};
		const sortOrder = sortOptions[sort] || {};
		const products = await Product.find(filter).sort(sortOrder);
		res.json(products);
	} catch (error) {res.status(500).json({success:false, message: `Failed to fetch products:${error.message}`})}
};
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        });
		
        res.json(results);
    } catch (error) {res.status(500).json({ error: "Server error" })}
}
export const getProducts = async (req,res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {res.status(500).json({ success: false, message: `Server Error:${error.message}` })}
};
export const getShadesProduct = async (req, res) => {
	const shades = await Product.find({ type: 'shades' });
	res.json(shades);
	
};
export const getSpecsProduct = async (req, res) => {
	const specs = await Product.find({ type: 'specs' });
	res.json(specs);
};
export const getRelatedProducts = async (req, res) => {
	const { id } = req.params;
	try {
		const currentProduct = await Product.findById(id);
		if (!currentProduct) return res.status(404).json({ success: false, message: "Product not found" });
		const related = await Product.find({
			_id: { $ne: id },
			type: currentProduct.type,
			forThem: currentProduct.forThem,
		}).limit(6);
		res.json(related);
	  
	} catch (error) {res.status(500).json({ success: false, message: `Failed to fetch related products ${error.message}`})}
};  
export const getSingleProduct = async (req,res) => {
	const {id} = req.params;
	if (!isValidObjectId(id)) {return  res.status(400).json({ success: false, error: "Invalid item ID format" })}
	try {
		const products = await Product.findById(id);
		res.status(200).json({ success: true, data: products });
	} catch (error) {res.status(500).json({ success: false, message: `Server Error${error.message}` })}
};
export const updateImage = [upload.array('imageURL', 20), async (req,res) => {
	const {id} = req.params;	
	const urls = req.files.map(file => file.path);
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{ $push: { imagesURl : { $each : urls }  } },
			{ new: true }
		);
		if (!updatedProduct) return res.status(404).json({ success: false ,message: 'Error updating image.',});
		res.status(200).json({ success: true,product:updatedProduct, message: 'Image added successfully' });
	} catch (error) {res.status(500).json({ success: false, message:error.message })}
}];
export const createProducts = [upload.array('imageURL', 20), async (req,res) => {
	const {name,price,brand,model,color,size,forThem,stock,type,description} = req.body;
	if (!name||!price||!brand||!model||!color||!forThem||!size||!stock||!description||!type||req.files.length===0) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}
	const existingProduct = await Product.findOne({ name: name.trim() });
      if (existingProduct) {
        return res.status(409).json({ success: false, message: "Product name already exists" });
	}
	try {
		const imageUrls = req.files.map(file => file.path);
		const newProduct = new Product({name,price,brand,model,color,size,stock,forThem,type,description,imagesURl:imageUrls});
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {res.status(500).json({ success: false, message: `Server Error ${error}` })}
}]
export const updateProducts = async (req,res) => {
	const { id } = req.params;
	const product = req.body;
	if (!isValidObjectId(id)) return res.status(404).json({ success: false, message: "Invalid Product Id" });
	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		if(updatedProduct) return res.status(200).json({ success: true, message: "Product updated.",data:updatedProduct })
		res.status(200).json({ success: false, message: "Error updating Product!" })
	} catch (error) { res.status(500).json({ success: false, message: `Server Error:${error.message}`})}
}
export const deleteProducts = async (req,res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) return res.status(404).json({ success: false, message: "Invalid Product Id" });
	try {
		const data = await Product.findById(id);
		if(!data) return res.status(400).json({ success: false , message: "Product not found." })
		if (data.imagesURl && data.imagesURl.length > 0) {
			await Promise.all(
				data.imagesURl.map(async (path) => {
					const publicID = path.split('/').pop().split('.')[0];
					return cloudinary.uploader.destroy(publicID);
				})
			)
		}
		const resdata = await Product.findByIdAndDelete(id);
		if(resdata) return res.status(200).json({ success: true, message: "Product deleted" })
		res.status(200).json({ success: false, message: "Error deleting Product!" })
	} catch (error) {res.status(500).json({ success: false, message: "Server Error" })}
}

export const deleteImage = async (req, res) => {
	const { id, url } = req.body;
	if(!isValidObjectId(id)) return res.status(400).json({ error: "Invalid item ID format" }); 
	try {
		const product = await Product.findById(id);
		if (!product) return res.status(400).json({ success: false, error: 'Error finding product.' });
		if (!product.imagesURl.includes(url)) return res.status(400).json({ success: false, error: "error removing image." });
		const publicId = url.split('/').pop().split('.')[0];
		await cloudinary.uploader.destroy(publicId);
		const updatedProduct = await Product.findByIdAndUpdate(
			{ _id:id },
			{ $pull: { imagesURl: url } },
			{ new: true }
		);
		res.json({ success: true,data:updatedProduct, message:`Image removed successfully.`});
	} catch (error) {res.json({ success: false, message:`Error removing image: ${error.message}`})}
};