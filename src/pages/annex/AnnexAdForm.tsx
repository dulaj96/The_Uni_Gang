import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuFileText, LuLayoutDashboard, LuImage, LuMapPin, LuChevronRight, LuChevronLeft,
  LuWifi, LuBath, LuSnowflake, LuCar, LuUtensils, LuZap, LuCheck,
  LuUpload, LuX, LuGraduationCap, LuInfo as LuAlertCircle
} from 'react-icons/lu';
import toast from 'react-hot-toast';
import universitiesData from '../../constants/annex/Universities.json';

// ─── Complete campus coordinates fallback (all Sri Lankan universities + private institutes) ───
const CAMPUS_COORDS: Record<string, [number, number]> = {
  "0":  [7.8731, 80.7718],   // Other / Not Listed → centre of Sri Lanka
  "1":  [6.9016, 79.8589],   // University of Colombo
  "2":  [7.2549, 80.5925],   // University of Peradeniya
  "3":  [6.9062, 79.9018],   // University of Sri Jayewardenepura
  "4":  [6.9740, 79.9160],   // University of Kelaniya
  "5":  [6.7969, 79.9018],   // University of Moratuwa
  "6":  [9.6615, 80.0255],   // University of Jaffna
  "7":  [5.9745, 80.5491],   // University of Ruhuna
  "8":  [6.9178, 79.9013],   // Open University of Sri Lanka
  "9":  [7.7333, 81.6833],   // Eastern University
  "10": [7.3211, 81.7862],   // South Eastern University
  "11": [8.3484, 80.4011],   // Rajarata University
  "12": [6.7136, 80.7872],   // Sabaragamuwa University (SUSL)
  "13": [7.6050, 80.2143],   // Wayamba University
  "14": [6.9934, 81.0550],   // Uva Wellassa University
  "15": [6.9154, 79.8568],   // University of Visual & Performing Arts
  "16": [7.1000, 79.9980],   // Gampaha Wickramarachchi University
  "17": [6.7969, 79.9018],   // ITUM
  "18": [6.9022, 79.8612],   // IIT
  "19": [6.8241, 80.0361],   // NSBM Green University
  "20": [6.9148, 79.9729],   // SLIIT
  "21": [6.9270, 79.8611],   // NIBM
  "22": [6.9155, 79.8600],   // Aquinas College
  "23": [6.9167, 79.8500],   // ICBT Campus
};

// ─── Leaflet Clickable Map Picker ────────────────────────────────────────────────────────────────
const LeafletAdMapPicker = ({
  universityId, lat, lng, onCoordsChange
}: {
  universityId: string;
  lat: number;
  lng: number;
  onCoordsChange: (lat: number, lng: number) => void;
}) => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const getInitialCoords = (uniId: string, currentLat: number, currentLng: number): [number, number] => {
    // If user has already placed a custom pin, respect that
    if (currentLat && currentLng && currentLat !== 7.8731 && !CAMPUS_COORDS[uniId]?.every(
      (v, i) => [currentLat, currentLng][i] === v
    )) {
      return [currentLat, currentLng];
    }
    // Otherwise center on selected university
    if (uniId && CAMPUS_COORDS[uniId]) {
      return CAMPUS_COORDS[uniId];
    }
    return [6.9016, 79.8589]; // Default: Colombo
  };

  useEffect(() => {
    const loadMap = () => {
      if (!(window as any).L) return;
      const L = (window as any).L;

      const container = L.DomUtil.get('details-map-picker-canvas');
      if (container?._leaflet_id) {
        container._leaflet_id = null;
      }

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const [initialLat, initialLng] = getInitialCoords(universityId, lat, lng);

      const map = L.map('details-map-picker-canvas').setView([initialLat, initialLng], 14);
      mapRef.current = map;
      initializedRef.current = true;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // University campus marker (non-draggable, informational)
      if (universityId && CAMPUS_COORDS[universityId] && universityId !== '0') {
        const campusIcon = L.divIcon({
          className: '',
          html: `<div style="background:#3b82f6;color:white;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🎓 Campus</div>`,
          iconAnchor: [40, 12]
        });
        L.marker(CAMPUS_COORDS[universityId], { icon: campusIcon }).addTo(map);
      }

      // Draggable property pin marker
      const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', function (event: any) {
        const pos = event.target.getLatLng();
        onCoordsChange(parseFloat(pos.lat.toFixed(6)), parseFloat(pos.lng.toFixed(6)));
      });

      map.on('click', function (e: any) {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        marker.setLatLng([clickLat, clickLng]);
        onCoordsChange(parseFloat(clickLat.toFixed(6)), parseFloat(clickLng.toFixed(6)));
      });
    };

    if (!(window as any).L) {
      if (!document.getElementById('leaflet-css')) {
        const css = document.createElement('link');
        css.id = 'leaflet-css';
        css.rel = 'stylesheet';
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(css);
      }
      if (!document.getElementById('leaflet-js')) {
        const js = document.createElement('script');
        js.id = 'leaflet-js';
        js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        document.body.appendChild(js);
        js.onload = loadMap;
      } else {
        setTimeout(loadMap, 100);
      }
    } else {
      loadMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        initializedRef.current = false;
      }
    };
  }, [universityId]); // Re-initialize when university changes

  return (
    <div
      id="details-map-picker-canvas"
      className="w-full h-[280px] rounded-[1.8rem] border border-white/40 dark:border-slate-800 relative z-10"
    />
  );
};

