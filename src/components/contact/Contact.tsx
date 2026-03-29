import React, { useState } from 'react';
import { LuSend, LuPhone, LuMail, LuMapPin, LuMessageSquareQuote, LuMonitor, LuSearch, LuCalendarDays, LuUsers, LuStar, LuChevronDown, LuUser } from 'react-icons/lu';

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
// const DotGrid = ({ style }: { style: React.CSSProperties }) => (
//     <div className="absolute pointer-events-none" style={style}>
//         {[0, 1, 2].map((row) => (
//             <div key={row} className="flex gap-1.5 mb-1.5">
//                 {[0, 1, 2].map((col) => (
//                     <div
//                         key={col}
//                         className="rounded-full"
//                         style={{ width: "5px", height: "5px", background: "#E91E63", opacity: 0.4 }}
//                     />
//                 ))}
//             </div>
//         ))}
//     </div>
// );

// Individual Testimonial Card (speech bubble design from template)
const TestimonialCard = ({ feedback }: { feedback: Feedback }) => {
    // Split name for pink/dark styling
    const nameParts = feedback.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return (
        <div className="relative p-6 flex-shrink-0" style={{ width: "340px" }}>
            {/* Top-left gray wave blob */}
            {/* <div className="absolute top-0 left-0 pointer-events-none" style={{ width: "120px", height: "90px" }}>
                <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 C40 0, 80 15, 110 45 C120 60, 115 90, 85 90 L0 90 Z" fill="#EBEBEB" className="dark:opacity-10" />
                </svg>
            </div> */}

            {/* Bottom-left pink wave blob */}
            {/* <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: "130px", height: "100px" }}>
                <svg viewBox="0 0 130 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 C0 65, 20 38, 52 25 C85 12, 125 32, 130 65 L130 100 Z" fill="#C2185B" opacity="0.80" />
                </svg>
            </div> */}

            {/* Horizontal pink + gray bar stripes (mid-card accent) */}
            {/* <div className="absolute left-0 right-0 pointer-events-none" style={{ top: "140px", height: "38px" }}>
                <div style={{ height: "5px", background: "#E91E63", marginBottom: "4px" }} />
                <div style={{ height: "5px", background: "#9E9E9E", opacity: 0.25, marginBottom: "4px" }} />
                <div style={{ height: "5px", background: "#9E9E9E", opacity: 0.25 }} />
            </div> */}

            {/* Decorative dot grids */}
            {/* <DotGrid style={{ top: "48px", right: "28px", zIndex: 10 }} />
            <DotGrid style={{ bottom: "60px", left: "28px", zIndex: 10 }} /> */}

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
            {/* <div className="relative z-10 mb-4">
                <p className="text-gray-800 dark:text-slate-200 font-semibold text-sm" style={{ fontFamily: "Georgia, serif" }}>
                    <span style={{ color: "#E91E63", fontSize: "1.1rem" }}>"</span>
                    What Our Clients Say!
                    <span style={{ color: "#E91E63", fontSize: "1.1rem" }}>"</span>
                </p>
            </div> */}

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
                    className="relative px-6 py-5 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20"
                    style={{
                        minHeight: "190px",
                        borderRadius: "22px",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" // මෙන්න මේකෙන් Glass look එක වැඩියෙන් එනවා
                    }}
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
                            borderTop: "22px solid rgba(255, 255, 255, 0.7)", // මෙන්න මේ පාට තමයි දාන්න ඕනේ
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
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Simple handle for file input changes (optional but good UI)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section id="contact" className="relative pt-24 pb-5 px-4 md:px-8 bg-[#f7f9fb] dark:bg-slate-950 font-sans overflow-hidden">
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
                        {/* Main Card: Opacity එක අඩු කරලා Blur එක වැඩි කළා */}
                        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/30 dark:border-slate-800 shadow-2xl h-full transition-all duration-500">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Reach Out To Us</h3>

                            <div className="space-y-10">
                                {/* Email Item */}
                                <div className="flex gap-6 items-center group cursor-pointer">
                                    {/* Icon Div: group-hover:scale-110 එකෙන් ලොකු වෙලා පේනවා */}
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        <LuMail className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Email Endpoint</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">hello@theunigang.com</p>
                                    </div>
                                </div>

                                {/* Phone Item */}
                                <div className="flex gap-6 items-center group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        <LuPhone className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Direct Hotline</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">+94 77 123 4567</p>
                                    </div>
                                </div>

                                {/* Location Item */}
                                <div className="flex gap-6 items-center group cursor-pointer">
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500">
                                        <LuMapPin className="text-2xl" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Our Base</p>
                                        <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Online Status Box: මේකත් තව Glassy කළා */}
                            <div className="mt-16 p-8 rounded-[2rem] bg-white/5 dark:bg-slate-800/20 backdrop-blur-lg border border-white/10 dark:border-slate-700/30">
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
                    <div className="lg:col-span-7 p-4">
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/55 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
                            style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(24px)' }}>

                            {/* Top shine line */}
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

                            {/* Tab switcher */}
                            <div className="p-4 pb-0">
                                <div className="flex gap-1 p-1.5 rounded-[1.25rem] border border-white/40"
                                    style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                                    <button
                                        onClick={() => setActiveTab('contact')}
                                        className={`flex-1 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'contact'
                                            ? 'bg-white/85 text-primary shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_1px_0_white]'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        Request Service
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('feedback')}
                                        className={`flex-1 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === 'feedback'
                                            ? 'bg-white/85 text-[#E91E63] shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_1px_0_white]'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        Client Feedback
                                    </button>
                                </div>
                            </div>

                            {/* Form body */}
                            <div className="p-5 flex flex-col gap-3">
                                {activeTab === 'contact' ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input type="text" placeholder="Full Name" className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none transition-all duration-250 border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] focus:border-white/90 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08),inset_0_1px_3px_rgba(0,0,0,0.04)]"
                                                style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />
                                            <input type="email" placeholder="Email Address" className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none transition-all duration-250 border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] focus:border-white/90 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08),inset_0_1px_3px_rgba(0,0,0,0.04)]"
                                                style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />
                                        </div>

                                        <div className="relative">
                                            <select className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-400 outline-none appearance-none cursor-pointer border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]"
                                                style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }}>
                                                <option disabled selected>Select Service Interest</option>
                                                <option>Custom Web Application</option>
                                                <option>Growth SEO & Analytics</option>
                                                <option>Digital Interface Redesign</option>
                                                <option>Campus Ecosystem Integration</option>
                                            </select>
                                            <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400/70 pointer-events-none" size={14} />
                                        </div>

                                        <textarea rows={4} placeholder="Project Brief / Message"
                                            className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none resize-none border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]"
                                            style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />

                                        <button className="w-full py-4 rounded-[18px] text-white text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                                            style={{ background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)', boxShadow: '0 4px 20px rgba(26,115,232,0.35), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                                            Send Inquiry
                                            <LuSend size={13} />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* Avatar upload */}
                                        <div className="flex items-center gap-4 p-4 rounded-[18px] border border-white/45"
                                            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                                            <label className="relative cursor-pointer flex-shrink-0">
                                                <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-300/60 hover:border-[#E91E63]/50 flex items-center justify-center transition-all duration-300"
                                                    style={{ background: 'rgba(255,255,255,0.3)' }}>
                                                    {avatarPreview
                                                        ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                                                        : <LuUser className="text-slate-300/70" size={22} />}
                                                </div>
                                                <span className="absolute -bottom-1.5 -right-1.5 bg-[#E91E63] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-lg uppercase tracking-wider">
                                                    Upload
                                                </span>
                                            </label>
                                            <div>
                                                <p className="text-[13px] font-semibold text-slate-700 mb-0.5">Profile Picture</p>
                                                <p className="text-[11px] text-slate-400/70">Optional · JPG or PNG · Max 5MB</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input type="text" placeholder="Your Name" className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none transition-all duration-250 border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] focus:border-white/90 focus:shadow-[0_0_0_3px_rgba(233,30,99,0.08)]"
                                                style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />
                                            <input type="text" placeholder="Your Role / Uni" className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none transition-all duration-250 border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)] focus:border-white/90 focus:shadow-[0_0_0_3px_rgba(233,30,99,0.08)]"
                                                style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />
                                        </div>

                                        {/* Star rating */}
                                        <div className="flex flex-col items-center gap-2.5 py-4 px-4 rounded-[18px] border border-white/45"
                                            style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400/60">Rate Your Experience</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <button key={i} type="button" onClick={() => setRating(i)}
                                                        className={`text-[26px] transition-all duration-150 hover:-translate-y-0.5 ${i <= rating ? 'text-yellow-400' : 'text-slate-200/60'}`}>
                                                        <LuStar fill={i <= rating ? 'currentColor' : 'none'} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <textarea rows={3} placeholder="Share your experience..."
                                            className="w-full px-[18px] py-3.5 rounded-2xl text-sm font-medium text-slate-800 placeholder:text-slate-400/60 placeholder:font-normal outline-none resize-none border border-white/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]"
                                            style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)' }} />

                                        <button className="w-full py-4 rounded-[18px] text-white text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                                            style={{ background: 'linear-gradient(135deg, #E91E63 0%, #AD1457 100%)', boxShadow: '0 4px 20px rgba(233,30,99,0.35), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                                            Submit Testimonial
                                            <LuMessageSquareQuote size={13} />
                                        </button>
                                    </>
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