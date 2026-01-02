import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loaded from "../../components/loaded";
import { HiOutlineShieldCheck, HiOutlineUserCircle, HiOutlineMail, HiOutlineLockClosed, HiOutlineLockOpen } from "react-icons/hi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import UserAvatar from "../../components/userAvatar";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState("");

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");

            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log("Fetched users:", response.data);
                    setUsers(response.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.error("Error fetching users:", err);
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/users", {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(res => {
                        if (Array.isArray(res.data)) {
                            setUsers(res.data);
                        } else {
                            setUsers([res.data]);
                        }
                        setLoaded(true);
                    }).catch(() => {
                        toast.error("Failed to load users");
                        setLoaded(true);
                    });
                });
        }
    }, [loaded]);

    const handleUpdateRole = (email, newRole) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/users/" + email,
            { role: newRole },
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            toast.success(`Role updated to ${newRole}`);
            setLoaded(false);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Failed to update role");
        });
    };

    const handleToggleBlock = (email, currentStatus) => {
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/users/" + email,
            { isBlocked: !currentStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            toast.success(currentStatus ? "User unblocked" : "User blocked");
            setLoaded(false);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Failed to update status");
        });
    };

    const handleRemoveUser = (email) => {
        setEmailToDelete(email);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_BACKEND_URL + "/users/" + emailToDelete, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("User removed successfully");
            setLoaded(false);
            setIsDeleteModalOpen(false);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Failed to remove user");
            setIsDeleteModalOpen(false);
        });
    };

    return (
        <div className="w-full relative px-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white">User Management</h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 uppercase tracking-widest font-bold">Manage accounts and permissions</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="bg-surface px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest font-bold">
                        Total Users: <span className="text-white">{users.length}</span>
                    </span>
                </div>
            </div>

            <div className="w-full bg-surface border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                {loaded ? (
                    users.length > 0 ? (
                        <div className="w-full overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#050505] border-b border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                                    <tr>
                                        <th className="px-6 py-5">User</th>
                                        <th className="px-6 py-5">Role</th>
                                        <th className="px-6 py-5">Account Status</th>
                                        <th className="px-6 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-xs sm:text-sm text-gray-400">
                                    {users.map((item) => (
                                        <tr key={item.email} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar user={item} />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-white truncate">{item.firstName} {item.lastName}</span>
                                                        <span className="text-[10px] text-gray-600 flex items-center gap-1 font-mono leading-none mt-1">
                                                            <HiOutlineMail className="flex-shrink-0" /> {item.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${item.role === 'admin' ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-primary-400 bg-primary-500/10 border-primary-500/20"}`}>
                                                        {item.role === 'admin' ? <MdOutlineAdminPanelSettings className="text-sm" /> : <HiOutlineShieldCheck className="text-sm" />}
                                                        {item.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${!item.isBlocked ? "text-green-400 bg-green-500/10 border-green-500/20" : "text-red-400 bg-red-500/10 border-red-500/20"}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${!item.isBlocked ? "bg-green-500" : "bg-red-500"}`}></span>
                                                    {!item.isBlocked ? "Verified" : "Banned"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    {item.role !== 'admin' && (
                                                        <button
                                                            onClick={() => handleUpdateRole(item.email, 'admin')}
                                                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-gray-400 hover:text-white rounded-lg border border-white/10 transition-all uppercase tracking-widest"
                                                            title="Make Admin"
                                                        >
                                                            Role
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleToggleBlock(item.email, item.isBlocked)}
                                                        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${item.isBlocked ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500 hover:text-white" : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500 hover:text-white"}`}
                                                        title={item.isBlocked ? "Unblock User" : "Block User"}
                                                    >
                                                        {item.isBlocked ? <HiOutlineLockOpen className="text-lg" /> : <HiOutlineLockClosed className="text-lg" />}
                                                    </button>

                                                    <button
                                                        onClick={() => handleRemoveUser(item.email)}
                                                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-glow-sm hover:shadow-red-500/20"
                                                        title="Remove User"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-full h-80 flex flex-col items-center justify-center text-gray-600">
                            <LuUsersRound className="text-5xl opacity-10 mb-4" />
                            <p className="text-base font-bold uppercase tracking-widest">No Citizens Found</p>
                            <p className="text-xs mt-1 font-mono uppercase">Population zero</p>
                        </div>
                    )
                ) : (
                    <div className="w-full h-80 flex items-center justify-center">
                        <Loaded />
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsDeleteModalOpen(false)}
                    ></div>

                    <div className="relative bg-surface border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">Confirm Removal</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Are you sure you want to permanently remove <span className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded">{emailToDelete}</span>? This action cannot be undone and will erase all associated data.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 h-12 rounded-xl bg-white/5 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest text-xs"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 h-12 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg shadow-red-900/20 transition-all uppercase tracking-widest text-xs"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
