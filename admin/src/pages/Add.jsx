import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "./../App";
import { toast } from "react-toastify";

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
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setCategory("Men");
        setSubcategory("Topwear");
        setBestseller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative mt-20 mb-20 mx-4 md:mx-8 ">
      {/* Background decorative elements */}
      <div className="absolute -right-16 top-1/4 w-80 h-80 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-16 bottom-1/4 w-80 h-80 bg-gradient-to-tl from-indigo-600/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute left-1/3 top-0 w-64 h-64 bg-gradient-to-b from-fuchsia-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto backdrop-blur-sm rounded-xl border border-purple-900/20 shadow-xl shadow-purple-900/10 p-8 relative"
      >
        {/* Form background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-slate-900/90 to-purple-900/90 rounded-xl -z-10"></div>

        {/* Form title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
            Add New Product
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="mb-8">
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-4">
            Upload Images
          </p>
          <div className="flex gap-4 flex-wrap">
            <label
              htmlFor="image1"
              className="hover:opacity-75 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-purple-500/30 relative z-10"
                  src={
                    !image1 ? assets.upload_area : URL.createObjectURL(image1)
                  }
                  alt=""
                />
              </div>
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
              className="hover:opacity-75 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-purple-500/30 relative z-10"
                  src={
                    !image2 ? assets.upload_area : URL.createObjectURL(image2)
                  }
                  alt=""
                />
              </div>
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
              className="hover:opacity-75 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-purple-500/30 relative z-10"
                  src={
                    !image3 ? assets.upload_area : URL.createObjectURL(image3)
                  }
                  alt=""
                />
              </div>
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
              className="hover:opacity-75 transition-opacity group"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  className="w-24 h-24 object-cover rounded-lg border-2 border-dashed border-purple-500/30 relative z-10"
                  src={
                    !image4 ? assets.upload_area : URL.createObjectURL(image4)
                  }
                  alt=""
                />
              </div>
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
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
            Product Name
          </p>
          <input
            className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
            type="text"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="mb-6">
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
            Product Description
          </p>
          <textarea
            className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
            placeholder="Type Here"
            rows="4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
              Product Category
            </p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
              Sub Category
            </p>
            <select
              onChange={(e) => setSubcategory(e.target.value)}
              value={subCategory}
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
              <option value="Footwear">Footwear</option>
              <option value="Headwear">Headwear</option>
            </select>
          </div>

          <div>
            <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-2">
              Product Price
            </p>
            <input
              className="w-full px-4 py-3 bg-gray-800/50 border border-purple-900/30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
              type="number"
              placeholder="$xxxx"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 mb-3">
            Product Sizes
          </p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  sizes.includes(size)
                    ? "bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 text-white shadow-lg shadow-purple-900/20"
                    : "bg-gray-800/30 border border-purple-900/30 text-gray-300 hover:bg-gray-800/50"
                }`}
                onClick={() => handleSizeToggle(size)}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <input
              type="checkbox"
              id="bestseller"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="w-5 h-5 opacity-0 absolute"
            />
            <div
              className={`w-5 h-5 border rounded flex items-center justify-center ${
                bestseller
                  ? "bg-gradient-to-r from-violet-700 via-fuchsia-700 to-indigo-700 border-transparent"
                  : "border-purple-500/50 bg-gray-800/30"
              }`}
            >
              {bestseller && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
          <label className="cursor-pointer text-gray-300" htmlFor="bestseller">
            Add to Bestseller
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-violet-800 via-fuchsia-800 to-indigo-800 text-white rounded-lg font-medium tracking-wide shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 hover:-translate-y-1"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default Add;
