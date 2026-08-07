import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Heart, MessageCircle, MapPin, Briefcase, GraduationCap, ShieldCheck, Lock, Check, User2, Book, Crown, Coffee, Sparkles } from 'lucide-react';
import { cx, PrimaryButton } from '../components/ui/ProposalPrimitives';

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

  const handleConnect = () => {
    setProposalSent(true);
    if (onSendProposal) onSendProposal();
  };

  if (!profile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-5xl mx-auto min-h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 flex flex-col relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-4"
    >
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <button 
          onClick={goBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {profile.name}'s Profile
          {profile.isVerified && <ShieldCheck size={18} className="text-blue-500" />}
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-32 custom-scrollbar">
        
        {/* Hero Image Section */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] bg-slate-900">
          <img 
            src={profile.images?.[0] || profile.avatar} 
            alt={profile.name}
            className={cx("w-full h-full object-cover", profile.blurPhoto && "blur-2xl opacity-75")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          {profile.blurPhoto && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="bg-black/40 backdrop-blur-md p-4 rounded-full">
                <Lock size={32} className="text-white drop-shadow-md" />
              </div>
            </div>
          )}

          {/* Floating Match Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-rose-500/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-white flex items-center gap-2 border border-white/20 shadow-lg shadow-rose-500/20">
              <Heart size={16} fill="currentColor" /> {profile.matchPercentage}% Match
            </div>
          </div>

          {/* Name & Basic Info over Image */}
          <div className="absolute bottom-0 inset-x-0 p-8 pt-20">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg flex items-center gap-3">
              {profile.name}, {profile.age}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-1.5 font-medium"><MapPin size={18} className="text-emerald-400" /> {profile.district}</div>
              <div className="flex items-center gap-1.5 font-medium"><GraduationCap size={18} className="text-rose-400" /> {profile.university}</div>
              <div className="flex items-center gap-1.5 font-medium"><Briefcase size={18} className="text-amber-400" /> {profile.professionSector || 'Private Sector'}</div>
            </div>
          </div>
        </div>

        {/* Detailed Info Sections */}
        <div className="p-8 max-w-4xl mx-auto space-y-12">
          
          {/* About Me */}
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <User2 size={24} className="text-rose-500" /> About Me
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.bio || `I'm a final year student at ${profile.university} studying ${profile.faculty}. Looking for someone who shares my passion for tech and traveling. Let's see if we match!`}
            </div>
          </section>

          {/* Highlights Grid */}
          <section>
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles size={24} className="text-blue-500" /> Key Highlights
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Education', value: profile.university, icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
                { label: 'Profession', value: profile.profession || 'Software Engineer', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
                { label: 'Religion', value: profile.religion || 'Buddhist', icon: Book, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
                { label: 'Civil Status', value: profile.civilStatus || 'Never Married', icon: Crown, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className={cx("w-12 h-12 rounded-2xl grid place-items-center mb-3", item.bg, item.color)}>
                    <item.icon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Attributes (Two Columns) */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Physical & Lifestyle */}
            <section>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Coffee size={24} className="text-orange-500" /> Physical & Lifestyle
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {[
                  { label: 'Height & Weight', value: `${profile.height || "5' 6\""}, ${profile.weight || '55 kg'}` },
                  { label: 'Complexion', value: profile.complexion || 'Fair' },
                  { label: 'Diet', value: profile.diet || 'Non-Vegetarian' },
                  { label: 'Smoking / Drinking', value: `${profile.smoking || 'No'} / ${profile.drinking || 'No'}` },
                  { label: 'Ethnicity', value: profile.ethnicity || 'Sinhalese' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b last:border-b-0 border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm font-medium text-slate-500">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Family Background */}
            <section>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={24} className="text-emerald-500" /> Family Background
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-max">
                {[
                  { label: "Father's Profession", value: profile.fatherProfession || 'Businessman' },
                  { label: "Mother's Profession", value: profile.motherProfession || 'Housewife' },
                  { label: "Siblings", value: profile.siblings || '1 Brother, 1 Sister' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-b last:border-b-0 border-slate-100 dark:border-slate-800/50">
                    <span className="text-sm font-medium text-slate-500">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Hobbies / Interests */}
          {profile.hobbies && profile.hobbies.length > 0 && (
            <section>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Heart size={24} className="text-rose-500" /> Interests
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.hobbies.map((h: string) => (
                  <span key={h} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-full text-sm font-bold border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                    {h}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          {!proposalSent ? (
            <motion.div 
              key="connect"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <PrimaryButton onClick={handleConnect} icon={MessageCircle} className="w-full py-4 text-lg shadow-xl shadow-blue-500/20">
                Send Proposal
              </PrimaryButton>
            </motion.div>
          ) : (
            <motion.div 
              key="sent"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm"
            >
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 grid place-items-center mb-1">
                  <Check size={24} />
                </div>
                <p className="font-bold">Proposal Sent Successfully!</p>
                <p className="text-xs opacity-80 text-center">We'll notify you if they accept your connection request.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
