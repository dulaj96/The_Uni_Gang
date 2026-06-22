import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LuShoppingBag, LuTrendingUp, LuShieldCheck, LuTags, LuBriefcase, LuBadgeCheck } from 'react-icons/lu';
import { useState } from 'react';
import TiltCard from '../ui/TiltCard';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import PremiumPageLoader from '../ui/PremiumPageLoader';

const MarketSection = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreMarket = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/market');
      setTimeout(() => setIsNavigating(false), 500);
    }, 300);
  };

  return (
    <section id="market" className="relative py-32 bg-slate-50 dark:bg-[#020617] overflow-hidden">
      <PremiumPageLoader isLoading={isNavigating} message="Entering The Hustle Hub..." />
      
      {/* 🌌 High-End Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.08),transparent_50%)]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-purple-400/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-black text-[10px] uppercase tracking-widest mb-4">
            <LuTrendingUp className="text-sm" /> The Hustle Hub
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Campus <span className="text-purple-600 italic">Marketplace</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate hub for campus trade. Buy official merchandise directly from the <span className="text-purple-600 font-bold dark:text-purple-400">Uni Gang Official Store</span>, trade peer-to-peer, or offer freelance services in a secure environment.
          </p>
        </motion.div>

        {/* Filters & Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-center gap-6 mb-16"
        >
          {/* Action: PREMIUM TRACE BUTTON */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
            <PremiumTraceButton
              index={5}
              icon={<LuShoppingBag className="text-lg" />}
              onClick={handleExploreMarket}
              className="w-full sm:w-auto !bg-purple-600 hover:!bg-purple-700"
            >
              Enter Marketplace
            </PremiumTraceButton>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
          {/* Left Side: Modern 3D Visual Collage (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start gap-12 order-2 lg:order-1">
            {/* Modern 3D Visual Collage */}
            <div className="relative h-[500px] flex items-center justify-center w-full max-w-sm lg:max-w-md mx-auto lg:mx-0">
              {/* Background Decorative Rings */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-[400px] h-[400px] border border-purple-500 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[300px] h-[300px] border border-dashed border-indigo-500 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              </div>

              <TiltCard className="w-full max-w-md relative z-20">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                  <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-white/50 dark:border-slate-800 shadow-2xl">
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=800&auto=format&fit=crop"
                        alt="Marketplace Gear"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Floating Info Overlays */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute top-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
                      >
                        <LuTags className="text-purple-400 mb-2 text-xl" />
                        <p className="text-xs font-medium leading-relaxed italic">
                          "Got my engineering calculator for half the price from a senior. Best deal ever!"
                        </p>
                      </motion.div>

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-2">
                          <LuShieldCheck className="text-emerald-400 text-lg" />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Student Verified</span>
                        </div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Safe & <br /> Secure.</h4>
                      </div>
                    </div>
                  </div>

                  {/* Floating "Hot Deal" Card */}
                  <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -left-8 top-1/2 -translate-y-1/2 w-48 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 p-4 hidden xl:block z-30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                        <LuShoppingBag size={20} />
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-purple-600 uppercase">Hot Deal</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Drawing Board</div>
                      </div>
                    </div>
                    <div className="text-lg font-black text-emerald-500">Rs. 3,500</div>
                  </motion.div>
                </div>
              </TiltCard>

              {/* Random Floating Particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  className="absolute w-2 h-2 bg-purple-500 rounded-full blur-[1px]"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${80 - i * 10}%`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Features Grid (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col w-full justify-center order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <LuBadgeCheck className="w-6 h-6" />,
                  title: "Uni Gang Official Store",
                  desc: "Buy university merchandise, graduation bouquets, and custom souvenirs directly with a premium cart & receipt checkout flow.",
                  color: "amber",
                  featured: true,
                  badge: "Verified Merchant"
                },
                {
                  icon: <LuShoppingBag className="w-6 h-6" />,
                  title: "Physical Goods",
                  desc: "Buy and sell textbooks, drawing tables, laptops, and calculators.",
                  color: "blue"
                },
                {
                  icon: <LuBriefcase className="w-6 h-6" />,
                  title: "Freelance Gigs",
                  desc: "Offer tutoring, graphic design, or coding services to your peers.",
                  color: "purple"
                },
                {
                  icon: <LuShieldCheck className="w-6 h-6" />,
                  title: "Zero Scams",
                  desc: "Only university-verified students can buy or sell. 100% safe.",
                  color: "emerald"
                },
                {
                  icon: <LuTrendingUp className="w-6 h-6" />,
                  title: "The Hustle Hub",
                  desc: "Keep the money circulating within the campus community.",
                  color: "amber"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`group relative backdrop-blur-md p-6 rounded-3xl border transition-all overflow-hidden ${
                    feature.featured
                      ? 'sm:col-span-2 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-indigo-500/10 dark:from-amber-500/5 dark:via-purple-500/5 dark:to-indigo-500/5 border-amber-500/30 hover:border-amber-500/60 shadow-[0_8px_30px_rgba(245,158,11,0.08)]'
                      : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-700/50 hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)]'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-${feature.color}-500 bg-${feature.color}-500/10 mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    {feature.badge && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex w-full justify-center lg:justify-start gap-12 mt-12"
            >
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2">2<span className="text-purple-600">k+</span></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Listings</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2">100<span className="text-emerald-500">%</span></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Students</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
