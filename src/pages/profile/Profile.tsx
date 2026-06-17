import React, { useState, useEffect, useRef } from 'react';
import {
  LuUser, LuMail, LuPhone, LuBuilding, LuLock, LuCamera, LuPencil, LuSave,
  LuEye, LuEyeOff, LuFacebook, LuLinkedin, LuBookmark,
  LuMessageSquare, LuActivity, LuChevronRight, LuShieldCheck,
  LuCalendar, LuLayoutGrid, LuTrophy, LuSettings, LuLogOut, LuBriefcase, LuX, LuSend, LuTrash2
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../../components/SEO';
import toast from 'react-hot-toast';
import { api } from '../../api';
import { celebrate } from '../../utils/celebrate';

import PremiumPageLoader from '../../components/ui/PremiumPageLoader';

const getInputClasses = (isEditing: boolean, focusTheme: 'blue' | 'purple' | 'indigo' | 'brand', isPassword = false) => {
  const base = `w-full pl-14 ${isPassword ? 'pr-14' : 'pr-8'} py-5 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none`;

  if (isEditing) {
    let focusClasses = "";
    if (focusTheme === 'blue') {
      focusClasses = "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:border-blue-400 dark:focus:ring-blue-400/20";
    } else if (focusTheme === 'purple') {
      focusClasses = "focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 dark:focus:border-purple-400 dark:focus:ring-purple-400/20";
    } else if (focusTheme === 'indigo') {
      focusClasses = "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/20 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20";
    } else {
      focusClasses = "focus:border-red-500 focus:ring-4 focus:ring-red-500/20 dark:focus:border-red-400 dark:focus:ring-red-400/20";
    }
    return `${base} bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white ${focusClasses} shadow-sm`;
  } else {
    return `${base} bg-slate-100/60 dark:bg-slate-900/40 border-2 border-slate-200/40 dark:border-white/10 text-slate-800 dark:text-slate-100 cursor-not-allowed select-none`;
  }
};

const getIconClasses = (isEditing: boolean, theme: 'blue' | 'purple' | 'indigo' | 'brand') => {
  const base = "absolute left-3 p-2 rounded-full transition-all duration-300";
  if (isEditing) {
    if (theme === 'blue') {
      return `${base} bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400`;
    } else if (theme === 'purple') {
      return `${base} bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400`;
    } else if (theme === 'indigo') {
      return `${base} bg-indigo-600/10 text-indigo-600 dark:bg-indigo-600/20 dark:text-indigo-400`;
    } else {
      return `${base} bg-red-500/10 text-red-500 dark:bg-red-500/20 dark:text-red-400`;
    }
  } else {
    return `${base} bg-slate-500/5 text-slate-400 dark:text-slate-500`;
  }
};

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
    rewardPoints: 0,
    followers: 0,
    following: 0
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showServicesModal, setShowServicesModal] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const [showBlogsModal, setShowBlogsModal] = useState(false);
  const [submittedBlogs, setSubmittedBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const [showEventsModal, setShowEventsModal] = useState(false);
  const [submittedEvents, setSubmittedEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');

  const fetchSubmittedEvents = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return;
    try {
      setLoadingEvents(true);
      const data = await api.getMyEvents(token);
      setSubmittedEvents(data);
    } catch (err) {
      console.error('Failed to load submitted events:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this event concept? This will permanently remove it from the platform.")) {
      return;
    }
    const token = localStorage.getItem('userToken');
    if (!token) return;
    try {
      await api.deleteEvent(id, token);
      setSubmittedEvents(submittedEvents.filter(e => e.id !== id));
      setSelectedEvent(null);
      toast.success("Event deleted successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete event.");
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      try {
        setLoadingRequests(true);
        const data = await api.getMyServiceRequests(token);
        setServiceRequests(data);
      } catch (err) {
        console.error('Failed to load service requests:', err);
      } finally {
        setLoadingRequests(false);
      }
    };
    
    const fetchBlogs = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      try {
        setLoadingBlogs(true);
        const data = await api.getMyBlogs(token);
        setSubmittedBlogs(data);
      } catch (err) {
        console.error('Failed to load submitted blogs:', err);
      } finally {
        setLoadingBlogs(false);
      }
    };

    const fetchNetwork = async () => {
      const token = localStorage.getItem('userToken');
      const userId = localStorage.getItem('userId');
      if (!token || !userId) return;
      try {
        const data = await api.getUserNetwork(userId, token);
        setStats(prev => ({
          ...prev,
          followers: data.followersCount || 0,
          following: data.followingCount || 0
        }));
      } catch (err) {
        console.error('Failed to load network:', err);
      }
    };

    fetchRequests();
    fetchSubmittedEvents();
    fetchBlogs();
    fetchNetwork();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedRequest) return;
      const token = localStorage.getItem('userToken');
      if (!token) return;
      try {
        setLoadingMessages(true);
        const data = await api.getServiceMessages(selectedRequest.id, token);
        setMessages(data);
      } catch (err) {
        console.error('Failed to fetch messages:', err);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [selectedRequest]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newMessageText.trim()) return;
    const token = localStorage.getItem('userToken');
    if (!token) return;
    try {
      const sent = await api.addServiceMessage(selectedRequest.id, newMessageText, token);
      setMessages([...messages, sent]);
      setNewMessageText('');
    } catch (err) {
      console.error('Failed to send message:', err);
      toast.error('Failed to send message.');
    }
  };

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

    const timer = setTimeout(() => setLoading(false), 300);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
    const fullName = `${firstName} ${lastName}`.trim();

    if (token) {
      try {
        await api.updateProfile({
          name: fullName,
          profile_pic: profilePicture,
          phone: phoneNumber
        }, token);
        localStorage.setItem('userName', fullName);
      } catch (err: any) {
        console.error('Failed to sync profile changes with backend:', err);
        toast.error('Sync error: changes saved locally but failed to save to server.');
      }
    }

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
    celebrate();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-8 pb-24 px-4 font-sans transition-colors duration-500">
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
              className="relative glass-card rounded-[3rem] shadow-2xl backdrop-blur-3xl overflow-hidden border border-slate-200/60 dark:border-white/10"
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
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-white/10 text-blue-600 dark:text-blue-400 shadow-sm">
                          <LuShieldCheck className="w-5 h-5" />
                          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Verified</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <span className="text-slate-400 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Community Member</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                        <div className="flex gap-2">
                          {stats.publishedAds > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/5 dark:bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/10 dark:border-white/10 text-[9px] font-black uppercase tracking-wider">
                              Annex Provider
                            </div>
                          )}
                          {stats.registeredEvents > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/5 dark:bg-pink-500/20 text-pink-500 dark:text-pink-400 border border-pink-500/10 dark:border-white/10 text-[9px] font-black uppercase tracking-wider">
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
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                  {[
                    { label: 'Followers', value: stats.followers, icon: LuUser, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Following', value: stats.following, icon: LuActivity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'My Blogs', value: submittedBlogs.length, icon: LuMessageSquare, color: 'text-purple-500', bg: 'bg-purple-500/10', onClick: () => setShowBlogsModal(true) },
                    { label: 'Activity', value: `${stats.activityScore}%`, icon: LuActivity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'My Events', value: submittedEvents.length, icon: LuCalendar, color: 'text-pink-500', bg: 'bg-pink-500/10', onClick: () => setShowEventsModal(true) },
                    { label: 'Listings', value: stats.publishedAds, icon: LuLayoutGrid, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                    { label: 'Services', value: serviceRequests.length, icon: LuBriefcase, color: 'text-sky-500', bg: 'bg-sky-500/10', onClick: () => setShowServicesModal(true) },
                    { label: 'Points', value: stats.rewardPoints, icon: LuTrophy, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  ].map((stat, idx) => {
                    const CardElement = stat.onClick ? 'button' : 'div';
                    return (
                      <CardElement
                        key={idx}
                        type={stat.onClick ? 'button' : undefined}
                        onClick={stat.onClick}
                        className={`p-5 rounded-[2.5rem] bg-white/40 dark:bg-slate-800/35 border border-slate-100 dark:border-white/10 flex flex-col items-center justify-center text-center transition-all shadow-xs ${stat.onClick
                          ? 'hover:scale-105 hover:bg-white/60 dark:hover:bg-slate-800/50 cursor-pointer active:scale-95 outline-none hover:border-slate-200 dark:hover:border-white/20'
                          : ''
                          }`}
                      >
                        <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} mb-3`}>
                          <stat.icon size={20} />
                        </div>
                        <div className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1 tracking-tight">{stat.value}</div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-350">{stat.label}</div>
                      </CardElement>
                    );
                  })}
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
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">Forename</label>
                        <div className="relative flex items-center">
                          <div className={getIconClasses(isEditing, 'blue')}>
                            <LuUser className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={!isEditing}
                            className={getInputClasses(isEditing, 'blue')}
                          />
                        </div>
                      </div>
                      <div className="group space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">Surname</label>
                        <div className="relative flex items-center">
                          <div className={getIconClasses(isEditing, 'blue')}>
                            <LuUser className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!isEditing}
                            className={getInputClasses(isEditing, 'blue')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors">Contact Number</label>
                      <div className="relative flex items-center">
                        <div className={getIconClasses(isEditing, 'blue')}>
                          <LuPhone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={!isEditing}
                          className={getInputClasses(isEditing, 'blue')}
                        />
                      </div>
                    </div>

                    <div className="group space-y-3 opacity-90">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2">Digital Signature (Email)</label>
                      <div className="relative flex items-center">
                        <div className="absolute left-3 p-2 rounded-full bg-slate-500/5 text-slate-400 dark:text-slate-500">
                          <LuMail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          disabled={true}
                          className="w-full pl-14 pr-8 py-5 rounded-full bg-slate-100/30 dark:bg-slate-800/10 border border-slate-200/40 dark:border-white/5 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-not-allowed"
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
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-purple-500 dark:group-focus-within:text-purple-400 transition-colors">Alma Mater</label>
                      <div className="relative flex items-center">
                        <div className={getIconClasses(isEditing, 'purple')}>
                          <LuBuilding className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          disabled={!isEditing}
                          className={getInputClasses(isEditing, 'purple')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="group space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">Facebook ID</label>
                        <div className="relative flex items-center">
                          <div className={getIconClasses(isEditing, 'blue')}>
                            <LuFacebook className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={fbHandle}
                            placeholder="@username"
                            onChange={(e) => setFbHandle(e.target.value)}
                            disabled={!isEditing}
                            className={getInputClasses(isEditing, 'blue')}
                          />
                        </div>
                      </div>
                      <div className="group space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">LinkedIn Profile</label>
                        <div className="relative flex items-center">
                          <div className={getIconClasses(isEditing, 'indigo')}>
                            <LuLinkedin className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={linkedinHandle}
                            placeholder="profile-id"
                            onChange={(e) => setLinkedinHandle(e.target.value)}
                            disabled={!isEditing}
                            className={getInputClasses(isEditing, 'indigo')}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-400 ml-2 group-focus-within:text-red-500 dark:group-focus-within:text-red-400 transition-colors">Security Key</label>
                      <div className="relative flex items-center">
                        <div className={getIconClasses(isEditing, 'brand')}>
                          <LuLock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={!isEditing}
                          className={getInputClasses(isEditing, 'brand', true)}
                        />
                        {isEditing && (
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 text-slate-400 hover:text-red-500 transition-colors">
                            {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>

                {/* ── Minimalist Footer ──────────────────────────────────── */}
                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800/60 flex flex-col items-center gap-4">
                  <button type="button" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-blue-500 transition-colors">
                    Audit Logs <LuChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-[9px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                    Protected by UniGang Security Layer 2.0
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Backdrop-Blurred Services Tracker Modal */}
            <AnimatePresence>
              {showServicesModal && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setShowServicesModal(false);
                      setSelectedRequest(null);
                    }}
                    className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md"
                  />

                  <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="w-full max-w-2xl bg-white/95 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative pointer-events-auto overflow-hidden max-h-[85vh] flex flex-col"
                    >
                      <AnimatePresence mode="wait">
                        {!selectedRequest ? (
                          <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 block">Services Tracker</span>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Your Service Requests</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowServicesModal(false)}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                              {loadingRequests ? (
                                <div className="py-20 text-center text-slate-400 dark:text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs">
                                  Retrieving your requests...
                                </div>
                              ) : serviceRequests.length === 0 ? (
                                <div className="py-20 text-center bg-slate-500/5 border border-slate-200/10 dark:border-white/10 rounded-3xl">
                                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No service requests found</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-4">
                                  {serviceRequests.map((req) => (
                                    <div
                                      key={req.id}
                                      onClick={() => setSelectedRequest(req)}
                                      className="cursor-pointer p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/10 rounded-3xl hover:border-blue-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all duration-300 shadow-sm flex items-center justify-between gap-4 group"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${req.status === 'completed'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:border-white/10'
                                            : req.status === 'in_progress'
                                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 dark:border-white/10'
                                              : req.status === 'rejected'
                                                ? 'bg-red-500/10 text-red-400 border-red-500/20 dark:border-white/10'
                                                : req.status === 'approved'
                                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 dark:border-white/10'
                                                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20 dark:border-white/10'
                                            }`}>
                                            {req.status}
                                          </span>
                                          <span className="text-[10px] font-bold text-slate-400">{new Date(req.created_at || req.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-base font-black text-slate-800 dark:text-white tracking-tight group-hover:text-blue-500 transition-colors truncate">
                                          {req.serviceName}
                                        </h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1 leading-relaxed mt-1">{req.brief}</p>
                                      </div>
                                      <LuChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedRequest(null)}
                                  className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-600 mb-1 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  ← Back to list
                                </button>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-1">{selectedRequest.serviceName}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowServicesModal(false);
                                  setSelectedRequest(null);
                                }}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                              <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-2">Project Brief</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedRequest.brief}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Target Budget</p>
                                  <p className="text-sm font-black text-blue-500">{selectedRequest.budget || 'Open / Custom'}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Desired Launch</p>
                                  <p className="text-sm font-black text-slate-800 dark:text-white">{selectedRequest.deadline || 'Flexible'}</p>
                                </div>
                              </div>

                              {/* Dynamic Progress Stepper Timeline */}
                              <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4">Lifecycle Status Tracker</p>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative pl-4 sm:pl-0">
                                  {[
                                    { id: 'pending', label: 'Submitted', desc: 'Awaiting review' },
                                    { id: 'approved', label: 'Approved', desc: 'Planning phase' },
                                    { id: 'in_progress', label: 'In Progress', desc: 'Actively crafting' },
                                    { id: 'completed', label: 'Completed', desc: 'Ready & delivered' }
                                  ].map((step, idx, arr) => {
                                    const getStepIndex = (s: string) => {
                                      if (s === 'rejected') return 1;
                                      const stepsMap = ['pending', 'approved', 'in_progress', 'completed'];
                                      const pos = stepsMap.indexOf(s);
                                      return pos === -1 ? 0 : pos;
                                    };
                                    const currentIdx = getStepIndex(selectedRequest.status);
                                    const isDone = idx <= currentIdx;
                                    const isCurrent = idx === currentIdx;
                                    const isRejected = selectedRequest.status === 'rejected' && idx === 1;

                                    return (
                                      <div key={step.id} className="flex sm:flex-col items-start sm:items-center sm:text-center gap-3 sm:gap-2 flex-1 w-full relative z-10">
                                        {idx < arr.length - 1 && (
                                          <div className={`hidden sm:block absolute left-[calc(50%+14px)] top-[13px] w-[calc(100%-28px)] h-0.5 -z-10 ${
                                            idx < currentIdx ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                                          }`} />
                                        )}
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 border-2 ${
                                          isCurrent
                                            ? isRejected
                                              ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20'
                                              : 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                                            : isDone
                                              ? 'bg-emerald-500 border-emerald-500 text-white'
                                              : 'bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-400'
                                        }`}>
                                          {isRejected ? '✕' : isDone && !isCurrent ? '✓' : idx + 1}
                                        </div>
                                        <div className="text-left sm:text-center">
                                          <p className={`text-[10px] font-black uppercase tracking-wider ${isCurrent ? 'text-blue-600 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {isRejected ? 'Rejected' : step.label}
                                          </p>
                                          <p className="text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-0.5">
                                            {isRejected ? 'Inquiry declined' : step.desc}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {selectedRequest.adminNotes && (
                                <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 mb-2">Admin Remarks</p>
                                  <p className="text-xs text-slate-700 dark:text-amber-250 leading-relaxed font-semibold italic">"{selectedRequest.adminNotes}"</p>
                                </div>
                              )}

                              {/* On-Site Client-Admin Discussion Thread */}
                              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 flex flex-col h-[320px]">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-450 mb-3 ml-1 text-left">Project DNA Discussions</p>
                                
                                <div className="flex-1 overflow-y-auto pr-1 space-y-3 custom-scrollbar flex flex-col">
                                  {loadingMessages ? (
                                    <div className="my-auto text-center text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider animate-pulse">
                                      Synchronizing comments...
                                    </div>
                                  ) : messages.length === 0 ? (
                                    <div className="my-auto text-center text-slate-450 dark:text-slate-550 text-[10px] font-black uppercase tracking-wider">
                                      Thread initialized. Send details to start chat.
                                    </div>
                                  ) : (
                                    messages.map((msg) => {
                                      const isAdmin = msg.senderType === 'admin';
                                      return (
                                        <div
                                          key={msg.id}
                                          className={`flex flex-col max-w-[85%] ${isAdmin ? 'self-start items-start text-left' : 'self-end items-end text-right'}`}
                                        >
                                          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mb-0.5 px-1.5">
                                            {isAdmin ? 'Admin Helpdesk' : 'You'} • {new Date(msg.created_at || msg.createdAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                          </span>
                                          <div className={`p-3.5 rounded-2xl text-xs font-semibold leading-relaxed ${
                                            isAdmin 
                                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none' 
                                              : 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                                          }`}>
                                            {msg.message}
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>

                                <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Type your message here..."
                                    value={newMessageText}
                                    onChange={(e) => setNewMessageText(e.target.value)}
                                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  />
                                  <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-750 text-white p-3 rounded-xl transition-all shadow-xs flex items-center justify-center cursor-pointer"
                                    aria-label="Send"
                                  >
                                    <LuSend size={15} />
                                  </button>
                                </form>
                              </div>

                              <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-2">Registered Contact Connection</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-black text-slate-800 dark:text-white">{selectedRequest.clientPhone}</span>
                                  <a
                                    href={`https://wa.me/${selectedRequest.clientPhone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                  >
                                    Launch Chat
                                  </a>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>

            {/* Backdrop-Blurred Events Tracker Modal */}
            <AnimatePresence>
              {showEventsModal && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setShowEventsModal(false);
                      setSelectedEvent(null);
                    }}
                    className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md"
                  />

                  <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="w-full max-w-2xl bg-white/95 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative pointer-events-auto overflow-hidden max-h-[85vh] flex flex-col"
                    >
                      <AnimatePresence mode="wait">
                        {!selectedEvent ? (
                          <motion.div
                            key="events-list"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-pink-500 mb-1 block">Events Hub</span>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Your Event Submissions</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowEventsModal(false)}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                              {loadingEvents ? (
                                <div className="py-20 text-center text-slate-400 dark:text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs">
                                  Retrieving your events...
                                </div>
                              ) : submittedEvents.length === 0 ? (
                                <div className="py-20 text-center bg-slate-500/5 border border-slate-200/10 dark:border-white/10 rounded-3xl">
                                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">No event submissions found</p>
                                  <p className="text-[10px] text-slate-400 font-semibold">Share your first campus event to get started!</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-4">
                                  {submittedEvents.map((evt) => (
                                    <div
                                      key={evt.id}
                                      onClick={() => setSelectedEvent(evt)}
                                      className="cursor-pointer p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/10 rounded-3xl hover:border-pink-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all duration-300 shadow-sm flex items-center justify-between gap-4 group"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${evt.status === 'approved'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:border-white/10'
                                            : evt.status === 'rejected'
                                              ? 'bg-red-500/10 text-red-400 border-red-500/20 dark:border-white/10'
                                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 dark:border-white/10'
                                            }`}>
                                            {evt.status}
                                          </span>
                                          <span className="text-[10px] font-bold text-slate-400">{new Date(evt.date).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-base font-black text-slate-800 dark:text-white tracking-tight group-hover:text-pink-500 transition-colors truncate">
                                          {evt.title}
                                        </h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1 leading-relaxed mt-1">{evt.description}</p>
                                      </div>
                                      <LuChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="event-detail"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedEvent(null)}
                                  className="text-[10px] font-black uppercase tracking-widest text-pink-500 hover:text-pink-600 mb-1 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  ← Back to list
                                </button>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-1">{selectedEvent.title}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowEventsModal(false);
                                  setSelectedEvent(null);
                                }}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                              {/* Event Flyer Banner */}
                              <div className="relative h-48 rounded-3xl overflow-hidden border border-slate-200/30 dark:border-white/10 bg-slate-900">
                                <img
                                  src={selectedEvent.image ? (selectedEvent.image.startsWith('http') ? selectedEvent.image : `http://localhost:5001${selectedEvent.image}`) : 'https://images.unsplash.com/photo-1540575861501-7ad058ad37fa?q=80&w=800'}
                                  alt={selectedEvent.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${selectedEvent.status === 'approved'
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : selectedEvent.status === 'rejected'
                                      ? 'bg-red-500 border-red-500 text-white'
                                      : 'bg-amber-500 border-amber-500 text-white'
                                    }`}>
                                    {selectedEvent.status}
                                  </span>
                                </div>
                              </div>

                              <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-2">Event Description</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{selectedEvent.description}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Alma Mater / University</p>
                                  <p className="text-sm font-black text-slate-800 dark:text-white">{selectedEvent.uni}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Ticket Price</p>
                                  <p className="text-sm font-black text-pink-500">{selectedEvent.price || 'Free / TBA'}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Date & Time</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-white">{new Date(selectedEvent.date).toLocaleDateString()} {selectedEvent.time ? `at ${selectedEvent.time}` : ''}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Venue Location</p>
                                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{selectedEvent.location}</p>
                                </div>
                              </div>

                              {(selectedEvent.requirements || selectedEvent.extra) && (
                                <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10 space-y-4">
                                  {selectedEvent.requirements && (
                                    <div>
                                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Prerequisites / Requirements</p>
                                      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">{selectedEvent.requirements}</p>
                                    </div>
                                  )}
                                  {selectedEvent.extra && (
                                    <div>
                                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-1">Additional Notes</p>
                                      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold italic">"{selectedEvent.extra}"</p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Self-Deletion Action */}
                              <div className="p-5 rounded-2xl bg-red-500/5 dark:bg-red-950/10 border border-red-500/10 dark:border-red-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-center sm:text-left">
                                  <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-1">Remove Event Proposal</p>
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-normal">This will permanently delete your submission and take down any listings.</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                                  className="w-full sm:w-auto px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-red-500/10 active:scale-95 border-none"
                                >
                                  <LuTrash2 size={14} /> Delete Concept
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
            {/* Backdrop-Blurred Blogs Tracker Modal */}
            <AnimatePresence>
              {showBlogsModal && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      setShowBlogsModal(false);
                      setSelectedBlog(null);
                    }}
                    className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md"
                  />

                  <div className="fixed inset-0 z-[101] overflow-y-auto pointer-events-none flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="w-full max-w-2xl bg-white/95 dark:bg-slate-950/98 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative pointer-events-auto overflow-hidden max-h-[85vh] flex flex-col"
                    >
                      <AnimatePresence mode="wait">
                        {!selectedBlog ? (
                          <motion.div
                            key="list"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-1 block">Content Hub</span>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Your Published Blogs</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => setShowBlogsModal(false)}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                              {loadingBlogs ? (
                                <div className="py-20 text-center text-slate-400 dark:text-slate-500 animate-pulse font-black uppercase tracking-widest text-xs">
                                  Retrieving your blogs...
                                </div>
                              ) : submittedBlogs.length === 0 ? (
                                <div className="py-20 text-center bg-slate-500/5 border border-slate-200/10 dark:border-white/10 rounded-3xl">
                                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No blogs found</p>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 gap-4">
                                  {submittedBlogs.map((blog) => (
                                    <div
                                      key={blog.id}
                                      onClick={() => setSelectedBlog(blog)}
                                      className="cursor-pointer p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/10 rounded-3xl hover:border-purple-500/30 hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-all duration-300 shadow-sm flex items-center justify-between gap-4 group"
                                    >
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${blog.status === 'Approved'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 dark:border-white/10'
                                            : blog.status === 'Rejected'
                                              ? 'bg-red-500/10 text-red-400 border-red-500/20 dark:border-white/10'
                                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 dark:border-white/10'
                                            }`}>
                                            {blog.status}
                                          </span>
                                          <span className="text-[10px] font-bold text-slate-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h4 className="text-base font-black text-slate-800 dark:text-white tracking-tight group-hover:text-purple-500 transition-colors truncate">
                                          {blog.title}
                                        </h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1 leading-relaxed mt-1">{blog.excerpt}</p>
                                        <div className="flex gap-4 mt-3">
                                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><LuEye size={12} /> {blog.views || 0}</div>
                                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><LuMessageSquare size={12} /> {blog.commentsCount || 0}</div>
                                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400"><LuActivity size={12} /> {blog.likes || 0}</div>
                                        </div>
                                      </div>
                                      <LuChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col h-full overflow-hidden"
                          >
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedBlog(null)}
                                  className="text-[10px] font-black uppercase tracking-widest text-purple-500 hover:text-purple-600 mb-1 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  ← Back to list
                                </button>
                                <h3 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-1 leading-tight">{selectedBlog.title}</h3>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowBlogsModal(false);
                                  setSelectedBlog(null);
                                }}
                                className="p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
                              >
                                <LuX size={18} />
                              </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                              <div className="relative rounded-2xl overflow-hidden shadow-inner max-h-[250px] bg-slate-900 border border-slate-200/10 dark:border-white/10">
                                {selectedBlog.featuredImage ? (
                                  <img src={selectedBlog.featuredImage} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-32 bg-slate-800 flex items-center justify-center">
                                    <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">No Image</span>
                                  </div>
                                )}
                              </div>

                              <div className="p-5 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10">
                                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-2">Excerpt</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">"{selectedBlog.excerpt}"</p>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
                                  <LuEye size={20} className="text-blue-500 mb-2" />
                                  <p className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">{selectedBlog.views || 0}</p>
                                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Views</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
                                  <LuActivity size={20} className="text-pink-500 mb-2" />
                                  <p className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">{selectedBlog.likes || 0}</p>
                                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Likes</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-500/5 dark:bg-slate-900/30 border border-slate-200/10 dark:border-white/10 flex flex-col items-center justify-center text-center">
                                  <LuMessageSquare size={20} className="text-purple-500 mb-2" />
                                  <p className="text-xl font-black text-slate-800 dark:text-white leading-none mb-1">{selectedBlog.commentsCount || 0}</p>
                                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Comments</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
