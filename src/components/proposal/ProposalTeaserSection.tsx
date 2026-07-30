import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LuHeart, 
  LuSparkles, 
  LuGraduationCap, 
  LuShieldCheck, 
  LuUsers, 
  LuChevronRight
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import TiltCard from '../ui/TiltCard.tsx';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import PremiumPageLoader from '../ui/PremiumPageLoader';

const sampleProposals = [
  {
    id: 1,
    name: 'Kasun Bandara',
    age: 25,
    uni: 'University of Moratuwa',
    role: 'Civil Engineer (Consultant)',
    district: 'Colombo',
    badge: 'Verified Uni Alumni 🏫',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Dilini Perera',
    age: 23,
    uni: 'SLIIT Malabe',
    role: 'Software Eng Student',
    district: 'Kandy',
    badge: 'Verified Undergrad 🎓',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Dr. Tharindu Fernando',
    age: 28,
    uni: 'University of Peradeniya',
    role: 'Medical Officer (Doctor)',
    district: 'Gampaha',
    badge: 'Verified Professional 💼',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Ashi Jayawardena',
    age: 24,
    uni: 'University of Sri Jayewardenepura',
    role: 'Brand Manager',
    district: 'Colombo',
    badge: 'Verified Uni Alumni 🏫',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop'
  }
];

