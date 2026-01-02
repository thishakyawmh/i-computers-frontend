import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdOutlineStar } from "react-icons/md";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/reviews", {
                headers: { Authorization: "Bearer " + token }
            });
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDeleteReview = async (id) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/reviews/" + id, {
                headers: { Authorization: "Bearer " + token }
            });
            toast.success("Review deleted successfully");
            fetchReviews();
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("Failed to delete review");
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-2">Review Management</h1>
                    <p className="text-gray-500 text-sm">Monitor and manage customer feedback for your products.</p>
                </div>
                <div className="bg-surface border border-white/10 px-4 py-2 rounded-xl text-primary-400 font-bold text-sm">
                    Total Reviews: {reviews.length}
                </div>
            </div>

            <div className="bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Rating</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Review</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                            <span className="text-gray-500 font-medium">Loading reviews...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : reviews.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500 font-medium italic">
                                        No reviews found yet.
                                    </td>
                                </tr>
                            ) : (
                                reviews.map((review) => (
                                    <tr key={review._id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-sm">{review.username || "Anonymous"}</span>
                                                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-tight">{new Date(review.date).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-gray-300 text-sm font-medium line-clamp-1 max-w-[200px]">{review.productName || "Unknown Product"}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <span className="text-sm font-bold">{review.rating}</span>
                                                <MdOutlineStar className="text-lg" />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-400 text-sm italic line-clamp-2 max-w-[300px]">"{review.comment}"</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                title="Delete Review"
                                            >
                                                <MdDeleteOutline className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
