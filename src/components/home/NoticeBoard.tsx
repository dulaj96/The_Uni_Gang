import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMegaphone, LuX, LuSparkles, LuCalendar } from 'react-icons/lu';
import { api } from '../../api';

interface Announcement {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const NoticeBoard: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await api.getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to load notice board:', err);
      }
    };
    loadNotices();
  }, []);

  // Auto scroll notice ticker every 5 seconds if there are multiple
  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements]);

  if (announcements.length === 0) return null;

  const activeNotice = announcements[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-6">
      {/* Sleek Ticker Notice Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-500/5 dark:via-indigo-500/5 dark:to-purple-500/5 border border-blue-500/20 dark:border-blue-500/10 backdrop-blur-md p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-blue-500/5"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full" />

        <div className="flex items-center gap-4 flex-1 min-w-0 z-10 w-full">
          {/* Megaphone Icon */}
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/25 shrink-0 animate-bounce">
            <LuMegaphone size={20} />
          </div>

          {/* Announcement content ticker */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-600/10 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest self-center md:self-auto">
                <LuSparkles size={10} /> Campus Announcement
              </span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                {new Date(activeNotice.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.h4
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedNotice(activeNotice)}
                className="text-sm md:text-base font-black text-slate-800 dark:text-white uppercase tracking-tight mt-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors truncate"
              >
                {activeNotice.title}
              </motion.h4>
            </AnimatePresence>
          </div>
        </div>

        {/* Read More button */}
        <button
          onClick={() => setSelectedNotice(activeNotice)}
          className="z-10 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-wider hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm border border-slate-200 dark:border-slate-800 w-full md:w-auto"
        >
          Read Broadcast
        </button>
      </motion.div>

      {/* Modal Popup for Selected Notice Details */}
      <AnimatePresence>
        {selectedNotice && (
          <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNotice(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl p-8 overflow-hidden z-10"
            >
              {/* background glows */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
                    <LuMegaphone size={18} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Campus Notice Board</span>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold mt-0.5">
                      <LuCalendar size={12} />
                      <span>{new Date(selectedNotice.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedNotice(null)}
                  className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-850 dark:hover:text-white flex items-center justify-center border border-transparent hover:border-slate-200 transition-all cursor-pointer"
                >
                  <LuX size={18} />
                </button>
              </div>

              {/* Title & Content */}
              <div className="text-left relative z-10">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-snug">
                  {selectedNotice.title}
                </h3>
                
                <div className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 max-h-[50vh] overflow-y-auto custom-scrollbar">
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedNotice.content}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end relative z-10">
                <button
                  onClick={() => setSelectedNotice(null)}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-black uppercase tracking-wider transition-all"
                >
                  Close Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeBoard;
