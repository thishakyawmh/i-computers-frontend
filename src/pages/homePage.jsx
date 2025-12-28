import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import Cart from "./cart";
import Checkout from "./checkout";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-black text-white selection:bg-primary-500/30 selection:text-white">
            <Header />
            <main className="w-full">
                <Routes>
                    <Route path="/" element={
                        <div className="w-full">
                            <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]"></div>

                                <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
                                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium tracking-wide mb-6 backdrop-blur-sm">
                                        Premium Tech Destination
                                    </span>
                                    <h1 className="text-5xl md:text-7xl font-bold font-headings text-white mb-6 leading-tight">
                                        Future of Tech <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">On Your Street</span>
                                    </h1>
                                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                                        Experience the latest in high-performance computing with i Computers.
                                        Where innovation meets premium design.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <a
                                            href="/products"
                                            className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-full transition-all duration-300 shadow-glow hover:shadow-glow-lg w-full sm:w-auto text-lg"
                                        >
                                            Explore Store
                                        </a>
                                        <a
                                            href="/about"
                                            className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/40 text-white font-semibold rounded-full transition-all duration-300 w-full sm:w-auto text-lg backdrop-blur-sm"
                                        >
                                            Our Story
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-[1200px] mx-auto px-6 py-24">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { title: "Global Shipping", desc: "Fast & reliable delivery worldwide", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                                        { title: "Secure Checkout", desc: "Protected by 256-bit encryption", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                                        { title: "Premium Warranty", desc: "Full coverage on all products", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }
                                    ].map((f, i) => (
                                        <div key={i} className="bg-surface p-8 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all duration-300 group">
                                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-colors text-primary-500">
                                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-bold font-headings text-white mb-2">{f.title}</h3>
                                            <p className="text-gray-500 font-light">{f.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={
                        <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                            <h1 className="text-4xl font-bold font-headings text-white mb-4">About <span className="text-primary-500">Us</span></h1>
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                            <h1 className="text-4xl font-bold font-headings text-white mb-4">Contact <span className="text-primary-500">Us</span></h1>
                        </div>
                    } />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="*" element={
                        <div className="w-full py-40 text-center">
                            <h1 className="text-4xl font-bold font-headings text-white mb-4">Page Not Found</h1>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    );
}