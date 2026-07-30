import { LuUserPlus, LuSearch, LuHeart } from 'react-icons/lu';

const ProposalHowItWorks = () => {
  return (
    <div className="py-12 mb-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-2">Simple 3-Step Journey</span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          How <span className="text-rose-500 dark:text-rose-400 italic">Uni පොරොන්දම්</span> Works
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-2">
          Find your life partner in 3 simple, safe, and transparent steps.
        </p>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
        
        {/* Connecting Step Line */}
        <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 -translate-y-1/2 pointer-events-none z-0" />

        {/* Step 1 */}
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl relative z-10 hover:border-rose-500/40 transition-colors">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center mx-auto mb-5 text-2xl font-black border border-rose-500/20">
            1
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuUserPlus size={18} className="text-rose-500 dark:text-rose-400" /> Create & Verify Profile
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Register for free, add your details, and verify via Student ID or `.ac.lk` email to receive your Verified Badge.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl relative z-10 hover:border-pink-500/40 transition-colors">
          <div className="w-16 h-16 rounded-3xl bg-pink-500/10 text-pink-500 dark:text-pink-400 flex items-center justify-center mx-auto mb-5 text-2xl font-black border border-pink-500/20">
            2
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuSearch size={18} className="text-pink-500 dark:text-pink-400" /> Search & Match
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Filter matches by Age, Profession, Uni & District, or swipe on the interactive Campus Swiper deck.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl relative z-10 hover:border-purple-500/40 transition-colors">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/10 text-purple-500 dark:text-purple-400 flex items-center justify-center mx-auto mb-5 text-2xl font-black border border-purple-500/20">
            3
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 flex items-center justify-center gap-2">
            <LuHeart size={18} className="text-purple-500 dark:text-purple-400" /> Connect & Start Relationship
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
