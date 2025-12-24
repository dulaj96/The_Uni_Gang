import { Link } from 'react-router-dom';
import backgroundImage from '../assets/homeImage.jpg'
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'
import { useEffect, useState } from 'react';
import { LuMapPin, LuArrowRight, LuHouse, LuSearch } from 'react-icons/lu';
import SEO from '../components/SEO';

const dummyAnnexes = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  title: `Modern Annex Near University ${i + 1}`,
  price: `Rs. ${10000 + (i * 500)}/month`,
  description: `Experience comfortable living just minutes away from campus. Fully furnished and secure.`,
  address: `Colombo ${i + 1}, Sri Lanka`,
  images: [i % 2 === 0 ? annex1 : annex2],
  link: `/annex/${i + 1}`,
  tag: i % 2 === 0 ? 'Featured' : 'New'
}));

const HomePage = () => {
  const [allAnnexes, setAllAnnexes] = useState<any[]>([]);

  useEffect(() => {
    setAllAnnexes(dummyAnnexes);
  }, []);

  return (
    <div className="space-y-24">
      <SEO
        title="The Uni Gang - Find Your Perfect Student Annex in Sri Lanka"
        description="Connect with the best student accommodations near universities in Sri Lanka. Easy, secure, and student-friendly annex hunting."
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center -mt-24 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Campus Life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-indigo-300">Student Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Discover safe, affordable, and convenient accommodations near your university.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/find-accommodation"
              className="group bg-brand-600 hover:bg-brand-700 text-white text-lg font-semibold py-4 px-8 rounded-full shadow-lg shadow-brand-500/30 transition-all hover:scale-105 flex items-center gap-2"
            >
              Find Accommodation <LuSearch className="w-5 h-5 group-hover:bg-brand-700" />
            </Link>
            <Link
              to="/post-ad"
              className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 text-lg font-semibold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              List Your Property <LuHouse className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">Recently Added Places</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Fresh listings just for you.</p>
          </div>
          <Link to="/find-accommodation" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            View All <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAnnexes.map((annex) => (
            <div key={annex.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={annex.images[0]}
                  alt={annex.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {annex.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-brand-600 text-white font-bold px-4 py-2 rounded-xl shadow-lg">
                    {annex.price}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">{annex.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4 text-sm">
                  <LuMapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{annex.address}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm line-clamp-2 leading-relaxed flex-grow">
                  {annex.description}
                </p>
                <Link
                  to={annex.link}
                  className="w-full block text-center py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-brand-600 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/find-accommodation" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            View All <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Looking to Rent Out Your Annex?</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
              Join thousands of landlords who trust The Uni Gang to find reliable student tenants. Simple, fast, and secure.
            </p>
            <Link to="/post-ad" className="inline-block bg-white text-slate-900 text-lg font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              List Your Property Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;