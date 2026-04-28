import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumPageLoaderProps {
  isLoading: boolean;
  message?: string;
}

const PremiumPageLoader: React.FC<PremiumPageLoaderProps> = ({ isLoading, message = "Loading the future..." }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-2xl"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-600/30"
            />
            
            {/* Inner Pulsing Core */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            />

            {/* Orbiting Dot */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 flex items-start justify-center"
            >
              <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            </motion.div>
          </div>

          {/* Loading Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">
              {message}
            </h2>
            <div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.2 
                  }}
                  className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Decorative Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumPageLoader;
