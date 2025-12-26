import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loaded from "../components/loaded";
import ImageSlider from "../components/imageSlider";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        setStatus("loading");
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.id)
            .then((response) => {
                console.log("Product fetched:", response.data);
                if (!response.data) {
                    toast.error("Product not found");
                    setStatus("error");
                    return;
                }
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                toast.error("Error fetching product details");
                setStatus("error");
            });
    }, [params.id]);

    if (status === "loading") {
        return (
            <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
                <Loaded />
            </div>
        );
    }

    if (status === "error" || !product) {
        return (
            <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-500">Product Not Found</h1>
            </div>
        );
    }

    const discount = product.labelledPrice > product.price
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-white flex justify-center py-10">
            <div className="w-full max-w-7xl px-4 md:px-8 lg:px-12 flex flex-col md:flex-row gap-10">

                <div className="w-full md:w-1/2 flex flex-col gap-4 relative">
                    <ImageSlider images={product.images} />
                    {discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10 pointer-events-none">
                            {discount}% OFF
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-start gap-4">
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-widest bg-gray-100 w-fit px-3 py-1 rounded-full">
                        {product.category || "General"}
                    </span>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mt-2">
                        {product.labelledPrice > product.price && (
                            <span className="text-xl text-gray-400 line-through font-medium">
                                LKR {Number(product.labelledPrice).toFixed(2)}
                            </span>
                        )}
                        <span className="text-3xl text-green-600 font-extrabold">
                            LKR {Number(product.price).toFixed(2)}
                        </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg mt-2">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-2 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">Brand:</span>
                            <span>{product.brand || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">Model:</span>
                            <span>{product.model || "N/A"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">Available Quantity:</span>
                            <span>{product.stock > 0 ? product.stock : "0"}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span className="font-semibold">Stock Status:</span>
                            <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button className="flex-1 bg-gray-100 text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors text-lg">
                            Add to Cart
                        </button>
                        <button className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition-colors text-lg shadow-lg shadow-green-200">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}