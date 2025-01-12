import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files?.image1?.[0];
    const image2 = req.files.image2 && req.files?.image2?.[0];
    const image3 = req.files.image3 && req.files?.image3?.[0];
    const image4 = req.files.image4 && req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesURL,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for listing products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for removing a product
const removeProduct = async (req, res) => {
  try {
    if (!req.body.id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }
    const deletedProduct = await productModel.findByIdAndDelete(req.body.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for getting single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body; 
    if (!productId) {
      return res.json({ success: false, message: "Product ID is required." });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found." });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export { listProduct, addProduct, removeProduct, singleProduct };
