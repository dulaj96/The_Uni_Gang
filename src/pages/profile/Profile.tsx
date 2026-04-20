import React, { useState, useEffect, useRef } from 'react';
import { 
  LuUser, LuMail, LuPhone, LuBuilding, LuLock, LuCamera, LuPencil, LuSave, 
  LuEye, LuEyeOff, LuFacebook, LuLinkedin, LuBookmark, 
  LuMessageSquare, LuActivity, LuChevronRight, LuShieldCheck, LuSparkles
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import toast from 'react-hot-toast';

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

  // New Social & Stats State
  const [fbHandle, setFbHandle] = useState('');
  const [linkedinHandle, setLinkedinHandle] = useState('');
  const [stats, setStats] = useState({
    savedAnnexes: 0,
    recentReviews: 0,
    activityScore: 0
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

    // Mock stats
    setStats({
      savedAnnexes: 5,
      recentReviews: 2,
      activityScore: 85
    });
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
    toast.success('Profile protected and updated!');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-32 pb-20 px-4 transition-colors duration-500">
      <SEO title="Premium Profile - The Uni Gang" />
      
      {/* ── Background Decoration ─────────────────────────── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-500/5 blur-[120px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[100px]" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-3xl overflow-hidden"
        >
          {/* ── Animated Premium Header ────────────────────── */}
          <div className="h-56 relative overflow-hidden group">
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 1, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-indigo-600/30 to-purple-600/30"></div>
              <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{ 
                  backgroundImage: `radial-gradient(at 0% 0%, #3b82f6 0, transparent 50%), 
                                    radial-gradient(at 50% 10%, #8b5cf6 0, transparent 50%), 
                                    radial-gradient(at 100% 0%, #ec4899 0, transparent 50%)`
                }} 
              />
            </motion.div>
            
            {/* Grain/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/70 dark:to-slate-900/40"></div>
            
            {/* Floating UI Elements for depth */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-20 p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hidden md:block"
            >
              <LuSparkles className="text-white/60 w-6 h-6" />
            </motion.div>
          </div>

          <div className="px-6 sm:px-12 pb-16">
            {/* ── Identity & Main Actions ─────────────────────── */}
            <div className="relative -mt-24 mb-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
                {/* Profile Image with Layered Glow */}
                <div className="relative group/avatar">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-48 h-48 rounded-[2.5rem] border-[12px] border-white/80 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden bg-slate-100 dark:bg-slate-800 backdrop-blur-xl relative"
                  >
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                        <LuUser className="w-20 h-20 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {isEditing && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white transition-all"
                        >
                          <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md border border-white/30 hover:scale-110 transition-transform">
                            <LuCamera className="w-8 h-8" />
                          </div>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <input type="file" ref={fileInputRef} onChange={handleProfilePictureChange} className="hidden" accept="image/*" />
                  
                  {/* Status Indicator */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-800 shadow-lg"></div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none font-plus-jakarta">
                      {firstName} {lastName}
                    </h1>
                    <div className="p-1 px-3 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
                      <LuShieldCheck className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Verified Member</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">Active Status</span>
                       <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider">Premium Plus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.button
                      key="edit-btn"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsEditing(true)}
                      className="group relative flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-[0.2em] rounded-3xl shadow-2xl hover:shadow-brand-500/20 transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-brand-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <LuPencil className="w-4 h-4 relative z-10" /> 
                      <span className="relative z-10">Customize Profile</span>
                    </motion.button>
                  ) : (
                    <motion.div 
                      key="actions"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4"
                    >
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-3xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs uppercase tracking-widest border border-slate-200 dark:border-slate-700"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="group flex items-center gap-3 px-10 py-5 bg-brand-600 text-white font-black text-xs uppercase tracking-widest rounded-3xl shadow-[0_20px_40px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.5)] transition-all relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <LuSave className="w-4 h-4" /> Finalize Changes
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Stats Section ─────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
              {[
                { label: 'Saved Annexes', value: stats.savedAnnexes, icon: LuBookmark, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Recent Reviews', value: stats.recentReviews, icon: LuMessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { label: 'Activity Score', value: `${stats.activityScore}%`, icon: LuActivity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  className="group p-8 rounded-[2.5rem] bg-white/40 dark:bg-slate-800/30 border border-white/40 dark:border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center transition-all shadow-sm hover:shadow-xl"
                >
                  <div className={`p-5 rounded-[1.5rem] ${stat.bg} ${stat.color} mb-5 group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-4xl font-black text-slate-900 dark:text-white leading-none mb-2 font-plus-jakarta tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* ── Personal Info ─────────────────────────────── */}
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500 shadow-inner"><LuUser className="w-6 h-6" /></div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-plus-jakarta">Personal Profile</h2>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Given Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                          isEditing 
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                          : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                      }`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Family Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                          isEditing 
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                          : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Connectivity</label>
                  <div className="relative group">
                    <LuPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-14 pr-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                          isEditing 
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                          : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-3 opacity-80">
                   <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Primary Digital ID</label>
                   <div className="relative">
                      <LuMail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input
                        type="email"
                        value={email}
                        disabled={true}
                        className="w-full pl-14 pr-6 py-4.5 rounded-2xl text-sm bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100 dark:border-slate-800 text-slate-400 font-bold cursor-not-allowed"
                      />
                   </div>
                </div>
              </div>

              {/* ── Security & Socials ──────────────────────────── */}
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500 shadow-inner"><LuLock className="w-6 h-6" /></div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-plus-jakarta">Access & Social</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Academic Partner</label>
                  <div className="relative group">
                    <LuBuilding className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-14 pr-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                          isEditing 
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                          : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Facebook</label>
                      <div className="relative group">
                         <LuFacebook className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                         <input
                           type="text"
                           value={fbHandle}
                           placeholder="@username_id"
                           onChange={(e) => setFbHandle(e.target.value)}
                           disabled={!isEditing}
                           className={`w-full pl-14 pr-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                               isEditing 
                               ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                               : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                           }`}
                         />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">LinkedIn</label>
                      <div className="relative group">
                         <LuLinkedin className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-700 transition-colors" />
                         <input
                           type="text"
                           value={linkedinHandle}
                           placeholder="linkid-profile"
                           onChange={(e) => setLinkedinHandle(e.target.value)}
                           disabled={!isEditing}
                           className={`w-full pl-14 pr-6 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                               isEditing 
                               ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                               : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                           }`}
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Vault Password</label>
                  <div className="relative group">
                    <LuLock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-14 pr-14 py-4.5 rounded-2xl text-sm transition-all focus:outline-none ${
                          isEditing 
                          ? 'bg-slate-50 dark:bg-slate-950/60 border-2 border-brand-500/20 focus:border-brand-500 focus:bg-white dark:focus:bg-slate-900 shadow-2xl text-slate-900 dark:text-white' 
                          : 'bg-white/30 dark:bg-white/5 border border-transparent text-slate-600 dark:text-slate-300 font-bold'
                      }`}
                    />
                    {isEditing && (
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-brand-500 transition-colors">
                        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
            
            {/* ── Footer Link ──────────────────────────────────── */}
            <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-center">
              <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-brand-500 transition-colors group">
                Account Settings History <LuChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
