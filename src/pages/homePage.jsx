import { Link, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import ProductOverview from "./productOverview";
import Cart from "./cart";
import Checkout from "./checkout";
import OrdersPage from "./ordersPage";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { HiOutlineComputerDesktop, HiOutlineCpuChip, HiOutlineGift, HiOutlineArrowRight } from "react-icons/hi2";
import { BiMouseAlt, BiHeadphone } from "react-icons/bi";
import { FaKeyboard } from "react-icons/fa";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-black text-white selection:bg-primary-500/30 selection:text-white">
            <Header />
            <main className="w-full">
                <Routes>
                    <Route path="/" element={
                        <div className="w-full">
                            <div className="relative w-full min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
                                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse"></div>
                                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[150px] animate-pulse delay-700"></div>

                                <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16">
                                    <div className="flex flex-col items-start text-left order-2 lg:order-1">
                                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs sm:text-sm font-bold tracking-widest mb-6 backdrop-blur-md uppercase">
                                            {new Date().getHours() < 18 ? <HiOutlineSun className="text-lg" /> : <HiOutlineMoon className="text-lg" />}
                                            {new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening"}
                                        </div>
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headings text-white mb-6 leading-[1.1]">
                                            Unleash Your <br />
                                            <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">Ultimate Performance</span>
                                        </h1>
                                        <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
                                            From extreme gaming rigs to professional workstations and premium accessories, i Computers delivers the hardware that defines performance.
                                        </p>
                                        <div className="flex flex-wrap items-center gap-5">
                                            <Link
                                                to="/products"
                                                className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-500 shadow-glow hover:shadow-glow-lg flex items-center gap-3 group uppercase tracking-widest text-xs"
                                            >
                                                Explore Products
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                            <Link
                                                to="/about"
                                                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-md uppercase tracking-widest text-xs"
                                            >
                                                Our Story
                                            </Link>
                                        </div>

                                        <div className="mt-12 grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-12 border-t border-white/5 pt-8">
                                            <div>
                                                <div className="text-2xl font-bold text-white">1,200+</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Accessories</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">5,000+</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Sales</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">3,500+</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Trusted Customers</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-white">10+</div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Years Experience</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative order-1 lg:order-2 group flex justify-center lg:justify-end">
                                        <div className="relative w-full max-w-[500px]">
                                            <img
                                                src="/public/home.png"
                                                alt="High-end PC setup"
                                                className="w-full h-auto object-contain scale-[1.05] group-hover:scale-110 transition-transform duration-1000"
                                            />
                                            {/* Minimal Floating Badge - Optional, keeping it floating but clean */}
                                            <div className="absolute bottom-6 right-6 bg-primary-600/90 backdrop-blur-md p-3 rounded-xl hidden md:block animate-bounce-slow shadow-2xl shadow-primary-500/20">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-black text-lg">RTX</span>
                                                    <span className="text-white/80 text-[10px] uppercase font-bold tracking-tighter leading-none">Gaming<br />Ready</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Category Grid Section */}
                            <section className="max-w-[1200px] mx-auto px-6 py-24">
                                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                                    <div>
                                        <h2 className="text-3xl sm:text-4xl font-bold font-headings text-white mb-4">Shop by <span className="text-primary-500">Category</span></h2>
                                        <p className="text-gray-500 max-w-md">Browse our curated selection of high-performance hardware and premium peripherals.</p>
                                    </div>
                                    <Link to="/products" className="text-primary-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                                        View All Products <HiOutlineArrowRight />
                                    </Link>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                    {[
                                        { name: "Processors", icon: HiOutlineCpuChip, color: "bg-blue-500/10 text-blue-400" },
                                        { name: "Graphics Cards", icon: HiOutlineCpuChip, color: "bg-emerald-500/10 text-emerald-400" },
                                        { name: "Keyboards", icon: FaKeyboard, color: "bg-purple-500/10 text-purple-400" },
                                        { name: "Audio Gear", icon: BiHeadphone, color: "bg-amber-500/10 text-amber-400" }
                                    ].map((cat, i) => (
                                        <Link key={i} to="/products" className="group bg-surface border border-white/5 hover:border-primary-500/50 p-8 rounded-[32px] transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-2">
                                            <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform`}>
                                                <cat.icon />
                                            </div>
                                            <span className="text-white font-bold group-hover:text-primary-400 transition-colors">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            {/* Enhanced Feature Section */}
                            <div className="bg-white/[0.02] border-y border-white/5 py-24">
                                <div className="max-w-[1200px] mx-auto px-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {[
                                            {
                                                title: "Custom PC Builds",
                                                desc: "Expertly assembled rigs tailored to your performance goals with premium cable management.",
                                                icon: HiOutlineComputerDesktop,
                                                stat: "8k+ Built"
                                            },
                                            {
                                                title: "Elite Accessories",
                                                desc: "The world's best mechanical keyboards, precision mice, and studio-grade audio gear.",
                                                icon: BiMouseAlt,
                                                stat: "Premium"
                                            },
                                            {
                                                title: "Expert Support",
                                                desc: "Our tech wizards are available 24/7 for troubleshooting, optimization, and upgrades.",
                                                icon: HiOutlineGift,
                                                stat: "24/7 Care"
                                            }
                                        ].map((f, i) => (
                                            <div key={i} className="bg-black/40 p-10 rounded-[40px] border border-white/5 hover:border-primary-500/30 transition-all duration-500 group relative overflow-hidden">
                                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:bg-primary-500/10 transition-colors"></div>
                                                <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-8 text-white text-2xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-900/20">
                                                    <f.icon />
                                                </div>
                                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-primary-400 text-[10px] font-bold uppercase tracking-widest mb-4">{f.stat}</div>
                                                <h3 className="text-2xl font-bold font-headings text-white mb-4">{f.title}</h3>
                                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Call to Build Section */}
                            <section className="max-w-[1200px] mx-auto px-6 py-24">
                                <div className="relative w-full rounded-[48px] overflow-hidden bg-gradient-to-br from-primary-900/40 via-black to-black border border-white/10 p-12 md:p-20 flex flex-col items-center text-center">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                                    <h2 className="text-4xl md:text-6xl font-bold font-headings text-white mb-8 max-w-3xl leading-tight">
                                        Ready to Build Your <span className="text-primary-500">Dream Station?</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-light">
                                        Tell our experts your budget and performance requirements, and we'll craft the perfect machine for you.
                                    </p>
                                    <Link to="/about" className="px-12 py-5 bg-white text-black hover:bg-primary-500 hover:text-white font-bold rounded-2xl transition-all duration-500 shadow-2xl flex items-center gap-3 uppercase tracking-widest text-sm">
                                        Start Custom Build <HiOutlineArrowRight className="text-xl" />
                                    </Link>
                                </div>
                            </section>

                            {/* Footer Section */}
                            <footer className="bg-surface border-t border-white/5 pt-24 pb-12">
                                <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-3">
                                            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                                            <span className="text-2xl font-bold text-white tracking-wider">ICM</span>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            The destination for premium computer hardware and high-performance gaming gear since 2016.
                                        </p>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Links</h4>
                                        <ul className="space-y-4">
                                            {['Products', 'About Us', 'Contact', 'My Orders'].map((link, i) => (
                                                <li key={i}><Link to={`/${link.toLowerCase().replace(' ', '')}`} className="text-gray-500 hover:text-primary-400 transition-colors text-sm">{link}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Support</h4>
                                        <ul className="space-y-4 text-sm text-gray-500">
                                            <li>Shipping Policy</li>
                                            <li>Warranty Claims</li>
                                            <li>Privacy Policy</li>
                                        </ul>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Newsletter</h4>
                                        <p className="text-gray-500 text-sm">Get the latest tech news and exclusive offers.</p>
                                        <div className="flex gap-2 p-1.5 bg-black/40 border border-white/10 rounded-xl">
                                            <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-white px-3 flex-1 text-sm" />
                                            <button className="bg-primary-600 hover:bg-primary-500 text-white p-2.5 rounded-lg transition-colors"><HiOutlineArrowRight /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-w-[1200px] mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                    <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">© 2026 i Computers. All rights reserved.</p>
                                    <div className="flex items-center gap-6">
                                        {['FB', 'IG', 'TW', 'YT'].map(s => <span key={s} className="text-gray-600 hover:text-white cursor-pointer text-xs font-bold transition-colors">{s}</span>)}
                                    </div>
                                </div>
                            </footer>
                        </div>
                    } />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={
                        <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                            <h1 className="text-3xl sm:text-4xl font-bold font-headings text-white mb-4">About <span className="text-primary-500">Us</span></h1>
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
                            <h1 className="text-3xl sm:text-4xl font-bold font-headings text-white mb-4">Contact <span className="text-primary-500">Us</span></h1>
                        </div>
                    } />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<OrdersPage />} />

                    <Route path="*" element={
                        <div className="w-full py-40 text-center">
                            <h1 className="text-3xl sm:text-4xl font-bold font-headings text-white mb-4">Page Not Found</h1>
                        </div>
                    } />
                </Routes>
            </main>
        </div>
    );
}