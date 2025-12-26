import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import uploadFile from "../../utils/mediaUpload";

export default function AdminUpdateProductPage() {
    const location = useLocation();
    const [productID, setProductID] = useState(location.state?.productID || "");
    const [name, setName] = useState(location.state?.name || "");
    const [altnames, setAltNames] = useState(location.state?.altnames ? (Array.isArray(location.state.altnames) ? location.state.altnames.join(",") : location.state.altnames) : "");
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
        return <div className="p-10 text-white">No product selected</div>
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
                const uploadPromises = Array.from(files).map(file => uploadFile(file));
                const newUrls = await Promise.all(uploadPromises);
                allImageUrls = newUrls
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
        <div className="w-full flex justify-center pb-20">
            <div className="w-full max-w-[900px]">
                <h1 className="text-3xl font-bold font-headings text-white mb-8 flex items-center gap-3">
                    <span className="w-12 h-12 bg-primary-600/20 text-primary-500 rounded-xl flex items-center justify-center border border-primary-500/20">
                        <AiOutlineProduct className="text-2xl" />
                    </span>
                    Update Product
                </h1>

                <div className="bg-surface border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Product ID</label>
                            <input
                                disabled
                                type="text"
                                value={productID}
                                placeholder="Product ID"
                                className="w-full h-12 rounded-xl bg-white/5 border border-white/5 text-gray-500 px-4 cursor-not-allowed"
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. MacBook Pro M3"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Alternative Names</label>
                            <input
                                type="text"
                                value={altnames}
                                onChange={(e) => setAltNames(e.target.value)}
                                placeholder="Comma separated"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detailed product description..."
                                className="w-full h-32 rounded-xl bg-black/50 border border-white/10 text-white p-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600 resize-none"
                            ></textarea>
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Price (LKR)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Labelled Price (LKR)</label>
                            <input
                                type="number"
                                value={labelledPrice}
                                onChange={(e) => setLabelledPrice(e.target.value)}
                                placeholder="0.00"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Images</label>

                            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                                {(files.length > 0 ? Array.from(files).map((f, i) => URL.createObjectURL(f)) : (location.state?.images || [])).map((src, i) => (
                                    <div key={i} className="w-20 h-20 rounded-lg border border-white/10 overflow-hidden flex-shrink-0 relative group">
                                        <img src={src} className="w-full h-full object-cover" alt="" />
                                    </div>
                                ))}
                            </div>

                            <input
                                type="file"
                                multiple
                                onChange={(e) => setFiles(e.target.files)}
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-gray-400 file:mr-4 file:h-full file:border-0 file:bg-white/10 file:text-white file:px-4 file:font-semibold hover:file:bg-white/20 transition-all cursor-pointer"
                            />
                            <p className="text-xs text-gray-500 mt-2">* Uploading new images will replace existing ones.</p>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none appearance-none"
                            >
                                <option value="" className="bg-black">Select Category</option>
                                <option value="CPU" className="bg-black">CPU</option>
                                <option value="Graphic Cards" className="bg-black">Graphic Cards</option>
                                <option value="Computer Cases" className="bg-black">Computer Cases</option>
                                <option value="Cooling Solutions" className="bg-black">Cooling Solutions</option>
                                <option value="Laptops" className="bg-black">Laptops</option>
                                <option value="Monitors" className="bg-black">Monitors</option>
                                <option value="Motherboard" className="bg-black">Motherboard</option>
                                <option value="Power Supply Unit" className="bg-black">Power Supply Unit</option>
                                <option value="RAM" className="bg-black">RAM</option>
                                <option value="Storage Devices" className="bg-black">Storage Devices</option>
                                <option value="Others" className="bg-black">Others</option>
                            </select>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Brand</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Brand"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Model</label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Model"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Stock Quantity</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="0"
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none placeholder:text-gray-600"
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3 mb-6">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Availability</label>
                            <select
                                value={isAvailable ? "true" : "false"}
                                onChange={(e) => setIsAvailable(e.target.value === "true")}
                                className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all outline-none appearance-none"
                            >
                                <option value="true" className="bg-black">Available</option>
                                <option value="false" className="bg-black">Not Available</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
                        <Link
                            to="/admin/products"
                            className="w-1/2 h-12 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500/20 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            onClick={updateProduct}
                            className="w-1/2 h-12 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/30 hover:shadow-glow transition-all duration-300"
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
