  import React, { useState, useEffect } from 'react';
  import { RiCloseCircleLine } from 'react-icons/ri';

  interface AnnexFormProps {
    initialData?: any;
    onSubmit: (data: any, isEditing: boolean) => void;
    onCancel: () => void;
    isEditing: boolean;
  }

  const AnnexForm: React.FC<AnnexFormProps> = ({ initialData, onSubmit, onCancel, isEditing }) => {
    const [title, setTitle] = useState('');
    const [campus, setCampus] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [featuresText, setFeaturesText] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]); // Existing images when editing
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
      if (initialData) {//populate form when edit mode
        setTitle(initialData.title || '');
        setCampus(initialData.campus || '');
        setAddress(initialData.address || '');
        setPrice(initialData.price ? initialData.price.replace('Rs. ', '').replace('/month', '') : '');
        setDescription(initialData.description || '');
        setFeaturesText(initialData.features ? initialData.features.join('\n') : '');
        setExistingImageUrls(initialData.images || []); // load existing image URLs 
        setContactName(initialData.contactName || '');
        setContactPhone(initialData.contactPhone || '');
        setContactEmail(initialData.contactEmail || '');
      } else { //reset form for new ad
        setTitle('');
        setCampus('');
        setAddress('');
        setPrice('');
        setDescription('');
        setFeaturesText('');
        setImages([]);
        setExistingImageUrls([]);
        setContactName('');
        setContactPhone('');
        setContactEmail('');
      }
    }, [initialData]);

    // Image upload handler with limit
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        const totalImages = existingImageUrls.length + images.length + newFiles.length;

        if (totalImages > 3) {
          alert(`You can only upload a maximum of 3 images. You currently have ${existingImageUrls.length + images.length} images.`);
          e.target.value = ''; // Clear the input field
          return;
        }
        setImages(prev => [...prev, ...newFiles]);
      }
    };

    const handleRemoveNewImage = (index: number) => {
      setImages(images.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index: number) => {
      // send request to BE for delete Backend එකට මේ image එක delete කරන්න කියලා request එකක් යවන්න ඕන
      // දැනට dummy data වලින් remove කරනවා
      setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
      alert('Existing image removal functionality not fully implemented (needs backend call).');
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const adData = {
        title,
        campus,
        address,
        price,
        description,
        features: featuresText.split('\n').map(f => f.trim()).filter(f => f !== ''),
        newImages: images,
        existingImages: existingImageUrls,
        contactName,
        contactPhone,
        contactEmail,
      };
      onSubmit(adData, isEditing);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className='bg-gray-200 shadow-lg rounded-lg p-6 md:p-8 border-1 border-gray-300'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 space-y-5">
            {/* Title Field */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="title" className="block text-md font-semibold text-black">Title</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="title"
                    className="bg-white p-2 block w-full sm:text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Campus */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="campus" className="block text-md font-semibold text-black">Near Campus / Institute</label>
                <div className='mt-2'>
                  <input
                    type="text"
                    id="campus"
                    className="bg-white p-2 block w-full sm:text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Price Field */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="price" className="block text-md font-semibold text-black">Price (Rs. per month)</label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="price"
                    className="p-2 block w-full sm:text-sm bg-white rounded-md pr-12 focus:outline-none focus:ring-1 focus:ring-gray-400"
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

            {/* Address Field */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="address" className="block text-md font-semibold text-black">Address</label>
                <div className="mt-2">
                  <textarea
                    id="address"
                    rows={4}
                    className="shadow-sm p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="description" className="block text-md font-semibold text-black">Description</label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={4}
                    className="p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Features Textarea */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="features" className="block text-md font-semibold text-black">Features (one per line)</label>
                <div className="mt-2">
                  <textarea
                    id="features"
                    rows={4}
                    className="p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Name */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="contactName" className="block text-md font-semibold text-black">Contact Name</label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="contactName"
                    className="p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Phone */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="contactPhone" className="block text-md font-semibold text-black">Contact Phone</label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="contactPhone"
                    className="p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Email */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="contactEmail" className="block text-md font-semibold text-black">Contact Email (Optional)</label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="contactEmail"
                    className="p-2 block w-full sm:text-sm bg-white rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div className='flex justify-center items-center'>
              <div className='w-full max-w-[300px]'>
                <label htmlFor="images" className="block text-md font-semibold text-black">Images</label>
                <div className="mt-2">
                  {(existingImageUrls.length + images.length) < 3 && (
                    <input
                      type="file"
                      id="images"
                      className="p-2 block w-full bg-white sm:text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                      multiple
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  )}
                  <p className="mt-1 text-sm text-gray-500">Upload one or more new images for the annex. Max 3 images allowed.</p>
                  {/* Display newly selected images */}
                  {images.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {images.map((image, index) => (
                        <div key={`new-${index}`} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`New Uploaded Image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveNewImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-75 hover:opacity-100"
                          >
                            <RiCloseCircleLine size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Display existing images when editing */}
                  {existingImageUrls.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <p className="col-span-full text-sm text-gray-600 mb-1">Existing Images:</p>
                      {existingImageUrls.map((imgUrl: string, index: number) => (
                        <div key={`existing-${index}`} className="relative">
                          <img
                            src={imgUrl}
                            alt={`Existing Image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
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
          </div>

          {/* Submit and Go Back Buttons */}
          <div className="pt-5 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              {isEditing ? 'Update Ad' : 'Post Ad'}
            </button>
          </div>
        </div>
      </form>
    );
  };

  export default AnnexForm;
