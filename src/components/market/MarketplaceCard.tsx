import React from 'react';
import { LuBadgeCheck, LuStar, LuClock } from 'react-icons/lu';
import { formatDistanceToNow } from 'date-fns';

interface MarketplaceCardProps {
  item: {
    id: string;
    title: string;
    type: 'PRODUCT' | 'GIG' | 'OFFICIAL_PRODUCT';
    price: number | string;
    condition?: string | null;
    description?: string | null;
    images?: string[] | null;
    createdAt?: string | null;
    rating?: number | string | null;
    rating_count?: number | null;
    seller?: {
      name?: string | null;
      profile_pic?: string | null;
      is_verified_student?: boolean;
    } | null;
    is_featured?: boolean;
  };
  onClick: () => void;
}

const MarketplaceCard: React.FC<MarketplaceCardProps> = ({ item, onClick }) => {
  const imageUrl =
    item.images && item.images.length > 0
      ? `http://localhost:5001${item.images[0]}`
      : 'https://images.unsplash.com/photo-1521556906631-0c58e7ce65e5?q=80&w=600&auto=format&fit=crop';

  const displayPrice = parseFloat(String(item.price || 0)).toLocaleString();
  const sellerName = item.seller?.name ?? 'Unknown Seller';
  const sellerPic =
    item.seller?.profile_pic ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(sellerName)}`;
  const isVerified = item.seller?.is_verified_student ?? false;

  let timeAgo = 'Recently';
  try {
    if (item.createdAt) {
      timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
    }
  } catch {
    timeAgo = 'Recently';
  }

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border ${
        item.type === 'OFFICIAL_PRODUCT' ? 'border-amber-500/40 dark:border-amber-500/20' : item.is_featured ? 'border-amber-400' : 'border-gray-100 dark:border-white/10'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.is_featured && (
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
              <LuStar className="w-3 h-3 fill-current" /> Featured
            </span>
          )}
          {item.type === 'OFFICIAL_PRODUCT' ? (
            <span className="px-3 py-1 text-xs font-bold rounded-full shadow-md bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              Official Store
            </span>
          ) : (
            <span
              className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                item.type === 'GIG' ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'
              }`}
            >
              {item.type}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 ml-3 shrink-0">
            Rs. {displayPrice}
          </span>
        </div>

        {/* Rating Display */}
        <div className="flex items-center gap-1 mb-2 text-amber-500 font-bold text-xs">
          <span className="flex items-center">
            <LuStar className={`w-3.5 h-3.5 ${parseFloat(String(item.rating || 0)) > 0 ? 'fill-current' : 'text-gray-300 dark:text-slate-600'}`} />
          </span>
          {parseFloat(String(item.rating || 0)) > 0 ? (
            <>
              <span>{parseFloat(String(item.rating)).toFixed(1)}</span>
              <span className="text-gray-400 dark:text-slate-500 font-normal">({item.rating_count || 0})</span>
            </>
          ) : (
            <span className="text-gray-400 dark:text-slate-500 font-normal">No ratings</span>
          )}
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2 mb-4 flex-grow">
          {item.description ?? ''}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/[0.06]">
          {item.type === 'OFFICIAL_PRODUCT' ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white text-xs font-black flex items-center justify-center border border-white/20 shadow-sm shrink-0">
                UG
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white leading-none">Uni Gang Store</span>
                  <LuBadgeCheck className="w-3.5 h-3.5 text-amber-505" title="Verified Store" />
                </div>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <LuClock className="w-3 h-3" />
                  {timeAgo}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={sellerPic}
                alt={sellerName}
                className="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-white/10"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-900 dark:text-white line-clamp-1">{sellerName}</span>
                  {isVerified && (
                    <LuBadgeCheck className="w-3.5 h-3.5 text-blue-500" title="Verified Student" />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 dark:text-slate-500 flex items-center gap-1">
                  <LuClock className="w-3 h-3" />
                  {timeAgo}
                </span>
              </div>
            </div>
          )}

          {item.type === 'PRODUCT' && item.condition && (
            <span className="text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 px-2.5 py-1 rounded-md">
              {item.condition}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
