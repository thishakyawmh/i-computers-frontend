import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";


export default function AdminAddProductsPage(){

    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altnames, setAltNames] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [images, setImages] = useState([]);   
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();

    async function addProduct(){
        const token = localStorage.getItem("token");
        if(token==null){
            toast.error("You must be logged in as an admin to add products.");
            navigate("/admin/login");
            return;
        }
        if (productID === "" || name === "" || description === "" || price === "" || category === "" || brand === "" || model === "" || stock === "") {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const altNamesInArray = altnames.split(",");
            const imagesInArray = images.split(",");
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/products/", {
                productID : productID,
                name : name,
                altnames : altNamesInArray,
                description : description,
                price : price,
                labelledPrice : labelledPrice,
                images : imagesInArray,
                category : category,
                brand : brand,
                model : model,
                stock : stock,
                isAvailable : isAvailable,
            }, {
                headers: {
                    Authorization: "Bearer " + token
               } 
            })
            toast.success("Product added successfully!");
            navigate("/admin/products");
            
        } catch (error) {
            toast.error("Error adding product. Please try again.");
            console.error("Error adding product:", error);
        }
    }
    
    return(
        <div className="w-full h-full flex justify-center overflow-y-scroll p-[50px] items-start">
            <div className="w-[800px] bg-[#007bff1c] rounded-2xl p-[40px]" >
                <h1 className="text-2xl font-bold mb-[30px] text-black flex items-center gap-[8px]"><AiOutlineProduct />Add New Product</h1>

                <div className="w-full bg-white p-5 rounded-lg shadow-sm flex flex-wrap justify-between">
                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product ID</label>
                        <input
                            type="text"
                            value={productID}
                            onChange={(e)=>{setProductID(e.target.value)}}
                            placeholder="Provide Unique Product ID"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            placeholder="Laptop XYZ"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[20px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Names</label>
                        <input
                            type="text"
                            value={altnames}
                            onChange={(e)=>{setAltNames(e.target.value)}}
                            placeholder="Alternate names separated by commas"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e)=>{setDescription(e.target.value)}}
                            placeholder="Detailed product description"
                            className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                        ></textarea>    
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (LKR)</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                            placeholder="e.g. 999.99"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Labelled Price (LKR)</label>
                        <input
                            type="number"
                            value={labelledPrice}
                            onChange={(e)=>{setLabelledPrice(e.target.value)}}
                            placeholder="e.g. 1299.99"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                        <input
                            type="text"
                            value={images}
                            onChange={(e)=>{setImages(e.target.value)}}
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[30%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200">
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e)=>{setBrand(e.target.value)}}
                            placeholder="e.g. Apple"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[30%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e)=>{setModel(e.target.value)}}
                            placeholder="e.g. MacBook Pro 2023"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e)=>{setStock(e.target.value)}}
                            placeholder="e.g. 50"
                            className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <div className="my-[15px] w-[48%]">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Availablity</label>
                        <select checked={isAvailable} onChange={(e)=>{setIsAvailable(e.target.checked)}} className="w-full h-10 rounded-lg border border-gray-200 px-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200">
                            <option value={true}>Available</option>
                            <option value={false}>Not Available</option>
                        </select>
                    </div>  

                    <Link to="/admin/products" className="mt-[30px] w-[48%] h-12 bg-red-500 text-white font-bold rounded-lg hover-bg-red-900 transition-colors flex items-center justify-center">Cancel</Link>
                    <button onClick={addProduct} className="mt-[30px] w-[48%] h-12 bg-accent btn-accent text-white font-bold rounded-lg hover-bg-accent-dark transition-colors flex items-center justify-center">Add Product</button>



                </div>

            </div>
        </div>
    );
}