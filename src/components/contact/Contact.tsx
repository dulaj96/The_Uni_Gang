import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSend, LuPhone, LuMail, LuMapPin, LuMessageSquareQuote, LuMonitor, LuSearch, LuCalendarDays, LuUsers, LuStar, LuChevronDown, LuUser } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard.tsx';

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
    { icon: <LuMonitor />, value: "45+", label: "Web, Apps Developed" },
    { icon: <LuSearch />, value: "20+", label: "SEO Projects" },
    { icon: <LuCalendarDays />, value: "60+", label: "Events Displayed" },
    { icon: <LuUsers />, value: "150+", label: "Happy Clients" }
];

const TestimonialCard = ({ feedback }: { feedback: Feedback }) => {
    const nameParts = feedback.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return (
        <div className="relative p-6 flex-shrink-0" style={{ width: "340px" }}>
            <div className="absolute text-gray-200 dark:text-slate-800 select-none" style={{ top: "62px", left: "22px", fontSize: "44px", lineHeight: 1, fontFamily: "Georgia, serif", zIndex: 10 }}>"</div>
            <div className="absolute text-gray-200 dark:text-slate-800 select-none" style={{ bottom: "50px", right: "22px", fontSize: "44px", lineHeight: 1, fontFamily: "Georgia, serif", zIndex: 10 }}>"</div>

            <TiltCard>
                <div className="relative z-10 mt-1">
                    <div className="absolute z-20" style={{ top: "-20px", right: "16px" }}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="rounded-full bg-white dark:bg-slate-900 border-[4px] border-[#E91E63] overflow-hidden shadow-lg"
                            style={{ width: "72px", height: "72px" }}
                        >
                            <img src={feedback.avatar} alt={feedback.name} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>

                    <div className="relative px-6 py-5 shadow-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/20 rounded-[22px] min-h-[190px]">
                        <div className="mb-3 pr-20">
                            <p className="font-extrabold uppercase tracking-wide leading-tight text-[0.95rem]">
                                <span style={{ color: "#E91E63" }}>{firstName} </span>
                                <span className="text-gray-800 dark:text-slate-100">{lastName}</span>
                            </p>
                            <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5 font-medium">{feedback.role}</p>
                        </div>

                        <div className="relative">
                            <span className="absolute -left-2 -top-1 text-[#E91E63] text-2xl font-serif">'</span>
                            <p className="text-gray-600 dark:text-slate-400 text-xs text-center leading-relaxed px-2 font-serif italic">
                                {feedback.comment}
                            </p>
                            <span className="absolute -right-1 -bottom-1 text-[#E91E63] text-2xl font-serif">'</span>
                        </div>

                        <div className="mt-6 flex items-center gap-1.5">
                            <div className="flex-1 h-px bg-[#E91E63]/20" />
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <LuStar key={i} size={14} fill={i < feedback.rating ? "#FFC107" : "none"} stroke={i < feedback.rating ? "#FFC107" : "#ccc"} />
                                ))}
                            </div>
                            <div className="flex-1 h-px bg-[#E91E63]/20" />
                        </div>

                        <div className="absolute -bottom-[22px] right-[52px] w-0 h-0 border-l-[16px] border-l-transparent border-t-[22px] border-t-white/70 dark:border-t-slate-800/70" />
                    </div>
                </div>
            </TiltCard>
        </div>
    );
};

