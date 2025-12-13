import React, { useState } from 'react';
import { LuChevronLeft, LuChevronRight, LuPencil, LuTrash, LuMapPin } from 'react-icons/lu';

interface MyAdsListProps {
  ads: any[];
  onEdit: (ad: any) => void;
  onDelete: (adId: string) => void;
}

const MyAdsList: React.FC<MyAdsListProps> = ({ ads, onEdit, onDelete }) => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [adId: string]: number }>({});

  const handleNextImage = (adId: string, totalImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) + 1) % totalImages
    }));
  };

  const handlePrevImage = (adId: string, totalImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [adId]: ((prev[adId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  if (ads.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Ads Posted Yet</h3>
        <p className="text-slate-500 dark:text-slate-400">Create your first listing to start reaching students.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ads.map((ad) => {
        const images = Array.isArray(ad.images) ? ad.images : (ad.images ? [ad.images] : []);
        const currentIndex = currentImageIndices[ad.id] || 0;

        return (
          <div key={ad.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-700 flex flex-col">
            <div className="relative h-56 bg-slate-200 dark:bg-slate-700">
              {images.length > 0 ? (
                <img src={images[currentIndex]} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
              )}

              {images.length > 1 && (
                <>
                  <button onClick={() => handlePrevImage(ad.id, images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 backdrop-blur"><LuChevronLeft /></button>
                  <button onClick={() => handleNextImage(ad.id, images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 backdrop-blur"><LuChevronRight /></button>
                </>
              )}

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                {ad.price}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{ad.title}</h3>
              <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-4">
                <LuMapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{ad.address}</span>
              </div>

              <div className="mt-auto flex gap-3 pt-4 border-t border-slate-50 dark:border-slate-700">
                <button onClick={() => onEdit(ad)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <LuPencil className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => onDelete(ad.id)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                  <LuTrash className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyAdsList;
