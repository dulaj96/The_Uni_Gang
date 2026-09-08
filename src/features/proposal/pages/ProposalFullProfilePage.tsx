import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Heart, 
  MessageCircle, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  Lock, 
  Check, 
  User2, 
  Crown, 
  Users, 
  Sparkles, 
  Info, 
  Globe 
} from 'lucide-react';
import { cx, PrimaryButton } from '../components/ui/ProposalPrimitives';
import { WatermarkOverlay } from '../components/privacy/WatermarkOverlay';

export default function ProposalFullProfilePage({ 
  profile, 
  goBack, 
  onSendProposal 
}: { 
  profile: any;
  goBack: () => void;
  onSendProposal?: () => void;
}) {
  const [proposalSent, setProposalSent] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleConnect = () => {
    setProposalSent(true);
    if (onSendProposal) onSendProposal();
  };

  if (!profile) return null;

  // Ensure 3 images exist for display (cover + 2 additional photos)
  const allImages = [
    ...(profile.images || []),
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ].slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-5xl mx-auto min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex flex-col relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-4 font-sans"
    >
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm font-sans">
        <button 
          onClick={goBack}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 text-base font-sans">
          <span>{profile.name}</span>
          <span className="text-xs font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
            {profile.code || 'BR000158'}
          </span>
          {profile.isVerified && <ShieldCheck size={18} className="text-blue-500" />}
        </div>
        <div className="w-10" />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pb-36 font-sans">
        
        {/* Top Profile Header Banner Card (Matching Screenshot 4) */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              {/* Avatar Frame */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl shrink-0">
                <WatermarkOverlay text={`ID: ${profile.code || 'BR000158'}`}>
                  <img 
                    src={allImages[selectedImageIndex]} 
                    alt={profile.name} 
                    className={cx("w-full h-full object-cover", profile.blurPhoto && "blur-xl")}
                  />
                </WatermarkOverlay>
              </div>

              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {profile.name}
                  </h1>
                  {profile.isVIP && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
                      👑 VIP
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-[10px] uppercase tracking-wider border border-rose-500/20">
                    {profile.lookingFor === 'Groom' ? 'Groom (සහකරු)' : 'Bride (සහකාරිය)'}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 flex-wrap">
                  <span className="text-rose-500 font-black">{profile.code || 'BR000158'}</span>
                  <span>•</span>
                  <span>Age {profile.age || 31} Years</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin size={13} className="text-emerald-500" /> {profile.district || 'Colombo'}</span>
                </p>
              </div>
            </div>

            {/* Match Percentage Pill */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-rose-500/20 flex items-center gap-2 font-bold text-sm">
              <Heart size={16} fill="white" /> {profile.matchPercentage || 95}% Match
            </div>
          </div>

          {/* Privacy Alert Box (Matching Reference Screenshot 4) */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 flex items-start gap-3 text-xs font-medium leading-relaxed shadow-sm">
            <Lock size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5 text-amber-800 dark:text-amber-200">
                🔒 Privacy Protection Policy
              </span>
              Full name, contact details, birthday and exact address are strictly hidden. They are only shared after mutual interest proposal acceptance by both parties.
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-10 font-sans">
          
          {/* 1. CANDIDATE 3-PHOTO GALLERY SECTION */}
          <section className="space-y-4 font-sans">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles size={18} className="text-rose-500" /> Candidate Photos ({allImages.length} Pictures)
            </h2>

            {/* Main Featured Photo + 2 Side/Bottom Additional Gallery Photos */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Main Cover Photo (8 cols) */}
              <div className="md:col-span-8 relative h-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-lg group">
                <WatermarkOverlay text={`ID: ${profile.code || 'BR000158'}`}>
                  <img 
                    src={allImages[selectedImageIndex]} 
                    alt={`${profile.name} Main Photo`} 
                    className={cx("w-full h-full object-cover transition-all duration-500", profile.blurPhoto && "blur-2xl")}
                  />
                </WatermarkOverlay>
                <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                  Featured Photo #{selectedImageIndex + 1}
                </div>
              </div>

              {/* 2 Additional Gallery Photos (4 cols) */}
              <div className="md:col-span-4 flex flex-row md:flex-col gap-4">
                {allImages.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cx(
                      "relative flex-1 h-32 md:h-44 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-md group",
                      selectedImageIndex === idx 
                        ? "border-rose-500 ring-2 ring-rose-500/30 scale-[1.02]" 
                        : "border-slate-200 dark:border-slate-800 hover:border-rose-400"
                    )}
                  >
                    <WatermarkOverlay text={`ID: ${profile.code || 'BR000158'}`}>
                      <img 
                        src={imgUrl} 
                        alt={`Candidate Photo ${idx + 1}`} 
                        className={cx("w-full h-full object-cover group-hover:scale-105 transition-transform duration-500", profile.blurPhoto && "blur-xl")}
                      />
                    </WatermarkOverlay>
                    <div className="absolute top-2 left-2 bg-slate-950/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                      Photo {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. ABOUT & PARTNER PREFERENCES SECTION (Matching Screenshot 3) */}
          <section className="space-y-4 font-sans">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <User2 size={18} className="text-rose-500" /> About & Partner Preferences
            </h2>
            
            {/* About Me Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">About Candidate</h3>
              {profile.prompt_about_me || profile.bio || `I am an educated, well-mannered graduate currently residing in ${profile.district || 'Colombo'}. Looking for a life partner with genuine moral values and shared goals.`}
            </div>

            {/* Partner Preference Card (Matching Screenshot 3) */}
            <div className="bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent rounded-3xl p-6 border border-rose-500/20 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-500 mb-2 flex items-center gap-2">
                💕 Partner Preference (සහකරු / සහකාරිය පිළිබඳ අපේක්ෂා)
              </h3>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed font-sinhala">
                {profile.prompt_ideal_partner || `සමාන අධ්‍යාපන සුදුසුකම් ඇති, යහපත් ගුණධර්ම සහිත වෛද්‍ය/ඉංජිනේරු/කථිකාචාර්ය/මෘදුකාංග ඉංජිනේරු වැනි ගෞරවනීය රැකියාවක නිරත සහකරුවෙකු/සහකාරියක් සොයයි.`}
              </p>
            </div>
          </section>

          {/* 3. PERSONAL INFO SECTION (Categorized Blocks Matching Screenshot 2 & 3) */}
          <section className="space-y-6 font-sans">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Personal Information
            </h2>
            
            {/* Basic Info Category Block */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden font-sans">
              <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Basic Attributes
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {[
                  { label: 'Ethnicity', value: profile.ethnicity || 'Sinhalese' },
                  { label: 'Religion', value: profile.religion || 'Buddhist' },
                  { label: 'Caste', value: profile.caste || 'Govigama' },
                  { label: 'Height (ft)', value: profile.height || '5.4 ft' },
                  { label: 'Age', value: `${profile.age || 31} years` },
                  { label: 'Civil Status', value: profile.civilStatus || 'Never Married (අවිවාහක)' },
                  { label: 'Complexion', value: profile.complexion || 'Fair' },
                  { label: 'Diet / Habits', value: `${profile.diet || 'Non-Vegetarian'} • Smoking: ${profile.smoking || 'No'} • Drinking: ${profile.drinking || 'No'}` },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3.5 text-xs font-sans">
                    <span className="font-semibold text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Residency Category Block */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden font-sans">
              <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} className="text-emerald-500" /> Residency & Location
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {[
                  { label: 'Country', value: profile.country || 'Sri Lanka' },
                  { label: 'State / District', value: profile.district || 'Colombo' },
                  { label: 'City / Hometown', value: profile.hometown || 'Colombo 1' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3.5 text-xs font-sans">
                    <span className="font-semibold text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Profession Category Block */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden font-sans">
              <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap size={16} className="text-indigo-500" /> Education & Profession
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {[
                  { label: 'Education Qualification', value: profile.university || 'BSc / MPhil Degree (University Graduate)' },
                  { label: 'Faculty / Branch', value: profile.faculty || 'Engineering / IT Faculty' },
                  { label: 'Profession', value: profile.profession || 'Lecturer / Software Engineer' },
                  { label: 'Workplace / Sector', value: profile.professionSector || 'Private / State University Sector' },
                  { label: 'Monthly Income', value: profile.monthlyIncome || 'Rs 200,000 - Rs 300,000' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3.5 text-xs font-sans">
                    <span className="font-semibold text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. FAMILY INFO SECTION (Categorized Block Matching Screenshot 1) */}
          <section className="space-y-4 font-sans">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Users size={18} className="text-amber-500" /> Family Info
            </h2>
            
            {/* Father Details */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden font-sans">
              <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-extrabold text-xs text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                FATHER
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {[
                  { label: 'Ethnicity', value: profile.fatherEthnicity || 'Sinhalese' },
                  { label: 'Religion', value: profile.fatherReligion || 'Buddhist' },
                  { label: 'Caste', value: profile.fatherCaste || 'Govigama' },
                  { label: 'Profession', value: profile.fatherProfession || 'Accountant / Businessman' },
                  { label: 'Country', value: profile.fatherCountry || 'Sri Lanka' },
                  { label: 'Additional Info', value: profile.fatherStatus || 'මියගොස් ඇත (Deceased) / Retired' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3.5 text-xs font-sans">
                    <span className="font-semibold text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mother Details */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden font-sans">
              <div className="bg-slate-100 dark:bg-slate-800/60 px-6 py-3 border-b border-slate-200 dark:border-slate-800 font-extrabold text-xs text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                MOTHER
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {[
                  { label: 'Ethnicity', value: profile.motherEthnicity || 'Sinhalese' },
                  { label: 'Religion', value: profile.motherReligion || 'Buddhist' },
                  { label: 'Caste', value: profile.motherCaste || 'Govigama' },
                  { label: 'Profession', value: profile.motherProfession || 'Teacher / Housewife' },
                  { label: 'Country', value: profile.motherCountry || 'Sri Lanka' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3.5 text-xs font-sans">
                    <span className="font-semibold text-slate-500">{row.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Siblings Details */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-sans">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Siblings & Family Status</span>
                <span className="font-bold text-slate-900 dark:text-white">{profile.siblings || '1 Brother, 1 Sister (Respectable Family)'}</span>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Sticky Bottom Action Footer Bar */}
      <div className="absolute bottom-0 inset-x-0 p-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center gap-4 font-sans z-30">
        <AnimatePresence mode="wait">
          {!proposalSent ? (
            <motion.div 
              key="connect"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <PrimaryButton onClick={handleConnect} icon={MessageCircle} className="w-full py-4 text-base shadow-xl shadow-rose-500/20 font-bold">
                Send Proposal / Connect Request
              </PrimaryButton>
            </motion.div>
          ) : (
            <motion.div 
              key="sent"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md"
            >
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 grid place-items-center shrink-0">
                  <Check size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Proposal Request Sent!</p>
                  <p className="text-xs opacity-80">We'll notify you as soon as they accept your connection request.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
