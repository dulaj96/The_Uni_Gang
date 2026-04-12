import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuSend, LuCircleCheck, LuCloudUpload, LuCalendar } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard.tsx';
import PageLoader from '../ui/PageLoader';
import { useNavigate } from 'react-router-dom';

const eventsList = [
    {
        id: 1,
        title: "Neon Nights: The University Musical",
        date: "24",
        month: "OCT",
        category: "Arts & Culture",
        location: "Main Auditorium, UOM",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
        attendees: "1.2k+",
        attendeeImages: [
            "https://i.pravatar.cc/150?u=1",
            "https://i.pravatar.cc/150?u=2",
            "https://i.pravatar.cc/150?u=3"
        ]
    },
    {
        id: 2,
        title: "Tech Summit 2024: AI Revolutions",
        date: "12",
        month: "NOV",
        category: "Technology",
        location: "Civil Auditorium, UOM",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        attendees: "800+",
        attendeeImages: [
            "https://i.pravatar.cc/150?u=4",
            "https://i.pravatar.cc/150?u=5",
        ]
    },
    {
        id: 3,
        title: "Inter-Uni Cricket Championship",
        date: "05",
        month: "DEC",
        category: "Sports",
        location: "University Grounds",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
        attendees: "3k+",
        attendeeImages: [
            "https://i.pravatar.cc/150?u=7",
            "https://i.pravatar.cc/150?u=8",
        ]
    },
    {
        id: 4,
        title: "InnovateX: Annual Entrepreneurship Forum",
        date: "18",
        month: "JAN",
        category: "Business & Startup",
        location: "Management Faculty Hall",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
        attendees: "500+",
        attendeeImages: [
            "https://i.pravatar.cc/150?u=9",
            "https://i.pravatar.cc/150?u=10",
            "https://i.pravatar.cc/150?u=11",
        ]
    },
    {
        id: 5,
        title: "Global Beats: International Food & Music Festival",
        date: "02",
        month: "FEB",
        category: "Lifestyle",
        location: "University Square",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
        attendees: "2.5k+",
        attendeeImages: [
            "https://i.pravatar.cc/150?u=12",
            "https://i.pravatar.cc/150?u=13",
            "https://i.pravatar.cc/150?u=14",
            "https://i.pravatar.cc/150?u=15",
        ]
    }
];

const stats = [
    { label: "Active Events", value: 124, icon: "event" },
    { label: "University Partners", value: 18, icon: "school" },
    { label: "User Engagement", value: "95%", icon: "trending_up" }
];

const FloatingSymbol = ({ symbol, index }: { symbol: string, index: number }) => (
    <motion.div
        initial={{ y: 0, opacity: 0.1 }}
        animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1]
        }}
        transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className="absolute text-primary/10 select-none pointer-events-none text-6xl font-bold"
        style={{
            left: `${10 + (index * 25)}%`,
            top: `${20 + (index * 15)}%`,
        }}
    >
        {symbol}
    </motion.div>
);

