import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import AnnexAdForm from './annex/AnnexAdForm';
import MyAdsList from './annex/MyAdsList';
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'
import { LuPlus, LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { dispatchAuthUpdate } from '../utils/authEvents';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import { Annex } from '../types/annex';

const dummyMyAds: Annex[] = [
  {
    id: 'user_ad_1',
    title: 'Annex near Peradeniya',
    price: '20,000',
    address: 'No. 10, Flower Road, Colombo 07',
    images: [annex1],
    description: 'A comfortable annex with all facilities.',
    features: ['Single Room', 'Attached Bathroom', 'Furnished'],
    contactName: 'Kasun',
    contactPhone: '071-1234567',
    contactEmail: 'kasun@example.com',
    university: 'University of Colombo'
  },
  {
    id: 'user_ad_2',
    title: 'Room for student',
    price: '18,000',
    address: 'No. 5, Lake Road, Peradeniya',
    images: [annex2],
    description: 'Large room with good ventilation.',
    features: ['Double Room', 'Shared Bathroom'],
    contactName: 'Nimal',
    contactPhone: '077-9876543',
    contactEmail: 'nimal@example.com',
    university: 'University of Peradeniya'
  }
];

import PremiumPageLoader from '../components/ui/PremiumPageLoader';
import { motion, AnimatePresence } from 'framer-motion';

const PostAdPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'postAdForm' | 'myAds'>('postAdForm');
  const [editingAd, setEditingAd] = useState<Annex | null>(null);
  const [myAds, setMyAds] = useState<Annex[]>(dummyMyAds);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentView('postAdForm');
    }
    
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (tab === 'myAds') setCurrentView('myAds');
  }, [tab]);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('postAdForm');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userProfilePicture');
    localStorage.removeItem('userName');
    dispatchAuthUpdate();
    toast.success('Logged out successfully');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAnnexFormSubmit = (adData: any, isEditing: boolean) => {
    if (isEditing && editingAd) {
      setMyAds(myAds.map(ad => ad.id === editingAd.id ? {
        ...ad,
        ...adData,
        images: adData.existingImages.concat(adData.newImages.map((file: File) => URL.createObjectURL(file)))
      } : ad));
      toast.success('Ad updated successfully!');
    } else {
      const newAd = {
        ...adData,
        id: `user_ad_${myAds.length + 1}`,
        images: adData.newImages.map((file: File) => URL.createObjectURL(file)),
      };
      setMyAds([...myAds, newAd]);
      toast.success('Ad posted successfully!');
    }
    setEditingAd(null);
    setCurrentView('myAds');
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      setMyAds(myAds.filter(ad => ad.id !== adId));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20">
      <PremiumPageLoader isLoading={loading} message="Authenticating..." />
      
      <SEO
        title="Post Your Annex Advertisement - The Uni Gang"
        description="Landlords and students: Post your boarding place or annex advertisement for free and reach thousands of students."
      />

      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key={isLoggedIn ? 'dashboard' : 'auth'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 md:px-8 pt-24"
          >
            {!isLoggedIn ? (
              <div className="flex flex-col justify-center items-center py-10">
                <AuthCard onAuthSuccess={handleAuthSuccess} />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Dashboard Nav */}
                <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/20 dark:border-slate-800 p-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl w-full sm:w-auto">
                    <button
                      onClick={() => { setCurrentView('postAdForm'); setEditingAd(null); }}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${currentView === 'postAdForm' 
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-lg' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                      <LuPlus className="w-4 h-4" /> Post New
                    </button>
                    <button
                      onClick={() => { setCurrentView('myAds'); setEditingAd(null); }}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${currentView === 'myAds' 
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-lg' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                      <LuLayoutDashboard className="w-4 h-4" /> My Ads
                    </button>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 px-8 py-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-sm border border-red-100 dark:border-red-900/50 active:scale-95"
                  >
                    <LuLogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>

                <motion.div
                  key={currentView + (editingAd?.id || 'new')}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {currentView === 'postAdForm' && (
                    <AnnexAdForm
                      initialData={editingAd ?? undefined}
                      onSubmit={handleAnnexFormSubmit}
                      onCancel={() => setCurrentView('myAds')}
                      isEditing={!!editingAd}
                    />
                  )}

                  {currentView === 'myAds' && (
                    <MyAdsList
                      ads={myAds}
                      onEdit={(ad: Annex) => { setEditingAd(ad); setCurrentView('postAdForm'); }}
                      onDelete={handleDeleteAd}
                    />
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostAdPage;
