import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loaded from "../components/loaded";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setStatus("loading");
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.id)
            .then((response) => {
                if (!response.data) {
                    toast.error("Product not found");
                    setStatus("error");
                    return;
                }
                console.log("Product data received:", response.data);
                setProduct(response.data);
                setStatus("success");
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                toast.error("Error fetching product details");
                setStatus("error");
            });
    }, [params.id]);

    const handleAddToCart = () => {
        const result = addToCart(product, quantity);
        if (result.action === "updated") {
            toast.success(`The item "${product.name}" count has been updated to ${result.count}`);
        } else {
            toast.success("Added to cart!");
        }
    };

    if (status === "loading") {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] bg-black flex items-center justify-center">
                <Loaded />
            </div>
        );
    }

    if (status === "error" || !product) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] bg-black flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-headings font-bold text-gray-500 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 text-sm sm:text-base">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const handleBuyNow = () => {
        if (product.stock > 0) {
            navigate("/checkout", {
                state: {
                    items: [{ ...product, quantity: quantity }],
                    total: product.price * quantity
                }
            });
        }
    };

    const discount = product.labelledPrice > product.price
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <div className="w-full min-h-screen bg-black overflow-x-hidden">
            <div className="fixed top-0 left-0 w-full h-[500px] pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[10%] sm:left-[20%] w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary-900/20 rounded-full blur-[80px] sm:blur-[120px]"></div>
                <div className="absolute top-[10%] right-[5%] sm:right-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-primary-600/10 rounded-full blur-[60px] sm:blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full border-b border-white/5 backdrop-blur-sm">
                <div className="max-w-[1200px] mx-auto px-6 py-4 overflow-x-auto">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium whitespace-nowrap">
                        <a href="/products" className="text-gray-500 hover:text-white transition-colors">Products</a>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-primary-400">{product.category}</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-8 sm:py-12">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="block lg:hidden mb-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-bold uppercase tracking-widest">
                            {product.brand || "Premium"}
                        </span>
                        {product.stock > 0 ? (
                            <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock
                            </span>
                        ) : (
                            <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-headings text-white leading-tight">
                        {product.name}
                    </h1>
                    {product.altName && (
                        <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1 uppercase tracking-wide">
                            {Array.isArray(product.altName) ? product.altName.join(" • ") : product.altName}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    <div className="lg:col-span-6">
                        <div className="lg:sticky lg:top-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-surface border border-white/10 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>

                            <div className="relative z-0 p-4 sm:p-6 flex items-center justify-center bg-[#050505] w-full min-h-[300px] sm:min-h-[400px] lg:h-[500px]">
                                <div className="w-full h-full relative z-20 transform transition-transform duration-700 group-hover:scale-105">
                                    <ImageSlider images={product.images} />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-500/10 rounded-full blur-[40px] sm:blur-[60px] opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            {discount > 0 && (
                                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-30 bg-white/10 backdrop-blur-md border border-white/20 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-2">
                                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                                    <span className="font-bold text-[9px] sm:text-xs tracking-wide">{discount}% SAVE</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <div className="mb-6">
                            {/* Desktop Header (Hidden on mobile) */}
                            <div className="hidden lg:block">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                                    <span className="px-2.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-bold uppercase tracking-widest">
                                        {product.brand || "Premium"}
                                    </span>
                                    {product.stock > 0 ? (
                                        <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock
                                        </span>
                                    ) : (
                                        <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headings text-white mb-2 leading-tight">
                                    {product.name}
                                </h1>
                                {product.altName && (
                                    <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
                                        {Array.isArray(product.altName) ? product.altName.join(" • ") : product.altName}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-wrap items-end gap-3 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] sm:text-xs text-gray-500 mb-0.5 font-medium tracking-wide">Price</span>
                                    <span className="text-3xl sm:text-4xl font-bold font-headings text-white tracking-tight">
                                        LKR {Number(product.price).toLocaleString()}
                                    </span>
                                </div>
                                {product.labelledPrice > product.price && (
                                    <div className="flex flex-col mb-1.5 font-mono">
                                        <span className="text-xs sm:text-sm text-red-400 line-through font-medium opacity-60">
                                            LKR {Number(product.labelledPrice).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light border-l-2 border-primary-500/30 pl-4">
                                {product.description}
                            </p>
                        </div>

                        <div className="bg-surface border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 shadow-xl">
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</span>
                                <div className="flex items-center bg-black rounded-lg border border-white/10 p-0.5">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center font-bold text-white text-sm">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className="w-full py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group text-xs uppercase tracking-widest"
                                >
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock <= 0}
                                    className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 hover:shadow-glow transition-all duration-300 shadow-lg text-xs uppercase tracking-widest disabled:opacity-50 disabled:grayscale"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <div className="bg-surface/50 border border-white/5 p-3 rounded-xl">
                                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Model</span>
                                <span className="text-white font-medium text-xs sm:text-sm truncate block">{product.model || "N/A"}</span>
                            </div>
                            <div className="bg-surface/50 border border-white/5 p-3 rounded-xl">
                                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Product ID</span>
                                <span className="text-white font-mono text-[10px] sm:text-xs truncate block">{product.productID}</span>
                            </div>
                            {(product.altName) && (
                                <div className="bg-surface/50 border border-white/5 p-3 rounded-xl col-span-2">
                                    <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Known As</span>
                                    <span className="text-primary-400 font-medium text-[10px] sm:text-xs truncate block uppercase tracking-wide">
                                        {Array.isArray(product.altName) ? product.altName.join(", ") : product.altName}
                                    </span>
                                </div>
                            )}
                            <div className="bg-surface/50 border border-white/5 p-3 rounded-xl">
                                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Availability</span>
                                <span className="text-white font-medium text-xs sm:text-sm">{product.stock} Units</span>
                            </div>
                            <div className="bg-surface/50 border border-white/5 p-3 rounded-xl">
                                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-wider block mb-0.5">Shipping</span>
                                <span className="text-green-400 font-medium text-[10px] sm:text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Free Shipping
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 sm:mt-20 border-t border-white/5 pt-8 sm:pt-12">
                    <h2 className="text-xl sm:text-2xl font-bold font-headings text-white mb-6 sm:mb-8 flex items-center gap-3">
                        <span className="w-6 sm:w-8 h-1 bg-primary-500 rounded-full"></span>
                        Technical Specifications
                    </h2>

                    <div className="bg-surface rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 font-medium">
                            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Manufacturer</span>
                                    <span className="text-white text-right ml-4 font-bold">{product.brand || "Generic"}</span>
                                </div>
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Model Name</span>
                                    <span className="text-white text-right ml-4 font-bold">{product.model || "Standard Edition"}</span>
                                </div>
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Category Group</span>
                                    <span className="text-white text-right ml-4 font-bold">{product.category}</span>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Stock Status</span>
                                    <span className={`font-bold text-right ml-4 ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                                        {product.stock > 0 ? "Instantly Available" : "Unavailable"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Condition</span>
                                    <span className="text-white text-right ml-4 font-bold">Brand New</span>
                                </div>
                                <div className="flex justify-between items-center group text-sm sm:text-base">
                                    <span className="text-gray-500 group-hover:text-primary-400 transition-colors">Warranty</span>
                                    <span className="text-white text-right ml-4 font-bold">1 Year Standard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}