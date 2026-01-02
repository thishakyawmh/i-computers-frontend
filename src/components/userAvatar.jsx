import { useState, useEffect } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";

export default function UserAvatar({ user, className = "w-10 h-10" }) {
    const [hasError, setHasError] = useState(false);

    // Debugging: Check what the component is receiving
    useEffect(() => {
        if (user?.email) {
            console.log(`Avatar Data for ${user.email}:`, {
                profileImage: user.profileImage,
                image: user.image,
                picture: user.picture,
                photo: user.photo,
                avatar: user.avatar,
                img: user.img,
                profilePic: user.profilePic
            });
        }
    }, [user]);

    const imageUrl = user?.profileImage || user?.image || user?.picture || user?.photo || user?.avatar || user?.img || user?.profilePic;

    // Strict check for "undefined" string or empty/null
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
