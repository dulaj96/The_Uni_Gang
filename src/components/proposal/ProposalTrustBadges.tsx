import { LuGraduationCap, LuBuilding2, LuBriefcase, LuShieldCheck, LuSparkles } from 'react-icons/lu';

const ProposalTrustBadges = () => {
  return (
    <div className="py-16 mb-16 relative">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 font-black text-[10px] uppercase tracking-widest mb-3 ring-1 ring-rose-500/20">
          <LuSparkles size={14} /> 100% Student & Alumni Verified
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Why Thousands Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">Uni පොරොන්දම්</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-3">
          Designed specifically for Sri Lankan university undergraduates, alumni, and professionals seeking lifelong marriage compatibility.
        </p>
      </div>

      {/* Grid of 4 Target Audience & Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Undergraduates */}
        <div className="p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-rose-200/60 dark:border-slate-800 shadow-xl hover:border-rose-500/40 transition-all hover:-translate-y-1">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-rose-500/30">
            <LuGraduationCap size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Undergraduates</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Connect with verified students across Moratuwa, Peradeniya, SLIIT, Japura, Kelaniya, and leading Sri Lankan universities.
          </p>
        </div>

        {/* Card 2: University Alumni */}
        <div className="p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-amber-200/60 dark:border-slate-800 shadow-xl hover:border-amber-500/40 transition-all hover:-translate-y-1">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-amber-500/30">
            <LuBuilding2 size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Uni Alumni</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Verified working graduates (Engineers, Doctors, IT Professionals, Corporate Managers) seeking serious life partners.
          </p>
        </div>

        {/* Card 3: Working Professionals */}
        <div className="p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-emerald-200/60 dark:border-slate-800 shadow-xl hover:border-emerald-500/40 transition-all hover:-translate-y-1">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
            <LuBriefcase size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Working Pros</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Non-campus working professionals can post proposal ads with verified identity badges for 100% transparency.
          </p>
        </div>

        {/* Card 4: Data Security & Privacy */}
        <div className="p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-purple-200/60 dark:border-slate-800 shadow-xl hover:border-purple-500/40 transition-all hover:-translate-y-1">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
            <LuShieldCheck size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Photo Privacy Guard</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            Anti-leak phone masking in chat + optional photo blur guard ensures your contact details stay 100% protected.
          </p>
        </div>

      </div>

    </div>
  );
};

export default ProposalTrustBadges;
