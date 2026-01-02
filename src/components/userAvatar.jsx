import { useState, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function UserAvatar({ user, className = "w-10 h-10" }) {
    const [hasError, setHasError] = useState(false);

    const imageUrl = user?.profileImage || user?.image || user?.picture || user?.photo || user?.avatar || user?.img || user?.profilePic;

    const isValidImage = imageUrl && imageUrl !== "undefined" && imageUrl !== "null" && imageUrl !== "";

    if (!isValidImage || hasError) {
        return (
            <div className={`${className} rounded-full bg-primary-600/10 border border-primary-500/20 flex items-center justify-center text-primary-400 opacity-50`}>
                <HiOutlineUserCircle className="text-2xl" />
            </div>
        );
    }

    return (
        <div className={`${className} rounded-full border border-white/10 overflow-hidden bg-surface flex items-center justify-center`}>
            <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => {
                    console.warn(`Avatar failed to load for: ${user.email}`);
                    setHasError(true);
                }}
            />
        </div>
    );
}
