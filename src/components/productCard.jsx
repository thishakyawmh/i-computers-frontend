import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const discount = product.labelledPrice > product.price
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <div
            onClick={() => navigate(`/overview/${product.productID}`)}
            className="group bg-surface border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary-500 hover:shadow-glow hover:-translate-y-1"
        >
            <div className="relative aspect-square bg-[#050505] overflow-hidden p-6">
                <div className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-110">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                    />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primary-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-primary-600 text-white text-[10px] fonts-bold uppercase tracking-wider px-2 py-1 rounded shadow-lg z-20">
                        -{discount}%
                    </span>
                )}

                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <span className="text-white text-sm font-bold uppercase tracking-widest border border-white/30 px-4 py-2 rounded">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5 relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-primary-500/50 transition-colors duration-500"></div>

                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary-400 uppercase tracking-widest bg-primary-500/10 px-2 py-1 rounded">
                        {product.category}
                    </span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-gray-700"></div>
                        ))}
                    </div>
                </div>

                <h3 className="text-white font-headings font-semibold text-lg leading-tight mb-3 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-end justify-between mt-4">
                    <div className="flex flex-col">
                        {product.labelledPrice > product.price && (
                            <span className="text-xs text-gray-500 line-through font-medium">
                                LKR {Number(product.labelledPrice).toLocaleString()}
                            </span>
                        )}
                        <span className="text-xl font-bold text-white font-headings">
                            LKR {Number(product.price).toLocaleString()}
                        </span>
                    </div>

                    <button
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary-500 hover:border-primary-500 transition-all duration-300 group-hover:shadow-glow"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/overview/${product.productID}`);
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}