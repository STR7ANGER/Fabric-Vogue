import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "./../App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubcategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleSizeToggle = (size) => {
    setSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      }
      return [...prev, size];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg"
    >
      <div className="mb-8">
        <p className="text-lg font-semibold text-gray-800 mb-4">Upload Image</p>
        <div className="flex gap-4 flex-wrap">
          <label
            htmlFor="image1"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
              accept="image/*"
            />
          </label>
          <label
            htmlFor="image2"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
              accept="image/*"
            />
          </label>
          <label
            htmlFor="image3"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
              accept="image/*"
            />
          </label>
          <label
            htmlFor="image4"
            className="hover:opacity-75 transition-opacity"
          >
            <img
              className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-gray-300"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
              accept="image/*"
            />
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">Product Name</p>
        <input
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Product Description
        </p>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type Here"
          rows="4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Product Category
          </p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Sub Category
          </p>
          <select
            onChange={(e) => setSubcategory(e.target.value)}
            value={subCategory}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Product Price
          </p>
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            placeholder="$xxxx"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Product Sizes
        </p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                sizes.includes(size)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handleSizeToggle(size)}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
          className="w-4 h-4 text-blue-600"
        />
        <label className="cursor-pointer text-gray-700" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
