import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAnnex from '../assets/searchAnnex.jpg';
import universitiesData from '../constants/annex/Universities.json';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { IoIosSearch } from 'react-icons/io';
import annex1 from '../assets/annex1.jpg';
import annex2 from '../assets/annex2.jpg';

interface University {
  id: string;
  name: string;
}

// used dummy data instead of the actual data coming from BE
const dummyAnnexes = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  title: `Annex ${i + 1} Near University`,
  price: `Rs. ${10000 + (i * 500)}/month`,
  description: `This is a description for annex ${i + 1}. It is comfortable and close to campus.`,
  address: `Address ${i + 1}, City`,
  images: [i % 2 === 0 ? annex1 : annex2],
  link: `/annex/${i + 1}`
}));

const FindAccommodationPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  // FOR Pagination 
  const [allAnnexes, setAllAnnexes] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [annexesPerPage] = useState(9);

  useEffect(() => {
    setUniversities(universitiesData);
    setFilteredUniversities(universitiesData);
    setAllAnnexes(dummyAnnexes);
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = universities.filter(uni =>
      uni.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUniversities(filtered);
  };

  // Pagination Logic
  const indexOfLastAnnex = currentPage * annexesPerPage;
  const indexOfFirstAnnex = indexOfLastAnnex - annexesPerPage;
  const currentAnnexes = allAnnexes.slice(indexOfFirstAnnex, indexOfLastAnnex);

  const totalPages = Math.ceil(allAnnexes.length / annexesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto ">
      <section
        className="relative rounded-md overflow-hidden mb-8 "
        style={{
          backgroundImage: `url(${searchAnnex})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px'
        }}>
        <div className="absolute inset-0 flex items-center justify-center sm:justify-start p-6 sm:p-10">
          <div className="bg-white shadow rounded-md p-6 sm:w-1/2 md:w-1/3 lg:w-1/4 w-[280px]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Annex Search by Campus</h2>
            <div className="mb-4">
              <label htmlFor="campus" className="block text-gray-700 text-sm font-bold mb-2">Campus</label>
              <div
                onClick={() => setOpenDropDown(!openDropDown)}
                className='flex justify-between items-center w-full rounded-md border border-gray-600 px-3 py-1 mt-4 mb-5 cursor-pointer relative'
              >
                <p className='text-black/100'>
                  {selectedUniversity || 'Select Campus'}
                </p>
                <div>
                  {
                    openDropDown ? <RiArrowDropUpLine className='text-3xl' /> : <RiArrowDropDownLine className='text-3xl' />
                  }
                </div>
              </div>
              <div className='flex justify-center -mt-2 absolute z-50'>
                {
                  openDropDown && (
                    <div className='w-[275px] sm:h-[350px] h-[195px] rounded-md bg-gray-200 p-3 overflow-y-auto absolute sm:ml-2 ml-57 sm:-top-57 sm:left-70'>
                      <div className='relative'>
                        <input
                          type='text'
                          value={search}
                          onChange={e => handleSearch(e.target.value)}
                          placeholder='Search University Here'
                          className='w-full rounded-md border border-gray-300 px-2 py-1 mt-1 pr-10' />
                        <div className='absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer'>
                          <IoIosSearch className='text-black/60 text-xl' />
                        </div>
                      </div>
                      <div className='mt-2 max-h-[260px] overflow-y-auto'>
                        {filteredUniversities.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSearch('');
                              setSelectedUniversity(item.name);
                              setShowWarning(false);
                              setOpenDropDown(false);
                            }}
                            className='p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer'>
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Search</button>
          </div>
          {
            showWarning && (
              <div className='flex justify-center mt-4'>
                <p className='text-red-600 font-semibold'>First choose your university !</p>
              </div>
            )
          }
        </div>
      </section>

      {/* Annex List with Pagination */}
      <section className='bg-gray-200 p-10 rounded-xl border border-red-600 pt-8'>
        <div className="container mx-auto">
          <h2 className="text-xl font-bold text-black mb-8 text-center">Available Annex</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAnnexes.map((annex) => (
            <div key={annex.id} className="bg-white shadow rounded-md overflow-hidden">
              <img src={annex.images[0]} alt="Annex" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-md font-semibold text-black mb-2">{annex.title}</h3>
                <p className="text-gray-800 text-sm">{annex.price}</p>
                <Link to={annex.link} className="text-red-500 mt-2 block font-medium">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-2 py-2 bg-red-500 text-sm text-white w-20 rounded-md font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-2 py-2 rounded-md text-sm w-10 ${currentPage === i + 1 ? 'bg-red-600 text-white font-semibold' : 'bg-red-400 text-white hover:bg-red-600'
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-2 py-2 text-sm w-20 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FindAccommodationPage;
