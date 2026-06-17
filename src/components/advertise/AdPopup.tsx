import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX, LuExternalLink, LuMegaphone } from 'react-icons/lu';
import { api } from '../../api';

interface Ad {
  id: string;
  ad_title: string;
  company_name: string;
  ad_description: string;
  image_url: string | null;
  target_link: string | null;
  placement_type: string;
}

export default function AdPopup() {
  const [ad, setAd] = useState<Ad | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);

  useEffect(() => {
    // Check if we've already shown a popup in this session
    const sessionKey = 'hasSeenAdPopup';
    if (sessionStorage.getItem(sessionKey)) {
      setHasShownThisSession(true);
      return;
    }

    const fetchPopupAd = async () => {
      try {
        const ads = await api.getActiveAds();
        const popupAds = ads.filter((a: Ad) => a.placement_type === 'POPUP');
        
        if (popupAds.length > 0) {
          // Pick a random popup ad
          const randomAd = popupAds[Math.floor(Math.random() * popupAds.length)];
          setAd(randomAd);
          
          // Add a slight delay before showing it so it feels natural
          setTimeout(() => {
            setIsVisible(true);
            sessionStorage.setItem(sessionKey, 'true');
          }, 2000);
        }
      } catch (error) {
        console.error('Failed to fetch popup ads', error);
      }
    };

    fetchPopupAd();
  }, []);

  // Timer logic
  useEffect(() => {
    if (!isVisible) return;

    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      // Auto-close when timer reaches 0
      handleClose();
    }
  }, [isVisible, timeLeft]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAdClick = () => {
    if (ad) {
      api.trackAdClick(ad.id);
      if (ad.target_link) {
        window.open(ad.target_link, '_blank');
      }
      handleClose();
    }
  };

  if (hasShownThisSession || !ad) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            {/* Header / Countdown */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-md">
                  <LuMegaphone size={14} />
                </div>
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Sponsored</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400">
                  Closing in <span className="text-blue-500">{timeLeft}s</span>
                </span>
                <button
                  onClick={handleClose}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                >
                  <LuX size={16} />
                </button>
              </div>
            </div>

            {/* Ad Content */}
            <div 
              className="p-6 sm:p-8 cursor-pointer group"
              onClick={handleAdClick}
            >
              {ad.image_url && (
                <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
                  <img 
                    src={`http://localhost:5001${ad.image_url}`} 
                    alt={ad.ad_title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              <div className="text-center">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {ad.ad_title}
                </h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                  By {ad.company_name}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {ad.ad_description}
                </p>
                
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Learn More <LuExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
