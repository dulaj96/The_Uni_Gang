import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  MoreVertical, 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  AlertTriangle, 
  UserX,
  Lock,
  Globe,
  Users,
  User2,
  Sparkles,
  Info
} from 'lucide-react';
import { cx } from './ui/ProposalPrimitives';
import { WatermarkOverlay } from './privacy/WatermarkOverlay';

export default function ProposalProfileModal({ profile, onClose }: { profile: any; onClose: () => void }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);

  if (!profile) return null;

  const handleSendProposal = () => {
    setProposalSent(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  // Ensure 3 candidate photos exist
  const allImages = [
    ...(profile.images || []),
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ].slice(0, 3);

  return (
    <AnimatePresence>
      {profile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/70 backdrop-blur-md font-sans"
        >
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full h-full md:h-[92vh] max-w-2xl bg-white dark:bg-slate-900 md:rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl border border-slate-200 dark:border-slate-800 font-sans"
          >
            {/* Success Animation Overlay */}
            <AnimatePresence>
              {proposalSent && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-rose-500/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 text-center font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-rose-500 mb-4 shadow-xl"
                  >
                    <Heart size={40} fill="currentColor" />
                  </motion.div>
                  <h2 className="text-2xl font-black mb-1">Proposal Request Sent!</h2>
                  <p className="font-medium text-sm text-rose-100">We'll notify you as soon as they respond 💖</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Top Bar Header Controls */}
            <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-20 shrink-0 font-sans">
              <button 
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
              >
                <ChevronDown size={20} />
              </button>
              
              <div className="text-center font-sans">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white block">
                  {profile.name}
                </span>
                <span className="text-[10px] font-bold text-rose-500">
                  {profile.code || 'BR000158'} • Age {profile.age || 31}
                </span>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <MoreVertical size={18} />
                </button>
                
                {/* Security Popup Menu */}
                <AnimatePresence>
                  {showMenu && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute top-11 right-0 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden py-1 z-50 font-sans"
                    >
                      <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2">
                        <UserX size={15} /> Block {profile.name}
                      </button>
                      <button className="w-full px-4 py-2.5 text-left text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2">
                        <AlertTriangle size={15} /> Report Profile
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto pb-32 font-sans">
              
              {/* 1. CANDIDATE 3-PHOTO FEATURED GALLERY FRAME */}
              <div className="relative p-5 bg-gradient-to-b from-rose-500/10 to-transparent border-b border-slate-200 dark:border-slate-800">
                {/* Featured Photo Display Box */}
                <div className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-800 mb-4 group">
                  <WatermarkOverlay text={`ID: ${profile.code || 'BR000158'}`}>
                    <img 
                      src={allImages[activePhotoIndex]} 
                      alt={profile.name} 
                      className={cx(
                        "w-full h-full object-cover transition-transform duration-500",
                        profile.blurPhoto && "blur-2xl brightness-75 scale-110"
                      )} 
                    />
                  </WatermarkOverlay>
                </div>

                {/* 3 Photos Thumbnail Selector Bar */}
                <div className="flex items-center justify-center gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={cx(
                        "relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shadow-sm cursor-pointer",
                        activePhotoIndex === idx
                          ? "border-rose-500 ring-2 ring-rose-500/30 scale-105"
                          : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100"
                      )}
                    >
                      <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-slate-950/80 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full">
                        #{idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Privacy Notice Box (Matching Reference Screenshot 4) */}
                <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 flex items-start gap-2.5 text-xs font-medium shadow-sm">
                  <Lock size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-amber-800 dark:text-amber-200">
                      🔒 Privacy Alert Notice
                    </span>
                    Full name, contact details & horoscope info are visible only after mutual proposal acceptance.
                  </div>
                </div>
              </div>

              {/* 2. CATEGORIZED DETAILS CONTENT BLOCKS (Matching Screenshots 1, 2, 3) */}
              <div className="p-6 space-y-8 font-sans">
                
                {/* About & Partner Preference */}
                <section className="space-y-4 font-sans">
                  <h3 className="text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                    <User2 size={16} /> About & Partner Preference
                  </h3>

                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    <p className="font-bold text-slate-900 dark:text-white mb-1">About Candidate:</p>
                    {profile.bio || `Educated university graduate currently residing in ${profile.district || 'Colombo'}. Looking for a grounded partner with genuine values.`}
                  </div>

                  <div className="bg-gradient-to-br from-rose-500/10 to-transparent p-4 rounded-2xl border border-rose-500/20 text-xs leading-relaxed font-sinhala">
                    <p className="font-extrabold text-rose-500 mb-1">💕 Partner Preference (සහකරු / සහකාරිය):</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {profile.prompt_ideal_partner || `සමාන අධ්‍යාපන සුදුසුකම් ඇති, යහපත් ගුණධර්ම සහිත වෛද්‍ය/ඉංජිනේරු/කථිකාචාර්ය/මෘදුකාංග ඉංජිනේරු වැනි ගෞරවනීය රැකියාවක නිරත සහකරුවෙකු/සහකාරියක් සොයයි.`}
                    </p>
                  </div>
                </section>

                {/* Personal Information (Basic, Residency, Education) */}
                <section className="space-y-4 font-sans">
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-500 flex items-center gap-1.5">
                    <Info size={16} /> Personal Information
                  </h3>

                  {/* Basic */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/60 px-4 py-2 font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase">
                      Basic Attributes
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="flex justify-between p-3"><span className="text-slate-500">Ethnicity</span><span className="font-bold">{profile.ethnicity || 'Sinhalese'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Religion</span><span className="font-bold">{profile.religion || 'Buddhist'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Caste</span><span className="font-bold">{profile.caste || 'Govigama'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Height (ft)</span><span className="font-bold">{profile.height || '5.4 ft'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Age</span><span className="font-bold">{profile.age || 31} years</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Civil Status</span><span className="font-bold">{profile.civilStatus || 'Never Married (අවිවාහක)'}</span></div>
                    </div>
                  </div>

                  {/* Residency */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/60 px-4 py-2 font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase flex items-center gap-1">
                      <Globe size={13} className="text-emerald-500" /> Residency
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="flex justify-between p-3"><span className="text-slate-500">Country</span><span className="font-bold">{profile.country || 'Sri Lanka'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">State / District</span><span className="font-bold">{profile.district || 'Colombo'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">City</span><span className="font-bold">{profile.hometown || 'Colombo 1'}</span></div>
                    </div>
                  </div>

                  {/* Education & Profession */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/60 px-4 py-2 font-bold text-[11px] text-slate-600 dark:text-slate-300 uppercase flex items-center gap-1">
                      <GraduationCap size={14} className="text-indigo-500" /> Education & Profession
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="flex justify-between p-3"><span className="text-slate-500">Education</span><span className="font-bold">{profile.university || 'MPhil / Degree Graduate'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Profession</span><span className="font-bold">{profile.profession || 'Lecturer / Software Engineer'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Monthly Income</span><span className="font-bold text-rose-500">{profile.monthlyIncome || 'Rs 200,000 - Rs 300,000'}</span></div>
                    </div>
                  </div>
                </section>

                {/* Family Information (Father, Mother, Siblings Matching Screenshot 1) */}
                <section className="space-y-4 font-sans">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                    <Users size={16} /> Family Info
                  </h3>

                  {/* Father */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/60 px-4 py-2 font-bold text-[11px] text-amber-600 uppercase">
                      FATHER
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="flex justify-between p-3"><span className="text-slate-500">Ethnicity</span><span className="font-bold">{profile.fatherEthnicity || 'Sinhalese'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Religion</span><span className="font-bold">{profile.fatherReligion || 'Buddhist'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Caste</span><span className="font-bold">{profile.fatherCaste || 'Govigama'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Profession</span><span className="font-bold">{profile.fatherProfession || 'Accountant / Businessman'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Country</span><span className="font-bold">{profile.fatherCountry || 'Sri Lanka'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Additional Info</span><span className="font-bold text-slate-800 dark:text-slate-200">{profile.fatherStatus || 'මියගොස් ඇත (Deceased)'}</span></div>
                    </div>
                  </div>

                  {/* Mother */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/60 px-4 py-2 font-bold text-[11px] text-pink-600 uppercase">
                      MOTHER
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      <div className="flex justify-between p-3"><span className="text-slate-500">Ethnicity</span><span className="font-bold">{profile.motherEthnicity || 'Sinhalese'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Religion</span><span className="font-bold">{profile.motherReligion || 'Buddhist'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Caste</span><span className="font-bold">{profile.motherCaste || 'Govigama'}</span></div>
                      <div className="flex justify-between p-3"><span className="text-slate-500">Profession</span><span className="font-bold">{profile.motherProfession || 'Teacher / Housewife'}</span></div>
                    </div>
                  </div>

                  {/* Siblings */}
                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-xs flex justify-between">
                    <span className="text-slate-500">Siblings</span>
                    <span className="font-bold text-slate-900 dark:text-white">{profile.siblings || '1 Brother, 1 Sister'}</span>
                  </div>
                </section>

              </div>
            </div>

            {/* Sticky Action Footer Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4 z-30 font-sans">
              <button 
                onClick={handleSendProposal}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart size={18} fill="white" />
                <span>Send Proposal Request</span>
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
