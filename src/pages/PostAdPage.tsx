import React, { useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseCircleLine } from 'react-icons/ri';
import universitiesData from '../constants/annex/Universities.json';

interface University {
  id: string;
  name: string;
}

const PostAdPage = () => {
  const [title, setTitle] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [openCampusDropDown, setOpenCampusDropDown] = useState(false);
  const [filteredCampuses, setFilteredCampuses] = useState<University[]>(universitiesData);
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      selectedCampus,
      address,
      price,
      description,
      features: featuresText.split('\n').map(f => f.trim()).filter(f => f !== ''),
      images,
      contactName,
      contactPhone,
      contactEmail,
    });
    setTitle('');
    setSelectedCampus(null);
    setAddress('');
    setPrice('');
    setDescription('');
    setFeaturesText(''); // ෆීචර්ස් ටෙක්ට් එක ක්ලියර් කරනවා
    setImages([]);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Post a New Annex Add</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="title" className="block text-lg font-bold text-gray-700">Title</label>
            <div className="mt-1">
              <input
                type="text"
                id="title"
                className="bg-gray-200 p-2 block w-full sm:text-sm rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="campus" className="block text-lg font-bold text-gray-700">Select Campus</label>
            <div
              onClick={() => setOpenCampusDropDown(!openCampusDropDown)}
              className='flex justify-between items-center w-full rounded-md border border-gray-600 px-3 py-2 mt-1 cursor-pointer relative'
            >
              <p className='text-gray-700'>
                {selectedCampus || 'Select Campus'}
              </p>
              <div>
                {openCampusDropDown ? <RiArrowDropUpLine className='text-2xl' /> : <RiArrowDropDownLine className='text-2xl' />}
              </div>
            </div>
            <div className={`absolute z-10 mt-1 w-[300px] sm:w-[300px] lg:w-200 bg-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto ${openCampusDropDown ? 'block' : 'none'}`}>
              {openCampusDropDown && (
                <div>
                  {filteredCampuses.map((campus) => (
                    <div
                      key={campus.id}
                      onClick={() => {
                        setSelectedCampus(campus.name);
                        setOpenCampusDropDown(false);
                        setFilteredCampuses(universitiesData);
                      }}
                      className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer'
                    >
                      {campus.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="address" className="block text-lg font-bold text-gray-700">Address</label>
            <div className="mt-1">
              <textarea
                id="address"
                rows={3}
                className="shadow-sm p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="price" className="block text-lg font-bold text-gray-700">Price (Rs. per month)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="price"
                className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md pr-12"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-700 sm:text-sm">
                Rs.
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="description" className="block text-lg font-bold text-gray-700">Description</label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={5}
                className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Features සඳහා Textarea */}
        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="features" className="block text-lg font-bold text-gray-700">Features (one per line)</label>
            <div className="mt-1">
              <textarea
                id="features"
                rows={3}
                className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500">Enter each feature on a new line.</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="images" className="block text-lg font-bold text-gray-700">Images</label>
            <div className="mt-1">
              <input
                type="file"
                id="images"
                className="p-2 block w-full bg-gray-200 sm:text-sm rounded-md"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
              <p className="mt-1 text-sm text-gray-500">Upload one or more images of the annex.</p>
              {images.length > 0 && (
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Uploaded Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      {/* රූපය ඉවත් කිරීමේ බොත්තම */}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-75 hover:opacity-100"
                      >
                        <RiCloseCircleLine size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="contactName" className="block text-lg font-bold text-gray-700">Contact Name</label>
            <div className="mt-1">
              <input
                type="text"
                id="contactName"
                className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="contactPhone" className="block text-lg font-bold text-gray-700">Contact Phone</label>
            <div className="mt-1">
              <input
                type="tel"
                id="contactPhone"
                className="p-2 block w-full  sm:text-sm bg-gray-200 rounded-md"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <div className='w-[300px] sm:w-[300px] lg:w-200'>
            <label htmlFor="contactEmail" className="block text-lg font-bold text-gray-700">Contact Email (Optional)</label>
            <div className="mt-1">
              <input
                type="email"
                id="contactEmail"
                className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post Ad
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostAdPage;