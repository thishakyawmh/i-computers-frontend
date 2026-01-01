import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartQuantity } from "../utils/cart";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        return () => window.removeEventListener("cartUpdated", loadCart);
    }, []);

    const loadCart = () => {
        const items = getCart();
        setCart(items);

        const t = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(t);
    };

    const handleQuantity = (id, newQty) => {
        updateCartQuantity(id, newQty);
        loadCart();
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        loadCart();
        toast.success("Item removed from cart");
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            navigate("/checkout", {
                state: {
                    items: cart,
                    total: total
                }
            });
        } else {
            toast.error("Cart is empty");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="w-full min-h-[calc(100vh-80px)] bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

                <div className="bg-surface border border-white/10 p-8 sm:p-12 rounded-3xl flex flex-col items-center text-center max-w-md w-full shadow-2xl relative z-10">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <FaShoppingBag className="text-2xl sm:text-3xl text-gray-600" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-headings font-bold text-white mb-3">Your Cart is Empty</h2>
                    <p className="text-gray-500 text-sm sm:text-base mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/products"
                        className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-glow flex items-center justify-center gap-2"
                    >
                        Start Shopping <FaArrowRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-black pb-20 relative px-4">
            <div className="fixed top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto mt-8 sm:mt-12 relative z-10">
                <h1 className="text-3xl sm:text-4xl font-headings font-bold text-white mb-6 sm:mb-8">
                    Your Cart
                    <span className="text-gray-500 text-lg sm:text-2xl font-normal ml-3">({cart.length})</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        {cart.map((item) => (
                            <div key={item.productID} className="bg-surface border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-lg group hover:border-white/20 transition-all">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    {(item.images && item.images.length > 0) ? (
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
                                            <span className="text-[10px]">No Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-base sm:text-xl font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-widest">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.productID)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                        >
                                            <FaTrash className="text-sm sm:text-base" />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
                                        <div className="flex items-center bg-black border border-white/10 rounded-lg p-1">
                                            <button
                                                onClick={() => handleQuantity(item.productID, Math.max(1, item.quantity - 1))}
                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 sm:w-10 text-center font-bold text-white text-xs sm:text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantity(item.productID, Math.min(item.stock, item.quantity + 1))}
                                                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/10 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-left sm:text-right w-full sm:w-auto">
                                            <span className="block text-[10px] sm:text-xs text-gray-500 mb-0.5 uppercase font-bold tracking-wider">Subtotal</span>
                                            <span className="text-lg sm:text-xl font-bold text-primary-400 font-mono">LKR {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28 shadow-2xl">
                            <h2 className="text-xl sm:text-2xl font-bold font-headings text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm sm:text-base text-gray-400">
                                    <span>Items ({cart.length})</span>
                                    <span className="text-white font-medium">LKR {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base text-gray-400">
                                    <span>Shipping & Handling</span>
                                    <span className="text-green-400 font-medium tracking-widest uppercase text-[10px] sm:text-xs font-bold">Free Delivery</span>
                                </div>
                                <div className="h-[1px] bg-white/10 my-4"></div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 text-sm">Estimated Total</span>
                                    <span className="text-xl sm:text-2xl font-bold text-primary-500 font-headings">LKR {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/40 hover:shadow-glow-lg transition-all duration-300 uppercase tracking-widest text-xs"
                            >
                                Proceed to Checkout
                            </button>
                            <Link to="/products" className="block text-center mt-4 text-xs text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-bold">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}