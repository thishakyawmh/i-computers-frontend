import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loaded from "../../components/loaded";
import ViewOrderInfo from "../../components/viewOrderInfo";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");

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
                    toast.error("Failed to load orders");
                });
        }
    }, [loaded]);

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
        <div className="w-full relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white">Order Management</h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 uppercase tracking-widest font-bold">Track and update customer orders</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="bg-surface px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest font-bold">
                        Total: <span className="text-white">{orders.length}</span>
                    </span>
                </div>
            </div>

            <div className="w-full bg-surface border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl relative">
                {loaded ? (
                    orders.length > 0 ? (
                        <div className="w-full overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#050505] border-b border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-6 py-5">ID</th>
                                        <th className="px-6 py-5">Customer</th>
                                        <th className="px-6 py-5 hidden sm:table-cell">Total</th>
                                        <th className="px-6 py-5 hidden md:table-cell">Date</th>
                                        <th className="px-6 py-5">Status</th>
                                        <th className="px-6 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-400">
                                    {orders.map((order) => (
                                        <tr key={order.orderID} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5">
                                                <span className="font-mono text-primary-400 font-bold">
                                                    #{order.orderID.replace("ORD", "")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col max-w-[120px] sm:max-w-none">
                                                    <span className="font-bold text-white truncate">{order.name || "N/A"}</span>
                                                    <span className="text-[10px] text-gray-600 truncate hidden sm:block">{order.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 hidden sm:table-cell">
                                                <span className="font-bold text-gray-200">
                                                    LKR {Number(order.total).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 hidden md:table-cell whitespace-nowrap">
                                                <span className="text-xs text-gray-500 font-medium">
                                                    {formatDate(order.date)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <ViewOrderInfo order={order} setLoaded={setLoaded} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-full h-80 flex flex-col items-center justify-center text-gray-600">
                            <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-base font-bold uppercase tracking-widest">Storefront Empty</p>
                            <p className="text-xs mt-1">Orders will appear once they are processed</p>
                        </div>
                    )
                ) : (
                    <div className="w-full h-80 flex items-center justify-center">
                        <Loaded />
                    </div>
                )}
            </div>
        </div>
    );
}
