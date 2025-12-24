import React, { useState, useEffect, useRef } from 'react';
import { LuUser, LuMail, LuPhone, LuBuilding, LuLock, LuCamera, LuPencil, LuSave, LuX, LuEye, LuEyeOff } from 'react-icons/lu';
import SEO from '../components/SEO';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [university, setUniversity] = useState<string>('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName') || 'John';
    const storedLastName = localStorage.getItem('userLastName') || 'Doe';
    const storedEmail = localStorage.getItem('userEmail') || 'john.doe@example.com';
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber') || '0712345678';
    const storedUniversity = localStorage.getItem('userUniversity') || '';
    const storedPassword = localStorage.getItem('userPassword') || 'dummy_password';
    const storedProfilePic = localStorage.getItem('userProfilePicture');

    setFirstName(storedFirstName);
    setLastName(storedLastName);
    setEmail(storedEmail);
    setPhoneNumber(storedPhoneNumber);
    setUniversity(storedUniversity);
    setPassword(storedPassword);
    setProfilePicture(storedProfilePic);
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

    if (profilePicture) {
      localStorage.setItem('userProfilePicture', profilePicture);
    } else {
      localStorage.removeItem('userProfilePicture');
    }

    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEO title="My Profile - The Uni Gang" />
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-700 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-brand-600 to-indigo-600"></div>

        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end md:items-end justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <LuUser className="w-full h-full p-6 text-slate-300" />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2.5 bg-slate-900 dark:bg-slate-600 text-white rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors"
                  >
                    <LuCamera className="w-5 h-5" />
                  </button>
                )}
                <input type="file" ref={fileInputRef} onChange={handleProfilePictureChange} className="hidden" accept="image/*" />
              </div>
              <div className="mt-3 text-center md:text-left">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{firstName} {lastName}</h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Student / Member</p>
              </div>
            </div>

            <div className="flex-shrink-0 mb-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl shadow-lg hover:bg-slate-800 dark:hover:bg-white transition-all"
                >
                  <LuPencil className="w-4 h-4" /> Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                  >
                    <LuX className="w-4 h-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg hover:bg-brand-700 transition-all"
                  >
                    <LuSave className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-8 mt-10">
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-100 dark:border-slate-700">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <div className="relative">
                    <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-white' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-300'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <div className="relative">
                    <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-white' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-300'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      disabled={true} // Email usually not editable directly
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                  <div className="relative">
                    <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-white' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-300'}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic & Security */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-5 pb-2 border-b border-slate-100 dark:border-slate-700">Academic & Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">University / Institute</label>
                  <div className="relative">
                    <LuBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g. University of Colombo"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-white' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-300'}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                  <div className="relative">
                    <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-12 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-white' : 'bg-slate-50 dark:bg-slate-700/50 border-transparent text-slate-600 dark:text-slate-300'}`}
                    />
                    {isEditing && (
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <LuEyeOff /> : <LuEye />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
