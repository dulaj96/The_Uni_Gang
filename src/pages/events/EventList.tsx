import React, { useState, useEffect } from 'react';
import {
    LuArrowLeft, LuSearch, LuCalendar, LuMapPin, LuGraduationCap,
    LuClock, LuMessageCircle, LuInfo, LuArrowRight, LuSparkles
} from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TiltCard from '../../components/ui/TiltCard';
import EventDetails from './EventDetails';
import { api } from '../../api';
import PremiumPageLoader from '../../components/ui/PremiumPageLoader';
import AdBanner from '../../components/advertise/AdBanner';
import AdNativeFeed from '../../components/advertise/AdNativeFeed';

// Mock Data for University Events
const DUMMY_EVENTS = [
    {
        id: 1,
        title: "Tech Summit 2024",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
        uni: "UOM",
        faculty: "Engineering",
        description: "Explore the latest in AI and Robotics at the biggest tech gathering of the year.",
        date: "2024-11-12",
        time: "09:00 AM",
        contact: "+94771234567",
        category: "Tech",
        location: "Main Auditorium",
        extra: "Drone shots included",
        requirements: "Ticket required"
    },
    {
        id: 2,
        title: "Neon Nights Musical",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
        uni: "UOC",
        faculty: "Arts",
        description: "A night of vibrant music and dance featuring top student talent.",
        date: "2024-10-24",
        time: "06:30 PM",
        contact: "+94777654321",
        category: "Culture",
        location: "Nelum Pokuna",
        extra: "Refreshments provided",
        requirements: "Open for all"
    },
    {
        id: 3,
        title: "Inter-Uni Cricket",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1200",
        uni: "SLIIT",
        faculty: "Computing",
        description: "The ultimate showdown on the pitch. Support your campus team!",
        date: "2024-12-05",
        time: "08:00 AM",
        contact: "+94778889990",
        category: "Sports",
        location: "University Grounds",
        extra: "Live streaming",
        requirements: "Student ID required"
    },
    {
        id: 4,
        title: "InnovateX Forum",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200",
        uni: "NSBM",
        faculty: "Business",
        description: "Pitch your ideas to top entrepreneurs and win grand prizes.",
        date: "2025-01-18",
        time: "10:00 AM",
        contact: "+94770001112",
        category: "Business",
        location: "Auditorium A1",
        extra: "Mentorship sessions",
        requirements: "Registration ends Dec 30"
    },
    {
        id: 5,
        title: "Global Beats Festival",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200",
        uni: "UOM",
        faculty: "Architecture",
        description: "Experience food, music, and art from around the world.",
        date: "2025-02-02",
        time: "04:00 PM",
        contact: "+94772223334",
        category: "Lifestyle",
        location: "Civil Grounds",
        extra: "After-party DJ",
        requirements: "Early bird tickets available"
    },
    {
        id: 6,
        title: "Code Sprint 2024",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200",
        uni: "IIT",
        faculty: "Software Eng",
        description: "24-hour hackathon to solve real-world problems with code.",
        date: "2024-11-20",
        time: "08:00 AM",
        contact: "+94774445556",
        category: "Tech",
        location: "Digital Lab",
        extra: "T-shirts and snacks",
        requirements: "Team of 4"
    }
];

const FloatingIcon = ({ icon: Icon, index }: { icon: React.ComponentType, index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
        }}
        transition={{
            duration: 5 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
        }}
        className="absolute text-blue-500/20 pointer-events-none"
        style={{
            left: `${15 + (index * 20)}%`,
            top: `${10 + (index * 15)}%`,
            fontSize: `${2 + (index % 3)}rem`
        }}
    >
        <Icon />
    </motion.div>
);



