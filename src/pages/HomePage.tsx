import { Link } from 'react-router-dom';
import backgroundImage from '../assets/homeImage.jpg'
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'

const HomePage = () => {
  return (
    <div>
      {/* Find Annex */}
      {/* <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">Search Accommodation by Campus</h2>
          <div className="bg-white shadow rounded-md p-6">
            <input
              type="text"
              placeholder="Enter campus name"
              className="w-full border rounded-md py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <Link to="/find-accommodation?campus=peradeniya" className="block text-center py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">University of Peradeniya</Link>
              <Link to="/find-accommodation?campus=moratuwa" className="block text-center py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">University of Moratuwa</Link>
              <Link to="/find-accommodation?campus=colombo" className="block text-center py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700">University of Colombo</Link>
            </div>
          </div>
        </div>
      </section> */}

        {/* හැඳින්වීමේ සෙක්ෂන් එක */}
        <section
        className="py-16 relative flex items-center justify-center rounded-md"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
        }}
      >
        <div className="absolute inset-0 "></div> {/* Overlay color changed to black and opacity to 30% */}
        <div className="container mx-auto text-center relative" >
          <h1 className="text-4xl font-bold text-red-500 mb-6">Welcome to The Uni Gang</h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-8">
            Make your campus life easier and more comfortable with The Uni Gang.
          </p>
          <Link to="/find-accommodation" className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
            Explore Accommodation
          </Link>
        </div>
      </section>

      {/* Latest Annex */}
      <section className="py-10 bg-gray-200 mt-10 p-10 rounded-xl">
        <div className="container mx-auto">
          <div className='text-center'>
            <h2 className="text-2xl sm:text-2xl md:text-2xl font-bold mb-10">Recently Added Annexes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tempory Ad Cards */}
            <div className="bg-white shadow rounded-md overflow-hidden">
              <img src={annex1} alt="Annex" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Annex Near Peradeniya</h3>
                <p className="text-gray-600 text-sm">Rs. 15,000/month</p>
                <Link to="/annex/1" className="text-red-500 hover:underline mt-2 block font-medium">View Details</Link>
              </div>
            </div>
            <div className="bg-white shadow rounded-md overflow-hidden">
              <img src={annex2} alt="Annex" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Comfortable Room in Moratuwa</h3>
                <p className="text-gray-600 text-sm">Rs. 12,000/month</p>
                <Link to="/annex/2" className="text-red-500 hover:underline mt-2 block font-medium">View Details</Link>
              </div>
            </div>
            <div className="bg-white shadow rounded-md overflow-hidden">
              <img src={annex2} alt="Annex" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Annex for Rent in Colombo</h3>
                <p className="text-gray-600 text-sm">Rs. 18,000/month</p>
                <Link to="/annex/3" className="text-red-500 hover:underline mt-2 block font-medium">View Details</Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to="/find-accommodation" className="text-red-500 hover:underline font-semibold">View All Accommodation</Link>
          </div>
        </div>
      </section>

      {/* Annex Advertiement */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Looking to Rent Out Your Annex?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Reach thousands of university students across Sri Lanka.
            Post your annex ad today and find the perfect tenants!
          </p>
          <Link to="/post-ad" className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline text-lg">
            Post Your Annex Ad
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;