const Contact = () => {
    const [activeTab, setActiveTab] = useState<'contact' | 'feedback'>('feedback');
    const [rating, setRating] = useState(0);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [inquiryType, setInquiryType] = useState('');
    const [message, setMessage] = useState('');

    const handleSendInquiry = () => {
        if (!name.trim() || !email.trim() || !inquiryType || !message.trim()) {
            alert("Please fill all fields");
            return;
        }
        const waNumber = '94724478148';
        const typeStr = inquiryType ? `*Type:* ${inquiryType}` : '*Type:* General Inquiry / Problem';
        const text = `*New Contact Request*\n\n*Name:* ${name}\n*Email:* ${email}\n${typeStr}\n\n*Message:*\n${message}`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
        setName(''); setEmail(''); setInquiryType(''); setMessage('');
    };

    return (
        <section id="contact" className="relative pt-12 pb-10 bg-slate-150 font-sans overflow-hidden">
            {/* Ambient background decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-fixed/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-50"></div>

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                        Contact <span className="text-primary italic">The Uni Gang</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch mb-32 px-4 md:px-8">
                    {/* Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-white/30 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] h-full flex flex-col transition-all duration-500 hover:border-primary/30">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Reach Out To Us</h3>

                            <div className="space-y-10 flex-grow">
                                {[
                                    { icon: LuMail, label: "Email Endpoint", value: "uniganglk@gmail.com" },
                                    { icon: LuPhone, label: "Direct Hotline", value: "+94 72 447 8148" },
                                    { icon: LuMapPin, label: "Our Base", value: "Colombo, Sri Lanka" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex gap-6 items-center group cursor-pointer"
                                    >
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                                            className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                                        >
                                            <item.icon className="text-2xl" />
                                        </motion.div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">{item.label}</p>
                                            <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                                className="mt-16 p-8 rounded-[2rem] bg-white/5 dark:bg-slate-800/20 backdrop-blur-lg border border-white/10 dark:border-slate-700/30 overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Online Now</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Typical response time: <span className="text-primary font-bold">~2 Hours</span></p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Pro Dual Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-white/40 dark:border-slate-800/50 shadow-[0_8px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_40px_rgb(0,0,0,0.2)] bg-white/30 dark:bg-slate-900/40 backdrop-blur-3xl p-8 flex flex-col transition-all duration-500 hover:border-primary/20">
                            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-slate-700/50 to-transparent" />

                            <div className="flex gap-2 p-1.5 rounded-3xl border border-white/40 dark:border-slate-800 mb-8 bg-white/20 dark:bg-slate-900/20 backdrop-blur-md">
                                <button
                                    onClick={() => setActiveTab('feedback')}
                                    className={`flex-1 py-4 rounded-[1.25rem] text-[11px] font-bold uppercase tracking-widest transition-all duration-500 relative ${activeTab === 'feedback' ? 'text-[#E91E63]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {activeTab === 'feedback' && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white/90 dark:bg-slate-800 rounded-[1.25rem] shadow-xl border border-white dark:border-slate-700"></motion.div>}
                                    <span className="relative z-10">Client Feedback</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`flex-1 py-4 rounded-[1.25rem] text-[11px] font-bold uppercase tracking-widest transition-all duration-500 relative ${activeTab === 'contact' ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {activeTab === 'contact' && <motion.div layoutId="tab-pill" className="absolute inset-0 bg-white/90 dark:bg-slate-800 rounded-[1.25rem] shadow-xl border border-white dark:border-slate-700"></motion.div>}
                                    <span className="relative z-10">Report Problem</span>
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col gap-4 flex-grow"
                                >
                                    {activeTab === 'contact' ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                                <div className="group">
                                                    <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-[1.25rem] text-sm font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-[1.5px] border-white/60 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:bg-white/70 dark:group-hover:bg-slate-800/70 text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                                                </div>
                                                <div className="group">
                                                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-[1.25rem] text-sm font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-[1.5px] border-white/60 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:bg-white/70 dark:group-hover:bg-slate-800/70 text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                                                </div>
                                            </div>
                                            <div className="relative group mb-5">
                                                <select required value={inquiryType} onChange={(e) => setInquiryType(e.target.value)} className="w-full px-6 py-4 rounded-[1.25rem] text-sm font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-[1.5px] border-white/60 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none appearance-none cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:bg-white/70 dark:group-hover:bg-slate-800/70 text-slate-700 dark:text-slate-200">
                                                    <option disabled value="">Select Inquiry or Problem Type</option>
                                                    <option value="General Inquiry">General Inquiry</option>
                                                    <option value="Report a Bug / Problem">Report a Bug / Problem</option>
                                                    <option value="Request a New Service / Dev">Request a New Service / Dev</option>
                                                    <option value="Accommodation Listing Help">Accommodation Listing Help</option>
                                                    <option value="Event Posting Help">Event Posting Help</option>
                                                </select>
                                                <LuChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-primary transition-colors" />
                                            </div>
                                            <div className="group mb-6">
                                                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell us about your problem, question, or request..." className="w-full px-6 py-4 rounded-[1.25rem] text-sm font-semibold bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border-[1.5px] border-white/60 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] group-hover:bg-white/70 dark:group-hover:bg-slate-800/70 text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                                            </div>
                                            <motion.button
                                                onClick={handleSendInquiry}
                                                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.4)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full mt-auto py-4 rounded-[1.25rem] text-white text-[11px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-primary flex items-center justify-center gap-3 transition-all"
                                            >
                                                Send Message <LuSend size={14} />
                                            </motion.button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/20 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/50">
                                                <label className="relative cursor-pointer group">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={(e) => {
                                                            if (e.target.files && e.target.files[0]) {
                                                                setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                                                            }
                                                        }}
                                                    />
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        className="w-16 h-16 rounded-3xl border-2 border-dashed border-slate-400 flex items-center justify-center bg-white/40 dark:bg-slate-800/40"
                                                    >
                                                        {avatarPreview ? <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover rounded-3xl" /> : <LuUser className="text-slate-400 size-6" />}
                                                        <div className="absolute -bottom-1 -right-1 bg-[#E91E63] text-white text-[8px] font-black px-1.5 py-0.5 rounded-lg shadow-lg">UP</div>
                                                    </motion.div>
                                                </label>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">Profile Avatar</p>
                                                    <p className="text-[10px] text-slate-500 font-medium">JPG/PNG · Max 5MB · Auto-crops to 1:1</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input required type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl text-sm font-medium bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/50 focus:border-[#E91E63] outline-none shadow-inner" />
                                                <input required type="text" placeholder="Club / University" className="w-full px-6 py-4 rounded-2xl text-sm font-medium bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/50 focus:border-[#E91E63] outline-none shadow-inner" />
                                            </div>
                                            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/20 dark:bg-slate-800/40 border border-white/40 dark:border-slate-700/50">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rate Your Experience</p>
                                                <div className="flex gap-3">
                                                    {[1, 2, 3, 4, 5].map((i) => (
                                                        <motion.button key={i} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => setRating(i)} className={`text-4xl transition-colors ${i <= rating ? 'text-[#FFD700]' : 'text-slate-200 dark:text-slate-700'}`}>
                                                            <LuStar fill={i <= rating ? 'currentColor' : 'none'} />
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                            <textarea required rows={3} placeholder="Tell your Feedback..." className="w-full px-6 py-4 rounded-2xl text-sm font-medium bg-white/40 dark:bg-slate-800/40 border border-white/60 dark:border-slate-700/50 focus:border-[#E91E63] outline-none resize-none shadow-inner" />
                                            <motion.button
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-4 mt-auto rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl bg-gradient-to-r from-[#E91E63] to-[#880E4F] flex items-center justify-center gap-3"
                                            >
                                                Post Feedback <LuMessageSquareQuote size={14} />
                                            </motion.button>
                                        </>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>

                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-5 text-center"
                >
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
                        What Our <span className="text-[#E91E63] italic">Clients Say</span>
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent mx-auto"></div>
                </motion.div>

                <div className="relative overflow-hidden pt-15 pb-30">
                    <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#f7f9fb] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#f7f9fb] dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

                    <div className="flex gap-8 animate-marquee">
                        {[...feedbacks, ...feedbacks, ...feedbacks].map((f, i) => (
                            <TestimonialCard key={`${f.id}-${i}`} feedback={f} />
                        ))}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
                            .animate-marquee { animation: marquee 60s linear infinite; width: max-content; }
                            .animate-marquee:hover { animation-play-state: paused; }
                        `
                    }} />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <TiltCard>
                                <div className="premium-glass p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] text-center group transition-all duration-500 hover:shadow-2xl flex flex-col items-center">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 1 }}
                                        className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-primary text-2xl md:text-4xl mb-4 md:mb-8 group-hover:bg-primary group-hover:text-white transition-colors"
                                    >
                                        {s.icon}
                                    </motion.div>
                                    <h4 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tighter">{s.value}</h4>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.3em] text-slate-400 group-hover:text-primary transition-colors">{s.label}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;