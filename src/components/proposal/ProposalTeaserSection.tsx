import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LuHeart, 
  LuSparkles, 
  LuGraduationCap, 
  LuShieldCheck, 
  LuMessageSquare, 
  LuChevronRight,
  LuLock
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import TiltCard from '../ui/TiltCard';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import PremiumPageLoader from '../ui/PremiumPageLoader';

const ProposalTeaserSection = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOpenHub = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/proposals');
      setTimeout(() => setIsNavigating(false), 100);
    }, 300);
  };

  return (
    <section id="proposals" className="relative py-32 bg-slate-950 text-white overflow-hidden">
      <PremiumPageLoader isLoading={isNavigating} message="Opening Proposal & Soulmate Hub..." />

      {/* ── Ambient Radial Mesh Glows & Particle Grid ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f43f5e 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Main Hero Split Layout (Interactive Left Showcase / Value Pitch Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: 3D Stacked Floating Card Showcase (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative flex justify-center items-center min-h-[500px]"
          >
            <div className="relative w-full max-w-md h-[520px]">

              {/* Glowing Pulse Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[460px] h-[460px] border border-rose-500/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />
                <div className="absolute w-[360px] h-[360px] border border-pink-500/20 rounded-full animate-pulse" />
              </div>

              {/* Floating Badge 1: Compatibility Score */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 right-0 z-30 px-4 py-2 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <LuHeart className="text-rose-400 animate-bounce" size={16} /> 98% Campus Match
              </motion.div>

              {/* Floating Badge 2: Student Verified */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-28 -left-6 z-30 px-4 py-2 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-300 backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <LuGraduationCap size={16} /> Student ID Verified 🎓
              </motion.div>

              {/* Floating Badge 3: Anti-Leak Privacy */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 -right-4 z-30 px-4 py-2 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <LuShieldCheck size={16} /> Phone Masking Active 🔒
              </motion.div>

              {/* Primary Featured Card (Female Profile) */}
              <TiltCard className="absolute top-10 left-4 w-[340px] z-20">
                <div className="relative group bg-slate-900/90 rounded-[2.5rem] p-5 border border-rose-500/30 shadow-2xl backdrop-blur-xl overflow-hidden cursor-pointer" onClick={handleOpenHub}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-500" />

                  <div className="relative h-64 rounded-3xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop"
                      alt="Dilini Perera"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-3.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
                      Verified Undergrad 🎓
                    </span>
                    <span className="absolute bottom-3 left-3 px-3.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                      📍 Kandy • 23 yrs
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white uppercase tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors">
                    Dilini Perera
                  </h3>
                  <p className="text-xs text-rose-400 font-extrabold uppercase tracking-wider mt-0.5">
                    Software Eng • SLIIT Malabe
                  </p>
                  <p className="text-xs text-slate-400 font-medium italic mt-2 line-clamp-2">
                    "Looking for a genuine, educated partner on Uni පොරොන්දම්."
                  </p>
                </div>
              </TiltCard>

              {/* Stacked Secondary Card (Male Profile Behind) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 right-2 w-[280px] z-10 opacity-70 hover:opacity-100 transition-opacity"
              >
                <div className="bg-slate-900/80 rounded-[2rem] p-4 border border-slate-800 shadow-xl backdrop-blur-md overflow-hidden cursor-pointer" onClick={handleOpenHub}>
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop"
                      alt="Kasun Bandara"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase bg-amber-500 text-white shadow-md">
                      Verified Alumni 🏫
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">Kasun Bandara, 25</h4>
                  <p className="text-[10px] text-slate-400 font-bold">Civil Engineer • UOM</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* RIGHT: Value Proposition & Information (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-400 font-black text-[10px] uppercase tracking-widest mb-4 ring-1 ring-rose-500/30">
                <LuSparkles className="text-sm animate-pulse" /> Verified Campus Matchmaking
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Uni <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 italic">පොරොන්දම්</span>
              </h2>

              <p className="text-base text-slate-400 leading-relaxed font-medium">
                Sri Lanka's dedicated proposal and matchmaking hub for verified university undergraduates, alumni, and working professionals.
              </p>
            </div>

            {/* Value Points */}
            <div className="space-y-4 pt-2">

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 shrink-0 mt-0.5">
                  <LuGraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">100% Student & Alumni Verification</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Profiles are verified via Student ID photo or `.ac.lk` email to ensure authentic Sri Lankan campus matches.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                  <LuLock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Anti-Leak Phone Masking Filter</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Automatic in-app Regex filter masks phone numbers in messages to protect privacy until mutual contact unlock.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 shrink-0 mt-0.5">
                  <LuMessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">In-App Chat with Free 3-Message Teaser</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    Chat safely within the app for free before upgrading to VIP for unlimited messaging and direct contact access.
                  </p>
                </div>
              </div>

            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <PremiumTraceButton
                index={14}
                onClick={handleOpenHub}
                isLoading={isNavigating}
                icon={<LuChevronRight />}
                className="w-full text-xs uppercase tracking-widest py-4 font-black"
              >
                Explore Proposals Hub
              </PremiumTraceButton>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ProposalTeaserSection;