// ─── Form Schema ─────────────────────────────────────────────────────────────────────────────────
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  monthlyRent: z.string().min(1, 'Monthly rent is required'),
  securityDeposit: z.string().min(1, 'Security deposit is required'),
  address: z.string().min(5, 'Exact address is required'),
  universityId: z.string().min(1, 'Selecting a university or institution is required'),
  customInstitution: z.string().optional(),
  beds: z.string().min(1, 'Beds capacity is required'),
  bath: z.string().min(1, 'Bathroom type is required'),
  houseRules: z.string().min(1, 'House rules are required (e.g. Girls Only)'),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  contactName: z.string().min(2, 'Name is required'),
  contactPhone: z.string().min(10, 'Valid phone number required'),
});

type FormValues = z.infer<typeof formSchema>;

const AMENITIES_LIST = [
  { id: 'WiFi', label: 'High-speed Wifi', icon: LuWifi, col: 'text-blue-500' },
  { id: 'Attached Bath', label: 'Attached Bath', icon: LuBath, col: 'text-teal-500' },
  { id: 'A/C', label: 'Air Conditioning', icon: LuSnowflake, col: 'text-red-500' },
  { id: 'Safe Parking', label: 'Safe Parking', icon: LuCar, col: 'text-orange-500' },
  { id: 'Kitchen', label: 'Equipped Kitchen', icon: LuUtensils, col: 'text-indigo-500' },
  { id: 'Power Backup', label: 'Power Backup', icon: LuZap, col: 'text-yellow-500' },
];

const STEPS = [
  { id: 'specs', title: 'General Specs', icon: LuFileText },
  { id: 'amenities', title: 'Amenities', icon: LuLayoutDashboard },
  { id: 'media', title: 'Media Gallery', icon: LuImage },
  { id: 'location', title: 'Location & Contact', icon: LuMapPin },
];

interface AnnexFormProps {
  initialData?: any;
  onSubmit: (data: Record<string, unknown>, isEditing: boolean) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const AnnexAdForm: React.FC<AnnexFormProps> = ({ initialData, onSubmit, onCancel, isEditing }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);

