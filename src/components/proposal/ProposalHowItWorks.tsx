import { LuUserPlus, LuSearch, LuHeart, LuSparkles } from 'react-icons/lu';

const ProposalHowItWorks = () => {
  return (
    <div className="py-16 mb-16 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-3 ring-1 ring-rose-500/20">
          <LuSparkles size={14} /> 3-Step Matchmaking Journey
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">Uni පොරොන්දම්</span> Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-3">
          Find your life partner in 3 simple, safe, and transparent steps.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
        
        {/* Step 1 */}
        <div className="p-10 rounded-[3rem] bg-white/90 dark:bg-slate-900/90 border border-rose-200/60 dark:border-slate-800 shadow-xl relative z-10 hover:border-rose-500/40 transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg shadow-rose-500/30">
            1
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuUserPlus size={20} className="text-rose-500" /> Create Profile
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Register for free, add your details, and verify via Student ID or `.ac.lk` email to receive your Verified Badge.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-10 rounded-[3rem] bg-white/90 dark:bg-slate-900/90 border border-pink-200/60 dark:border-slate-800 shadow-xl relative z-10 hover:border-pink-500/40 transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg shadow-pink-500/30">
            2
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuSearch size={20} className="text-pink-500" /> Search & Match
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Filter matches by Age, Profession, Uni & District, or swipe on the interactive Campus Swiper deck.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-10 rounded-[3rem] bg-white/90 dark:bg-slate-900/90 border border-purple-200/60 dark:border-slate-800 shadow-xl relative z-10 hover:border-purple-500/40 transition-all hover:-translate-y-1">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg shadow-purple-500/30">
            3
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuHeart size={20} className="text-purple-500" /> Start Relationship
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Start chatting safely (First 3 messages FREE) and build a genuine lifelong relationship with your match.
          </p>
        </div>

      </div>

    </div>
  );
};

export default ProposalHowItWorks;
