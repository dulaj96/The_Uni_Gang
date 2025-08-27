import React, { useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

interface MyAdsListProps {
  ads: any[];
  onEdit: (ad: any) => void;
  onDelete: (adId: string) => void;
}

const MyAdsList: React.FC<MyAdsListProps> = ({ ads, onEdit, onDelete }) => {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [adId: string]: number }>({});

  //next image
  const handleNextImage = (adId: string, totalImages: number) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[adId] !== undefined ? prev[adId] : 0;
      const nextIndex = (currentIndex + 1) % totalImages;
      return { ...prev, [adId]: nextIndex };
    });
  };

  //previouse image
  const handlePrevImage = (adId: string, totalImages: number) => {
    setCurrentImageIndices(prev => {
      const currentIndex = prev[adId] !== undefined ? prev[adId] : 0;
      const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
      return { ...prev, [adId]: prevIndex };
    });
  };

  return (
    <div className="my-ads-section mt-8">
      <div className='bg-gray-200 shadow-lg rounded-lg p-6 md:p-8 border-1 border-gray-300'>
        <h2 className="text-xl font-bold text-black mb-6 text-center">My Posted Ads</h2>
        {ads.length === 0 ? (
          <p className="text-center text-gray-600">You haven't posted any ads yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => {
              const imagesToDisplay = Array.isArray(ad.images) ? ad.images : (ad.images ? [ad.images] : []);
              const currentImageIndex = currentImageIndices[ad.id] !== undefined ? currentImageIndices[ad.id] : 0;

              return (
                <div key={ad.id} className="bg-white shadow rounded-md overflow-hidden">
                  {/* Image Display with Navigation Arrows */}
                  <div className="relative w-full h-48 bg-gray-300 flex items-center justify-center">
                    {imagesToDisplay.length > 0 ? (
                      <img
                        src={imagesToDisplay[currentImageIndex]}
                        alt={`${ad.title} Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Placeholder if no image is available
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-center">
                        No Image Available
                      </div>
                    )}

                    {imagesToDisplay.length > 1 && (
                      <>
                        {/* Left Arrow */}
                        <button
                          onClick={() => handlePrevImage(ad.id, imagesToDisplay.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                          aria-label="Previous Image"
                        >
                          <FaCaretLeft className="h-4 w-4" />
                        </button>
                        {/* Right Arrow */}
                        <button
                          onClick={() => handleNextImage(ad.id, imagesToDisplay.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                          aria-label="Next Image"
                        >
                          <FaCaretRight className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-md font-semibold text-gray-800 mb-2">{ad.title}</h3>
                    <p className="text-gray-600 text-sm mb-1.5">{ad.price}</p>
                    <p className="text-gray-600 text-sm">{ad.address}</p>
                    <div className="mt-4 flex justify-between space-x-2">
                      <button
                        onClick={() => onEdit(ad)}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(ad.id)}
                        className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAdsList;
