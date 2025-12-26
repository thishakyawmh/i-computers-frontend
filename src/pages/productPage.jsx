import { useEffect, useState } from "react";
import axios from "axios";
import Loaded from "../components/loaded";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/products")
                .then((response) => {
                    console.log("Products fetched:", response.data);
                    setProducts(response.data);
                    setLoaded(true);
                });
        }
    }, []);

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-black">
            <div className="relative w-full py-20 overflow-hidden border-b border-white/5">
                <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative max-w-[1200px] mx-auto px-6 z-10">
                    <span className="text-primary-400 font-medium tracking-widest text-sm uppercase mb-3 inline-block">Collection</span>
                    <h1 className="text-4xl md:text-5xl font-bold font-headings text-white mb-4">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Products</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl font-light">
                        Explore our curated selection of high-performance hardware and accessories enabled for the future.
                    </p>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 py-12">
                {!loaded ? (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <Loaded />
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <p className="text-gray-400">
                                Showing <span className="text-white font-semibold">{products.length}</span> items
                            </p>

                            <div className="flex gap-2">
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.productID} product={product} />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="w-full py-20 text-center bg-surface rounded-3xl border border-white/5">
                                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
