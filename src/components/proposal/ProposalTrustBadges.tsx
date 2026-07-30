import { LuGraduationCap, LuBuilding2, LuBriefcase, LuShieldCheck } from 'react-icons/lu';

const ProposalTrustBadges = () => {
  return (
    <div className="py-12 mb-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">100% Safe & Verified Platform</span>
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
          Why Thousands Trust <span className="text-rose-400 italic">Uni පොරොන්දම්</span>
        </h2>
        <p className="text-slate-400 text-sm font-medium mt-2">
          Designed specifically for Sri Lankan university undergraduates, alumni, and professionals seeking lifelong marriage compatibility.
        </p>
      </div>

      {/* Grid of 4 Target Audience & Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Undergraduates */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-rose-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
            <LuGraduationCap size={24} />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Undergraduates</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Connect with verified students across Moratuwa, Peradeniya, SLIIT, Japura, Kelaniya, and leading Sri Lankan universities.
          </p>
        </div>

        {/* Card 2: University Alumni */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-amber-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
            <LuBuilding2 size={24} />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Uni Alumni</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Verified working graduates (Engineers, Doctors, IT Professionals, Corporate Managers) seeking serious life partners.
          </p>
        </div>

        {/* Card 3: Working Professionals */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-emerald-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <LuBriefcase size={24} />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Working Pros</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Non-campus working professionals can post proposal ads with verified identity badges for 100% transparency.
          </p>
        </div>

        {/* Card 4: Data Security & Privacy */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl hover:border-purple-500/40 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
            <LuShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Photo Privacy Guard</h3>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Anti-leak phone masking in chat + optional photo blur guard ensures your contact details stay 100% protected.
          </p>
        </div>

      </div>

    </div>
  );
};

export default ProposalTrustBadges;
