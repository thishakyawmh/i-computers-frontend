import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { HiOutlineX, HiOutlineUser, HiOutlineMail, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

Modal.setAppElement('#root');

export default function ViewOrderInfo({ order, setLoaded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState(order.notes || "");
    const [status, setStatus] = useState(order.status || "pending");

    const isChanged = notes !== (order.notes || "") || status !== (order.status || "pending");

    if (!order) return null;

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending": return "text-yellow-500 bg-yellow-500/10";
            case "processing": return "text-blue-500 bg-blue-500/10";
            case "shipped": return "text-purple-500 bg-purple-500/10";
            case "delivered": return "text-green-500 bg-green-500/10";
            case "cancelled": return "text-red-500 bg-red-500/10";
            default: return "text-gray-500 bg-gray-500/10";
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                overlayClassName="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                className="relative w-[95%] max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl outline-none overflow-hidden max-h-[90vh] flex flex-col"
            >
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 flex-shrink-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-lg font-bold text-white">Order Details</h3>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-current outline-none cursor-pointer transition-colors ${getStatusStyle(status)}`}
                        >
                            <option value="pending" className="bg-[#0a0a0a] text-yellow-500 italic">Pending</option>
                            <option value="processing" className="bg-[#0a0a0a] text-blue-500">Processing</option>
                            <option value="shipped" className="bg-[#0a0a0a] text-purple-500">Shipped</option>
                            <option value="delivered" className="bg-[#0a0a0a] text-green-500">Delivered</option>
                            <option value="cancelled" className="bg-[#0a0a0a] text-red-500">Cancelled</option>
                        </select>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                        <HiOutlineX className="text-xl" />
                    </button>
                </div>

                <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                            <p className="text-gray-500 uppercase font-bold tracking-wider">Customer</p>
                            <p className="text-white font-medium flex items-center gap-2 truncate"><HiOutlineUser className="flex-shrink-0" /> {order.name || "N/A"}</p>
                            <p className="text-gray-400 flex items-center gap-2 font-mono truncate"><HiOutlineMail className="flex-shrink-0" /> {order.email}</p>
                        </div>
                        <div className="space-y-2 sm:text-right">
                            <p className="text-gray-500 uppercase font-bold tracking-wider">Placed On</p>
                            <p className="text-white font-medium flex items-center sm:justify-end gap-2"><HiOutlineCalendar className="flex-shrink-0" /> {formatDate(order.date)}</p>
                            <p className="text-primary-400 font-mono font-bold">#{order.orderID}</p>
                        </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 flex items-center gap-2">
                            <HiOutlineLocationMarker className="flex-shrink-0" /> Shipping Address
                        </p>
                        <p className="text-xs text-gray-300 leading-relaxed">{order.address}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.1em]">Ordered Items</p>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.1em] pr-2">Subtotal</p>
                        </div>
                        <div className="space-y-3">
                            {order.items?.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 sm:gap-4 p-3 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-700 font-bold">ICM</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs sm:text-sm text-white font-bold truncate mb-1">{item.name}</p>
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <span className="text-[9px] sm:text-[11px] text-gray-400 bg-white/5 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/5">
                                                LKR {Number(item.price || 0).toLocaleString()}
                                            </span>
                                            <span className="text-[9px] sm:text-[11px] text-primary-400 font-bold">
                                                x {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs sm:text-sm text-white font-mono font-bold tracking-tight">
                                            LKR {Number((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-3 bg-primary-500/5 rounded-xl border border-primary-500/10">
                        <p className="text-[10px] text-primary-400 font-bold mb-2 uppercase tracking-wider">Additional Note</p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-gray-300 outline-none focus:border-primary-500/50 transition-colors resize-none placeholder:text-gray-600"
                            placeholder="Add internal notes about this order..."
                            rows={3}
                        />
                    </div>
                </div>

                <div className="px-4 sm:px-6 py-4 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-shrink-0">
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Total</p>
                        <p className="text-lg sm:text-xl font-bold text-white font-headings">LKR {Number(order.total).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {isChanged && (
                            <button
                                onClick={() => {
                                    const token = localStorage.getItem("token");
                                    const url = import.meta.env.VITE_BACKEND_URL + "/orders/" + order.orderID;
                                    axios.put(url,
                                        { notes, status }, {
                                        headers: { Authorization: `Bearer ${token}` }
                                    }).then(() => {
                                        toast.success("Order updated successfully!");
                                        setLoaded(false);
                                        setIsModalOpen(false);
                                    }).catch((err) => {
                                        console.error("Update error:", err.response?.data || err.message);
                                        toast.error(err.response?.data?.message || "Failed to update order");
                                    });
                                }}
                                className="flex-1 sm:flex-none px-4 sm:px-5 py-2 bg-primary-600 hover:bg-primary-500 text-[10px] font-bold text-white rounded-lg transition-colors shadow-glow-sm"
                            >
                                Update Order
                            </button>
                        )}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 sm:flex-none px-4 sm:px-5 py-2 bg-red-500 hover:bg-red-600 text-[10px] font-bold text-white rounded-lg border border-white/10 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-gray-400 hover:text-white rounded-lg border border-white/10 transition-colors"
            >
                View Details
            </button>
        </>
    );
}