import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import AnnexForm from '../components/annex/AnnexForm';
import MyAdsList from '../components/annex/MyAdsList';
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'
import { LuPlus, LuLayoutDashboard, LuLogOut } from 'react-icons/lu';
import { dispatchAuthUpdate } from '../utils/authEvents';

const dummyMyAds = [
  {
    id: 'user_ad_1',
    title: 'Annex near Peradeniya',
    price: 'Rs. 20,000/month',
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
    price: 'Rs. 18,000/month',
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

const PostAdPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<'postAdForm' | 'myAds'>('postAdForm');
  const [editingAd, setEditingAd] = useState<any | null>(null);
  const [myAds, setMyAds] = useState<any[]>(dummyMyAds);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentView('postAdForm');
    }
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
  };

  const handleAnnexFormSubmit = (adData: any, isEditing: boolean) => {
    if (isEditing && editingAd) {
      setMyAds(myAds.map(ad => ad.id === editingAd.id ? {
        ...ad,
        ...adData,
        images: adData.existingImages.concat(adData.newImages.map((file: File) => URL.createObjectURL(file)))
      } : ad));
      alert('Ad updated successfully!');
    } else {
      const newAd = {
        ...adData,
        id: `user_ad_${myAds.length + 1}`,
        images: adData.newImages.map((file: File) => URL.createObjectURL(file)),
      };
      setMyAds([...myAds, newAd]);
      alert('Ad posted successfully!');
    }
    setEditingAd(null);
    setCurrentView('myAds');
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      setMyAds(myAds.filter(ad => ad.id !== adId));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center py-10 px-4">
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Dashboard Nav */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-2 flex justify-center sm:justify-between items-center">
        <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
          <button
            onClick={() => { setCurrentView('postAdForm'); setEditingAd(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'postAdForm' ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
          >
            <LuPlus className="w-4 h-4" /> Post New Ad
          </button>
          <button
            onClick={() => { setCurrentView('myAds'); setEditingAd(null); }}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${currentView === 'myAds' ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
          >
            <LuLayoutDashboard className="w-4 h-4" /> Manage Ads
          </button>
        </div>
        <button onClick={handleLogout} className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors text-sm">
          <LuLogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div>
        {currentView === 'postAdForm' && (
          <AnnexForm
            initialData={editingAd}
            onSubmit={handleAnnexFormSubmit}
            onCancel={() => setCurrentView('myAds')}
            isEditing={!!editingAd}
          />
        )}

        {currentView === 'myAds' && (
          <MyAdsList
            ads={myAds}
            onEdit={(ad) => { setEditingAd(ad); setCurrentView('postAdForm'); }}
            onDelete={handleDeleteAd}
          />
        )}
      </div>
    </div>
  );
};

export default PostAdPage;
