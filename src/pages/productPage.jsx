import { useEffect, useState } from "react";
import axios from "axios";
import Loaded from "../components/loaded";
import ProductCard from "../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!loaded) {
            fetchAllProducts();
        }
    }, []);

    const fetchAllProducts = () => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products")
            .then((response) => {
                setProducts(response.data);
                setLoaded(true);
            });
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === "") {
            fetchAllProducts();
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/products/search/" + query)
            .then((response) => {
                setProducts(response.data);
            })
            .catch(err => {
                console.error("Search error:", err);
                setProducts([]);
            });
    };

    return (
        <div className="w-full min-h-[calc(100vh-80px)] bg-black">
            <div className="relative w-full py-12 overflow-hidden border-b border-white/5">
                <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative max-w-[1200px] mx-auto px-6 z-10">
                    <span className="text-primary-400 font-medium tracking-widest text-[10px] uppercase mb-2 inline-block">Collection</span>
                    <h1 className="text-3xl md:text-4xl font-bold font-headings text-white mb-2">
                        Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Products</span>
                    </h1>
                    <p className="text-gray-400 text-sm max-w-xl font-light">
                        Explore our curated selection of high-performance hardware enabled for the future.
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

                            <div className="flex-1 max-w-sm relative group">
                                <input
                                    type="text"
                                    placeholder="Search premium products..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white outline-none focus:border-primary-500/50 transition-all placeholder:text-gray-600"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-primary-500 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
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
