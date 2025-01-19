import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import { use } from "react";

const Add = () => {

  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)

  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [price, setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [subCategory, setSubcategory] = useState("");
  const [bestseller,setBestseller] = useState(false);
  const [sizes,setSizes] = useState([]);
  

  return (
    <form className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-800 mb-4">Upload Image</p>
        <div className="flex gap-4 flex-wrap">
          <label htmlFor="image1" className="hover:opacity-75 transition-opacity">
            <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300" src={assets.upload_area} alt="" />
            <input type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2" className="hover:opacity-75 transition-opacity">
            <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300" src={assets.upload_area} alt="" />
            <input type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3" className="hover:opacity-75 transition-opacity">
            <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300" src={assets.upload_area} alt="" />
            <input type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4" className="hover:opacity-75 transition-opacity">
            <img className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300" src={assets.upload_area} alt="" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">Product Name</p>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Product Name"
          required
        />
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">Product Description</p>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type Here"
          rows="4"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">Product Category</p>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">Sub Category</p>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">Product Price</p>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            placeholder="$xxxx"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size} className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input type="checkbox" id="bestseller" className="w-4 h-4 text-blue-600"/>
        <label className="cursor-pointer text-gray-700" htmlFor="bestseller">Add to Bestseller</label>
      </div>

      <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg ">ADD</button>
    </form>
  );
};

export default Add;