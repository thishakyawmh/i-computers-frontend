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
            <div className="w-full min-h-[calc(100vh-80px)] bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="bg-surface border border-white/10 p-12 rounded-3xl flex flex-col items-center text-center max-w-md w-full shadow-2xl relative z-10">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <FaShoppingBag className="text-3xl text-gray-600" />
                    </div>
                    <h2 className="text-3xl font-headings font-bold text-white mb-3">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/products"
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-glow flex items-center gap-2"
                    >
                        Start Shopping <FaArrowRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-black pb-20 relative">
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-6 mt-12 relative z-10">
                <h1 className="text-4xl font-headings font-bold text-white mb-8">Shopping Cart <span className="text-gray-500 text-2xl font-normal ml-2">({cart.length} items)</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.productID} className="bg-surface border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-lg group hover:border-white/20 transition-all">
                                <div className="w-full sm:w-32 h-32 bg-white/5 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    {(item.images && item.images.length > 0) ? (
                                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-white/5">
                                            <span className="text-xs">No Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 w-full text-center sm:text-left">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item.productID)}
                                            className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                                        <div className="flex items-center bg-black border border-white/10 rounded-lg p-1">
                                            <button
                                                onClick={() => handleQuantity(item.productID, Math.max(1, item.quantity - 1))}
                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/10"
                                            >
                                                -
                                            </button>
                                            <span className="w-10 text-center font-bold text-white text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantity(item.productID, Math.min(item.stock, item.quantity + 1))}
                                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded hover:bg-white/10"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs text-gray-500 mb-1">Total Price</span>
                                            <span className="text-xl font-bold text-primary-400">LKR {(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-surface border border-white/10 rounded-3xl p-8 sticky top-28 shadow-2xl">
                            <h2 className="text-2xl font-bold font-headings text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-white font-medium">LKR {total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-medium">Free</span>
                                </div>
                                <div className="h-[1px] bg-white/10 my-4"></div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-primary-500">LKR {total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-primary-900/50 hover:shadow-glow transition-all duration-300 mb-4">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}