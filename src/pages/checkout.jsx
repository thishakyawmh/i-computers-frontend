import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

export default function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        phone: "",
        notes: ""
    });

    useEffect(() => {
        const items = getCart();
        if (items.length === 0) {
            toast.error("Your cart is empty");
            navigate("/products");
            return;
        }
        setCart(items);
        setTotal(items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = () => {
        if (!formData.firstName || !formData.address || !formData.phone) {
            return toast.error("Please fill in all required fields");
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place an order");
            return navigate("/login");
        }

        setIsSubmitting(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", {
            items: cart.map(item => ({ productID: item.productID, quantity: item.quantity })),
            address: formData.city ? `${formData.address}, ${formData.city}` : formData.address,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            notes: formData.notes || ""
        },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                toast.success(response.data.message || "Order placed successfully!");
                localStorage.removeItem("cart");
                window.dispatchEvent(new Event("cartUpdated"));
                navigate("/products");
            })
            .catch(error => {
                console.error("Order error:", error);
                const msg = error.response?.data?.message || "Failed to place order";
                toast.error(error.response?.status === 401 ? "Session expired. Please login again." : msg);
                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-black pb-20 relative">
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 mt-12 relative z-10">
                <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-white mb-8 transition-colors">
                    <FaArrowLeft className="mr-2" /> Back to Cart
                </Link>

                <h1 className="text-4xl font-headings font-bold text-white mb-8 flex items-center gap-3">
                    Checkout <span className="text-primary-500">Processing</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-surface border border-white/10 rounded-3xl p-8 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-sm border border-primary-500/30">1</span>
                                Shipping Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Enter last name"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-gray-400">Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Street address"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">City/Town</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700"
                                        placeholder="+94 7X XXX XXXX"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm text-gray-400">Order Notes (Optional)</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-700 resize-none h-24"
                                        placeholder="Special notes for delivery"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-white/10 rounded-3xl p-8 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm border border-green-500/30">2</span>
                                Payment Method
                            </h2>

                            <div className="flex gap-4">
                                <div className="flex-1 bg-green-900/20 border border-green-500/50 rounded-xl p-4 flex items-center justify-center gap-2 cursor-pointer transition-all">
                                    <FaMoneyBillWave className="text-green-500" />
                                    <span className="font-bold text-white">Cash on Delivery</span>
                                </div>
                                <div className="flex-1 bg-black/50 border border-white/5 rounded-xl p-4 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                                    <span className="text-gray-500">Card Payment (Soon)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-3xl p-8 sticky top-28 shadow-2xl">
                            <h2 className="text-xl font-bold font-headings text-white mb-6">Your Order</h2>

                            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.productID} className="flex gap-4 items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                            {(item.images && item.images.length > 0) ? (
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">No Img</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white text-sm font-medium line-clamp-2">{item.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1">{item.quantity} x LKR {item.price.toLocaleString()}</p>
                                        </div>
                                        <span className="text-white text-sm font-bold">
                                            {(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Subtotal</span>
                                    <span className="text-white">LKR {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/5">
                                    <span className="text-white">Total</span>
                                    <span className="text-primary-500">LKR {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/30 hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Placing Order..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
