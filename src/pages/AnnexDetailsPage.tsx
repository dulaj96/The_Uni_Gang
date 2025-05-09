import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'

interface AnnexDetails {
  title: string;
  price: string;
  description: string;
  address: string;
  features?: string[];
  images: string[];
  contact: {
    name: string;
    phone: string;
  };
}

interface AnnexDetailsData {
  [key: string]: AnnexDetails;
}

const annexDetailsData: AnnexDetailsData = {
  "1": {
    title: "කාමර 3ක නිවස කුලියට - පේරාදෙණිය",
    price: "Rs. 25,000/month",
    description: "මෙම නිවස කාමර 3කින්, සාලයකින්, කුස්සියකින් සහ නානකාමරයකින් සමන්විත වේ. වාහන නැවැත්වීමේ පහසුකම් ඇත. පේරාදෙණිය විශ්වවිද්‍යාලයට ආසන්නව පිහිටා ඇත.",
    address: "අංක 123, මල් පාර, පේරාදෙණිය",
    features: ["කාමර 3", "සාලය", "කුස්සිය", "නානකාමරය", "වාහන නැවැත්වීම"],
    images: [
      annex1,
      annex2,
      // "https://via.placeholder.com/600/0000FF"
    ],
    contact: {
      name: "කමල් පෙරේරා",
      phone: "077-xxxxxxx"
    }
  },
  "2": {
    title: "Rent a room - Moratuwa University",
    price: "Rs. 18,000/month",
    description: "මොරටුව නගරයට ආසන්නව පිහිටි අංගසම්පූර්ණ කාමරයකි. AC, Wi-Fi සහ නානකාමර පහසුකම් ඇත.",
    address: "අංක 45, සමන් මාවත, මොරටුව",
    features: ["AC", "Wi-Fi", "නානකාමරය"],
    images: [
      annex1,
      annex2,
    ],
    contact: {
      name: "සුනිල් සිල්වා",
      phone: "071-yyyyyyy"
    }
  }
};

const AnnexDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [annexDetails, setAnnexDetails] = useState<AnnexDetails | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const annexId = id;
    if (annexId) {
      const details = annexDetailsData[annexId];
      if (details) {
        setAnnexDetails(details);
      } else {
        console.log(`Annex details not found for ID: ${annexId}`);
      }
    } else {
      console.log('No annex ID provided');
    }
  }, [id]);

  if (!annexDetails) {
    return <div>Loading...</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === annexDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? annexDetails.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* කන්ටේනර් එකට පැඩින් දැම්මා */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">{annexDetails.title}</h1> {/* හෙඩින් සයිස් එක */}

      {/* ප්‍රධාන පින්තූරය සහ මාරු කිරීමේ බොත්තම් */}
      <div className="relative mb-6 flex justify-center">
        <img
          src={annexDetails.images[currentImageIndex]}
          alt={`Annex Image ${currentImageIndex + 1}`}
          className="w-full sm:w-4/5 h-64 sm:h-96 object-cover rounded-md shadow-md"
        />
        {annexDetails.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            >
              <FiChevronLeft className="text-xl sm:text-2xl" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-gray-400 focus:outline-none"
            >
              <FiChevronRight className="text-xl sm:text-2xl" />
            </button>
          </>
        )}
      </div>

      {/* මිල */}
      <p className="text-xl sm:text-2xl font-bold text-red-500 mb-4">{annexDetails.price}</p> {/* මිල සයිස් එක */}

      {/* විස්තරය */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Description</h2> {/* ඩිස්ක්‍රිප්ෂන් හෙඩින් සයිස් එක */}
        <p className="text-gray-700">{annexDetails.description}</p> {/* ඩිස්ක්‍රිප්ෂන් ටෙක්ස්ට් එක */}
      </div>

      {/* පහසුකම් */}
      {annexDetails.features && annexDetails.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Features</h2> {/* පහසුකම් හෙඩින් සයිස් එක */}
          <ul className="list-disc list-inside text-gray-700"> {/* පහසුකම් ලිස්ට් එක */}
            {annexDetails.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ලිපිනය */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Address</h2> {/* ලිපිනය හෙඩින් සයිස් එක */}
        <p className="text-gray-700">{annexDetails.address}</p> {/* ලිපිනය ටෙක්ස්ට් එක */}
      </div>

      {/* සම්බන්ධතා තොරතුරු */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Contact Information</h2> {/* සම්බන්ධතා හෙඩින් සයිස් එක */}
        <p className="text-gray-700">Name: {annexDetails.contact.name}</p> {/* නම */}
        <p className="text-gray-700">Phone: {annexDetails.contact.phone}</p> {/* දුරකථන අංකය */}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full sm:w-auto">Contact Now</button> {/* කොන්ටැක්ට් බට්න් එක */}
      </div>
    </div>
  );
};

export default AnnexDetailsPage;