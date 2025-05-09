import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAnnex from '../assets/searchAnnex.jpg';
import universitiesData from '../constants/annex/Universities.json';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { IoIosSearch } from 'react-icons/io';
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'

interface University {
  id: string;
  name: string;
}

const FindAccommodationPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setUniversities(universitiesData);
    setFilteredUniversities(universitiesData);
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = universities.filter(uni =>
      uni.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredUniversities(filtered);
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
        <div className="absolute inset-0  flex items-center justify-start p-6 sm:p-10">
          <div className="bg-white shadow rounded-md p-6 sm:w-1/2 md:w-1/3 lg:w-1/4">
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
                    <div className='w-[270px] h-[350px] rounded-md bg-gray-100 p-3 overflow-y-auto absolute ml-2 -top-57 left-70'>
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
                      <div className='mt-2 max-h-[260px] overflow-y-auto'> {/* max-h සහ overflow-y දැම්මා */}
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

      {/* annex list */}
      <section className='bg-gray-200 p-5 rounded-xl'>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:text-center">Available Annex</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <img src={annex1} alt="Annex" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comfortable Room in Moratuwa</h3>
              <p className="text-gray-600 text-sm">Rs. 12,000/month</p>
              <Link to="/annex/2" className="text-red-500 hover:underline mt-2 block font-medium">View Details</Link>
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
            <img src={annex1} alt="Annex" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Comfortable Room in Moratuwa</h3>
              <p className="text-gray-600 text-sm">Rs. 12,000/month</p>
              <Link to="/annex/2" className="text-red-500 hover:underline mt-2 block font-medium">View Details</Link>
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
        </div>

        {/* page changing part */}
        <div className="mt-6 text-center">
          {/* page changing links*/}
        </div>
      </section>
    </div>
  );
};

export default FindAccommodationPage;