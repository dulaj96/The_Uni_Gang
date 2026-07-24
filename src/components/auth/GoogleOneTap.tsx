import React, { useEffect, useState } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';
import { dispatchAuthUpdate } from '../../utils/authEvents';
import toast from 'react-hot-toast';
import { celebrate } from '../../utils/celebrate';

const GoogleOneTap: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userToken'));

    useEffect(() => {
        const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem('userToken'));
        window.addEventListener('auth-update', handleAuthChange);
        return () => window.removeEventListener('auth-update', handleAuthChange);
    }, []);

    useGoogleOneTapLogin({
        disabled: isLoggedIn,
        onSuccess: async (credentialResponse) => {
            if (!credentialResponse.credential) return;
            try {
                const credential = GoogleAuthProvider.credential(credentialResponse.credential);
                const result = await signInWithCredential(auth, credential);
                const token = await result.user.getIdToken(true);

                // Sync with backend database
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/users/sync`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                });
                
                const data = await res.json();
                const syncedUser = data.user || {
                    name: result.user.displayName || 'Google User',
                    email: result.user.email || '',
                    profile_pic: result.user.photoURL || ''
                };

                // Save session in local storage
                localStorage.setItem('userToken', token);
                localStorage.setItem('userName', syncedUser.name || 'Student');
                localStorage.setItem('userEmail', syncedUser.email || '');
                if (syncedUser.profile_pic) {
                    localStorage.setItem('userProfilePicture', syncedUser.profile_pic);
                }
                
                dispatchAuthUpdate();
                toast.success(`Welcome back, ${syncedUser.name || 'Student'}!`);
                celebrate();
                
            } catch (error) {
                console.error('Google One Tap Error:', error);
                toast.error('Google Login Failed. Please try again.');
            }
        },
        onError: () => {
            console.log('Google One Tap Failed or Cancelled');
        },
    });

    return null; // This component doesn't render any visible UI directly on its own
};

export default GoogleOneTap;
