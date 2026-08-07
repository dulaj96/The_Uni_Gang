import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MoreVertical, Heart, X, ShieldCheck, MapPin, Briefcase, GraduationCap, AlertTriangle, UserX } from 'lucide-react';
import { cx } from './ui/ProposalPrimitives';

export default function ProposalProfileModal({ profile, onClose }: { profile: any; onClose: () => void }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  if (!profile) return null;

  const handleSendProposal = () => {
    setProposalSent(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {profile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-full md:h-[90vh] max-w-md bg-white dark:bg-slate-900 md:rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl"
          >
            {/* Success Animation Overlay */}
            <AnimatePresence>
              {proposalSent && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-rose-500/90 backdrop-blur-md flex flex-col items-center justify-center text-white"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-rose-500 mb-4 shadow-xl"
                  >
                    <Heart size={48} fill="currentColor" />
                  </motion.div>
                  <h2 className="text-3xl font-black mb-2">Proposal Sent!</h2>
                  <p className="font-medium">Fingers crossed for a match 🤞</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Photo Gallery (Top Half) */}
            <div className="relative h-[55%] shrink-0 group">
              <img 
                src={profile.images[activePhotoIndex]} 
                alt={profile.name} 
                className={cx(
                  "w-full h-full object-cover transition-transform duration-500",
                  profile.blurPhoto && "blur-2xl brightness-75 scale-110"
                )} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

              {/* Top Controls */}
              <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <MoreVertical size={20} />
                  </button>
                  
                  {/* Security Menu */}
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1"
                      >
                        <button className="w-full px-4 py-3 text-left text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                          <UserX size={16} /> Block {profile.name}
                        </button>
                        <button className="w-full px-4 py-3 text-left text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2">
                          <AlertTriangle size={16} /> Report Profile
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Photo Indicators */}
              <div className="absolute top-4 inset-x-20 flex gap-1 z-10 px-4">
                {profile.images.map((_: any, i: number) => (
                  <div key={i} className={cx("h-1 rounded-full flex-1 transition-colors", i === activePhotoIndex ? "bg-white" : "bg-white/30")} />
                ))}
              </div>

              {/* Tap to switch photos */}
              <div className="absolute inset-0 flex z-0">
                <div className="flex-1" onClick={() => setActivePhotoIndex(Math.max(0, activePhotoIndex - 1))} />
                <div className="flex-1" onClick={() => setActivePhotoIndex(Math.min(profile.images.length - 1, activePhotoIndex + 1))} />
              </div>

              {/* Name & Basic Info Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10 pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-black text-white drop-shadow-md">{profile.name}, {profile.age}</h1>
                  {profile.isVerified && <ShieldCheck size={24} className="text-blue-400 drop-shadow-md" fill="white" />}
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm font-bold drop-shadow-sm">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {profile.district}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Heart size={14} className="text-rose-400" fill="currentColor" /> {profile.matchPercentage}% Match</span>
                </div>
              </div>
            </div>

            {/* Detailed Info (Bottom Half) */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 relative pb-28">
              <div className="p-6 space-y-6">
                
                {/* About Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">About Me</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {profile.bio || `I'm a final year student at ${profile.university} studying ${profile.faculty}. Looking for someone who shares my passion for tech and traveling. Let's see if we match!`}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <GraduationCap size={20} className="text-blue-500 mb-2" />
                    <p className="text-xs text-slate-500 font-bold uppercase mb-0.5">Education</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile.university}</p>
                    <p className="text-xs text-slate-500 truncate">{profile.faculty}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <Briefcase size={20} className="text-amber-500 mb-2" />
                    <p className="text-xs text-slate-500 font-bold uppercase mb-0.5">Profession</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{profile.profession || 'Software Engineer'}</p>
                    <p className="text-xs text-slate-500 truncate">{profile.professionSector || 'Private Sector'}</p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Civil Status</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.civilStatus || 'Never Married'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Height & Weight</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.height || "5' 6\""}, {profile.weight || '55 kg'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Ethnicity & Religion</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.ethnicity || 'Sinhalese'} - {profile.religion || 'Buddhist'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Complexion</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.complexion || 'Fair'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Diet</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.diet || 'Non-Vegetarian'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-sm text-slate-500 font-medium">Smoking / Drinking</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{profile.smoking || 'No'} / {profile.drinking || 'No'}</span>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Family Background</h4>
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-500">Father</span><span className="font-bold text-slate-900 dark:text-white">{profile.fatherProfession || 'Businessman'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Mother</span><span className="font-bold text-slate-900 dark:text-white">{profile.motherProfession || 'Housewife'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Siblings</span><span className="font-bold text-slate-900 dark:text-white">{profile.siblings || '1 Brother, 1 Sister'}</span></div>
                    </div>
                  </div>
                </div>

                {/* Hobbies */}
                {profile.hobbies && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.hobbies.map((h: string) => (
                        <span key={h} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Action Bar */}
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 flex items-center justify-center gap-6">
              <button 
                onClick={onClose}
                className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:border-slate-300 shadow-xl grid place-items-center transition-transform active:scale-95 hover:scale-105"
              >
                <X size={28} strokeWidth={3} />
              </button>
              
              <button 
                onClick={handleSendProposal}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow-xl shadow-rose-500/30 grid place-items-center transition-transform active:scale-95 hover:scale-105 relative group"
              >
                <Heart size={36} fill="white" className="drop-shadow-md transition-transform group-hover:scale-110" />
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
