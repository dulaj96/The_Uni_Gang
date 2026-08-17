import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Filter, ChevronLeft, MapPin, Briefcase, GraduationCap, Info, Crown, Loader2, LayoutGrid, MessageCircle, ShieldCheck } from 'lucide-react';
import { cx, GhostButton, PrimaryButton } from '../components/ui/ProposalPrimitives';
import { WatermarkOverlay } from '../components/privacy/WatermarkOverlay';
import { CURRENT_USER } from '../data/mockProposalData';
import { proposalApi } from '../api/proposalApi';
import toast from 'react-hot-toast';

export default function ProposalDiscoverPage({ setPage, openProfile }: { setPage: (p: any) => void, openProfile: (p: any) => void }) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [isPremium, setIsPremium] = useState(false);
  const [matchData, setMatchData] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const [feedRes, myProfileRes] = await Promise.all([
          proposalApi.getFeed({}),
          proposalApi.getMyProfile()
        ]);
        
        if (feedRes.success) setProfiles(feedRes.data);
        if (myProfileRes.success) setIsPremium(myProfileRes.profile?.is_premium || false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const activeProfile = profiles[0];

  const handleSwipe = async (dir: 'left' | 'right') => {
    if (!activeProfile) return;
    
    setDirection(dir);
    
    // API Call to Backend
    try {
      const action = dir === 'right' ? 'like' : 'pass';
      const res = await proposalApi.swipe(activeProfile.user_id, action);
      
      if (res.isMatch) {
        setMatchData({
          matchId: res.matchId,
          profile: activeProfile
        });
      }
    } catch (error: any) {
      console.error("Swipe failed:", error);
      if (error.requiresVerification) {
        setShowVerificationModal(true);
        setDirection(null);
        return; // Stop here, don't remove profile
      }
      toast.error("Failed to register swipe.");
    }
    
    setTimeout(() => {
      setProfiles((prev) => prev.slice(1));
      setDirection(null);
    }, 400); 
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 min-h-[calc(100vh-80px)] flex flex-col relative overflow-hidden">
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
        
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setViewMode('swipe')}
              className={cx("px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2", viewMode === 'swipe' ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            >
              <Sparkles size={14} /> Swipe
            </button>
            <button 
              onClick={() => {
                if (!isPremium) {
                  setPage('premium');
                } else {
                  setViewMode('grid');
                }
              }}
              className={cx("px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2", viewMode === 'grid' ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300")}
            >
              <LayoutGrid size={14} /> Grid {!isPremium && <Crown size={12} className="text-amber-500" />}
            </button>
          </div>

          <GhostButton dark={true} small icon={Filter} onClick={() => setShowFilters(!showFilters)} className={showFilters ? 'bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800' : ''}>
            Filters
          </GhostButton>
        </div>
      </div>

      <div className="flex flex-1 gap-8 relative">
        {/* Main Area */}
        <div className="flex-1 flex flex-col relative perspective-1000">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 h-full">
              <Loader2 size={48} className="text-rose-500 animate-spin mb-4" />
              <p className="text-sm font-bold text-slate-500">Finding your perfect matches...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 h-full text-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center mx-auto mb-6">
                <Sparkles size={40} className="text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No more matches today</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">You've seen all potential matches in your area. Come back tomorrow or expand your filters!</p>
              <GhostButton dark={true} onClick={() => setPage('dashboard')}>Back to Dashboard</GhostButton>
            </div>
          ) : viewMode === 'grid' && isPremium ? (
            /* Premium Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 custom-scrollbar overflow-y-auto pr-2 max-h-[calc(100vh-200px)]">
              {profiles.map(p => (
                <div key={p.id} onClick={() => openProfile(p)} className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-slate-200 dark:border-slate-800">
                  <WatermarkOverlay text={`${CURRENT_USER.name} • ID: ${CURRENT_USER.uni}-542`}>
                    <img 
                      src={p.images[0]} 
                      alt={p.name} 
                      className={cx("w-full h-full object-cover transition-transform duration-700 group-hover:scale-110", p.blurPhoto && "blur-xl")} 
                    />
                  </WatermarkOverlay>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4">
                    {p.matchPercentage && (
                      <div className="bg-rose-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                        <Heart size={10} fill="currentColor" /> {p.matchPercentage}%
                      </div>
                    )}
                    {p.isVerified && <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full p-1"><ShieldCheck size={16} className="text-blue-300" fill="currentColor"/></div>}
                    {p.isVerifiedProfessional && <div className="absolute top-2 right-2 bg-amber-500/20 backdrop-blur-md rounded-full p-1"><Briefcase size={16} className="text-amber-300" fill="currentColor"/></div>}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">{p.name}, {p.age}</h3>
                    <p className="text-xs font-medium text-white/80 mb-2 truncate">
                      {p.education_category === 'University' ? (
                        <><GraduationCap size={12} className="inline mr-1"/>{p.university}</>
                      ) : (
                        <><Briefcase size={12} className="inline mr-1"/>{p.workplace_or_institute}</>
                      )}
                    </p>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                      <button className="flex-1 py-2 bg-rose-500 rounded-xl text-white text-xs font-bold flex justify-center items-center gap-1 shadow-lg pointer-events-auto" onClick={(e) => { e.stopPropagation(); /* Handle direct like from grid */ }}>
                        <Heart size={14} fill="currentColor" /> Like
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Classic Swipe View */
            <div className="flex-1 flex flex-col items-center justify-center">
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
                        {activeProfile.matchPercentage && (
                          <div className="bg-rose-500/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/20 shadow-lg">
                            <Heart size={14} fill="currentColor" /> {activeProfile.matchPercentage}% Match
                          </div>
                        )}
                      </div>

                      {/* Profile Info */}
                      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-20 pointer-events-none">
                        <h2 className="text-3xl font-black text-white mb-1 tracking-tight drop-shadow-md flex items-center gap-2">
                          {activeProfile.name}, {activeProfile.age}
                          <Info size={24} className="text-white/50" />
                        </h2>
                        
                        <div className="flex gap-2 mb-4">
                          {activeProfile.isVerified && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full"><ShieldCheck size={14} fill="currentColor" /> Verified University</div>
                          )}
                          {activeProfile.isVerifiedProfessional && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 rounded-full"><Briefcase size={14} fill="currentColor" /> Verified Professional</div>
                          )}
                        </div>
                        
                        <div className="space-y-2 mt-4 text-white/90">
                          {activeProfile.education_category === 'University' ? (
                            <p className="flex items-center gap-2 text-sm font-medium"><GraduationCap size={16} className="text-rose-400" /> {activeProfile.university} • {activeProfile.faculty}</p>
                          ) : (
                            <p className="flex items-center gap-2 text-sm font-medium"><Briefcase size={16} className="text-amber-400" /> {activeProfile.workplace_or_institute} • {activeProfile.profession}</p>
                          )}
                          <p className="flex items-center gap-2 text-sm font-medium"><MapPin size={16} className="text-emerald-400" /> Lives in {activeProfile.district}</p>
                        </div>

                        {/* Hobbies Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {activeProfile.hobbies?.map((h: string) => (
                            <span key={h} className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                              {h}
                            </span>
                          ))}
                        </div>

                        {/* Why We Match Bubble */}
                        {activeProfile.matchSummary && (
                          <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg">
                            <p className="text-xs font-bold text-rose-300 mb-1 flex items-center gap-1.5"><Sparkles size={12} /> Why you match</p>
                            <p className="text-sm font-medium leading-tight">{activeProfile.matchSummary}</p>
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
              
              {/* Bottom Action Bar */}
              <div className="flex items-center justify-center gap-6 mt-10 z-20">
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
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">University / Workplace</label>
                    <div className="relative">
                      <select name="university" value={filters.university} onChange={handleFilterChange} className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50">
                        <option>Any University</option>
                        <option>UCSC</option>
                        <option>UOM</option>
                        <option>UOC</option>
                      </select>
                    </div>
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

      {/* MATCH MODAL OVERLAY */}
      <AnimatePresence>
        {matchData && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-2xl"
            >
              {/* Confetti / Glow */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-rose-500/30 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-fuchsia-500/30 blur-3xl rounded-full pointer-events-none" />

              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-500 italic mb-2 tracking-tight">It's a Match!</h2>
              <p className="text-slate-400 text-sm mb-8 font-medium">You and {matchData.profile.name} have liked each other.</p>

              <div className="flex justify-center items-center gap-4 mb-10">
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden shadow-xl z-10">
                  <img src={CURRENT_USER.avatar} alt="Me" className="w-full h-full object-cover" />
                </div>
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 grid place-items-center -mx-8 z-20 backdrop-blur-md border-4 border-slate-900">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 overflow-hidden shadow-xl z-10">
                  <img src={matchData.profile.images[0]} alt={matchData.profile.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="space-y-3 relative z-20">
                <PrimaryButton 
                  className="w-full py-4 text-sm uppercase tracking-widest !bg-gradient-to-r from-rose-500 to-fuchsia-600 !border-none" 
                  onClick={() => {
                    setMatchData(null);
                    setPage('inbox');
                  }}
                  icon={MessageCircle}
                >
                  Send a Message
                </PrimaryButton>
                <GhostButton 
                  dark={true} 
                  className="w-full py-4 text-sm" 
                  onClick={() => setMatchData(null)}
                >
                  Keep Swiping
                </GhostButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification Limit Modal */}
      <AnimatePresence>
        {showVerificationModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-center"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Protecting Our Community 🛡️</h2>
              
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300 space-y-4 mb-8">
                <p>The Uni Gang is a safe, strictly vetted community for University Alumni & Professionals. To continue discovering matches and sending proposals, please verify your identity. This keeps fake profiles away!</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 italic font-semibold">Uni Gang යනු සරසවි සිසුන් සහ වෘත්තිකයන් සඳහා පමණක් වෙන් වූ ආරක්ෂිත වේදිකාවකි. තවදුරටත් සම්බන්ධතා ගොඩනගා ගැනීමට කරුණාකර ඔබගේ අනන්‍යතාවය තහවුරු කරන්න. ව්‍යාජ ගිණුම් අවහිර කිරීමට මෙය අපට උපකාරී වේ.</p>
              </div>
              
              <PrimaryButton 
                onClick={() => {
                  setShowVerificationModal(false);
                  setPage('settings');
                }} 
                className="w-full h-12 text-base"
              >
                Verify My Profile Now
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
