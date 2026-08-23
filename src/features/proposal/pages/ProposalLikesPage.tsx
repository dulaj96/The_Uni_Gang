import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { proposalApi } from '../api/proposalApi';
import toast from 'react-hot-toast';
import VerifiedBadge from '../../../components/ui/VerifiedBadge';

interface ProposalLikesPageProps {
  setPage: (page: string) => void;
}

const ProposalLikesPage: React.FC<ProposalLikesPageProps> = ({ setPage }) => {
  const [likes, setLikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(true);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await proposalApi.getLikedMe();
        if (res.success) {
          setLikes(res.data);
        }
      } catch (err: any) {
        if (err.requiresPremium) {
          setIsPremium(false);
        } else {
          toast.error('Failed to load likes');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLikes();
  }, []);

  const handleMatch = async (userId: string) => {
    try {
      const res = await proposalApi.swipe(userId, 'like');
      if (res.isMatch) {
        toast.success("It's a Match! 🎉");
        // Remove from likes list
        setLikes(prev => prev.filter(p => p.user_id !== userId));
      }
    } catch (err: any) {
      if (err.requiresPremium) {
        setPage('premium');
      } else {
        toast.error('Failed to match');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 h-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900 z-10 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(245,158,11,0.5)]">
            <Heart size={40} className="text-white drop-shadow-md" fill="white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">See Who Liked You</h2>
          <p className="text-slate-300 mb-8 max-w-md">Upgrade to Premium to instantly see everyone who has swiped right on your profile. Match with them instantly!</p>
          <button 
            onClick={() => setPage('premium')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles size={20} />
            Upgrade to Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="text-white" fill="white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Likes You</h1>
            <p className="text-slate-500 text-sm">People who swiped right on your profile</p>
          </div>
        </div>

        {likes.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No likes yet</h3>
            <p className="text-slate-500">Keep your profile updated to get more matches!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {likes.map((profile, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={profile.id} 
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700"
              >
                <div className="aspect-[3/4] relative">
                  <img 
                    src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}${profile.avatar}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={profile.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-white leading-none">{profile.name}</h3>
                      {profile.isVerified && <VerifiedBadge size={16} title="Verified Student" />}
                      {profile.isVerifiedProfessional && !profile.isVerified && <VerifiedBadge size={16} title="Verified Professional" />}
                    </div>
                    
                    <div className="flex flex-col gap-1 text-[10px] text-white/80 font-medium">
                      <div className="flex items-center gap-1.5"><Briefcase size={10} /> {profile.profession || 'Student'}</div>
                      <div className="flex items-center gap-1.5"><MapPin size={10} /> {profile.district}</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 absolute top-0 right-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity translate-y-full group-hover:translate-y-0 bottom-0 flex flex-col justify-end">
                  <button 
                    onClick={() => handleMatch(profile.user_id)}
                    className="w-full py-3 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                  >
                    <Heart size={18} fill="white" /> Match Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalLikesPage;
