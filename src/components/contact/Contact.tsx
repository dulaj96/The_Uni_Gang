import React, { useState } from 'react';
import { LuSend, LuPhone, LuMail, LuMapPin, LuMessageSquareQuote, LuMonitor, LuSearch, LuCalendarDays, LuUsers, LuStar } from 'react-icons/lu';

interface Feedback {
    id: number;
    name: string;
    role: string;
    comment: string;
    avatar: string;
    rating: number;
}

const feedbacks: Feedback[] = [
    {
        id: 1,
        name: "Amara Perera",
        role: "Club President, UOM",
        comment: "The Uni Gang designed our club's website perfectly! The campus events display is a game changer for our member engagement.",
        avatar: "https://i.pravatar.cc/150?u=1",
        rating: 5,
    },
    {
        id: 2,
        name: "Kasun Jayawardena",
        role: "Annex Owner",
        comment: "Outstanding SEO services. Our annex listings are now on the first page of search results, bringing in more students than ever.",
        avatar: "https://i.pravatar.cc/150?u=2",
        rating: 5,
    },
    {
        id: 3,
        name: "Sajini Fernando",
        role: "Secretary, Student Society",
        comment: "The web app they developed for our student society is incredibly intuitive and fast. Highly recommend their development team!",
        avatar: "https://i.pravatar.cc/150?u=3",
        rating: 4,
    },
    {
        id: 4,
        name: "Nuwan Silva",
        role: "University Student",
        comment: "I love how easy it is to find and track campus events here. Great service for students to stay connected.",
        avatar: "https://i.pravatar.cc/150?u=4",
        rating: 5,
    },
    {
        id: 5,
        name: "Dilini Ratnayake",
        role: "Tech Entrepreneur",
        comment: "Professional web designing at its best. They really understood our brand identity and delivered a stunning platform.",
        avatar: "https://i.pravatar.cc/150?u=5",
        rating: 5,
    },
    {
        id: 6,
        name: "Tharindu Bandara",
        role: "Event Organizer",
        comment: "Their digital solutions have significantly improved our engagement. The event listing feature is top-notch.",
        avatar: "https://i.pravatar.cc/150?u=6",
        rating: 5,
    }
];

const stats = [
    { icon: <LuMonitor />, value: "50+", label: "Web Apps Developed" },
    { icon: <LuSearch />, value: "120+", label: "SEO Projects" },
    { icon: <LuCalendarDays />, value: "200+", label: "Events Displayed" },
    { icon: <LuUsers />, value: "5000+", label: "Happy Clients" }
];

// Dot Grid decorator (from testimonial card design)
const DotGrid = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute pointer-events-none" style={style}>
        {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-1.5 mb-1.5">
                {[0, 1, 2].map((col) => (
                    <div
                        key={col}
                        className="rounded-full"
                        style={{ width: "5px", height: "5px", background: "#E91E63", opacity: 0.4 }}
                    />
                ))}
            </div>
        ))}
    </div>
);