const EventList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [, setIsScrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const data = await api.getApprovedEvents();
                setEvents(data);
            } catch (err) {
                console.error("Failed to load approved events:", err);
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredEvents = (() => {
        const displayEvents = events.length > 0 ? events : DUMMY_EVENTS;
        return displayEvents.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.uni.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (event.faculty && event.faculty.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    })();

    const handleWhatsApp = (contact: string, title: string) => {
        const message = `Hi! I'm interested in the event: *${title}*. Could you please provide more details?`;
        window.open(`https://wa.me/${contact.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
            <PremiumPageLoader isLoading={loading} message="Syncing with the campus heartbeat..." />

            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Background Decorative Globs */}
                        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                        </div>

                        {/* Hero Section */}
                        <section className="relative pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto z-10">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="space-y-8"
                                >
                                    {/* Breadcrumb navigation */}
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                        <button
                                            onClick={() => navigate('/')}
                                            className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 bg-transparent border-none p-0 cursor-pointer font-black text-slate-400 dark:text-slate-500"
                                        >
                                            <LuArrowLeft className="w-3.5 h-3.5" /> Hub
                                        </button>
                                        <span className="text-slate-300 dark:text-slate-800">/</span>
                                        <span className="text-slate-605 dark:text-slate-405">Events</span>
                                    </div>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-widest border border-blue-200/50 dark:border-blue-800/50">
                                        <LuSparkles className="animate-pulse" /> Live the Experience
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                                        University <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Pulse.</span>
                                    </h1>
                                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-medium">
                                        The ultimate destination for all Sri Lankan university events. Stay updated, get registered, and never miss a landmark moment.
                                    </p>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3, 4].map(i => (
                                                <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-900 object-cover" alt="avatar" />
                                            ))}
                                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white dark:border-slate-900 text-white text-xs font-black">
                                                +2K
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Joined the gang</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Active Students</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 3D-Like Animated Visual Component */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                    className="relative mt-12 lg:mt-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl animate-pulse" />

                                    {/* Floating Dynamic Icons */}
                                    <FloatingIcon icon={LuCalendar} index={0} />
                                    <FloatingIcon icon={LuSparkles} index={1} />
                                    <FloatingIcon icon={LuGraduationCap} index={2} />
                                    <FloatingIcon icon={LuClock} index={3} />

                                    <TiltCard>
                                        <div className="relative rounded-[3rem] overflow-hidden border border-white/30 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] bg-white/10 backdrop-blur-sm p-6">
                                            <motion.div
                                                className="relative h-[500px] rounded-[2.5rem] overflow-hidden"
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <img
                                                    src="https://images.unsplash.com/photo-1540575861501-7ad058ad37fa?q=80&w=1200"
                                                    className="w-full h-full object-cover"
                                                    alt="University Event"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                                <div className="absolute bottom-10 left-10 right-10 space-y-4">
                                                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/30">
                                                        <span className="text-xs font-black text-white uppercase tracking-widest">Featured Event</span>
                                                    </div>
                                                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Innovate Your Future</h3>
                                                    <div className="flex items-center gap-6 text-white/80 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            <LuCalendar className="text-blue-400" /> Oct 15
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <LuMapPin className="text-blue-400" /> Colombo
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </TiltCard>
                                </motion.div>
                            </div>
                        </section>

                        {/* Events Grid */}
                        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 relative z-10">

                            {/* Ad Banner Placement */}
                            <AdBanner placement="BANNER" />

                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Upcoming Vibes</h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Found {filteredEvents.length} active events</p>
                                </div>
                            </div>

                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                                >
                                    {filteredEvents.map((event, index) => {
                                        const imageUrl = event.image
                                            ? (event.image.startsWith('http') ? event.image : `http://localhost:5001${event.image}`)
                                            : 'https://images.unsplash.com/photo-1540575861501-7ad058ad37fa?q=80&w=800';

                                        const eventDate = new Date(event.date);
                                        const dayStr = isNaN(eventDate.getTime()) ? event.date : String(eventDate.getDate());
                                        const monthStr = isNaN(eventDate.getTime()) ? 'OCT' : eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

                                        return (
                                        <React.Fragment key={event.id}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                {/* <TiltCard className="h-full"> */}
                                                <div className="h-full">
                                                    <div className="group h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/50 dark:border-slate-700/30 rounded-[2rem] p-5 shadow-xl hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,63,221,0.15)] transition-all duration-500 flex flex-col">
                                                        {/* Image Container */}
                                                        <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6">
                                                            <img
                                                                src={imageUrl}
                                                                alt={event.title}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                                            {/* Date Badge - Premium Calendar Leaf */}
                                                            <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col items-center border border-white/40 dark:border-slate-700/50 shadow-xl shadow-black/10 min-w-[3rem]">
                                                                <div className="bg-blue-600 w-full py-1 text-center">
                                                                    <span className="text-[8px] font-black uppercase tracking-widest text-white leading-none">{monthStr}</span>
                                                                </div>
                                                                <div className="px-3 py-1.5 flex items-center justify-center">
                                                                    <span className="text-xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">{dayStr}</span>
                                                                </div>
                                                            </div>

                                                            {/* Category Tag */}
                                                            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                                                                {event.category || 'Event'}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="px-3 flex-grow space-y-4">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                                                    <LuGraduationCap /> {event.uni}{event.faculty ? ` - ${event.faculty}` : ''}
                                                                </div>
                                                                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none group-hover:text-blue-600 transition-colors duration-300 mt-1">
                                                                    {event.title}
                                                                </h3>
                                                            </div>

                                                            <div className="flex flex-wrap gap-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                                <div className="flex items-center gap-1.5">
                                                                    <LuMapPin className="text-blue-500" /> {event.location}
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <LuClock className="text-blue-500" /> {event.time || '09:00 AM'}
                                                                </div>
                                                            </div>

                                                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-2">
                                                                {event.description}
                                                            </p>

                                                            {/* Expandable Details Peek & Capacity */}
                                                            <div className="pt-4 flex flex-col gap-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                                                {event.capacity && (
                                                                    <div className="flex flex-col gap-1.5">
                                                                        <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                                                            <span>Capacity</span>
                                                                            <span className="text-blue-600 dark:text-blue-400">{event.attendees?.length || 0} / {event.capacity}</span>
                                                                        </div>
                                                                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                            <div
                                                                                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                                                                style={{ width: `${Math.min(((event.attendees?.length || 0) / event.capacity) * 100, 100)}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Interaction Buttons */}
                                                                <div className="grid grid-cols-[1fr_auto] gap-3">
                                                                    <button
                                                                        onClick={() => setSelectedEvent(event)}
                                                                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/30 active:scale-95 border border-transparent"
                                                                    >
                                                                        <LuInfo size={14} /> View & RSVP
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleWhatsApp(event.contact, event.title)}
                                                                        className="flex items-center justify-center p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white text-slate-500 dark:text-slate-400 transition-all active:scale-95 shadow-sm"
                                                                        title="Contact via WhatsApp"
                                                                    >
                                                                        <LuMessageCircle size={18} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* </TiltCard> */}
                                            </motion.div>
                                            
                                            {(index + 1) % 4 === 0 && (
                                                <div key={`ad-${index}`} className="col-span-1 md:col-span-2 lg:col-span-3">
                                                    <AdNativeFeed adIndex={Math.floor((index + 1) / 4) - 1} />
                                                </div>
                                            )}
                                        </React.Fragment>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>

                            {/* Premium Event Details Component */}
                            <EventDetails
                                event={selectedEvent}
                                isOpen={!!selectedEvent}
                                onClose={() => setSelectedEvent(null)}
                            />

                            {filteredEvents.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-32 text-center space-y-6"
                                >
                                    <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800">
                                        <LuSearch className="text-4xl text-slate-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">No Events Found</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                                    </div>
                                    <button
                                        onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                                        className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8"
                                    >
                                        Reset All Filters
                                    </button>
                                </motion.div>
                            )}
                        </section>

                        {/* Pagination System */}
                        {filteredEvents.length > 0 && (
                            <div className="mt-20 flex justify-center w-full px-4">
                                <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl p-2 rounded-full border border-white/40 dark:border-slate-800 shadow-2xl">
                                    <button className="w-12 h-12 flex items-center justify-center rounded-full text-slate-400 dark:text-slate-600 cursor-not-allowed">
                                        <LuArrowLeft />
                                    </button>
                                    <div className="px-4 py-2 bg-blue-600 text-white font-black rounded-full text-sm shadow-lg shadow-blue-500/30">
                                        1
                                    </div>
                                    <button className="w-12 h-12 flex items-center justify-center rounded-full text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all">
                                        <LuArrowRight />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventList;