const Events = () => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Auto dismiss toast
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleUpcomingClick = () => {
        setIsNavigating(true);
        setTimeout(() => {
            navigate('/event-list');
            setTimeout(() => setIsNavigating(false), 100);
        }, 2000);
    };

    // Handle Form Submit
    const handleEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get('eventName');
            const uni = formData.get('university');
            const date = formData.get('eventDate');
            const phone = formData.get('phone');
            const description = formData.get('description');
            const extra = formData.get('extra');

            const message = `*✨ New Event Request ✨*%0A%0A` +
                `*Event Name:* ${name}%0A` +
                `*University & Faculty:* ${uni}%0A` +
                `*Event Date:* ${date}%0A` +
                `*WhatsApp Number:* ${phone}%0A%0A` +
                `*Description:* ${description}%0A%0A` +
                `*Extra Details:* ${extra}`;

            window.open(`https://wa.me/94724478148?text=${message}`, '_blank');

            setIsSubmitting(false);
            setIsModalOpen(false);
            setPreviewImage(null);
            setShowToast(true);
        }, 800);
    };

    useEffect(() => {
        let animationId: number;

        const scroll = () => {
            // Only scroll if ref exists and user is not hovering
            if (scrollRef.current && !isHovered) {
                // Decrement scrollLeft to move cards from left to right
                scrollRef.current.scrollLeft -= 1;

                // Infinite loop: Reset to middle if it reaches the start (0)
                if (scrollRef.current.scrollLeft <= 0) {
                    scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        // Set initial scroll position to middle to allow rightward movement
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }

        animationId = requestAnimationFrame(scroll);

        // Cleanup animation on unmount or hover state change
        return () => cancelAnimationFrame(animationId);
    }, [isHovered]);

    return (
        <section id="events" className="relative pt-12 pb-10 bg-slate-150 overflow-hidden">
            <PageLoader isLoading={isNavigating} message="Loading upcoming events..." />
            {/* Antigravity Floating Background Symbols */}
            <FloatingSymbol symbol="✧" index={0} />
            <FloatingSymbol symbol="✦" index={1} />
            <FloatingSymbol symbol="✺" index={2} />
            <FloatingSymbol symbol="❈" index={3} />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-10"
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                            Latest University <span className="text-primary italic">Events</span>
                        </h2>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Witness the pulse of university life. From tech summits to cultural galas, never miss a moment that matters.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center"
                    >
                        {['Upcoming', 'Create ur Event'].map((label, i) => (
                            <motion.button
                                key={label}
                                onClick={label === 'Create ur Event' ? () => setIsModalOpen(true) : label === 'Upcoming' ? handleUpcomingClick : undefined}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                // Text color එකත් ලා නිල් පාටට (Sky/Cyan) match වෙන්න වෙනස් කළා
                                className="group relative flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-4 premium-glass rounded-2xl w-full md:w-auto transition-all shadow-lg shadow-black/5 hover:bg-white/30 dark:hover:bg-slate-800/30 overflow-hidden text-sky-900 dark:text-sky-300"
                            >

                                {/* 🌀 Glowing Electric Blue Gradient Trace Effect 👇 */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <svg className="w-full h-full">
                                        <defs>
                                            {/* දිලිසෙන ලා නිල් පාට gradient එක */}
                                            <linearGradient id={`blue-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#f0f9ff" />   {/* ඉතාම ලා නිල් (ප්‍රකාශ ගතිය වැඩි කරනවා) */}
                                                <stop offset="50%" stopColor="#38bdf8" />  {/* ලා නිල් (Sky Blue) */}
                                                <stop offset="100%" stopColor="#0ea5e9" /> {/* තද නිල් */}
                                            </linearGradient>
                                        </defs>

                                        {/* 1. Outer Glow Layer (Lighted effect එක සඳහා - මේක ටිකක් වැඩියෙන් blur කළා) */}
                                        <motion.rect
                                            x="1"
                                            y="1"
                                            width="calc(100% - 2px)"
                                            height="calc(100% - 2px)"
                                            fill="none"
                                            stroke={`url(#blue-gradient-${i})`}
                                            strokeWidth="6"
                                            rx="16"
                                            strokeDasharray="400 600"
                                            style={{ filter: 'blur(5px)', opacity: 0.8 }}
                                            animate={{
                                                strokeDashoffset: [0, -1000],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: "linear",
                                            }}
                                        />

                                        {/* 2. Sharp Inner Layer (පැහැදිලි line එක සඳහා) */}
                                        <motion.rect
                                            x="1"
                                            y="1"
                                            width="calc(100% - 2px)"
                                            height="calc(100% - 2px)"
                                            fill="none"
                                            stroke={`url(#blue-gradient-${i})`}
                                            strokeWidth="2.5"
                                            rx="16"
                                            strokeDasharray="400 600"
                                            animate={{
                                                strokeDashoffset: [0, -1000],
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 5,
                                                ease: "linear",
                                            }}
                                        />
                                    </svg>
                                </div>

                                {/* Button content */}
                                <span className="font-bold tracking-tight uppercase text-sm tracking-widest relative z-10">
                                    {label}
                                </span>
                                <span className="material-symbols-outlined font-bold text-xl group-hover:translate-x-1 transition-transform relative z-10">
                                    {i === 0 ? 'east' : 'auto_awesome'}
                                </span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Horizontal Scrolling Section */}
            <div
                className="relative max-w-[1440px] mx-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-8 pb-12 px-4 hide-scrollbar"
                >
                    {[...eventsList, ...eventsList, ...eventsList].map((event, idx) => (
                        <div
                            key={`${event.id}-${idx}`}
                            className="flex-none w-[280px] md:w-[380px] snap-start"
                            // Card එකක් උඩට cursor එක ආවම scroll එක නවත්තන්න
                            onMouseEnter={() => setIsHovered(true)}
                        >
                            <TiltCard>
                                <div className="premium-glass p-4 rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-all duration-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20">

                                    {/* Image Container */}
                                    <div className="relative h-[360px] md:h-[480px] rounded-[2rem] overflow-hidden mb-6">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
                                            <span className="text-xl font-bold text-primary leading-none">{event.date}</span>
                                            <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">{event.month}</span>
                                        </div>

                                        {/* Content Overlay on Image */}
                                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10">
                                            <div className="flex items-center gap-2 text-xs font-medium opacity-90 mb-1">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {event.location}
                                            </div>
                                            <h3 className="text-2xl font-bold leading-tight">{event.title}</h3>
                                        </div>
                                    </div>

                                    {/* Bottom Section: Attendees & Button */}
                                    <div className="flex items-center justify-between px-2 pb-2">
                                        {/* Attendee Avatars */}
                                        <div className="flex -space-x-2">
                                            {event.attendeeImages.map((img, i) => (
                                                <img
                                                    key={i}
                                                    src={img}
                                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                                                    alt="attendee"
                                                />
                                            ))}
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-800 text-slate-600 dark:text-slate-300">
                                                +{event.attendees}
                                            </div>
                                        </div>

                                        {/* Interested Button */}
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            className="bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-900 dark:text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm"
                                        >
                                            Interested
                                        </motion.button>
                                    </div>

                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Stats Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
                <div className="grid grid-cols-3 gap-3 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-glass p-4 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center text-center group cursor-default"
                        >
                            <div className="w-10 h-10 md:w-16 md:h-16 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-xl md:text-3xl font-bold">{stat.icon}</span>
                            </div>
                            <h4 className="text-xl md:text-4xl font-black text-slate-900 dark:text-white mb-1 md:mb-2">{stat.value}</h4>
                            <p className="text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.3em] text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Implementation */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xl"
                        />

                        <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none">
                            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 py-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                    className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/10 pointer-events-auto relative overflow-hidden"
                                >
                                    {/* Decorative Blobs */}
                                    <motion.div
                                        animate={{
                                            x: [0, 50, -20, 40, 0],
                                            y: [0, -60, 40, -30, 0],
                                            scale: [1, 1.25, 0.95, 1.1, 1],
                                            rotate: [0, 90, 180, 270, 360],
                                        }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-3xl rounded-full pointer-events-none"
                                    />
                                    <motion.div
                                        animate={{
                                            x: [0, -60, 30, -40, 0],
                                            y: [0, 40, -50, 20, 0],
                                            scale: [1, 1.15, 0.85, 1.2, 1],
                                            rotate: [360, 270, 180, 90, 0],
                                        }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                                        className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none"
                                    />

                                    {/* Close Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white hover:rotate-90 transition-all duration-500 z-50 cursor-pointer"
                                    >
                                        <LuX size={18} />
                                    </button>

                                    {/* Form Content */}
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: {
                                                opacity: 1,
                                                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                                            }
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        className="relative z-10"
                                    >
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center p-4 rounded-[1.5rem] bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-500 mb-4 ring-1 ring-cyan-500/20">
                                                <LuCalendar size={32} />
                                            </div>
                                            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Create Your Event</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Register your university event and amplify your reach.</p>
                                        </div>

                                        <form onSubmit={handleEventSubmit} className="space-y-4 sm:space-y-5">
                                            {/* File Upload / Image */}
                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                                <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Event Flyer / Logo *</label>
                                                <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
                                                    <div className={`relative group cursor-pointer w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-2xl bg-white/30 dark:bg-slate-950/30 transition-all flex flex-col items-center justify-center gap-2 overflow-hidden flex-1 ${previewImage ? 'h-20 sm:h-28' : 'h-32'}`}>
                                                        <input ref={fileInputRef} type="file" required={!previewImage} onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" accept="image/*" />
                                                        <LuCloudUpload size={24} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center px-4 hidden sm:block">Click or drag image to upload</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center px-4 block sm:hidden">Replace Upload</span>
                                                    </div>

                                                    <AnimatePresence>
                                                        {previewImage && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                                                                transition={{ type: 'spring', damping: 20 }}
                                                                className="relative w-24 h-32 sm:w-20 sm:h-28 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 shrink-0"
                                                            >
                                                                <img src={previewImage} alt="Event Flyer Preview" className="w-full h-full object-cover" />
                                                                <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-white/80 dark:bg-slate-900/80 hover:bg-red-500 text-slate-700 hover:text-white p-1.5 rounded-full backdrop-blur-md transition-colors shadow-sm z-20" aria-label="Remove image">
                                                                    <LuX size={14} />
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>

                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                                <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Event Name *</label>
                                                <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="eventName" type="text" placeholder="E.g. Tech Summit 2024" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                            </motion.div>

                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                                <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">University & Faculty *</label>
                                                <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="university" type="text" placeholder="E.g. UOM - Engineering" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                            </motion.div>

                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Date *</label>
                                                    <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="eventDate" type="date" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Contact (WhatsApp) *</label>
                                                    <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="phone" type="tel" placeholder="+94 7X XXX XXXX" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                                </div>
                                            </motion.div>

                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                                <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Description *</label>
                                                <motion.textarea whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="description" rows={3} placeholder="Tell us about the event..." className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm resize-none dark:text-slate-200" />
                                            </motion.div>

                                            {/* Divider */}
                                            <div className="py-2">
                                                <div className="h-px w-full bg-slate-200 dark:bg-slate-800 relative">
                                                    <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-slate-150 dark:bg-slate-900 px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Extra Details</span>
                                                </div>
                                            </div>

                                            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
                                                <label className="text-[10px] sm:text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] ml-1 mb-1 block">Extra Functions / Requirements</label>
                                                <motion.textarea whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} name="extra" rows={2} placeholder="E.g. Drone shots, After-party DJ..." className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm resize-none dark:text-slate-200" />
                                            </motion.div>

                                            <motion.div
                                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                                className="pt-2"
                                            >
                                                <motion.button
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black rounded-xl shadow-lg flex items-center justify-center gap-3 uppercase tracking-wider text-sm transition-all"
                                                >
                                                    <LuSend size={18} />
                                                    {isSubmitting ? 'Transmitting Data...' : 'Submit Event Concept'}
                                                </motion.button>
                                            </motion.div>
                                        </form>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Success Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="fixed bottom-6 right-6 z-[200] w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-4 flex items-start gap-4"
                    >
                        <div className="bg-emerald-500/20 text-emerald-500 rounded-full p-2 mt-0.5">
                            <LuCircleCheck size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-slate-900 dark:text-white font-bold text-sm">Submission Successful!</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                                Please allow up to 24 hours for review and acceptance. We will contact you via WhatsApp shortly.
                            </p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <LuX size={16} />
                        </button>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Events;
