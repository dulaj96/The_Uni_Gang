import React, { useState, useEffect, useRef } from 'react';
import { 
  LuUser, LuMail, LuPhone, LuBuilding, LuLock, LuCamera, LuPencil, LuSave, 
  LuEye, LuEyeOff, LuFacebook, LuLinkedin, LuBookmark, 
  LuMessageSquare, LuActivity, LuChevronRight, LuShieldCheck, 
  LuCalendar, LuLayoutGrid, LuTrophy, LuSettings, LuLogOut
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import toast from 'react-hot-toast';

import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [university, setUniversity] = useState<string>('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Expanded Social & Stats State
  const [fbHandle, setFbHandle] = useState('');
  const [linkedinHandle, setLinkedinHandle] = useState('');
  const [stats, setStats] = useState({
    savedAnnexes: 0,
    recentReviews: 0,
    activityScore: 0,
    registeredEvents: 0,
    publishedAds: 0,
    rewardPoints: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName') || 'John';
    const storedLastName = localStorage.getItem('userLastName') || 'Doe';
    const storedEmail = localStorage.getItem('userEmail') || 'john.doe@example.com';
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber') || '0712345678';
    const storedUniversity = localStorage.getItem('userUniversity') || '';
    const storedPassword = localStorage.getItem('userPassword') || 'dummy_password';
    const storedProfilePic = localStorage.getItem('userProfilePicture');
    const storedFb = localStorage.getItem('userFbHandle') || '';
    const storedLinkedin = localStorage.getItem('userLinkedinHandle') || '';

    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setPhoneNumber(storedPhoneNumber);
    setUniversity(storedUniversity);
    setPassword(storedPassword);
    setProfilePicture(storedProfilePic);
    setFbHandle(storedFb);
    setLinkedinHandle(storedLinkedin);

    // Enhanced Mock stats
    setStats({
      savedAnnexes: 5,
      recentReviews: 12,
      activityScore: 88,
      registeredEvents: 3,
      publishedAds: 1,
      rewardPoints: 1250
    });

    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        localStorage.setItem('userProfilePicture', reader.result as string);
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhoneNumber', phoneNumber);
    localStorage.setItem('userUniversity', university);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userFbHandle', fbHandle);
    localStorage.setItem('userLinkedinHandle', linkedinHandle);

    if (profilePicture) {
      localStorage.setItem('userProfilePicture', profilePicture);
    } else {
      localStorage.removeItem('userProfilePicture');
    }

    setIsEditing(false);
    toast.success('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-32 pb-24 px-4 font-sans transition-colors duration-500">
      <PremiumPageLoader isLoading={loading} message="Authenticating your profile..." />
      <SEO title="Member Profile | The Uni Gang" />
      
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto relative z-10"
          >
            <motion.div 
              className="relative glass-card rounded-[3rem] shadow-2xl border border-slate-200/50 dark:border-white/5 bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl overflow-hidden"
            >
              {/* ── Subdued Header Area ───────────────────── */}
              <div className="h-64 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-indigo-600/10 to-purple-600/10 translate-z-0"></div>
                <div className="absolute inset-0 opacity-20"
                  style={{ 
                    backgroundImage: `radial-gradient(at 10% 10%, #3b82f6 0, transparent 40%), 
                                      radial-gradient(at 90% 10%, #6366f1 0, transparent 40%)`
                  }} 
                />
                
                <div className="absolute top-8 right-8 flex gap-3">
                  <button className="p-3 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 text-slate-700 dark:text-white hover:bg-white/60 transition-all hover:scale-110 shadow-sm">
                    <LuSettings className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 text-slate-700 dark:text-white hover:bg-red-500/20 transition-all hover:scale-110 shadow-sm">
                    <LuLogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-8 sm:px-16 pb-20">
                {/* ── Identity & Circular Avatar ───────────────────── */}
                <div className="relative -mt-32 mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
                    <div className="relative group/avatar">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative p-1.5 rounded-full bg-linear-to-tr from-blue-300 via-indigo-300 to-purple-300 shadow-lg"
                      >
                        <div className="w-48 h-48 rounded-full border-[6px] border-white dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-inner relative z-10 transition-colors">
                          {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                              <LuUser className="w-20 h-20 text-slate-200 dark:text-slate-700" />
                            </div>
                          )}
                          
                          <AnimatePresence>
                            {isEditing && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[2px] text-white transition-all rounded-full"
                              >
                                <div className="p-3.5 bg-white/20 rounded-full backdrop-blur-md border border-white/40 hover:bg-white/30 transition-all">
                                  <LuCamera className="w-7 h-7" />
                                </div>
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                      <input type="file" ref={fileInputRef} onChange={handleProfilePictureChange} className="hidden" accept="image/*" />
                    </div>

                    <div className="mb-2">
                      <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                          {firstName} {lastName}
                        </h1>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 shadow-sm">
                          <LuShieldCheck className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Verified</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Community Member</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                        <div className="flex gap-2">
                          {stats.publishedAds > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/5 text-indigo-500 border border-indigo-500/10 text-[9px] font-black uppercase tracking-wider">
                              Annex Provider
                            </div>
                          )}
                          {stats.registeredEvents > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/5 text-pink-500 border border-pink-500/10 text-[9px] font-black uppercase tracking-wider">
                              Event Master
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 mb-4">
                    <AnimatePresence mode="wait">
                      {!isEditing ? (
                        <motion.button
                          key="edit-btn"
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(true)}
                          className="group relative flex items-center gap-3 px-10 py-5 bg-white dark:bg-white/5 backdrop-blur-xl text-slate-700 dark:text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-full border border-slate-200 dark:border-white/10 shadow-lg transition-all"
                        >
                          <LuPencil className="w-4 h-4 shadow-sm" /> Refine Identity
                        </motion.button>
                      ) : (
                        <motion.div 
                          key="actions"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex gap-4"
                        >
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-8 py-5 bg-slate-50 dark:bg-slate-800 backdrop-blur-xl text-slate-400 dark:text-slate-500 font-bold rounded-full hover:bg-slate-100 transition-all text-[11px] uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                          >
                            Cancel
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSave}
                            className="group flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black text-[11px] uppercase tracking-widest rounded-full shadow-xl shadow-blue-600/20"
                          >
                            <LuSave className="w-4 h-4" /> Lock Changes
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* ── Subdued Stats Section ────────────────────────── */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
                  {[
                    { label: 'Saved', value: stats.savedAnnexes, icon: LuBookmark, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Reviews', value: stats.recentReviews, icon: LuMessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Activity', value: `${stats.activityScore}%`, icon: LuActivity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Events', value: stats.registeredEvents, icon: LuCalendar, color: 'text-pink-500', bg: 'bg-pink-500/10' },
                    { label: 'Listings', value: stats.publishedAds, icon: LuLayoutGrid, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    { label: 'Points', value: stats.rewardPoints, icon: LuTrophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-[2.5rem] bg-white/40 dark:bg-slate-800/20 border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center text-center transition-all shadow-xs"
                    >
                      <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} mb-3`}>
                        <stat.icon size={20} />
                      </div>
                      <div className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1 tracking-tight">{stat.value}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
                  {/* ── Personal Info Section ──────────────────────── */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/60">
                      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><LuUser className="w-6 h-6" /></div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Personal Details</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-blue-500 transition-colors">Forename</label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 p-2 rounded-full bg-blue-500/5 text-blue-500/40 group-focus-within:bg-blue-500/10 group-focus-within:text-blue-500 transition-all">
                            <LuUser className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                          />
                        </div>
                      </div>
                      <div className="group space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-blue-500 transition-colors">Surname</label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 p-2 rounded-full bg-blue-500/5 text-blue-500/40 group-focus-within:bg-blue-500/10 group-focus-within:text-blue-500 transition-all">
                            <LuUser className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-blue-500 transition-colors">Contact Number</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 p-2 rounded-full bg-blue-500/5 text-blue-500/40 group-focus-within:bg-blue-500/10 group-focus-within:text-blue-500 transition-all">
                          <LuPhone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-blue-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="group space-y-3 opacity-80">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Digital Signature (Email)</label>
                      <div className="relative flex items-center">
                          <div className="absolute left-3 p-2 rounded-full bg-slate-500/5 text-slate-400">
                            <LuMail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            disabled={true}
                            className="w-full pl-14 pr-8 py-5 rounded-full bg-slate-50/50 dark:bg-slate-900/40 border-2 border-transparent text-sm font-bold text-slate-400 cursor-not-allowed"
                          />
                      </div>
                    </div>
                  </div>

                  {/* ── Connectivity & Security Section ───────────────── */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/60">
                      <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><LuLock className="w-6 h-6" /></div>
                      <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">Connectivity</h2>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-purple-500 transition-colors">Alma Mater</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 p-2 rounded-full bg-purple-500/5 text-purple-500/40 group-focus-within:bg-purple-500/10 group-focus-within:text-purple-500 transition-all">
                          <LuBuilding className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-purple-500/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-blue-600 transition-colors">Facebook ID</label>
                          <div className="relative flex items-center">
                            <div className="absolute left-3 p-2 rounded-full bg-blue-600/5 text-blue-600/40 group-focus-within:bg-blue-600/10 group-focus-within:text-blue-600 transition-all">
                              <LuFacebook className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              value={fbHandle}
                              placeholder="@username"
                              onChange={(e) => setFbHandle(e.target.value)}
                              disabled={!isEditing}
                              className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-blue-600/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                            />
                          </div>
                      </div>
                      <div className="group space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-indigo-600 transition-colors">LinkedIn Profile</label>
                          <div className="relative flex items-center">
                            <div className="absolute left-3 p-2 rounded-full bg-indigo-600/5 text-indigo-600/40 group-focus-within:bg-indigo-600/10 group-focus-within:text-indigo-600 transition-all">
                              <LuLinkedin className="w-4 h-4" />
                            </div>
                            <input
                              type="text"
                              value={linkedinHandle}
                              placeholder="profile-id"
                              onChange={(e) => setLinkedinHandle(e.target.value)}
                              disabled={!isEditing}
                              className="w-full pl-14 pr-8 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-indigo-600/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                            />
                          </div>
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2 group-focus-within:text-brand-600 transition-colors">Security Key</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 p-2 rounded-full bg-slate-500/5 text-slate-400 group-focus-within:text-brand-600 transition-all">
                            <LuLock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-14 pr-14 py-5 rounded-full bg-white dark:bg-black/20 border-2 border-slate-50 dark:border-white/5 focus:border-brand-600/20 focus:bg-white dark:focus:bg-slate-900 shadow-xs text-sm font-bold text-slate-800 dark:text-white transition-all disabled:opacity-60"
                        />
                        {isEditing && (
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 text-slate-300 hover:text-brand-500 transition-colors">
                            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                
                {/* ── Minimalist Footer ──────────────────────────────────── */}
                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/60 flex flex-col items-center gap-4">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-blue-500 transition-colors">
                    Audit Logs <LuChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-[9px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                    Protected by UniGang Security Layer 2.0
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
