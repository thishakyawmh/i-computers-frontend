import { useState } from "react";

export default function ImageSlider({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm">
                <img
                    src={images[currentImageIndex]}
                    alt="product-main"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${currentImageIndex === index ? "border-green-600 scale-105" : "border-transparent hover:border-gray-200"
                                }`}
                        >
                            <img src={img} alt={`thumbnail-${index}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
