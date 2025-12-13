import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LuChevronLeft, LuChevronRight, LuMapPin, LuPhone, LuUser, LuCircleCheckBig, LuShare2, LuHeart } from 'react-icons/lu';
import annex1 from '../assets/annex1.jpg';
import annex2 from '../assets/annex2.jpg';

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
    title: "Luxury 3-Bedroom House - Peradeniya",
    price: "Rs. 25,000/month",
    description: "Spacious house offering 3 bedrooms, a large living area, modern kitchen, and attached bathrooms. Secure parking is available. Located just 5 minutes from Peradeniya University entrance, making it perfect for students sharing accommodation.",
    address: "123 Flower Road, Peradeniya",
    features: ["3 Bedrooms", "Large Living Area", "Kitchen", "Attached Bathroom", "Secure Parking", "WiFi Available"],
    images: [annex1, annex2, annex1],
    contact: {
      name: "Kamal Perera",
      phone: "077-1234567"
    }
  },
  "2": {
    title: "Student Room for Rent - Moratuwa",
    price: "Rs. 18,000/month",
    description: "Fully furnished room located near Moratuwa University. Includes air conditioning, high-speed Wi-Fi, and private bathroom. Peaceful environment suitable for studies.",
    address: "45 Saman Mawatha, Moratuwa",
    features: ["AC", "High-speed Wi-Fi", "Private Bathroom", "Study Table", "Shared Kitchen"],
    images: [annex2, annex1],
    contact: {
      name: "Sunil Silva",
      phone: "071-9876543"
    }
  }
};

const AnnexDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [annexDetails, setAnnexDetails] = useState<AnnexDetails | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fallback to item 1 if id not found for demo purposes
      setAnnexDetails(annexDetailsData[id] || annexDetailsData["1"]);
    }
  }, [id]);

  if (!annexDetails) {
    return <div className="flex justify-center items-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div></div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === annexDetails.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? annexDetails.images.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb / Back */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
        >
          <LuChevronLeft className="w-5 h-5 mr-1" /> Back to Search
        </button>
        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
            <LuShare2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
            <LuHeart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column: Images & Details */}
        <div className="lg:col-span-2 space-y-8">

          {/* Gallery */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-video bg-slate-200 dark:bg-slate-800 group">
            <img
              src={annexDetails.images[currentImageIndex]}
              alt="Property"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {annexDetails.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur transition-all">
                  <LuChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur transition-all">
                  <LuChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {annexDetails.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Title & Address */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">{annexDetails.title}</h1>
            <div className="flex items-center text-slate-500 dark:text-slate-400">
              <LuMapPin className="w-5 h-5 mr-2 text-brand-500" />
              <span className="text-lg">{annexDetails.address}</span>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 my-8"></div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About this property</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {annexDetails.description}
            </p>
          </div>

          {/* Features */}
          {annexDetails.features && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {annexDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="bg-white dark:bg-slate-700 p-2 rounded-full mr-3 text-brand-600 dark:text-brand-400 shadow-sm">
                      <LuCircleCheckBig className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            {/* Price Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 p-6 md:p-8">
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">Rent per month</p>
              <div className="text-3xl font-bold text-brand-600 dark:text-brand-500 mb-6">{annexDetails.price}</div>

              <div className="flex flex-col gap-4">
                <button className="w-full bg-brand-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all flex items-center justify-center gap-2">
                  <LuPhone className="w-5 h-5" /> Show Number
                </button>
                <button className="w-full bg-white dark:bg-slate-700/30 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-lg font-bold py-4 rounded-xl hover:border-brand-600 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-500 transition-all">
                  Check Availability
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <LuUser className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Listed by</p>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">{annexDetails.contact.name}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 text-center">
                  Member since 2023
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-blue-100 dark:border-slate-700">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Safety Tips</h3>
              <ul className="text-sm text-blue-700 dark:text-slate-400 space-y-2 list-disc list-inside">
                <li>Always visit the property in person.</li>
                <li>Check for valid documents.</li>
                <li>Do not pay in advance without a receipt.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnnexDetailsPage;