import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuFileText, LuLayoutDashboard, LuImage, LuMapPin, LuChevronRight, LuChevronLeft,
  LuWifi, LuBath, LuSnowflake, LuCar, LuUtensils, LuZap, LuCheck,
  LuUpload, LuX, LuGraduationCap
} from 'react-icons/lu';

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  monthlyRent: z.string().min(1, "Monthly rent is required"),
  securityDeposit: z.string().min(1, "Security deposit is required"),
  houseRules: z.string().min(1, "House rules are required (e.g. No Smoking)"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  proximityHub: z.string().min(1, "Distance to university is required"),
  googleMapsUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  contactName: z.string().min(2, "Name is required"),
  contactPhone: z.string().min(10, "Valid phone number required"),
});

type FormValues = z.infer<typeof formSchema>;

const AMENITIES_LIST = [
  { id: 'wifi', label: 'High-speed Wifi', icon: LuWifi, col: 'text-blue-500' },
  { id: 'bath', label: 'Attached Bath', icon: LuBath, col: 'text-teal-500' },
  { id: 'ac', label: 'Air Conditioning', icon: LuSnowflake, col: 'text-red-500' },
  { id: 'parking', label: 'Safe Parking', icon: LuCar, col: 'text-orange-500' },
  { id: 'kitchen', label: 'Equipped Kitchen', icon: LuUtensils, col: 'text-indigo-500' },
  { id: 'power', label: 'Power Backup', icon: LuZap, col: 'text-yellow-500' },
];

const STEPS = [
  { id: 'specs', title: 'General Specs', icon: LuFileText },
  { id: 'amenities', title: 'Amenities', icon: LuLayoutDashboard },
  { id: 'media', title: 'Media Gallery', icon: LuImage },
  { id: 'location', title: 'Location & Contact', icon: LuMapPin },
];

interface AnnexFormProps {
  initialData?: any;
  onSubmit: (data: any, isEditing: boolean) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AnnexAdForm: React.FC<AnnexFormProps> = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);

  const { register, handleSubmit, control, formState: { errors }, trigger } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      monthlyRent: initialData?.price ? initialData.price.replace(/\D/g, '') : '',
      securityDeposit: initialData?.deposit || '',
      houseRules: initialData?.rules?.join(', ') || '',
      amenities: initialData?.amenities || [],
      proximityHub: initialData?.proximity || '',
      googleMapsUrl: initialData?.mapUrl || '',
      contactName: initialData?.contactName || '',
      contactPhone: initialData?.contactPhone || '',
    }
  });

  const onNext = async () => {
    const fieldsToValidate: any = [];
    if (currentStep === 0) fieldsToValidate.push('title', 'monthlyRent', 'securityDeposit', 'houseRules');
    if (currentStep === 1) fieldsToValidate.push('amenities');
    if (currentStep === 3) fieldsToValidate.push('proximityHub', 'contactName', 'contactPhone');

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const onPrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray].slice(0, 5)); // max 5
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const submitForm = (data: FormValues) => {
    onSubmit({ ...data, images }, isEditing);
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50 dark:border-slate-700/50 overflow-hidden w-full max-w-4xl mx-auto my-8 font-sans">

      {/* Header */}
      <div className="px-8 py-8 md:px-12 md:py-10 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              {isEditing ? 'Update Listing' : 'List Property'}
            </h1>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2 uppercase tracking-widest">
              Premium Landlord Portal
            </p>
          </div>
          <button onClick={onCancel} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all hover:scale-105 active:scale-95 border border-slate-100 dark:border-slate-700">
            <LuX size={20} />
          </button>
        </div>

        {/* Stepper */}
        <div className="mt-10 flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          {STEPS.map((step, idx) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 border-2 ${currentStep >= idx ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400'}`}>
                {currentStep > idx ? <LuCheck size={18} /> : <step.icon size={18} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="p-8 md:p-12 relative min-h-[400px]">
        <AnimatePresence mode="wait">

          {/* STEP 1: Specs */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">General Specs</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Ad Title</label>
                  <input {...register('title')} placeholder="e.g. Modern Studio near UOM" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Monthly Rent (Rs.)</label>
                    <input type="number" {...register('monthlyRent')} placeholder="18000" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-blue-600 dark:text-blue-400 outline-none transition-all" />
                    {errors.monthlyRent && <p className="text-red-500 text-sm mt-1">{errors.monthlyRent.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Key Money (Months)</label>
                    <input {...register('securityDeposit')} placeholder="e.g. 4 Months" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                    {errors.securityDeposit && <p className="text-red-500 text-sm mt-1">{errors.securityDeposit.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">House Rules (Comma Separated)</label>
                  <input {...register('houseRules')} placeholder="Girls Only, No Smoking, Quiet Hours after 11 PM" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                  {errors.houseRules && <p className="text-red-500 text-sm mt-1">{errors.houseRules.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Amenities */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Select Amenities</h2>
              {errors.amenities && <p className="text-red-500 text-sm mb-4">{errors.amenities.message}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Controller
                  name="amenities"
                  control={control}
                  render={({ field }) => (
                    <>
                      {AMENITIES_LIST.map((amenity) => {
                        const isSelected = field.value.includes(amenity.id);
                        return (
                          <div
                            key={amenity.id}
                            onClick={() => {
                              const newValue = isSelected
                                ? field.value.filter(a => a !== amenity.id)
                                : [...field.value, amenity.id];
                              field.onChange(newValue);
                            }}
                            className={`cursor-pointer p-4 rounded-2xl flex flex-col gap-3 items-start border-2 transition-all hover:-translate-y-1 ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-500 shadow-[0_10px_20px_rgba(59,130,246,0.15)]' : 'bg-white/50 dark:bg-slate-800/50 border-white/60 dark:border-slate-700 hover:border-blue-300'}`}
                          >
                            <amenity.icon className={`text-2xl ${isSelected ? amenity.col : 'text-slate-400'}`} />
                            <span className={`text-sm font-bold ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300'}`}>
                              {amenity.label}
                            </span>
                          </div>
                        )
                      })}
                    </>
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 3: Media Gallery */}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Media Gallery</h2>

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2rem] p-10 text-center hover:bg-slate-100/50 transition-colors relative group">
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                    <LuUpload size={28} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">Drag & Drop or Click to Upload</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide">JPG, PNG (Max 5 images)</p>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50">
                        <LuX size={14} />
                      </button>
                      {idx === 0 && <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded-md">COVER</span>}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* STEP 4: Location */}
          {currentStep === 3 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Location & Contact</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Distance to University</label>
                  <div className="relative">
                    <LuGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input {...register('proximityHub')} placeholder="e.g. 400m from UoM" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                  </div>
                  {errors.proximityHub && <p className="text-red-500 text-sm mt-1">{errors.proximityHub.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Google Maps Embed URL (Optional)</label>
                  <div className="relative">
                    <LuMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                    <input {...register('googleMapsUrl')} placeholder="https://maps.google.com/..." className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                  </div>
                  {errors.googleMapsUrl && <p className="text-red-500 text-sm mt-1">{errors.googleMapsUrl.message}</p>}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Landlord Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input {...register('contactName')} placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
                  </div>
                  <div>
                    <input {...register('contactPhone')} placeholder="WhatsApp / Phone" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t border-slate-200/50 dark:border-slate-800">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
          >
            <LuChevronLeft /> Back
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all hover:scale-105 active:scale-95"
            >
              Continue <LuChevronRight />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
            >
              {isEditing ? 'Save Updates' : 'Publish Ad'} <LuCheck />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AnnexAdForm;
