import { motion } from 'framer-motion';
import { LuHeart, LuSparkles, LuGraduationCap, LuShieldCheck, LuSearch } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard';

interface ProposalHeroBannerProps {
  onSearchClick: () => void;
  onCreateClick: () => void;
}

const ProposalHeroBanner = ({ onSearchClick, onCreateClick }: ProposalHeroBannerProps) => {
  return (
    <div className="relative py-16 md:py-20 mb-12 rounded-[3rem] bg-gradient-to-b from-rose-50/70 via-white to-pink-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-rose-100/80 dark:border-slate-800 backdrop-blur-2xl p-8 md:p-12 overflow-hidden shadow-2xl transition-colors duration-300">
      
      {/* ── Ambient Radial Mesh Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-rose-500/10 dark:bg-rose-500/15 blur-[120px] rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-pink-500/10 dark:bg-pink-500/15 blur-[120px] rounded-full" />
      </div>

      {/* ── Orbiting Floating Motion Badges ── */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 left-8 z-30 px-4 py-2 rounded-2xl bg-white/90 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 backdrop-blur-xl shadow-lg hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-wider"
      >
        <LuHeart className="text-rose-500 animate-bounce" size={16} /> 98% Match Rate
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-10 right-10 z-30 px-4 py-2 rounded-2xl bg-white/90 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 backdrop-blur-xl shadow-lg hidden sm:flex items-center gap-2 text-xs font-black uppercase tracking-wider"
      >
        <LuGraduationCap size={18} /> Student ID Verified 🎓
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

        {/* LEFT: Text Pitch & Action Buttons (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest ring-1 ring-rose-500/30">
            <LuSparkles className="text-sm animate-pulse" /> Sri Lanka's #1 Campus Proposal Portal
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Find Your Educated <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">Campus Soulmate</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Connecting verified Sri Lankan university undergraduates, alumni, and working professionals in a 100% safe, private ecosystem.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onSearchClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:scale-105 transition-transform border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <LuSearch size={16} /> Search Proposals Directory
            </button>
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              ✍️ Post Free Proposal Profile
            </button>
          </div>

          {/* Trust Guarantee Badges */}
          <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><LuShieldCheck className="text-rose-500" /> 100% Verified Identity</span>
            <span className="flex items-center gap-1.5"><LuShieldCheck className="text-purple-500" /> Phone Mask Shield</span>
          </div>

        </div>

        {/* RIGHT: Featured Couple Card Visual (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <TiltCard className="w-full max-w-sm">
            <div className="relative group bg-white/90 dark:bg-slate-950/90 rounded-3xl p-5 border border-rose-200 dark:border-rose-500/30 shadow-2xl overflow-hidden text-left">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                  alt="Dilini Perera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase bg-rose-500 text-white shadow-md">
                  Verified Undergrad 🎓
                </span>
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                  📍 Kandy • 23 yrs
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Dilini Perera</h3>
              <p className="text-xs text-rose-500 dark:text-rose-400 font-extrabold uppercase tracking-wider mt-0.5">Software Eng • SLIIT Malabe</p>
            </div>
          </TiltCard>
        </div>

      </div>
    </div>
  );
};

export default ProposalHeroBanner;
