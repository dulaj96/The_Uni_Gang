import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../api';

export default function AdSidebarWidget() {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const ads = await api.getActiveAds();
        const sidebarAds = ads.filter(a => a.placement_type === 'SIDEBAR');
        if (sidebarAds.length > 0) {
          const randomAd = sidebarAds[Math.floor(Math.random() * sidebarAds.length)];
          setAd(randomAd);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAd();
  }, []);

  if (!ad) return null;

  const handleClick = () => {
    api.trackAdClick(ad.id);
    if (ad.target_link) {
      window.open(ad.target_link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all mb-8"
      onClick={handleClick}
    >
      {ad.image_url && (
        <div className="relative aspect-video overflow-hidden border-b border-slate-200 dark:border-slate-800">
          <img 
            src={`http://localhost:5001${ad.image_url}`} 
            alt={ad.ad_title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] text-white font-black uppercase tracking-widest">
            Ad
          </div>
        </div>
      )}
      <div className="p-5">
        <h4 className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{ad.company_name}</h4>
        <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2 leading-tight group-hover:text-blue-500 transition-colors">{ad.ad_title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{ad.ad_description}</p>
        
        <div className="mt-4 inline-flex items-center text-xs font-bold text-blue-500 uppercase tracking-widest group-hover:underline">
          Learn More &rarr;
        </div>
      </div>
    </motion.div>
  );
}
