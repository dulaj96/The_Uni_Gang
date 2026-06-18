import React, { useEffect, useState } from 'react';
import { api } from '../../api';

interface Ad {
  id: string | number;
  ad_title: string;
  ad_description: string;
  company_name: string;
  image_url: string;
  target_link: string;
  placement_type: string;
  duration_days: number;
}

interface AdNativeFeedProps {
  adIndex?: number;
}

const AdNativeFeed: React.FC<AdNativeFeedProps> = ({ adIndex }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(adIndex !== undefined ? adIndex : 0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const activeAds = await api.getActiveAds();
        const nativeAds = activeAds.filter((a: Ad) => a.placement_type === 'NATIVE_FEED');
        // Shuffle or pick random if needed. For now, just set them.
        setAds(nativeAds);
      } catch (err) {
        console.error('Failed to load native ads', err);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (adIndex !== undefined) {
      // If adIndex is provided, do not auto-rotate
      if (ads.length > 0) {
        setCurrentAdIndex(adIndex % ads.length);
      }
    } else if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 10000); // rotate every 10 seconds
      return () => clearInterval(interval);
    }
  }, [ads.length, adIndex]);

  if (ads.length === 0) return null;

  const ad = ads[currentAdIndex];

  const handleAdClick = () => {
    api.trackAdClick(ad.id);
  };

  return (
    <a
      href={ad.target_link || '#'}
      target={ad.target_link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      onClick={handleAdClick}
      className="block group overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 relative my-6"
    >
      <div className="absolute top-4 right-4 z-10 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
        <span className="text-[9px] font-black uppercase tracking-widest text-white">Sponsored</span>
      </div>

      <div className="flex flex-col sm:flex-row h-full">
        {ad.image_url && (
          <div className="sm:w-1/3 relative overflow-hidden aspect-video sm:aspect-auto">
            <img 
              src={`http://localhost:5001${ad.image_url}`} 
              alt={ad.ad_title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
        
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center bg-gradient-to-br from-blue-50/50 to-transparent dark:from-slate-800/20 dark:to-transparent">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2">
            {ad.company_name}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {ad.ad_title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {ad.ad_description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
            Learn More <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default AdNativeFeed;