// Individual Testimonial Card (speech bubble design from template)
const TestimonialCard = ({ feedback }: { feedback: Feedback }) => {
    // Split name for pink/dark styling
    const nameParts = feedback.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return (
        <div
            className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-lg overflow-hidden flex-shrink-0"
            style={{ width: "340px", padding: "28px 24px 24px" }}
        >
            {/* Top-left gray wave blob */}
            <div className="absolute top-0 left-0 pointer-events-none" style={{ width: "120px", height: "90px" }}>
                <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 C40 0, 80 15, 110 45 C120 60, 115 90, 85 90 L0 90 Z" fill="#EBEBEB" className="dark:opacity-10" />
                </svg>
            </div>

            {/* Bottom-left pink wave blob */}
            <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: "130px", height: "100px" }}>
                <svg viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 C0 65, 20 38, 52 25 C85 12, 125 32, 130 65 L130 100 Z" fill="#C2185B" opacity="0.80" />
                </svg>
            </div>

            {/* Horizontal pink + gray bar stripes (mid-card accent) */}
            <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "140px", height: "38px" }}>
                <div style={{ height: "5px", background: "#E91E63", marginBottom: "4px" }} />
                <div style={{ height: "5px", background: "#9E9E9E", opacity: 0.25, marginBottom: "4px" }} />
                <div style={{ height: "5px", background: "#9E9E9E", opacity: 0.25 }} />
            </div>

            {/* Decorative dot grids */}
            <DotGrid style={{ top: "48px", right: "28px", zIndex: 10 }} />
            <DotGrid style={{ bottom: "60px", left: "28px", zIndex: 10 }} />

            {/* Large open-quote (top-left, outside bubble) */}
            <div
                className="absolute text-gray-200 dark:text-slate-700 select-none"
                style={{ top: "62px", left: "22px", fontSize: "44px", lineHeight: 1, fontFamily: "Georgia, serif", zIndex: 10 }}
            >
                "
            </div>

            {/* Large close-quote (bottom-right, outer card) */}
            <div
                className="absolute text-gray-200 dark:text-slate-700 select-none"
                style={{ bottom: "50px", right: "22px", fontSize: "44px", lineHeight: 1, fontFamily: "Georgia, serif", zIndex: 10 }}
            >
                "
            </div>

            {/* Headline */}
            <div className="relative z-10 mb-4">
                <p className="text-gray-800 dark:text-slate-200 font-semibold text-sm" style={{ fontFamily: "Georgia, serif" }}>
                    <span style={{ color: "#E91E63", fontSize: "1.1rem" }}>"</span>
                    What Our Clients Say!
                    <span style={{ color: "#E91E63", fontSize: "1.1rem" }}>"</span>
                </p>
            </div>

            {/* Speech Bubble Area */}
            <div className="relative z-10 mt-1">
                {/* Avatar — overlapping top-right of bubble */}
                <div className="absolute z-20" style={{ top: "-20px", right: "16px" }}>
                    <div
                        className="rounded-full bg-white dark:bg-slate-900"
                        style={{ width: "72px", height: "72px", border: "4px solid #E91E63", overflow: "hidden" }}
                    >
                        <img
                            src={feedback.avatar}
                            alt={feedback.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* Bubble Body */}
                <div
                    className="relative bg-gray-100 dark:bg-slate-800 rounded-3xl px-6 py-5"
                    style={{ minHeight: "190px", borderRadius: "22px" }}
                >
                    {/* Name & Role */}
                    <div className="mb-3 pr-20">
                        <p className="font-extrabold uppercase tracking-wide leading-tight" style={{ fontSize: "0.95rem" }}>
                            <span style={{ color: "#E91E63" }}>{firstName} </span>
                            <span className="text-gray-800 dark:text-slate-100">{lastName}</span>
                        </p>
                        <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5 font-medium">{feedback.role}</p>
                    </div>

                    {/* Testimonial text with pink quotes */}
                    <div className="relative">
                        <span
                            className="absolute"
                            style={{ top: "-2px", left: "-8px", color: "#E91E63", fontSize: "1.5rem", lineHeight: 1, fontFamily: "Georgia, serif" }}
                        >
                            '
                        </span>
                        <p
                            className="text-gray-600 dark:text-slate-400 text-xs text-center leading-relaxed px-2"
                            style={{ fontFamily: "Georgia, serif" }}
                        >
                            {feedback.comment}
                        </p>
                        <span
                            className="absolute"
                            style={{ bottom: "-6px", right: "-4px", color: "#E91E63", fontSize: "1.5rem", lineHeight: 1, fontFamily: "Georgia, serif" }}
                        >
                            '
                        </span>
                    </div>

                    {/* Stars with pink divider lines */}
                    <div className="mt-6 flex items-center gap-1.5">
                        <div style={{ flex: 1, height: "1px", background: "#E91E63" }} />
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <LuStar
                                    key={i}
                                    size={16}
                                    fill={i < feedback.rating ? "#FFC107" : "none"}
                                    stroke={i < feedback.rating ? "#FFC107" : "#ccc"}
                                />
                            ))}
                        </div>
                        <div style={{ flex: 1, height: "1px", background: "#E91E63" }} />
                    </div>

                    {/* Bubble tail triangle */}
                    <div
                        className="absolute"
                        style={{
                            bottom: "-22px",
                            right: "52px",
                            width: 0,
                            height: 0,
                            borderLeft: "16px solid transparent",
                            borderRight: "0px solid transparent",
                            borderTop: "22px solid #F3F4F6",
                        }}
                    />
                </div>
            </div>

            {/* Bottom spacer so card has breathing room after the tail */}
            <div className="relative z-10 mt-8" />
        </div>
    );
};

