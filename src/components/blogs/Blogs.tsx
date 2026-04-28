import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LuMic, LuTrendingUp, LuPenTool, LuQuote, LuArrowUpRight } from 'react-icons/lu';
import { useState } from 'react';
import TiltCard from '../ui/TiltCard';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import PremiumPageLoader from '../ui/PremiumPageLoader';
import campusLife from "../../assets/campus-life.jpg"

const Blogs = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleExploreFeed = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/blogs');
      setTimeout(() => setIsNavigating(false), 500);
    }, 2000);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="blogs" className="relative py-32 bg-[#fafafa] dark:bg-[#020617] overflow-hidden">
      <PremiumPageLoader isLoading={isNavigating} message="Opening the blog archive..." />
      {/* 🌌 High-End Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.08),transparent_50%)]" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Content: Editorial Style */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-blue-600"></span>
              <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">Editorial Section</span>
            </motion.div>

            <motion.h2 variants={fadeInUp} className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-10 tracking-tight leading-[0.9]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600">Collective</span> <br />
              Wisdom.
            </motion.h2>

            <motion.p variants={fadeInUp} className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-xl font-light">
              Beyond the lecture halls lies a wealth of experience. Our Blogs section is the definitive space for Sri Lankan students to document their journey, share technical breakthroughs, and inspire the next generation.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 mb-16">
              <PremiumTraceButton
                index={5}
                onClick={handleExploreFeed}
                className="!px-10 !py-5"
                icon={<LuArrowUpRight size={20} />}
              >
                Read the Collection
              </PremiumTraceButton>

              <motion.button
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/submit-blog')}
                className="flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all"
              >
                <LuPenTool className="text-blue-600" />
                Submit Entry
              </motion.button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={fadeInUp} className="flex gap-12 border-t border-slate-200 dark:border-slate-800 pt-10">
              <div>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">500<span className="text-blue-600">+</span></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thought Pieces</div>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">15<span className="text-indigo-600">k</span></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Peers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content: Modern 3D Visual Collage */}
          <div className="order-1 lg:order-2 relative h-[600px] flex items-center justify-center">

            {/* Background Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <div className="w-[500px] h-[500px] border border-blue-500 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[400px] h-[400px] border border-dashed border-indigo-500 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

            <TiltCard className="w-full max-w-md relative z-20">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 border border-white/50 dark:border-slate-800 shadow-2xl">
                  <div className="relative h-[480px] rounded-[2rem] overflow-hidden">
                    <img
                      src={campusLife}
                      alt="Campus"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Floating Info Overlays */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
                    >
                      <LuQuote className="text-blue-400 mb-2" />
                      <p className="text-sm font-medium leading-relaxed italic">
                        "The best way to predict your future is to document your growth along the way."
                      </p>
                    </motion.div>

                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-3 mb-4">
                        <LuMic className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Recording Now</span>
                      </div>
                      <h4 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">Unleash <br /> Your Story.</h4>
                    </div>
                  </div>
                </div>

                {/* Floating "Live" Article Card */}
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 w-64 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-700 p-6 hidden xl:block z-30"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                      <LuTrendingUp size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-blue-600 uppercase">Top Blogger</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Alex Perera</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full" />
                    <div className="w-3/4 h-2 bg-slate-100 dark:bg-slate-700 rounded-full" />
                  </div>
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
                className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px]"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Blogs;
