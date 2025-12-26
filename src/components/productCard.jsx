import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const discount = product.labelledPrice > product.price
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
        : 0;

    return (
        <div className="group w-[300px] h-[450px] bg-white rounded-2xl shadow-md border border-gray-100 m-4 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="w-full h-[60%] overflow-hidden relative bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {product.images.length > 1 && (
                    <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110"
                    />
                )}

                {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                        {discount}% OFF
                    </div>
                )}
            </div>

            <div className="w-full h-[40%] flex flex-col justify-between p-5">
                <div>
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {product.category}
                    </h2>
                    <h1 className="text-lg font-bold text-gray-900 line-clamp-2 mt-1 leading-tight" title={product.name}>
                        {product.name}
                    </h1>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                        {product.description}
                    </p>
                </div>

                <div className="relative mt-4 border-t border-gray-100 pt-3 flex items-center min-h-[45px]">
                    <div className="flex justify-between items-end w-full group-hover:opacity-0 transition-opacity duration-300">
                        {product.labelledPrice > product.price ? (
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-gray-400 line-through">
                                    LKR {Number(product.labelledPrice).toFixed(2)}
                                </span>
                                <span className="text-xl font-extrabold text-accent">
                                    LKR {Number(product.price).toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <span className="text-xl font-extrabold text-gray-900">
                                LKR {Number(product.price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    <div className="absolute top-3 left-0 w-full flex justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                            onClick={() => navigate(`/overview/${product.productID}`)}
                            className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}