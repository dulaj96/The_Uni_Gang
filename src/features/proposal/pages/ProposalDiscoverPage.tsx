import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Filter, ChevronLeft, MapPin, Briefcase, GraduationCap, Info, Crown } from 'lucide-react';
import { cx, GhostButton } from '../components/ui/ProposalPrimitives';
import { WatermarkOverlay } from '../components/privacy/WatermarkOverlay';
import { DISCOVER_PROFILES, CURRENT_USER } from '../data/mockProposalData';
import { calculateCompatibility } from '../utils/matchingAlgorithm';

export default function ProposalDiscoverPage({ setPage, openProfile }: { setPage: (p: any) => void, openProfile: (p: any) => void }) {
  const [profiles, setProfiles] = useState(DISCOVER_PROFILES);
  const [showFilters, setShowFilters] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const activeProfile = profiles[0];
  const compatibility = activeProfile ? calculateCompatibility(CURRENT_USER, activeProfile) : null;

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    setTimeout(() => {
      setProfiles((prev) => prev.slice(1));
      setDirection(null);
    }, 400); // Wait for exit animation
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('dashboard')} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Discover Matches</h1>
            <p className="text-sm font-medium text-slate-500">Based on your preferences</p>
          </div>
        </div>
        <GhostButton dark={true} small icon={Filter} onClick={() => setShowFilters(!showFilters)} className={showFilters ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800' : ''}>
          Filters
        </GhostButton>
      </div>

      <div className="flex flex-1 gap-8 relative">
        {/* Main Swipe Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000">
          
          {profiles.length === 0 ? (
            <div className="text-center p-12">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center mx-auto mb-6">
                <Sparkles size={40} className="text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No more matches today</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">You've seen all potential matches in your area. Come back tomorrow or expand your filters!</p>
              <GhostButton dark={true} onClick={() => setPage('dashboard')}>Back to Dashboard</GhostButton>
            </div>
          ) : (
            <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto z-10 flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeProfile.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0, x: 0, rotate: 0 }}
                  exit={{ 
                    x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0, 
                    rotate: direction === 'left' ? -15 : direction === 'right' ? 15 : 0,
                    opacity: 0,
                    scale: 0.8
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={() => openProfile(activeProfile)}
                >
                  <div className="w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative bg-slate-900 group">
                    <WatermarkOverlay text={`${CURRENT_USER.name} • ID: ${CURRENT_USER.uni}-542`}>
                      <img 
                        src={activeProfile.images[0]} 
                        alt={activeProfile.name} 
                        className={cx("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105", activeProfile.blurPhoto && "blur-2xl opacity-75")} 
                      />
                    </WatermarkOverlay>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                      {compatibility && (
                        <div className="bg-rose-500/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                          <Heart size={14} fill="currentColor" /> {compatibility.matchPercentage}% Match
                        </div>
                      )}
                      {activeProfile.isVerified && (
                        <div className="bg-blue-500/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-lg w-max">
                          Verified Profile
                        </div>
                      )}
                    </div>

                    {/* Profile Info */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-20 pointer-events-none">
                      <h2 className="text-3xl font-black text-white mb-1 tracking-tight drop-shadow-md flex items-center gap-2">
                        {activeProfile.name}, {activeProfile.age}
                        <Info size={24} className="text-white/50" />
                      </h2>
                      <div className="space-y-2 mt-4 text-white/90">
                        <p className="flex items-center gap-2 text-sm font-medium"><GraduationCap size={16} className="text-rose-400" /> {activeProfile.university} • {activeProfile.faculty}</p>
                        <p className="flex items-center gap-2 text-sm font-medium"><MapPin size={16} className="text-emerald-400" /> Lives in {activeProfile.district}</p>
                        <p className="flex items-center gap-2 text-sm font-medium"><Briefcase size={16} className="text-amber-400" /> Software Engineer</p>
                      </div>

                      {/* Hobbies Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {activeProfile.hobbies?.map(h => (
                          <span key={h} className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Why We Match Bubble */}
                      {compatibility && (
                        <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg">
                          <p className="text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5"><Sparkles size={12} /> Why you match</p>
                          <p className="text-sm font-medium leading-tight">{compatibility.matchSummary}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons inside Card */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 grid place-items-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <X size={32} className="text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Bottom Action Bar */}
          {profiles.length > 0 && (
            <div className="flex items-center gap-6 mt-10 z-20">
              <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-500 shadow-lg grid place-items-center transition-all hover:scale-110 active:scale-95"
              >
                <X size={28} strokeWidth={3} />
              </button>
              
              <button 
                onClick={() => setPage('premium')}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/20 grid place-items-center transition-all hover:scale-110 active:scale-95 border-2 border-white dark:border-slate-900 relative group"
              >
                <Sparkles size={20} />
                <span className="absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Super Proposal</span>
              </button>

              <button 
                onClick={() => handleSwipe('right')}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow-xl shadow-rose-500/30 grid place-items-center transition-all hover:scale-110 active:scale-95 relative"
              >
                <Heart size={36} fill="white" className="drop-shadow-md" />
                
                {/* Ping animation effect */}
                <span className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-20" />
              </button>
            </div>
          )}
        </div>

        {/* Filters Sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ opacity: 0, x: 20, width: 0 }}
              animate={{ opacity: 1, x: 0, width: 320 }}
              exit={{ opacity: 0, x: 20, width: 0 }}
              className="hidden lg:block shrink-0 h-max overflow-hidden"
            >
              <div className="w-[320px] p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 sticky top-28 bg-white/50 dark:bg-slate-900/50">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Filter size={20} className="text-rose-500" /> Advanced Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Distance</label>
                    <input type="range" className="w-full accent-rose-500" />
                    <div className="flex justify-between text-xs font-medium text-slate-400 mt-1"><span>10km</span><span>100km+</span></div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">University</label>
                    <select className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-2 ring-rose-500/50">
                      <option>Any University</option>
                      <option>UCSC</option>
                      <option>UOM</option>
                      <option>UOC</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">District</label>
                    <select className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-2 ring-rose-500/50">
                      <option>Any District</option>
                      <option>Colombo</option>
                      <option>Gampaha</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2"><Crown size={16} className="text-amber-500" /> Premium Filters</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Filter by Profession, Caste, and specific Degrees.</p>
                      <button onClick={() => setPage('premium')} className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">Upgrade Now &rarr;</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
