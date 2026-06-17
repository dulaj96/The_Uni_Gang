import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LuMegaphone, LuArrowRight, LuTrendingUp, LuUsers, LuTarget } from 'react-icons/lu';

export default function AdvertiseSection() {
  const navigate = useNavigate();

  return (
    <section id="advertise" className="relative py-24 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent rounded-[100%] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-widest"
          >
            <LuMegaphone className="animate-pulse" /> Partner With Us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter"
          >
            Reach the Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Generation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 font-medium"
          >
            Position your institute, course, or brand in front of thousands of highly engaged university students across Sri Lanka. The #1 student platform awaits you.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Stats & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: LuUsers, stat: '50K+', label: 'Active Students' },
                { icon: LuTarget, stat: '85%', label: 'Engagement Rate' },
                { icon: LuTrendingUp, stat: '2M+', label: 'Monthly Impressions' },
                { icon: LuMegaphone, stat: 'Premium', label: 'Ad Placements' },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 mb-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl">
                    <item.icon />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">{item.stat}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => navigate('/advertise/submit')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 transition-all group"
              >
                Start Campaign <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right: Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3rem] p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Strategic Placements</h3>
              
              <div className="space-y-6 relative z-10">
                {/* Banner Preview */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Top Banner</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-md">High Visibility</span>
                  </div>
                  <div className="w-full h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden relative group-hover:border-blue-500 transition-colors shadow-lg">
                     <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Banner Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center px-4">
                       <span className="font-black text-white uppercase tracking-widest text-xs">Premium Placement</span>
                     </div>
                  </div>
                </motion.div>

                {/* Sidebar Preview */}
                <motion.div 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Sidebar Widget</span>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-md">Sticky Feed</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="w-3/4 h-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                      <div className="w-1/2 h-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
                    </div>
                    <div className="w-1/3 h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden relative group-hover:border-emerald-500 transition-colors shadow-lg">
                      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Sidebar Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
                {/* Popup Preview */}
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="group cursor-pointer pt-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">Global Popup</span>
                    <span className="text-xs font-black text-purple-600 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-md">Interruptive</span>
                  </div>
                  <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden relative group-hover:border-purple-500 transition-colors shadow-lg flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-3/4 h-3/4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-2 flex flex-col justify-center items-center">
                        <LuMegaphone className="text-purple-500 mb-2" size={24} />
                        <span className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px] text-center">Popup Overlay</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
