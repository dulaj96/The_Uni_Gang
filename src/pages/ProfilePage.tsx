import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [university, setUniversity] = useState<string>('');
  const [password, setPassword] = useState(''); // Dummy password for now
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null); // File input එකට reference එකක්

  // Dummy User Data Load instead getting data from BE
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
        e.target.value = ''; // Clear file input to allow re-uploading same file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null);
    localStorage.removeItem('userProfilePicture');
    alert('Profile picture removed!');
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // update user data using BE API calls
    console.log('Saving profile data:', {
      firstName,
      lastName,
      email,
      phoneNumber,
      university,
      password,
      profilePicture // Current profile picture (base64)
    });

    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhoneNumber', phoneNumber);
    localStorage.setItem('userUniversity', university);
    localStorage.setItem('userPassword', password); // Dummy save
    if (profilePicture) {
      localStorage.setItem('userProfilePicture', profilePicture);
    } else {
      localStorage.removeItem('userProfilePicture');
    }

    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -py-5">
      <div className="bg-gray-200 shadow-lg rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 border border-gray-300">
        {/* Profile Picture Section (Left) */}
        <div className="flex flex-col items-center justify-center md:w-1/3 mt-20">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-4 border-red-500 shadow-md">
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUserCircle className="w-24 h-24 md:w-32 md:h-32 text-gray-400" />
            )}
          </div>
          {isEditing && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureChange}
                className="hidden"
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 py-2 px-4 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Profile Picture
              </button>
              {profilePicture && (
                <button
                  type='button'
                  onClick={handleRemoveProfilePicture}
                  className='mt-3 py-2 px-4 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  Remove Photo
                </button>
              )}
            </>
          )}
        </div>

        {/* User Details Section (Right) */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-8 hidden md:block">My Profile</h2> {/* Desktop title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left md:hidden">My Profile</h2> {/* Mobile title */}
          <form onSubmit={handleSave} className="space-y-4">

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            {/* Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white">
                  {email}
                </div>
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            {/* University (Optional) - Now a simple text input */}
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">University (Optional)</label>
              <input
                type="text"
                id="university"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 bg-white"
                value={university || ''}
                onChange={(e) => setUniversity(e.target.value)}
                disabled={!isEditing}
              />
            </div>

            {/* Password Management */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm p-2 pr-10 bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditing}
                  required
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                )}
              </div>
              {isEditing && <p className="mt-1 text-xs text-gray-500">Click to change password (not fully implemented)</p>}
            </div>

            {/* Edit/Save Buttons */}
            <div className="pt-5 flex justify-end space-x-3">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)} // Cancel editing
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
