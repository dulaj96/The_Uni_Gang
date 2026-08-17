import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuHome, LuSearch } from 'react-icons/lu';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-24 selection:bg-blue-500/30">
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist on The Uni Gang." 
      />
      
      <div className="w-full max-w-2xl text-center relative z-10">
        {/* Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* The 404 Text */}
          <h1 className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-blue-800 to-blue-400 dark:from-white dark:via-blue-400 dark:to-blue-900 opacity-90 drop-shadow-2xl">
            404
          </h1>

          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] p-10 sm:p-14 border border-white/50 dark:border-slate-800/50 shadow-2xl -mt-16 sm:-mt-24 relative z-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              Oops! You've lost your way.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 font-medium">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to campus.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/" 
                className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-transparent"
              >
                <LuHome className="text-lg" /> Back to Home
              </Link>
              <Link 
                to="/annex-list" 
                className="w-full sm:w-auto bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 border border-blue-200 dark:border-slate-700 shadow-sm"
              >
                <LuSearch className="text-lg" /> Find Annexes
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
