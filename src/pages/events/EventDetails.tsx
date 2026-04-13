import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LuX, LuCalendar, LuMapPin, LuGraduationCap,
    LuTicket, LuZap, LuShare2, LuMessageCircle, LuSparkles, LuStar
} from "react-icons/lu";

interface EventDetailsProps {
    event: any; // Type should ideally be shared, but using any for now to match DUMMY_EVENTS
    isOpen: boolean;
    onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, isOpen, onClose }) => {
    const [isInterested, setIsInterested] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!event) return null;

    const handleWhatsApp = (contact: string, title: string) => {
        const message = `Hi! I'm interested in the event: *${title}*. Could you please provide more details?`;
        window.open(`https://wa.me/${contact.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md cursor-pointe"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] md:rounded-[3.5rem] shadow-2xl flex flex-col md:flex-row border border-white/20 dark:border-slate-800 z-10 overflow-y-auto hide-scrollbar"
                    >
                        {/* ... rest of the content remains the same ... */}
                        {/* Close Button - Fixed for accessibility */}
                        <button
                            onClick={onClose}
                            className="fixed md:absolute top-4 right-4 md:top-8 md:right-8 z-[220] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-2xl bg-slate-900/60 hover:bg-red-600 text-white backdrop-blur-xl transition-all group border border-white/20 shadow-2xl"
                        >
                            <LuX size={24} className="group-hover:rotate-90 transition-transform" />
                        </button>

                        {/* Modal Image Section */}
                        <div className="w-full md:w-1/2 relative h-64 sm:h-80 md:h-auto overflow-hidden">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            {/* Floating labels over image */}
                            <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 space-y-3 md:space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 shadow-lg text-white text-[10px] md:text-xs font-black uppercase tracking-widest"
                                >
                                    <LuZap className="animate-pulse" /> Highly Anticipated
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none"
                                >
                                    {event.title}
                                </motion.h2>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-2 text-white/90 text-xs md:text-lg font-bold uppercase tracking-wider"
                                >
                                    <LuGraduationCap className="text-blue-400" /> {event.uni} • {event.faculty}
                                </motion.div>
                            </div>
                        </div>

                        {/* Modal Details Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 space-y-8 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">

                            {/* Description Block - Compact and Clear */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-1 bg-blue-600 rounded-full" />
                                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">About Event</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight">
                                    {event.description}
                                </h3>
                            </div>

                            {/* Refined Info List (More compact heights and text) */}
                            <div className="grid grid-cols-1 gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                        <LuCalendar size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Schedule</p>
                                        <p className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-200 uppercase">
                                            {new Date(event.date).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })} @ {event.time}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                        <LuMapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Gathering At</p>
                                        <p className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-200 uppercase">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400 transition-colors group-hover:bg-amber-600 group-hover:text-white">
                                        <LuTicket size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Access Basis</p>
                                        <p className="text-xs md:text-sm font-black text-slate-800 dark:text-slate-200 uppercase">
                                            {event.requirements}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle Bonus Section */}
                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                                    <LuSparkles size={14} />
                                </div>
                                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 tracking-tight italic leading-snug">
                                    " {event.extra} "
                                </p>
                            </div>

                            {/* Interaction Row (Includes new Interested Button) */}
                            <div className="flex items-center gap-3 pt-4">
                                <button
                                    onClick={() => handleWhatsApp(event.contact, event.title)}
                                    className="flex-grow flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                >
                                    <LuMessageCircle size={18} /> Attendance
                                </button>

                                {/* Interactive 'Interested' Button */}
                                <motion.button
                                    onClick={() => setIsInterested(!isInterested)}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{ scale: isInterested ? [1, 1.1, 1] : 1 }}
                                    className={`flex-grow flex items-center justify-center gap-2 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all border shadow-sm ${isInterested
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-blue-500/40'
                                            : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    <motion.div
                                        initial={false}
                                        animate={{ rotate: isInterested ? 180 : 0 }}
                                    >
                                        {isInterested ? <LuStar fill="white" size={18} /> : <LuStar size={18} />}
                                    </motion.div>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={isInterested ? "interested" : "not-interested"}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {isInterested ? "Interested!" : "Interested"}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>

                                <button className="w-14 h-14 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-600 border border-slate-100 dark:border-slate-800 transition-all active:scale-95 shadow-sm">
                                    <LuShare2 size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default EventDetails;