  // Load universities — try API first, fall back to static JSON with full lat/lng
  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/annexes/universities');
        if (res.ok) {
          const data = await res.json();
          // Ensure "Other" option is always available at the end
          const hasOther = data.some((u: any) => String(u.id) === '0');
          if (!hasOther) {
            data.push({ id: '0', name: 'Other / Not Listed', latitude: 7.8731, longitude: 80.7718 });
          }
          setUniversities(data);
        } else {
          setUniversities(universitiesData);
        }
      } catch {
        setUniversities(universitiesData);
      }
    };
    loadUniversities();
  }, []);

  const { register, handleSubmit, control, setValue, watch, formState: { errors }, trigger } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      monthlyRent: initialData?.price ? String(initialData.price).replace(/\D/g, '') : '',
      securityDeposit: initialData?.securityDeposit ?? '',
      address: initialData?.address ?? '',
      universityId: initialData?.universityId ? String(initialData.universityId) : '',
      customInstitution: '',
      beds: initialData?.beds ? String(initialData.beds) : '1',
      bath: initialData?.bath ?? 'Private Bath',
      houseRules: initialData?.features?.map((f: any) => f.featureName).join(', ') ?? '',
      amenities: initialData?.features?.map((f: any) => f.featureName) ?? [],
      latitude: initialData?.latitude ? parseFloat(initialData.latitude) : 6.9016,
      longitude: initialData?.longitude ? parseFloat(initialData.longitude) : 79.8589,
      contactName: initialData?.owner?.name ?? initialData?.contactName ?? '',
      contactPhone: initialData?.owner?.phone ?? initialData?.contactPhone ?? '',
    }
  });

  const selectedUni = watch('universityId');
  const latVal = watch('latitude');
  const lngVal = watch('longitude');
  const isOtherSelected = selectedUni === '0';

  // Re-center map and update coordinates when university selection changes
  useEffect(() => {
    if (!selectedUni) return;

    // First check if the loaded universities list has coordinates
    if (universities.length > 0) {
      const matchedUni = universities.find(u => String(u.id) === String(selectedUni));
      if (matchedUni?.latitude && matchedUni?.longitude) {
        setValue('latitude', parseFloat(String(matchedUni.latitude)));
        setValue('longitude', parseFloat(String(matchedUni.longitude)));
        return;
      }
    }

    // Fallback to hardcoded coordinate map
    if (CAMPUS_COORDS[selectedUni]) {
      const [uniLat, uniLng] = CAMPUS_COORDS[selectedUni];
      setValue('latitude', uniLat);
      setValue('longitude', uniLng);
    }
  }, [selectedUni, universities, setValue]);

  const onNext = async () => {
    const fieldsToValidate: (keyof FormValues)[] = [];
    if (currentStep === 0) fieldsToValidate.push('title', 'monthlyRent', 'securityDeposit', 'address', 'beds', 'bath', 'houseRules');
    if (currentStep === 1) fieldsToValidate.push('amenities');
    if (currentStep === 3) {
      fieldsToValidate.push('universityId', 'latitude', 'longitude', 'contactName', 'contactPhone');
      if (isOtherSelected) fieldsToValidate.push('customInstitution');
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      if (currentStep === 2) {
        if (images.length > 4 || (!isEditing && images.length < 1)) {
          toast.error('Please upload between 1 to 4 images (1 cover photo and up to 3 gallery photos)');
          return;
        }
      }
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const onPrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => {
        const combined = [...prev, ...filesArray];
        if (combined.length > 4) {
          toast.error('Maximum 4 images allowed (1 cover + up to 3 gallery photos)');
        }
        return combined.slice(0, 4);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const submitForm = (data: FormValues) => {
    if (images.length > 4 || (!isEditing && images.length < 1)) {
      toast.error('Please upload between 1 to 4 images');
      return;
    }
    onSubmit({ ...data, newImages: images }, isEditing);
  };

  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white/50 dark:border-slate-700/50 overflow-hidden w-full max-w-4xl mx-auto my-8 font-sans relative z-10">

      {/* Header */}
      <div className="px-8 py-8 md:px-12 md:py-10 border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
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
              transition={{ ease: 'easeInOut', duration: 0.5 }}
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

          {/* ── STEP 1: General Specs ── */}
          {currentStep === 0 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">General Specifications</h2>
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
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Security Deposit (Key Money)</label>
                    <input {...register('securityDeposit')} placeholder="e.g. 4 Months" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                    {errors.securityDeposit && <p className="text-red-500 text-sm mt-1">{errors.securityDeposit.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Beds Capacity</label>
                    <select {...register('beds')} className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold outline-none cursor-pointer">
                      <option value="1">1 Bed</option>
                      <option value="2">2 Beds</option>
                      <option value="3">3 Beds</option>
                      <option value="4">4+ Beds</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Bathroom Type</label>
                    <select {...register('bath')} className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold outline-none cursor-pointer">
                      <option value="Private Bath">Private Bath</option>
                      <option value="Shared Bath">Shared Bath</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Exact Property Address</label>
                  <input {...register('address')} placeholder="e.g. No 45, Bandaranayake Mawatha, Moratuwa" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">House Rules (Comma Separated)</label>
                  <input {...register('houseRules')} placeholder="Girls Only, No Smoking, Quiet Hours after 11 PM" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium outline-none transition-all dark:text-white" />
                  {errors.houseRules && <p className="text-red-500 text-sm mt-1">{errors.houseRules.message}</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Amenities ── */}
          {currentStep === 1 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Select Amenities</h2>
              {errors.amenities && <p className="text-red-500 text-sm mb-4">{errors.amenities.message}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Controller
                  name="amenities"
                  control={control}
                  render={({ field }) => (
                    <>
                      {AMENITIES_LIST.map(amenity => {
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
                        );
                      })}
                    </>
                  )}
                />
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Media Gallery ── */}
          {currentStep === 2 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Media Gallery</h2>
              
              <div className={`border-2 border-dashed rounded-[2rem] p-10 text-center relative group transition-colors ${images.length >= 4 ? 'border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/20 opacity-60 cursor-not-allowed' : 'border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100/50 cursor-pointer'}`}>
                {images.length < 4 && (
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                )}
                <div className="flex flex-col items-center pointer-events-none">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${images.length >= 4 ? 'bg-slate-200 dark:bg-slate-700 text-slate-400' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'}`}>
                    <LuUpload size={28} />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">
                    {images.length >= 4 ? 'Maximum 4 images reached' : 'Drag & Drop or Click to Upload'}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium tracking-wide">
                    1 Cover photo + up to 3 gallery photos &nbsp;·&nbsp; {images.length}/4 uploaded
                  </p>
                </div>
              </div>

              {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((file, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                      <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <LuX size={14} />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded-md">COVER</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                initialData?.images && initialData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {initialData.images.map((img: any, idx: number) => {
                      const src = typeof img === 'object' && img !== null && img.imageUrl
                        ? `http://localhost:5000${img.imageUrl}`
                        : img;
                      return (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                          <img src={src} alt="existing preview" className="w-full h-full object-cover" />
                          {idx === 0 && (
                            <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-green-600 text-white px-2 py-1 rounded-md">CURRENT COVER</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </motion.div>
          )}

          {/* ── STEP 4: Location Map Picker & Contact ── */}
          {currentStep === 3 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Location & Contact Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* University Dropdown */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                      Nearest University / Institution
                    </label>
                    <div className="relative">
                      <LuGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none z-10" />
                      <select
                        {...register('universityId')}
                        className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold outline-none cursor-pointer appearance-none"
                      >
                        <option value="">— Select University / Institution —</option>
                        {universities
                          .filter(u => String(u.id) !== '0')
                          .map(uni => (
                            <option key={uni.id} value={String(uni.id)}>{uni.name}</option>
                          ))
                        }
                        <option value="0">🔍 Other / Not Listed</option>
                      </select>
                    </div>
                    {errors.universityId && <p className="text-red-500 text-sm mt-1">{errors.universityId.message}</p>}
                  </div>

                  {/* "Other" custom institution name field */}
                  <AnimatePresence>
                    {isOtherSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl">
                          <div className="flex items-start gap-3 mb-3">
                            <LuAlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={16} />
                            <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold leading-relaxed">
                              Your institution isn't listed? No problem! Enter its name below and pinpoint your property on the map. Students searching nearby will still find your listing.
                            </p>
                          </div>
                          <input
                            {...register('customInstitution')}
                            placeholder="e.g. SLIIT, NSBM, Aquinas, Lanka Nippon..."
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 text-sm font-medium outline-none transition-all dark:text-white"
                          />
                          {errors.customInstitution && <p className="text-red-500 text-sm mt-1">{errors.customInstitution.message}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Coordinate display (read-only) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Latitude</label>
                      <input
                        type="number"
                        step="any"
                        readOnly
                        {...register('latitude', { valueAsNumber: true })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 outline-none cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Longitude</label>
                      <input
                        type="number"
                        step="any"
                        readOnly
                        {...register('longitude', { valueAsNumber: true })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                    {isOtherSelected
                      ? '📍 Pin your property location on the map — students will see it relative to your institution.'
                      : '👉 Select your university above, then click on the map to pin your exact property location.'}
                  </p>
                </div>

                {/* Leaflet Map Picker */}
                <div className="p-1 rounded-[2rem] border border-white/40 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40">
                  {selectedUni ? (
                    <LeafletAdMapPicker
                      universityId={selectedUni}
                      lat={latVal}
                      lng={lngVal}
                      onCoordsChange={(lat, lng) => {
                        setValue('latitude', lat);
                        setValue('longitude', lng);
                      }}
                    />
                  ) : (
                    <div className="w-full h-[280px] rounded-[1.8rem] bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
                      <LuMapPin size={40} className="opacity-30" />
                      <p className="text-sm font-semibold text-center px-6">
                        Select a university above to load the map
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Landlord Info */}
              <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Landlord Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input {...register('contactName')} placeholder="Landlord Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName.message}</p>}
                  </div>
                  <div>
                    <input {...register('contactPhone')} placeholder="WhatsApp / Phone (e.g. 0771234567)" className="w-full px-5 py-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700 focus:border-blue-500 font-medium outline-none transition-all dark:text-white" />
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t border-slate-200/50 dark:border-slate-800 relative z-10">
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
