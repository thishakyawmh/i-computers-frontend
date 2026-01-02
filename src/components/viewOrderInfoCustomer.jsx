import { useState } from "react";
import Modal from "react-modal";
import { HiOutlineX, HiOutlineUser, HiOutlineMail, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";

Modal.setAppElement('#root');

export default function ViewOrderInfoCustomer({ order }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!order) return null;

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
            case "processing": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            case "shipped": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
            case "delivered": return "text-green-500 bg-green-500/10 border-green-500/20";
            case "cancelled": return "text-red-500 bg-red-500/10 border-red-500/20";
            default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
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
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border tracking-widest ${getStatusStyle(order.status)}`}>
                            {order.status}
                        </span>
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

                    {order.notes && (
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-wider">Note</p>
                            <p className="text-xs text-gray-300 italic">"{order.notes}"</p>
                        </div>
                    )}
                </div>

                <div className="px-4 sm:px-6 py-4 bg-black/40 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-shrink-0">
                    <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase">Total Amount</p>
                        <p className="text-lg sm:text-xl font-bold text-white font-headings">LKR {Number(order.total).toLocaleString()}</p>
                    </div>
                </div>
            </Modal>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1.5 bg-white/5 hover:bg-primary-500/10 text-[10px] font-bold text-gray-400 hover:text-primary-400 rounded-lg border border-white/10 hover:border-primary-500/20 transition-all uppercase tracking-widest"
            >
                Order Info
            </button>
        </>
    );
}
