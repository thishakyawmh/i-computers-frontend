import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loaded from "../components/loaded";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { MdOutlineStar, MdStarBorder } from "react-icons/md";

export default function ProductOverview() {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const fetchReviews = () => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/reviews/product/" + params.id)
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error fetching reviews:", err));
    };

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
                setProduct(response.data);
                setStatus("success");
                fetchReviews();
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                toast.error("Error fetching product details");
                setStatus("error");
            });
    }, [params.id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to leave a review");
            return;
        }

        try {
            setReviewLoading(true);
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/reviews", {
                productId: product.productID,
                productName: product.name,
                rating,
                comment
            }, {
                headers: { Authorization: "Bearer " + token }
            });
            toast.success("Review submitted!");
            setComment("");
            setRating(5);
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error(error.response?.data?.message || "Failed to submit review");
        } finally {
            setReviewLoading(false);
        }
    };

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

                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
                    <div className="bg-surface/50 border border-white/5 p-5 rounded-2xl shadow-lg">
                        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider block mb-1 font-bold">Model</span>
                        <span className="text-white font-bold text-sm sm:text-lg truncate block">{product.model || "N/A"}</span>
                    </div>
                    <div className="bg-surface/50 border border-white/5 p-5 rounded-2xl shadow-lg">
                        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider block mb-1 font-bold">Product ID</span>
                        <span className="text-white font-mono text-sm sm:text-lg truncate block">{product.productID}</span>
                    </div>
                    <div className="bg-surface/50 border border-white/5 p-5 rounded-2xl shadow-lg">
                        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider block mb-1 font-bold">Availability</span>
                        <span className="text-white font-bold text-sm sm:text-lg">{product.stock} Units</span>
                    </div>
                    <div className="bg-surface/50 border border-white/5 p-5 rounded-2xl shadow-lg">
                        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider block mb-1 font-bold">Shipping Status</span>
                        <span className="text-green-400 font-bold text-sm sm:text-lg flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Free Shipping
                        </span>
                    </div>
                </div>


                <div className="mt-12 sm:mt-20 border-t border-white/5 pt-12 sm:pt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5">
                            <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-6">Customer Reviews</h2>

                            {localStorage.getItem("token") ? (
                                <form onSubmit={handleReviewSubmit} className="bg-surface border border-white/10 p-6 rounded-3xl shadow-xl">
                                    <h3 className="text-white font-bold mb-4">Leave a Review</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className="text-2xl transition-transform hover:scale-110"
                                            >
                                                {star <= rating ? (
                                                    <MdOutlineStar className="text-amber-500" />
                                                ) : (
                                                    <MdStarBorder className="text-gray-600" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Share your experience with this product..."
                                        required
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-primary-500/50 transition-colors resize-none mb-4 min-h-[120px]"
                                    ></textarea>
                                    <button
                                        disabled={reviewLoading}
                                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all shadow-glow uppercase tracking-widest text-xs disabled:opacity-50"
                                    >
                                        {reviewLoading ? "Submitting..." : "Submit Review"}
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-white/5 border border-white/5 p-8 rounded-3xl text-center">
                                    <p className="text-gray-400 mb-6">Want to share your thoughts? Log in to leave a review.</p>
                                    <Link to="/login" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-primary-500 hover:text-white transition-all text-sm uppercase tracking-widest">
                                        Login Now
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-7">
                            <div className="space-y-6">
                                {reviews.length === 0 ? (
                                    <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 opacity-30">
                                            <MdOutlineStar className="text-2xl text-white" />
                                        </div>
                                        <p className="text-gray-500 italic">No reviews yet for this product. Be the first!</p>
                                    </div>
                                ) : (
                                    reviews.map((r) => (
                                        <div key={r._id} className="bg-surface/50 border border-white/5 p-6 rounded-2xl transition-all hover:border-white/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary-600/20 rounded-full flex items-center justify-center font-bold text-primary-400 uppercase">
                                                        {r.username?.charAt(0) || "A"}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-bold text-sm">{r.username || "Anonymous User"}</h4>
                                                        <div className="flex text-amber-500 gap-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                i < r.rating ? <MdOutlineStar key={i} className="text-xs" /> : <MdStarBorder key={i} className="text-xs text-gray-700" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">
                                                    {new Date(r.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-400 text-sm leading-relaxed">"{r.comment}"</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}