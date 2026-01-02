import { useEffect, useState } from "react";
import { getCart } from "../utils/cart";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
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
        // Check if we have items passed via location state (Buy Now)
        if (location.state?.items) {
            setCart(location.state.items);
            setTotal(location.state.total || location.state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
            return;
        }

        const items = getCart();
        if (items.length === 0) {
            toast.error("Your cart is empty");
            navigate("/products");
            return;
        }
        setCart(items);
        setTotal(items.reduce((acc, item) => acc + (item.price * item.quantity), 0));
    }, [navigate, location.state]);

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
                if (!location.state?.items) {
                    localStorage.removeItem("cart");
                    window.dispatchEvent(new Event("cartUpdated"));
                }
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
            <div className="fixed top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-green-900/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 relative z-10">
                <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-white mb-6 sm:mb-8 transition-colors text-xs sm:text-sm uppercase tracking-widest font-bold">
                    <FaArrowLeft className="mr-2" /> Back to Cart
                </Link>

                <h1 className="text-3xl sm:text-4xl font-headings font-bold text-white mb-8">
                    Complete Your <span className="text-primary-500">Order</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        <div className="bg-surface border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-3 lowercase tracking-tighter">
                                <span className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs border border-primary-500/30 font-mono">01</span>
                                Shipping details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">First Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 text-sm"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 text-sm"
                                        placeholder="Doe"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Street Address <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 text-sm"
                                        placeholder="123 Future Tech St"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">City/Town <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 text-sm"
                                        placeholder="Colombo"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Phone Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 text-sm"
                                        placeholder="07XXXXXXXX"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Instruction notes</label>
                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all placeholder:text-gray-800 resize-none h-24 text-sm"
                                        placeholder="Let us know if you have any special requirements..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-3 lowercase tracking-tighter">
                                <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs border border-green-500/30 font-mono">02</span>
                                Payment configuration
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-green-600/10 border-2 border-green-500/50 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 cursor-pointer transition-all">
                                    <div className="flex items-center justify-between">
                                        <FaMoneyBillWave className="text-2xl text-green-500" />
                                        <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Cash on Delivery</p>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Pay upon arrival</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 opacity-40 cursor-not-allowed">
                                    <div className="text-xl text-gray-500 font-bold tracking-tighter">CARD</div>
                                    <div>
                                        <p className="font-bold text-gray-500 text-sm">Online Payment</p>
                                        <p className="text-[10px] text-gray-600 uppercase tracking-widest italic">Coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28 shadow-2xl">
                            <h2 className="text-xl font-bold font-headings text-white mb-6">Review Items</h2>

                            <div className="space-y-4 mb-6 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.productID} className="flex gap-4 items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                            {(item.images && item.images.length > 0) ? (
                                                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-600 uppercase">ICM</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white text-xs font-bold truncate">{item.name}</h4>
                                            <p className="text-gray-500 text-[10px] mt-0.5 uppercase tracking-widest">x {item.quantity}</p>
                                        </div>
                                        <span className="text-white text-xs font-mono font-bold">
                                            LKR {(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
                                <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                                    <span>Base Total</span>
                                    <span className="text-white font-mono">LKR {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-xs sm:text-sm">
                                    <span>Shipping Fee</span>
                                    <span className="text-green-400 font-bold uppercase tracking-widest text-[10px]">Free</span>
                                </div>
                                <div className="flex justify-between items-end pt-3 border-t border-white/5">
                                    <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Grand Total</span>
                                    <span className="text-xl sm:text-2xl font-bold text-primary-500 font-headings">LKR {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={isSubmitting}
                                className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg shadow-primary-900/40 hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                            >
                                {isSubmitting ? "Finalizing Order..." : "Confirm & Pay Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
