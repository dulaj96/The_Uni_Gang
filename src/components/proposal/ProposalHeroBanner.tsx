import { LuSparkles, LuGraduationCap, LuSearch, LuArrowRight, LuUsers, LuLock } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard';

interface ProposalHeroBannerProps {
  onSearchClick: () => void;
  onCreateClick: () => void;
}

const ProposalHeroBanner = ({ onSearchClick, onCreateClick }: ProposalHeroBannerProps) => {
  return (
    <div className="relative py-12 md:py-16 mb-10 rounded-[3rem] bg-gradient-to-b from-rose-500/10 via-pink-500/5 to-transparent dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950 border border-rose-200/60 dark:border-slate-800/80 backdrop-blur-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-xl transition-colors duration-300">
      
      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-rose-500/15 dark:bg-rose-500/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/15 dark:bg-pink-500/20 blur-[130px] rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

        {/* LEFT: Text Pitch (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest ring-1 ring-rose-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <LuSparkles className="text-sm" /> 100% Student-Verified Proposal Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Find Your Educated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">Campus Soulmate</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
            Connecting verified Sri Lankan university undergraduates, alumni, and working professionals for genuine lifelong connections in a 100% encrypted environment.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={onSearchClick}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <LuSearch size={16} /> Explore Proposal Directory <LuArrowRight size={14} />
            </button>
            
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/90 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              ✍️ Post Free Proposal Ad
            </button>
          </div>

          {/* Key Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5"><LuGraduationCap className="text-rose-500" size={15} /> Student ID Verified</span>
            <span className="flex items-center gap-1.5"><LuLock className="text-purple-500" size={15} /> Phone Mask Shield</span>
            <span className="flex items-center gap-1.5"><LuUsers className="text-pink-500" size={15} /> 1,400+ Active Members</span>
          </div>

        </div>

        {/* RIGHT: Floating Card Showcase (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <TiltCard className="w-full max-w-xs relative z-20">
            <div className="group bg-white/95 dark:bg-slate-950/95 rounded-3xl p-4 border border-rose-300/50 dark:border-rose-500/30 shadow-2xl overflow-hidden text-left">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
                  alt="Dilini Perera"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
                  Verified Undergrad 🎓
                </span>
                <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                  📍 Kandy • 23 yrs
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Dilini Perera</h3>
              <p className="text-[10px] text-rose-500 font-extrabold uppercase tracking-wider mt-0.5">Software Eng • SLIIT Malabe</p>
            </div>
          </TiltCard>
        </div>

      </div>
    </div>
  );
};

export default ProposalHeroBanner;
