import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import uploadFile from "../../utils/mediaUpload";
import { useLocation } from "react-router-dom";

export default function AdminUpdateProductPage() {
    const location = useLocation();
    const [productID, setProductID] = useState(location.state?.productID || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altnames, setAltNames] = useState(location.state?.altnames?.join(",") || "");
    const [description, setDescription] = useState(location.state?.description || "");
    const [price, setPrice] = useState(location.state?.price || "");
    const [labelledPrice, setLabelledPrice] = useState(location.state?.labelledPrice || "");
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState(location.state?.category || "");
    const [brand, setBrand] = useState(location.state?.brand || "");
    const [model, setModel] = useState(location.state?.model || "");
    const [stock, setStock] = useState(location.state?.stock || "");
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable || false);
    const navigate = useNavigate();
    if (!location.state) {
        toast.error("No product data found. Please navigate from the products page.");
        return;
    }

    async function updateProduct() {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You must be logged in as an admin to update products.");
            navigate("/admin/login");
            return;
        }

        try {
            let allImageUrls = [];

            if (files.length === 0) {
                allImageUrls = location.state?.images || [];
            } else {
                const uploadPromises = files.map(file => uploadFile(file));
                allImageUrls = await Promise.all(uploadPromises);
            }

            const altNamesArray = typeof altnames === 'string' ? altnames.split(",") : altnames;

            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/products/" + productID,
                {
                    productID: productID,
                    name: name,
                    altnames: altNamesArray,
                    description: description,
                    price: price,
                    labelledPrice: labelledPrice,
                    images: allImageUrls,
                    category: category,
                    brand: brand,
                    model: model,
                    stock: stock,
                    isAvailable: isAvailable,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            toast.success("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            toast.error("Error updating product. Please try again.");
            console.error("Error updating product:", error);
        }
    }

    return (
        <div className="w-full h-full flex justify-center overflow-y-scroll p-[50px] items-start">
            <div className="w-[800px] bg-[#007bff1c] rounded-2xl p-[40px]">
                <h1 className="text-2xl font-bold mb-[30px] text-black flex items-center gap-[8px]">
                    <AiOutlineProduct />
                    Update Product
                </h1>

                <div className="w-full bg-white p-5 rounded-lg shadow-sm flex flex-wrap justify-between">
                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product ID
                        </label>
                        <input
                            disabled
                            type="text"
                            value={productID}
                            onChange={(e) => {
                                setProductID(e.target.value);
                            }}
                            placeholder="Provide Unique Product ID"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            placeholder="Laptop XYZ"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[20px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alternative Names
                        </label>
                        <input
                            type="text"
                            value={altnames}
                            onChange={(e) => {
                                setAltNames(e.target.value);
                            }}
                            placeholder="Alternate names separated by commas"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            placeholder="Detailed product description"
                            className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                        ></textarea>
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price (LKR)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            placeholder="e.g. 999.99"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Labelled Price (LKR)
                        </label>
                        <input
                            type="number"
                            value={labelledPrice}
                            onChange={(e) => {
                                setLabelledPrice(e.target.value);
                            }}
                            placeholder="e.g. 1299.99"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Images
                        </label>
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {files.map((file, index) => (
                                typeof file === 'string' &&
                                <img key={index} src={file} alt="preview" className="w-20 h-20 object-cover rounded border border-gray-200" />
                            ))}
                        </div>
                        <input
                            type="file"
                            multiple={true}
                            onChange={(e) => {
                                // Add new files to existing state
                                const newFiles = Array.from(e.target.files);
                                setFiles([...files, ...newFiles]);
                            }}
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[30%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="">Select Category</option>
                            <option value="CPU">CPU</option>
                            <option value="Graphic Cards">Graphic Cards</option>
                            <option value="Computer Cases">Computer Cases</option>
                            <option value="Cooling Solutions">Cooling Solutions</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Motherboard">Motherboard</option>
                            <option value="Power Supply Unit">Power Supply Unit</option>
                            <option value="RAM">RAM</option>
                            <option value="Storage Devices">Storage Devices</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    <div className="my-[15px] w-[30%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand
                        </label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                            placeholder="e.g. Apple"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[30%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Model
                        </label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => {
                                setModel(e.target.value);
                            }}
                            placeholder="e.g. MacBook Pro 2023"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => {
                                setStock(e.target.value);
                            }}
                            placeholder="e.g. 50"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Availablity
                        </label>
                        <select
                            value={isAvailable ? "true" : "false"}
                            onChange={(e) => {
                                setIsAvailable(e.target.value === "true");
                            }}
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>

                    <Link
                        to="/admin/products"
                        className="mt-[30px] w-[48%] h-12 bg-red-500 text-white font-bold rounded-lg hover-bg-red-900 transition-colors flex items-center justify-center"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={updateProduct}
                        className="mt-[30px] w-[48%] h-12 bg-accent btn-accent text-white font-bold rounded-lg hover-bg-accent-dark transition-colors flex items-center justify-center"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}


