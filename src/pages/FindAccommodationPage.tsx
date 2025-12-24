import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import universitiesData from '../constants/annex/Universities.json';
import { LuSearch, LuMapPin, LuChevronDown, LuFilter, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import annex1 from '../assets/annex1.jpg';
import annex2 from '../assets/annex2.jpg';
import SEO from '../components/SEO';

interface University {
  id: string;
  name: string;
}

const dummyAnnexes = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `Luxury Annex ${i + 1} Near Campus`,
  price: `Rs. ${10000 + (i * 500)}/month`,
  description: `Modern student accommodation with all amenities included. Close to lecture halls and public transport.`,
  address: `University Road ${i + 1}, City`,
  images: [i % 2 === 0 ? annex1 : annex2],
  link: `/annex/${i + 1}`,
  rating: (4 + Math.random()).toFixed(1)
}));

const FindAccommodationPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [allAnnexes, setAllAnnexes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annexesPerPage] = useState(9);

  useEffect(() => {
    setUniversities(universitiesData);
    setAllAnnexes(dummyAnnexes);
  }, []);

  const filteredAnnexes = allAnnexes.filter(annex =>
    annex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    annex.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAnnex = currentPage * annexesPerPage;
  const indexOfFirstAnnex = indexOfLastAnnex - annexesPerPage;
  const currentAnnexes = filteredAnnexes.slice(indexOfFirstAnnex, indexOfLastAnnex);
  const totalPages = Math.ceil(filteredAnnexes.length / annexesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8">
      <SEO
        title="Find Student Accommodation & Annexes - The Uni Gang"
        description="Search through hundreds of verified annexes and rooms for university students. Filter by location, price, and facilities."
      />
      {/* Header / Filter Section */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-end md:items-center">
          <div className="flex-grow space-y-2 w-full">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Search or Filter by University</label>
            <div className="relative">
              <LuSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location or name..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all outline-none text-slate-800 dark:text-white font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">University Campus</label>
            <div className="relative">
              <LuFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/20 transition-all outline-none appearance-none text-slate-800 dark:text-white font-medium cursor-pointer"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                <option value="">All Campuses</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.name}>{uni.name}</option>
                ))}
              </select>
              <LuChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Available Places</h2>
          <span className="text-slate-500 dark:text-slate-400 font-medium">{filteredAnnexes.length} results found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAnnexes.map((annex) => (
            <Link to={annex.link} key={annex.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={annex.images[0]} alt={annex.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1">
                  ⭐ {annex.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">{annex.title}</h3>
                </div>
                <p className="text-brand-600 font-bold text-lg mb-3">{annex.price}</p>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm mb-4">
                  <LuMapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{annex.address}</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-700">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-brand-600 transition-colors">View Property Details &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredAnnexes.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-lg">No accommodations found matching your criteria.</p>
            <button onClick={() => setSearchQuery('')} className="mt-4 text-brand-600 font-semibold hover:underline">Clear Search</button>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <LuChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${currentPage === i + 1
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 scale-110'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <LuChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FindAccommodationPage;