const Contact = () => {
    const [activeTab, setActiveTab] = useState<'contact' | 'feedback'>('contact');
    const [rating, setRating] = useState(0);

    return (
        <section id="contact" className="relative py-24 px-4 md:px-8 bg-[#f7f9fb] dark:bg-slate-950 font-sans overflow-hidden">
            {/* Ambient background decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-fixed/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        Contact <span className="text-primary italic">The Uni Gang</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        Ready to elevate your digital presence? Reach out to our expert team for custom web solutions, SEO growth, or leave your valuable feedback below.
                    </p>
                </div>

                {/* Main Content: Info & Pro Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">

                    {/* Contact Info Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-white/60 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.03)] h-full">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Reach Out To Us</h3>

                            <div className="space-y-10">
                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <LuMail className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Email Endpoint</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">hello@theunigang.com</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <LuPhone className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Direct Hotline</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">+94 77 123 4567</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 items-center group">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <LuMapPin className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Our Base</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Online Now</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Typical response time: <span className="text-primary font-bold">~2 Hours</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Pro Dual Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-white/60 dark:border-slate-800 overflow-hidden">
                            {/* Tab Switcher */}
                            <div className="flex p-2 bg-slate-100/50 dark:bg-slate-800/50 m-6 rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50">
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`flex-1 py-4 rounded-[1.6rem] text-sm font-bold uppercase tracking-tighter transition-all duration-500 ${activeTab === 'contact' ? 'bg-white dark:bg-slate-700 shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Service Request
                                </button>
                                <button
                                    onClick={() => setActiveTab('feedback')}
                                    className={`flex-1 py-4 rounded-[1.6rem] text-sm font-bold uppercase tracking-tighter transition-all duration-500 ${activeTab === 'feedback' ? 'bg-white dark:bg-slate-700 shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    Client Feedback
                                </button>
                            </div>

                            <div className="p-8 md:p-10 pt-4">
                                {activeTab === 'contact' ? (
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400" />
                                            <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400" />
                                        </div>
                                        <select className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium appearance-none cursor-pointer text-slate-500">
                                            <option disabled selected>Select Service Interest</option>
                                            <option>Custom Web Application</option>
                                            <option>Growth SEO & Analytics</option>
                                            <option>Digital Interface Redesign</option>
                                            <option>Campus Ecosystem Integration</option>
                                        </select>
                                        <textarea rows={4} placeholder="Project Brief / Message" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium resize-none placeholder:text-slate-400"></textarea>
                                        <button className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 transition-all duration-500 flex items-center justify-center gap-3 uppercase tracking-tighter text-sm">
                                            Send Inquiry
                                            <LuSend className="text-lg" />
                                        </button>
                                    </form>
                                ) : (
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400" />
                                            <input type="text" placeholder="Your Role / Uni" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium placeholder:text-slate-400" />
                                        </div>

                                        <div className="text-center space-y-3">
                                            <p className="text-sm font-bold text-slate-400 tracking-tight">How was your experience?</p>
                                            <div className="flex justify-center gap-3">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => setRating(i)}
                                                        className={`text-4xl transition-all duration-300 ${i <= rating ? 'text-yellow-400 scale-110' : 'text-slate-200 hover:text-yellow-100'}`}
                                                    >
                                                        <LuStar fill={i <= rating ? "currentColor" : "none"} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <textarea rows={4} placeholder="Your Feedback" className="w-full px-6 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all duration-300 font-medium resize-none placeholder:text-slate-400"></textarea>

                                        <button className="w-full py-5 bg-[#E91E63] text-white font-bold rounded-2xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-500 flex items-center justify-center gap-3 uppercase tracking-tighter text-sm">
                                            Submit Testimonial
                                            <LuMessageSquareQuote className="text-lg" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Testimonial Cards Marquee (speech-bubble design) ── */}
                <div className="mb-8 text-center">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
                        What Our <span className="text-[#E91E63] italic">Clients Say</span>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light">Real experiences from real people across Sri Lanka</p>
                </div>

                <div className="relative overflow-hidden py-16">
                    {/* Gradient fade masks */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f7f9fb] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f7f9fb] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

                    {/* Marquee strip */}
                    <div className="flex gap-8 animate-marquee">
                        {[...feedbacks, ...feedbacks].map((f, i) => (
                            <TestimonialCard key={`${f.id}-${i}`} feedback={f} />
                        ))}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes marquee {
                                0%   { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                            .animate-marquee {
                                animation: marquee 32s linear infinite;
                                width: max-content;
                            }
                            .animate-marquee:hover {
                                animation-play-state: paused;
                            }
                        `
                    }} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/60 dark:border-slate-800 shadow-sm text-center group transition-all duration-500 hover:-translate-y-2 hover:bg-white dark:hover:bg-slate-800">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-primary text-3xl mx-auto mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                                {s.icon}
                            </div>
                            <h4 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">{s.value}</h4>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;