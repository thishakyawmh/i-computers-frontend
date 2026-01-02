import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function ContactPage() {
    return (
        <div className="w-full pt-32 pb-20">
            <section className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold font-headings text-white mb-8 transition-all">
                        Get in <span className="text-primary-500">Touch</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
                        Have a question about a build or need technical assistance? Our experts are ready to assist you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1 space-y-6">
                        {[
                            {
                                title: "Email Us",
                                value: "support@icomputers.com",
                                sub: "Typically responds in 2 hours",
                                icon: HiOutlineEnvelope
                            },
                            {
                                title: "Call Us",
                                value: "+94 710 506 202",
                                sub: "Mon-Sat, 9AM to 7PM",
                                icon: HiOutlinePhone
                            },
                            {
                                title: "Visit Store",
                                value: "No. 12, Galle Road, Colombo 03",
                                sub: "Free parking available",
                                icon: HiOutlineMapPin
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] hover:border-primary-500/30 transition-all group">
                                <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center text-primary-500 text-2xl mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon />
                                </div>
                                <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-white mb-2">{item.value}</p>
                                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">{item.sub}</p>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white/[0.02] border border-white/5 p-10 md:p-16 rounded-[48px] backdrop-blur-md relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px] -mr-48 -mt-48"></div>

                            <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary-500/50 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary-500/50 transition-colors"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary-500/50 transition-colors appearance-none">
                                        <option className="bg-black">Custom Build Inquiry</option>
                                        <option className="bg-black">Technical Support</option>
                                        <option className="bg-black">Warranty Claim</option>
                                        <option className="bg-black">Other</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Your Message</label>
                                    <textarea
                                        rows="5"
                                        placeholder="How can we help you?"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-primary-500/50 transition-colors resize-none"
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button className="w-full py-5 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all duration-500 shadow-glow flex items-center justify-center gap-3 uppercase tracking-widest text-sm">
                                        Send Message <HiOutlineChatBubbleLeftRight className="text-xl" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
