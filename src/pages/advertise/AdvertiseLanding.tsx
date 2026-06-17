import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LuTrendingUp, LuUsers, LuTarget, LuMegaphone } from 'react-icons/lu';

export default function AdvertiseLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-widest"
          >
            <LuMegaphone /> The Uni Gang Advertising
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight uppercase"
          >
            Reach the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Next Generation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto"
          >
            Connect your institute, course, or brand with thousands of highly engaged university students across Sri Lanka.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => navigate('/advertise/submit')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-600/20 hover:scale-105 transition-all"
            >
              Start Your Campaign
            </button>
            <button className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-900 dark:text-white font-black text-lg uppercase tracking-wider rounded-2xl transition-all">
              View Media Kit
            </button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: LuUsers, stat: '50K+', label: 'Active Students' },
            { icon: LuTarget, stat: '85%', label: 'Engagement Rate' },
            { icon: LuTrendingUp, stat: '2M+', label: 'Monthly Impressions' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl text-center space-y-4 shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl">
                <item.icon />
              </div>
              <h3 className="text-4xl font-black text-slate-900 dark:text-white">{item.stat}</h3>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Placements Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase">Premium Placements</h2>
            <p className="text-slate-600 dark:text-slate-400 font-medium">Choose exactly where your brand appears.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white space-y-4 shadow-2xl shadow-blue-600/20">
              <h3 className="text-2xl font-black uppercase tracking-wider">Top Banner</h3>
              <p className="text-white/80 font-medium">Massive visibility. Displayed prominently at the top of high-traffic feeds.</p>
              <div className="w-full h-32 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center font-black uppercase tracking-widest text-white/50">Preview</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4 shadow-xl shadow-slate-200/50 dark:shadow-none">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Sidebar Widget</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Sticky contextual ads that stay in view while students scroll through content.</p>
              <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black uppercase tracking-widest text-slate-400">Preview</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
