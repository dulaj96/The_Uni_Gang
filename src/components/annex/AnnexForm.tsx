import React, { useState, useEffect } from 'react';
import { LuX, LuUpload, LuImage, LuMapPin, LuFileText } from 'react-icons/lu';
import universitiesData from '../../constants/annex/Universities.json';
import { FaRupeeSign } from 'react-icons/fa6';

interface AnnexFormProps {
  initialData?: any;
  onSubmit: (data: any, isEditing: boolean) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AnnexForm: React.FC<AnnexFormProps> = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [title, setTitle] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [campus, setCampus] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Load universities from JSON
  const universitiesList = universitiesData.map((uni: { name: string }) => uni.name);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');

      // Handle initial campus selection logic
      const initialCampus = initialData.campus || '';
      if (universitiesList.includes(initialCampus)) {
        setSelectedUniversity(initialCampus);
        setCampus(initialCampus);
      } else if (initialCampus) {
        setSelectedUniversity('Other');
        setCampus(initialCampus);
      } else {
        setSelectedUniversity('');
        setCampus('');
      }

      setAddress(initialData.address || '');
      setPrice(initialData.price ? initialData.price.replace('Rs. ', '').replace('/month', '') : '');
      setDescription(initialData.description || '');
      setFeaturesText(initialData.features ? initialData.features.join('\n') : '');
      setExistingImageUrls(initialData.images || []);
      setContactName(initialData.contactName || '');
      setContactPhone(initialData.contactPhone || '');
      setContactEmail(initialData.contactEmail || '');
    }
  }, [initialData]);

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedUniversity(value);
    if (value === 'Other') {
      setCampus(''); // Clear campus if 'Other' is selected so user can type
    } else {
      setCampus(value); // Set campus to selected university
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (existingImageUrls.length + images.length + newFiles.length > 3) {
        alert("Maximum 3 images allowed.");
        return;
      }
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adData = {
      title, campus, address, price, description,
      features: featuresText.split('\n').filter(f => f.trim() !== ''),
      newImages: images, existingImages: existingImageUrls,
      contactName, contactPhone, contactEmail,
    };
    onSubmit(adData, isEditing);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{isEditing ? 'Update Property Details' : 'List New Property'}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Fill in the details below to reach thousands of students.</p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <LuFileText className="text-brand-500" /> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Ad Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="e.g. Spacious Room near Campus"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Nearest Campus</label>
              <select
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white appearance-none"
                value={selectedUniversity}
                onChange={handleUniversityChange}
                required
              >
                <option value="" disabled>Select a University</option>
                {universitiesList.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
                <option value="Other">Other</option>
              </select>

              {selectedUniversity === 'Other' && (
                <div className="mt-3 animate-fadeIn">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Enter Nearest University</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                    placeholder="e.g. My Local Institute"
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Monthly Rent</label>
              <div className="relative">
                <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                  placeholder="25000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Details */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <LuMapPin className="text-brand-500" /> Location & Details
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Address</label>
              <textarea
                rows={2}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Features (One per line)</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="WiFi&#10;Attached Bathroom&#10;Parking"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <LuImage className="text-brand-500" /> Property Images
          </h3>
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
            <input
              type="file"
              id="images"
              className="hidden"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
            <label htmlFor="images" className="cursor-pointer flex flex-col items-center">
              <div className="bg-brand-50 dark:bg-brand-900/20 p-4 rounded-full text-brand-500 mb-3">
                <LuUpload className="w-6 h-6" />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Click to upload images</span>
              <span className="text-sm text-slate-400 mt-1">Max 3 images (JPG, PNG)</span>
            </label>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {existingImageUrls.map((url, idx) => (
              <div key={`exist-${idx}`} className="relative h-24 rounded-lg overflow-hidden group">
                <img src={url} className="w-full h-full object-cover" />
                <button type="button" onClick={() => handleRemoveExistingImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><LuX className="w-3 h-3" /></button>
              </div>
            ))}
            {images.map((file, idx) => (
              <div key={`new-${idx}`} className="relative h-24 rounded-lg overflow-hidden group">
                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                <button type="button" onClick={() => handleRemoveNewImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><LuX className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Contact Name"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </div>
        </div>

      </div>

      <div className="bg-slate-50 dark:bg-slate-900 p-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
        <button type="submit" className="px-8 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-xl transition-all">{isEditing ? 'Save Changes' : 'Post Ad'}</button>
      </div>
    </form>
  );
};

export default AnnexForm;
