import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ImageSlider({ images = [] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-white/5 rounded-3xl border border-white/10">
                <span className="text-gray-500">No Image Available</span>
            </div>
        );
    }

    const nextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full h-full flex flex-col items-center">

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden mb-6 rounded-2xl bg-[#0a0a0a] group/slider">

                <div
                    key={currentImageIndex}
                    className="absolute inset-0 z-0 bg-cover bg-center blur-[60px] scale-150 opacity-40 transition-opacity duration-700"
                    style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                ></div>

                <img
                    src={images[currentImageIndex]}
                    alt="product-main"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 border border-white/10"
                        >
                            <IoIosArrowBack size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/40 hover:bg-black/60 rounded-full backdrop-blur-md transition-all opacity-0 group-hover/slider:opacity-100 z-20 border border-white/10"
                        >
                            <IoIosArrowForward size={20} />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex items-center justify-center gap-4 w-full px-4">
                    <button
                        onClick={prevImage}
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                    >
                        <IoIosArrowBack size={20} />
                    </button>

                    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-2 mask-linear">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${currentImageIndex === index
                                    ? "ring-2 ring-primary-500 scale-105 opacity-100"
                                    : "ring-1 ring-white/10 opacity-50 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`thumbnail-${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={nextImage}
                        className="p-1 text-gray-500 hover:text-white transition-colors"
                    >
                        <IoIosArrowForward size={20} />
                    </button>
                </div>
            )}
        </div>
    );
}
