import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../api';

export default function AdBanner({ placement = 'BANNER' }: { placement?: string }) {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const ads = await api.getActiveAds();
        const bannerAds = ads.filter(a => a.placement_type === placement);
        if (bannerAds.length > 0) {
          // Pick a random ad for rotation
          const randomAd = bannerAds[Math.floor(Math.random() * bannerAds.length)];
          setAd(randomAd);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAd();
  }, [placement]);

  if (!ad) return null;

  const handleClick = () => {
    api.trackAdClick(ad.id);
    if (ad.target_link) {
      window.open(ad.target_link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative overflow-hidden rounded-2xl md:rounded-[2rem] cursor-pointer group shadow-xl mb-8"
      onClick={handleClick}
    >
      {ad.image_url ? (
        <img
          src={`http://localhost:5001${ad.image_url}`}
          alt={ad.ad_title}
          className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div className="w-full h-32 md:h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
          <h3 className="text-white text-2xl font-black">{ad.ad_title}</h3>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-6">
        <div className="flex items-center gap-2 mb-1 md:mb-2">
          <span className="bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">Sponsored</span>
          <span className="text-white/80 text-xs font-bold">{ad.company_name}</span>
        </div>
        <h3 className="text-white text-lg md:text-2xl font-black">{ad.ad_title}</h3>
        <p className="text-white/80 text-xs md:text-sm line-clamp-1">{ad.ad_description}</p>
      </div>
    </motion.div>
  );
}
