import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import AnnexForm from '../components/annex/AnnexForm';
import MyAdsList from '../components/annex/MyAdsList';
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'

// Dummy Annex Data for My Ads (ආදර්ශන දත්ත)
// මෙතන ඇත්තටම backend එකෙන් එන user ගේ ads වෙනුවට මේ dummy data පාවිච්චි කරනවා
const dummyMyAds = [
  {
    id: 'user_ad_1',
    title: 'Annex near to the Peradeniya',
    price: 'Rs. 20,000/month',
    address: 'No. 10, Flower Road, Colombo 07',
    images: annex1,
    description: 'A comfortable annex with all facilities.',
    features: ['Single Room', 'Attached Bathroom', 'Furnished'],
    contactName: 'Kasun',
    contactPhone: '071-1234567',
    contactEmail: 'kasun@example.com',
    university: 'University of Colombo'
  },
  {
    id: 'user_ad_2',
    title: 'Rent annex for student near to the colombo',
    price: 'Rs. 18,000/month',
    address: 'No. 5, Lake Road, Peradeniya',
    images: annex2,
    description: 'Large room with good ventilation and a peaceful environment.',
    features: ['Double Room', 'Shared Bathroom', 'Parking'],
    contactName: 'Nimal',
    contactPhone: '077-9876543',
    contactEmail: 'nimal@example.com',
    university: 'University of Peradeniya'
  },
  {
    id: 'user_ad_3',
    title: 'Rent annex for girls near to sabaragamuwa',
    price: 'Rs. 22,000/month',
    address: 'No. 22, High Level Road, Nugegoda',
    images: annex1,
    description: 'Newly built annex with modern amenities, close to public transport.',
    features: ['Single Room', 'Attached Bathroom', 'AC', 'Hot Water'],
    contactName: 'Priya',
    contactPhone: '075-1122334',
    contactEmail: 'priya@example.com',
    university: 'Open University of Sri Lanka'
  },
];


const PostAdPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // View management state: 'postAdForm', 'myAds'
  const [currentView, setCurrentView] = useState<'postAdForm' | 'myAds'>('postAdForm');
  const [editingAd, setEditingAd] = useState<any | null>(null);

  const [myAds, setMyAds] = useState<any[]>(dummyMyAds);

  //profiledropdown eke my add click karama myAds walata path eka hadanna
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentView('postAdForm');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('postAdForm');
  };

  const handleGoBackToLogin = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false to show the login/register card
    localStorage.removeItem('userToken'); // Optionally remove the token
    localStorage.removeItem('userProfilePicture');
  };

  const handleAnnexFormSubmit = (adData: any, isEditing: boolean) => {
    if (isEditing && editingAd) {
      console.log('Updating Ad:', editingAd.id, adData);
      // Update dummyMyAds for demonstration
      setMyAds(myAds.map(ad => ad.id === editingAd.id ? { ...ad, ...adData, images: adData.existingImages.concat(adData.newImages.map((file: File) => URL.createObjectURL(file))) } : ad));
      alert('Ad updated successfully!');
    } else {
      console.log('Posting New Ad:', adData);
      // Add to dummyMyAds for demonstration
      const newAd = {
        ...adData,
        id: `user_ad_${myAds.length + 1}`,
        images: adData.existingImages.concat(adData.newImages.map((file: File) => URL.createObjectURL(file))),
        university: adData.selectedCampus
      };
      setMyAds([...myAds, newAd]);
      alert('Ad posted successfully!');
    }
    setEditingAd(null);
    setCurrentView('myAds');
  };

  const handleCancelForm = () => {
    setEditingAd(null);
    setCurrentView('myAds');
  };

  const handleEditAd = (ad: any) => {
    setEditingAd(ad);
    setCurrentView('postAdForm');
  };

  const handleDeleteAd = (adId: string) => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      console.log('Deleting Ad:', adId);
      // Backend API call to delete ad
      setMyAds(myAds.filter(ad => ad.id !== adId));
      alert('Ad deleted successfully!');
    }
  };

  //profile eke myAds click karama wena de
  useEffect(() => {
    if (tab === 'myAds') {
      setCurrentView('myAds')
    }
  }, [tab])

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-center items-center min-h-[calc(100vh-100px)]">
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">

      {/* Navigation for logged-in users */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => { setCurrentView('postAdForm'); setEditingAd(null); }}
          className={`py-2 px-4 w-25 text-sm rounded-md font-semibold ${currentView === 'postAdForm' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
        >
          New Add
        </button>
        <button
          onClick={() => { setCurrentView('myAds'); setEditingAd(null); }}
          className={`py-2 px-4 w-25 text-sm rounded-md font-semibold ${currentView === 'myAds' ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
        >
          My Ads
        </button>
        <button
          onClick={handleGoBackToLogin}
          className="py-2 px-4 w-25 text-sm rounded-md font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Log Out
        </button>
      </div>

      {/* <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">
        {currentView === 'postAdForm' && editingAd ? 'Edit Your Annex Ad' : 'Post a New Annex Ad'}
        {currentView === 'myAds' && 'My Posted Ads'}
      </h1> */}

      {/* Conditionally render content based on currentView */}
      {currentView === 'postAdForm' && (
        <AnnexForm
          initialData={editingAd}
          onSubmit={handleAnnexFormSubmit}
          onCancel={handleCancelForm}
          isEditing={!!editingAd} // Convert editingAd to boolean
        />
      )}

      {currentView === 'myAds' && (
        <MyAdsList
          ads={myAds}
          onEdit={handleEditAd}
          onDelete={handleDeleteAd}
        />
      )}
    </div>
  );
};

export default PostAdPage;
