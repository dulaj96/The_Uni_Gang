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
    <section id="proposals" className="relative py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <PremiumPageLoader isLoading={isNavigating} message="Opening Proposals & Soulmate Hub..." />

      {/* ── Ambient Radial Mesh Glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #f43f5e 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/10 dark:bg-rose-500/15 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-pink-500/10 dark:bg-pink-500/15 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Standarized Centered Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest mb-3 ring-1 ring-rose-500/20">
            <LuSparkles className="text-sm animate-pulse" /> Verified Campus Matchmaking
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Verified Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">Proposals</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed">
            Discover verified university undergraduates, alumni, and working professionals for genuine lifelong connections.
          </p>
        </div>

        {/* ── Hero Split Showcase Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Asymmetric Dual Profile Card Showcase (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative flex justify-center items-center min-h-[480px]"
          >
            <div className="relative w-full max-w-lg">

              {/* Floating Badge 1 (Top Left) */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -left-4 z-30 px-4 py-2 rounded-2xl bg-white/95 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <LuHeart className="text-rose-500 animate-bounce" size={16} /> 98% Match Rate
              </motion.div>

              {/* Floating Badge 2 (Top Right) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-5 -right-2 z-30 px-4 py-2 rounded-2xl bg-white/95 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-300 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <LuGraduationCap size={18} /> Student Verified 🎓
              </motion.div>

              {/* Floating Badge 3 (Mid Right) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-1/2 -right-6 -translate-y-1/2 z-30 px-4 py-2 rounded-2xl bg-white/95 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/30 text-purple-600 dark:text-purple-300 backdrop-blur-xl shadow-xl flex items-center gap-2 text-xs font-black uppercase tracking-wider hidden sm:flex"
              >
                <LuShieldCheck size={18} /> Anti-Leak Shield 🔒
              </motion.div>

              {/* Main Glowing Frame Container */}
              <div className="relative p-6 sm:p-8 rounded-[2.5rem] bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-2xl transition-all duration-300">

                {/* Top Status Header */}
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">
                      Live Campus Match Hub
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    100% Student Verified
                  </span>
                </div>

                {/* Dual Interactive Profile Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">

                  {/* Card 1: Female Undergrad */}
                  <TiltCard>
                    <div className="group bg-slate-50 dark:bg-slate-950/90 rounded-3xl p-4 border border-rose-200 dark:border-rose-500/30 hover:border-rose-500 transition-all cursor-pointer shadow-lg" onClick={handleOpenHub}>
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

                      <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-rose-500 transition-colors">
                        Dilini Perera
                      </h4>
                      <p className="text-[10px] text-rose-600 dark:text-rose-400 font-extrabold uppercase tracking-wider mt-0.5">
                        Software Eng • SLIIT Malabe
                      </p>
                    </div>
                  </TiltCard>

                  {/* Card 2: Male Uni Alumni */}
                  <TiltCard>
                    <div className="group bg-slate-50 dark:bg-slate-950/90 rounded-3xl p-4 border border-amber-200 dark:border-amber-500/30 hover:border-amber-500 transition-all cursor-pointer shadow-lg" onClick={handleOpenHub}>
                      <div className="relative h-56 rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-900">
                        <img
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500&auto=format&fit=crop"
                          alt="Kasun Bandara"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-md">
                          Verified Alumni 🏫
                        </span>
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                          📍 Colombo • 25 yrs
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-amber-500 transition-colors">
                        Kasun Bandara
                      </h4>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider mt-0.5">
                        Civil Engineer • UOM
                      </p>
                    </div>
                  </TiltCard>

                </div>

                {/* Floating Bottom Match Notification Bar */}
                <div className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 border border-rose-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm shadow-md animate-bounce">
                      <LuHeart />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider block">It's a Campus Match! 💖</span>
                      <span className="text-[10px] text-rose-600 dark:text-rose-300 font-medium block">Filter by Age, Uni, Profession & District</span>
                    </div>
                  </div>

                  <button
                    onClick={handleOpenHub}
                    className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] uppercase tracking-wider border-none cursor-pointer shadow-md transition-colors"
                  >
                    View Hub
                  </button>
                </div>

              </div>

            </div>
          </motion.div>

          {/* RIGHT: Value Proposition & Feature Cards (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Find Your Educated <span className="text-rose-500 dark:text-rose-400 italic">Soulmate</span>
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mt-2">
                Connecting genuine university undergraduates, working alumni, and young professionals in a 100% verified, safe environment.
              </p>
            </div>

            {/* Feature Cards Stack */}
            <div className="space-y-3.5 pt-1">

              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/40 transition-colors shadow-sm">
                <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                  <LuGraduationCap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">🎓 100% Student & Alumni Verification</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Student ID & `.ac.lk` mail මගින් 100% Genuine ශ්‍රී ලාංකික Campus matches බව තහවුරු කිරීම.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/40 transition-colors shadow-sm">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0 mt-0.5">
                  <LuLock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">🔒 Anti-Leak Contact Security Filter</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Phone Numbers / Contact Leaks වැළැක්වීමේ automated Regex Privacy Engine එක.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-pink-500/40 transition-colors shadow-sm">
                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 shrink-0 mt-0.5">
                  <LuMessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">💬 Encrypted In-App Chat & Free Teaser</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    Messages 3ක් නොමිලේ යවා Chat කිරීමට සහ VIP Upgrade එක ලබාගැනීමට ඇති පහසුකම.
                  </p>
                </div>
              </div>

            </div>

            {/* Action CTA Button */}
            <div className="pt-2">
              <PremiumTraceButton
                index={15}
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
