import { HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineCpuChip, HiOutlineRocketLaunch } from "react-icons/hi2";

export default function AboutPage() {
    const stats = [
        { label: "Founded", value: "2016" },
        { label: "Systems Built", value: "8,500+" },
        { label: "Happy Clients", value: "12k+" },
        { label: "Support", value: "24/7" },
    ];

    const values = [
        {
            title: "Peak Performance",
            desc: "We don't just build PCs; we craft high-performance engines designed to push limits.",
            icon: HiOutlineRocketLaunch
        },
        {
            title: "Expert Craftsmanship",
            desc: "Every build undergoes rigorous 48-hour stress testing and meticulous cable management.",
            icon: HiOutlineCpuChip
        },
        {
            title: "Lifetime Support",
            desc: "Our relationship doesn't end at checkout. We provide lifelong technical guidance.",
            icon: HiOutlineUserGroup
        },
        {
            title: "Unmatched Reliability",
            desc: "We use only Tier-1 components from world-class manufacturers to ensure longevity.",
            icon: HiOutlineShieldCheck
        }
    ];

    return (
        <div className="w-full pt-32 pb-20">
            <section className="max-w-[1200px] mx-auto px-6 mb-32">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headings text-white mb-8 leading-tight">
                        Powering the <br />
                        <span className="text-primary-500">Next Generation</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-light leading-relaxed mb-12">
                        At i Computers, we believe hardware should never be a bottleneck for your creativity or gaming prowess. Since 2016, we've been at the forefront of the high-performance computing industry in Sri Lanka.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                                <div className="text-xs text-primary-400 font-bold uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white/[0.02] border-y border-white/5 py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary-600/20 blur-[100px] rounded-full group-hover:bg-primary-600/30 transition-colors"></div>
                            <div className="relative aspect-video rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-3xl p-12 flex flex-col justify-center overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                                <h3 className="text-white text-3xl font-bold mb-6">Our Mission</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    To empower every gamer, creator, and professional with the tools they need to achieve greatness. We curate the finest hardware, offer world-class expertise, and deliver systems that are built to last.
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold font-headings text-white mb-12">Driven by <span className="text-primary-500">Excellence</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {values.map((v, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="w-12 h-12 bg-primary-600/10 rounded-xl flex items-center justify-center text-primary-500 text-2xl border border-primary-500/20">
                                            <v.icon />
                                        </div>
                                        <h4 className="text-white font-bold text-lg">{v.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-[1200px] mx-auto px-6 py-32 text-center">
                <h2 className="text-4xl font-bold font-headings text-white mb-12">Join the <span className="text-primary-500">Community</span></h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
                    Whether you're building your first PC or upgrading your corporate server infrastructure, we're here to help you make the right choice.
                </p>
                <button className="px-12 py-5 bg-white text-black hover:bg-primary-500 hover:text-white font-bold rounded-2xl transition-all duration-500 uppercase tracking-widest text-sm">
                    Connect With Us
                </button>
            </section>
        </div>
    );
}
