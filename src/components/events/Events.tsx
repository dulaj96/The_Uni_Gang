import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '../ui/TiltCard.tsx';

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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
        <section id="events" className="relative pt-32 pb-40 bg-[#f8fafc] dark:bg-slate-950 overflow-hidden">
            {/* Antigravity Floating Background Symbols */}
            <FloatingSymbol symbol="✧" index={0} />
            <FloatingSymbol symbol="✦" index={1} />
            <FloatingSymbol symbol="✺" index={2} />
            <FloatingSymbol symbol="❈" index={3} />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
                            Campus <span className="text-primary italic">Events</span>
                        </h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-xl">
                            Witness the pulse of university life. From tech summits to cultural galas, never miss a moment that matters.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                    >
                        {['Upcoming', 'Create ur Event'].map((label, i) => (
                            <motion.button
                                key={label}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative flex items-center gap-3 px-8 py-4 premium-glass rounded-2xl transition-all shadow-lg shadow-black/5 hover:bg-white/30 dark:hover:bg-slate-800/30"
                            >
                                <span className="text-primary font-bold tracking-tight uppercase text-sm tracking-widest">{label}</span>
                                <span className="material-symbols-outlined text-primary font-bold text-xl group-hover:translate-x-1 transition-transform">
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
                            className="flex-none w-[320px] md:w-[380px] snap-start"
                            // Card එකක් උඩට cursor එක ආවම scroll එක නවත්තන්න
                            onMouseEnter={() => setIsHovered(true)}
                        >
                            <TiltCard>
                                <div className="premium-glass p-4 rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-all duration-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20">

                                    {/* Image Container */}
                                    <div className="relative h-[480px] rounded-[2rem] overflow-hidden mb-6">
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
            <div id="stats" className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-glass p-10 rounded-[2.5rem] flex flex-col items-center text-center group cursor-default"
                        >
                            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <span className="material-symbols-outlined text-3xl font-bold">{stat.icon}</span>
                            </div>
                            <h4 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
