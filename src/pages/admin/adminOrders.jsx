import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loaded from "../../components/loaded";

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
                    console.log("Orders fetched:", response.data);
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
            case "pending":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "processing":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "shipped":
                return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "delivered":
                return "bg-green-500/10 text-green-400 border-green-500/20";
            case "cancelled":
                return "bg-red-500/10 text-red-400 border-red-500/20";
            default:
                return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

    };

    return (
        <div className="w-full relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-headings text-white">Order Management</h2>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="bg-surface px-3 py-1.5 rounded-lg border border-white/10">
                        Total: <span className="text-white font-semibold">{orders.length}</span> orders
                    </span>
                </div>
            </div>

            <div className="w-full bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {loaded ? (
                    orders.length > 0 ? (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#050505] border-b border-white/10 text-xs text-gray-400 font-medium uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Order ID</th>
                                        <th className="px-6 py-4 font-semibold">Customer</th>
                                        <th className="px-6 py-4 font-semibold">Items</th>
                                        <th className="px-6 py-4 font-semibold">Total</th>
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold">Address</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                    {orders.map((order) => (
                                        <tr
                                            key={order.orderID}
                                            className="hover:bg-white/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-primary-400 font-semibold">
                                                    {order.orderID}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white">{order.name || "N/A"}</span>
                                                    <span className="text-xs text-gray-500">{order.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 max-w-[200px]">
                                                    {order.items?.slice(0, 2).map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-2">
                                                            <div className="w-8 h-8 bg-white/5 rounded border border-white/10 overflow-hidden flex-shrink-0">
                                                                {item.image ? (
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-600">No Img</div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs text-white truncate">{item.name}</p>
                                                                <p className="text-[10px] text-gray-500">x{item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {order.items?.length > 2 && (
                                                        <span className="text-xs text-gray-500">+{order.items.length - 2} more items</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-white">
                                                    LKR {Number(order.total).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-gray-400">
                                                    {formatDate(order.date)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusStyle(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-[150px]">
                                                    <p className="text-xs text-gray-400 truncate" title={order.address}>
                                                        {order.address}
                                                    </p>
                                                    {order.notes && (
                                                        <p className="text-[10px] text-gray-600 truncate mt-1" title={order.notes}>
                                                            Note: {order.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-full h-80 flex flex-col items-center justify-center text-gray-500">
                            <svg className="w-16 h-16 mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-lg font-medium">No orders yet</p>
                            <p className="text-sm text-gray-600">Orders will appear here once customers place them</p>
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
