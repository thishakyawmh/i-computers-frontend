import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loaded from "../components/loaded";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setOrders(response.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                toast.error("Failed to load your orders");
                setLoaded(true);
            });
    }, []);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "shipped": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "delivered": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="w-full min-h-screen bg-black pt-20 pb-12 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-600/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold font-headings text-white">My <span className="text-primary-500">Orders</span></h1>
                        <p className="text-gray-500 text-xs sm:text-sm mt-2 uppercase tracking-[0.2em] font-bold">Track your premium tech acquisitions</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-surface px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-400 uppercase tracking-widest font-bold">
                            Orders: <span className="text-white">{orders.length}</span>
                        </span>
                    </div>
                </div>

                <div className="w-full bg-surface border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    {loaded ? (
                        orders.length > 0 ? (
                            <div className="w-full overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#050505] border-b border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                                        <tr>
                                            <th className="px-6 py-6">Order ID</th>
                                            <th className="px-6 py-6 hidden sm:table-cell">Details</th>
                                            <th className="px-6 py-6 hidden md:table-cell">Ordered Date</th>
                                            <th className="px-6 py-6">Status</th>
                                            <th className="px-6 py-6">Total</th>
                                            <th className="px-6 py-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-400">
                                        {orders.map((order) => (
                                            <tr key={order.orderID} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-6">
                                                    <span className="font-mono text-primary-400 font-bold">
                                                        #{order.orderID.replace("ORD", "")}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 hidden sm:table-cell">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-white mb-0.5 truncate max-w-[150px]">
                                                            {order.items?.length} {order.items?.length === 1 ? "Item" : "Items"}
                                                        </span>
                                                        <span className="text-[10px] text-gray-600 truncate max-w-[200px]">
                                                            {order.items?.map(it => it.name).join(", ")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 hidden md:table-cell whitespace-nowrap">
                                                    <span className="text-xs text-gray-500 font-medium font-mono">
                                                        {formatDate(order.date)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="font-bold text-white font-mono">
                                                        LKR {Number(order.total).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-6 text-right">
                                                    <ViewOrderInfoCustomer order={order} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="w-full py-24 flex flex-col items-center justify-center text-gray-600">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
                                    <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2">No Orders Found</h3>
                                <p className="text-sm text-gray-500 mb-8 font-light">You haven't placed any premium orders yet.</p>
                                <a href="/products" className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold transition-all shadow-glow uppercase tracking-widest">
                                    Start Shopping
                                </a>
                            </div>
                        )
                    ) : (
                        <div className="w-full h-80 flex items-center justify-center">
                            <Loaded />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
