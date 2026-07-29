import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { LuUser, LuMail, LuLock, LuArrowRight } from 'react-icons/lu';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../../firebase';
import { dispatchAuthUpdate } from '../../utils/authEvents';
import toast from 'react-hot-toast';
import PremiumPageLoader from '../ui/PremiumPageLoader';
import { celebrate } from '../../utils/celebrate';

interface AuthCardProps {
    onAuthSuccess: () => void;
}

const GoogleSignInButton = ({ onSuccess, onFailure, setLoading }: { 
    onSuccess: (userData: any, token: string) => void, 
    onFailure: (error?: any) => void,
    setLoading: (loading: boolean) => void
}) => {
    const handleGoogleClick = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const token = await userCredential.user.getIdToken(true);

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
                name: userCredential.user.displayName || 'Google User',
                email: userCredential.user.email || '',
                profile_pic: userCredential.user.photoURL || ''
            };
            onSuccess(syncedUser, token);
        } catch (error) {
            console.error('Google Auth Error:', error);
            onFailure(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleClick}
            type="button"
            className="w-full bg-white dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-black py-4 rounded-2xl shadow-xl shadow-slate-200/5 dark:shadow-slate-950/20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-[10px]"
        >
            <FcGoogle className="text-xl group-hover:scale-110 transition-transform duration-300" />
            <span>Continue with Google</span>
        </motion.button>
    );
};

const AuthCard: React.FC<AuthCardProps> = ({ onAuthSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authName, setAuthName] = useState('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, authEmail, authPassword);
            const token = await userCredential.user.getIdToken(true);

            // Sync/Verify with backend
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/users/sync`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            });
            const data = await res.json();
            const syncedUser = data.user || {
                name: userCredential.user.displayName || authName || 'Student',
                email: authEmail,
                profile_pic: userCredential.user.photoURL || ''
            };

            localStorage.setItem('userToken', token);
            localStorage.setItem('userName', syncedUser.name || 'Student');
            localStorage.setItem('userEmail', authEmail);
            if (syncedUser.profile_pic) {
                localStorage.setItem('userProfilePicture', syncedUser.profile_pic);
            }
            dispatchAuthUpdate();
            onAuthSuccess();
            toast.success('Welcome back!');
            celebrate();
        } catch (error: any) {
            console.error('Login Error:', error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                setMessage({ text: 'Invalid email or password. Please try again.', type: 'error' });
            } else if (error.code === 'auth/invalid-email') {
                setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            } else {
                setMessage({ text: error.message || 'Login failed. Please try again.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword);
            if (authName) {
                await updateProfile(userCredential.user, { displayName: authName });
            }
            const token = await userCredential.user.getIdToken(true);

            // Sync with backend so MySQL profile is created immediately
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/users/sync`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            });
            const data = await res.json();
            const syncedUser = data.user || {
                name: authName || 'Student',
                email: authEmail,
                profile_pic: ''
            };

            localStorage.setItem('userToken', token);
            localStorage.setItem('userName', syncedUser.name || authName || 'Student');
            localStorage.setItem('userEmail', authEmail);
            dispatchAuthUpdate();
            onAuthSuccess();
            toast.success('Account created successfully!');
            celebrate();
        } catch (error: any) {
            console.error('Register Error:', error);
            if (error.code === 'auth/email-already-in-use') {
                setMessage({ text: 'An account with this email already exists.', type: 'error' });
            } else if (error.code === 'auth/weak-password') {
                setMessage({ text: 'Security Key must be at least 6 characters long.', type: 'error' });
            } else {
                setMessage({ text: error.message || 'Registration failed. Please check your details.', type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = (userData: any, token: string) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userName', userData.name || 'Google User');
        localStorage.setItem('userEmail', userData.email || '');
        if (userData.profile_pic) {
            localStorage.setItem('userProfilePicture', userData.profile_pic);
        }
        dispatchAuthUpdate();
        onAuthSuccess();
        toast.success(`Welcome back, ${userData.name || 'Student'}!`);
        celebrate();
    };

    const handleGoogleFailure = () => {
        setMessage({ text: 'Google Login Failed or Cancelled. Please Try Again.', type: 'error' });
    };

    return (
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-w-md w-full border border-white/20 dark:border-slate-800 relative mx-auto">
            <PremiumPageLoader isLoading={loading} message={isRegistering ? "Creating your account..." : "Securing access..."} />
            
            <div className="p-10 pb-8">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20"
                    >
                        <LuLock className="text-2xl text-white" />
                    </motion.div>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter uppercase">
                        {isRegistering ? 'Join Us' : 'Welcome'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest text-[10px]">
                        {isRegistering ? 'The future of campus life' : 'Sign in to your portal'}
                    </p>
                </div>

                {message && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl mb-8 text-xs font-black uppercase tracking-widest text-center ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}
                    >
                        {message.text}
                    </motion.div>
                )}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-5">
                    {isRegistering && (
                        <div className="relative group">
                            <LuUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="text"
                                className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 dark:text-white font-bold placeholder:text-slate-400"
                                placeholder="Display Name"
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="relative group">
                        <LuMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="email"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 dark:text-white font-bold placeholder:text-slate-400"
                            placeholder="Email Address"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative group">
                        <LuLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="password"
                            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 dark:text-white font-bold placeholder:text-slate-400"
                            placeholder="Security Key"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            required
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 group uppercase tracking-widest text-xs"
                    >
                        {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Sign In')}
                        {!loading && <LuArrowRight className="group-hover:translate-x-1 transition-transform" />}
                    </motion.button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-black">
                        <span className="px-6 bg-white dark:bg-[#0f172a] text-slate-400">Security Gate</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <GoogleSignInButton
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        setLoading={setLoading}
                    />
                </div>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-900/40 p-6 text-center border-t border-white/20 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                    {isRegistering ? 'Already a member?' : "New to the gang?"}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="ml-2 font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest text-[10px]"
                    >
                        {isRegistering ? 'Sign In' : 'Join Now'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthCard;