const successStories = [
  { couple: 'Ashi & Shehan', location: 'Ampara', quote: '"Uni පොරොන්දම් helped us find our genuine university match!"' },
  { couple: 'Kasun & Dilini', location: 'Kandy', quote: '"Found my soulmate from UOM Engineering. Highly recommended!"' },
  { couple: 'Isuru & Nadeeshi', location: 'Colombo', quote: '"The 100% verified student badge gave us full trust & peace of mind."' }
];

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
    <section id="proposals" className="relative py-32 bg-white dark:bg-[#020617] overflow-hidden">
      <PremiumPageLoader isLoading={isNavigating} message="Opening Uni පොරොන්දම් Hub..." />

      {/* ── Background Elements (Ambient Pink/Rose Glows) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ec4899 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-[10px] uppercase tracking-widest mb-4 ring-1 ring-rose-500/20">
            <LuHeart className="text-sm animate-pulse" /> Verified Campus Matchmaking & Proposals
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Uni <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 italic">පොරොන්දම්</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Connecting verified Sri Lankan university students, alumni, and professionals to discover lifelong compatibility and genuine soulmates.
          </p>
        </motion.div>

        {/* ── Hero Asymmetric Grid (Content Left / 3D Tilt Visual Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT: Features & Value Points (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between h-full min-h-[460px] gap-8"
          >
            <div className="space-y-4">
              
              {/* Feature 1: Verified Badges */}
              <div className="group flex gap-4 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <LuGraduationCap size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">
                    100% Verified Campus Identity
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Verified via Student ID & Uni Mail (`.ac.lk`) to guarantee genuine Sri Lankan undergraduates & graduates.
                  </p>
                </div>
              </div>

              {/* Feature 2: Anti-Leak Protection */}
              <div className="group flex gap-4 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <LuShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">
                    Anti-Leak Phone Masking Filter
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    In-app chat automatically masks phone numbers to protect student privacy until mutual contact unlock.
                  </p>
                </div>
              </div>

              {/* Feature 3: Dual Matching Modes */}
              <div className="group flex gap-4 p-5 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/80 hover:border-rose-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <LuUsers size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">
                    Campus Swiper & Proposal Search
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Switch seamlessly between interactive Card Swiping for undergrads and Detailed Proposal Search by Age/Profession/District.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <PremiumTraceButton
                index={12}
                onClick={handleOpenHub}
                isLoading={isNavigating}
                icon={<LuChevronRight />}
                className="w-full"
              >
                Explore Uni පොරොන්දම් Hub
              </PremiumTraceButton>
            </div>
          </motion.div>

          {/* RIGHT: Orbiting Animated Floating Visual Stack (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex justify-center relative min-h-[480px]"
          >
            <div className="relative w-full max-w-lg h-[520px]">

              {/* Orbiting Rotating Circles */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="w-[440px] h-[440px] border border-rose-500/20 rounded-full animate-[spin_32s_linear_infinite]" />
                <div className="absolute w-[320px] h-[320px] border border-dashed border-pink-500/20 rounded-full animate-[spin_24s_linear_infinite_reverse]" />
              </div>

              {/* Orbiting Floating Icon 1: Heart */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 left-10 w-11 h-11 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shadow-xl backdrop-blur-md z-30"
              >
                <LuHeart size={20} />
              </motion.div>

              {/* Orbiting Floating Icon 2: Sparkles */}
              <motion.div
                animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-24 right-2 w-10 h-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-500 flex items-center justify-center shadow-xl backdrop-blur-md z-30"
              >
                <LuSparkles size={18} />
              </motion.div>

              {/* Orbiting Floating Icon 3: Shield */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-16 right-10 w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center shadow-xl backdrop-blur-md z-30"
              >
                <LuShieldCheck size={20} />
              </motion.div>

              {/* Main Preview Card 1 (Male Alumni Profile) */}
              <TiltCard className="absolute top-16 left-2 w-[360px] z-20">
                <div className="relative group bg-white dark:bg-slate-900 rounded-[2.2rem] p-5 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden cursor-pointer" onClick={handleOpenHub}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-[2.2rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
                  
                  <div className="relative h-[220px] rounded-3xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop"
                      alt="Kasun Bandara"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/90 backdrop-blur-md text-white shadow-md">
                      Verified Uni Alumni 🏫
                    </span>
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/70 backdrop-blur-md text-white border border-white/20">
                      📍 Colombo • 25 yrs
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1 group-hover:text-rose-500 transition-colors">
                    Kasun Bandara
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold line-clamp-1 mt-0.5">
                    Civil Engineer (Consultant) • UOM Engineering
                  </p>
                </div>
              </TiltCard>

              {/* Preview Card 2 (Female Undergrad Profile Stacked Behind) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[14rem] right-0 w-[300px] z-10 opacity-90 hover:opacity-100 transition-opacity"
              >
                <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden cursor-pointer" onClick={handleOpenHub}>
                  <div className="relative h-[160px] rounded-2xl overflow-hidden mb-3 bg-slate-950">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop"
                      alt="Dilini Perera"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase bg-blue-500 text-white shadow-md">
                      Verified Undergrad 🎓
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">Dilini Perera</h5>
                  <p className="text-[10px] text-slate-400 font-bold">SLIIT Computing • 23 yrs</p>
                </div>
              </motion.div>

              {/* Floating Match Badge at Bottom */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute bottom-2 left-6 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl text-white shadow-2xl flex items-center gap-2.5 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                  <LuHeart size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider block">It's a Match! 💖</span>
                  <span className="text-[9px] text-rose-100 font-medium block">1,400+ Active Verified Profiles</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* ── Live Auto-Scrolling Proposals Marquee Ticker ── */}
        <div className="mt-20 pt-8 border-t border-slate-200/50 dark:border-slate-800/40">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">
                Live Verified Profiles Stream
              </h4>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">
              Hover to Pause • Click to View Profile
            </span>
          </div>

          <div className="w-full overflow-hidden relative group/marquee py-2">
            {/* Ambient gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-[#020617] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-[#020617] to-transparent z-20 pointer-events-none" />

            <div className="flex gap-5 animate-marquee whitespace-nowrap">
              {[...sampleProposals, ...sampleProposals].map((item, idx) => (
                <div
                  key={idx}
                  onClick={handleOpenHub}
                  className="inline-flex items-center gap-4 p-3.5 pr-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 shadow-lg hover:border-rose-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all cursor-pointer shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                  />
                  <div className="text-left max-w-[220px]">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1 border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white truncate my-0.5">
                      {item.name}, {item.age}
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block truncate">
                      📍 {item.district} • {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Real Success Stories Banner ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {successStories.map((story, i) => (
            <div key={i} className="p-6 rounded-2xl bg-rose-500/5 dark:bg-slate-900/40 border border-rose-500/10 dark:border-slate-800/80 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-rose-500/10 text-rose-500 mb-3">
                <LuHeart size={18} />
              </div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">{story.couple}</h4>
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block mb-2">{story.location}</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 italic font-medium leading-relaxed">{story.quote}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProposalTeaserSection;
