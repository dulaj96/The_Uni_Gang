import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuSend, LuCircleCheck, LuCloudUpload, LuCalendar, LuChevronRight, LuSparkles, LuGraduationCap, LuMapPin, LuClock, LuTrendingUp } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard.tsx';
import PremiumPageLoader from '../ui/PremiumPageLoader';
import { useNavigate } from 'react-router-dom';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import { api } from '../../api';
import AuthCard from '../auth/AuthCard';
import toast from 'react-hot-toast';


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
    { label: "Active Events", value: 124, icon: LuCalendar },
    { label: "University Partners", value: 18, icon: LuGraduationCap },
    { label: "User Engagement", value: "95%", icon: LuTrendingUp }
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

    // Auth gate and dynamic events state
    const [showAuthGate, setShowAuthGate] = useState(false);
    const [liveEvents, setLiveEvents] = useState<any[]>([]);
    const [, setLoadingLive] = useState(true);

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

    // Load live approved events
    const fetchLiveEvents = async () => {
        try {
            setLoadingLive(true);
            const data = await api.getApprovedEvents();
            setLiveEvents(data);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        } finally {
            setLoadingLive(false);
        }
    };

    useEffect(() => {
        fetchLiveEvents();
    }, []);

    // Reset Auth gate when modal is closed
    useEffect(() => {
        if (!isModalOpen) {
            setShowAuthGate(false);
        }
    }, [isModalOpen]);

    const handleUpcomingClick = () => {
        setIsNavigating(true);
        setTimeout(() => {
            navigate('/event-list');
            setTimeout(() => setIsNavigating(false), 100);
        }, 300);
    };

    // Handle Form Submit
    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLFormElement;
        const formData = new FormData(target);
        
        const title = formData.get('eventName') as string;
        const uni = formData.get('university') as string;
        const date = formData.get('eventDate') as string;
        const contact = formData.get('phone') as string;
        const description = formData.get('description') as string;
        const extra = formData.get('extra') as string;
        const location = formData.get('location') as string;
        const price = formData.get('price') as string;
        const flyerFile = fileInputRef.current?.files?.[0];

        const token = localStorage.getItem('userToken');

        if (!token) {
            // User not logged in: cache data in localStorage and show AuthCard
            setIsSubmitting(true);
            try {
                let base64Image: string | null = null;
                if (flyerFile) {
                    base64Image = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = error => reject(error);
                        reader.readAsDataURL(flyerFile);
                    });
                }

                const pendingData = {
                    title,
                    description,
                    uni,
                    location,
                    price,
                    date,
                    contact,
                    extra,
                    base64Image
                };

                localStorage.setItem('pending_event_submission', JSON.stringify(pendingData));
                setShowAuthGate(true);
            } catch (err) {
                console.error('Failed to cache event data:', err);
                toast.error('Failed to cache event concept.');
            } finally {
                setIsSubmitting(false);
            }
            return;
        }

        setIsSubmitting(true);
        try {
            const submitData = new FormData();
            submitData.append('title', title);
            submitData.append('description', description);
            submitData.append('uni', uni);
            submitData.append('location', location);
            submitData.append('price', price);
            submitData.append('date', date);
            submitData.append('contact', contact);
            if (extra) submitData.append('extra', extra);
            if (flyerFile) {
                submitData.append('image', flyerFile);
            }

            await api.submitEvent(submitData, token);

            setIsSubmitting(false);
            setIsModalOpen(false);
            setPreviewImage(null);
            target.reset();
            
            // Success alert (No WhatsApp redirection)
            toast.success('Event submitted successfully for review!');
            setShowToast(true);
            fetchLiveEvents(); // Reload live events
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to submit event.');
            setIsSubmitting(false);
        }
    };

    // Auth callback to submit cached event
    const handleAuthSuccess = async () => {
        setShowAuthGate(false);
        const token = localStorage.getItem('userToken');
        const pendingStr = localStorage.getItem('pending_event_submission');

        if (!token || !pendingStr) return;

        setIsSubmitting(true);
        try {
            const pendingData = JSON.parse(pendingStr);
            const submitData = new FormData();
            submitData.append('title', pendingData.title);
            submitData.append('description', pendingData.description);
            submitData.append('uni', pendingData.uni);
            submitData.append('location', pendingData.location);
            submitData.append('price', pendingData.price);
            submitData.append('date', pendingData.date);
            submitData.append('contact', pendingData.contact);
            if (pendingData.extra) submitData.append('extra', pendingData.extra);

            if (pendingData.base64Image) {
                const res = await fetch(pendingData.base64Image);
                const blob = await res.blob();
                const file = new File([blob], 'flyer.png', { type: blob.type });
                submitData.append('image', file);
            }

            await api.submitEvent(submitData, token);

            localStorage.removeItem('pending_event_submission');
            setIsModalOpen(false);
            setPreviewImage(null);
            
            toast.success('Event submitted successfully for review!');
            setShowToast(true);
            fetchLiveEvents();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to submit cached event.');
        } finally {
            setIsSubmitting(false);
        }
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
            <PremiumPageLoader isLoading={isNavigating} message="Fetching upcoming events..." />
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
                        <PremiumTraceButton
                            index={0}
                            onClick={handleUpcomingClick}
                            isLoading={isNavigating}
                            icon={<LuChevronRight />}
                        >
                            Upcoming
                        </PremiumTraceButton>

                        <PremiumTraceButton
                            index={1}
                            onClick={() => setIsModalOpen(true)}
                            icon={<LuSparkles />}
                        >
                            Create ur Event
                        </PremiumTraceButton>
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
                    {(() => {
                        const displayEvents = liveEvents.length > 0 ? liveEvents : eventsList;
                        return [...displayEvents, ...displayEvents, ...displayEvents].map((event, idx) => {
                            const imageUrl = event.image
                                ? (event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`)
                                : 'https://images.unsplash.com/photo-1540575861501-7ad058ad37fa?q=80&w=800';

                            const eventDate = new Date(event.date);
                            const dayStr = isNaN(eventDate.getTime()) ? event.date : String(eventDate.getDate());
                            const monthStr = isNaN(eventDate.getTime()) ? (event.month || 'OCT') : eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

                            const attendeeImages = event.attendeeImages || [
                                "https://i.pravatar.cc/150?u=1",
                                "https://i.pravatar.cc/150?u=2",
                                "https://i.pravatar.cc/150?u=3"
                            ];
                            const attendeesCount = event.attendees || "150+";

                            return (
                                <div
                                    key={`${event.id}-${idx}`}
                                    className="flex-none w-[280px] md:w-[380px] snap-start"
                                    onMouseEnter={() => setIsHovered(true)}
                                >
                                    <TiltCard className="h-full">
                                        <div className="premium-glass p-5 rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-all duration-500 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-slate-800/30 flex flex-col h-full justify-between">
                                            {/* Top Container */}
                                            <div>
                                                {/* Image Container */}
                                                <div className="relative h-60 rounded-[2rem] overflow-hidden mb-5">
                                                    <img
                                                        src={imageUrl}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

                                                    {/* Date Badge */}
                                                    <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex flex-col items-center border border-white/20 dark:border-slate-800">
                                                        <span className="text-lg font-black text-blue-600 dark:text-blue-400 leading-none">{dayStr}</span>
                                                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500 mt-0.5">{monthStr}</span>
                                                    </div>

                                                    {/* Category Tag */}
                                                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/30">
                                                        {event.category || 'Event'}
                                                    </div>
                                                </div>

                                                {/* Content Details */}
                                                <div className="px-1 space-y-3">
                                                    {/* University / Institution */}
                                                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                                        <LuGraduationCap className="text-xs shrink-0" />
                                                        <span className="truncate">{event.uni}</span>
                                                    </div>

                                                    {/* Event Title */}
                                                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 uppercase tracking-tight leading-snug">
                                                        {event.title}
                                                    </h3>

                                                    {/* Description */}
                                                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium line-clamp-2">
                                                        {event.description || 'Witness the pulse of university life. Register your interest and join the vibe.'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Divider & Info Badges */}
                                            <div>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-4 border-t border-slate-200/40 dark:border-slate-800/40 pt-4 mb-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <LuMapPin className="text-blue-500 text-xs" />
                                                        <span className="truncate max-w-[120px]">{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <LuClock className="text-blue-500 text-xs" />
                                                        <span>{event.time || '09:00 AM'}</span>
                                                    </div>
                                                </div>

                                                {/* Bottom Section: Attendees & Button */}
                                                <div className="flex items-center justify-between px-1">
                                                    {/* Attendee Avatars */}
                                                    <div className="flex -space-x-2">
                                                        {attendeeImages.map((img: string, i: number) => (
                                                            <img
                                                                key={i}
                                                                src={img}
                                                                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                                                                alt="attendee"
                                                            />
                                                        ))}
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-[9px] font-black flex items-center justify-center border-2 border-white dark:border-slate-900 text-slate-600 dark:text-slate-300">
                                                            +{attendeesCount}
                                                        </div>
                                                    </div>

                                                    {/* Interested Button */}
                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        className="bg-slate-900 dark:bg-white/10 hover:bg-blue-600 dark:hover:bg-blue-600 text-white dark:text-white px-5 py-2.5 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-blue-500/20 active:scale-95"
                                                    >
                                                        Interested
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </TiltCard>
                                </div>
                            );
                        });
                    })()}
                </div>
            </div>

            {/* Premium Stats Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
                <div className="grid grid-cols-3 gap-3 md:gap-8">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="premium-glass p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center text-center group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,63,221,0.15)] bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-slate-800/30 cursor-default"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-slate-700/30 rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-slate-700 dark:text-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-lg group-hover:shadow-blue-500/30">
                                    <Icon className="text-xl md:text-3xl stroke-[2]" />
                                </div>
                                <h4 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{stat.value}</h4>
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{stat.label}</p>
                            </motion.div>
                        );
                    })}
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
                                        {showAuthGate ? (
                                            <div className="pt-4">
                                                <div className="text-center mb-8">
                                                    <h4 className="text-2xl font-black tracking-tight dark:text-white uppercase">Authentication Required</h4>
                                                    <div className="h-1.5 w-16 bg-cyan-500 rounded-full mt-3 mb-3 mx-auto" />
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                                                        Sign in to automatically finalize your request
                                                    </p>
                                                </div>
                                                <AuthCard onAuthSuccess={handleAuthSuccess} />
                                            </div>
                                        ) : (
                                            <>
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
                                                                <input ref={fileInputRef} name="image" type="file" required={!previewImage} onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" accept="image/*" />
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
                                                            <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Location / Venue *</label>
                                                            <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="location" type="text" placeholder="E.g. Main Auditorium, UOM" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] sm:text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em] ml-1 mb-1 block">Entry Price *</label>
                                                            <motion.input whileFocus={{ scale: 1.01, borderColor: "#06b6d4" }} required name="price" type="text" placeholder="E.g. Free or LKR 1000" className="w-full px-4 py-3 sm:p-4 rounded-xl bg-white/40 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 focus:border-cyan-500 outline-none transition-all text-sm backdrop-blur-sm dark:text-slate-200" />
                                                        </div>
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
                                            </>
                                        )}
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
                                Event concept transmitted successfully! Your event is undergoing premium moderation and will be live once approved.
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
