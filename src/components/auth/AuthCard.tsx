import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { LuUser, LuMail, LuLock, LuArrowRight } from 'react-icons/lu';
import { dispatchAuthUpdate } from '../../utils/authEvents';
import toast from 'react-hot-toast';
import PremiumPageLoader from '../ui/PremiumPageLoader';

interface AuthCardProps {
    onAuthSuccess: () => void;
}

const GOOGLE_CLIENT_ID = '750632401016-kr68r15hln088k0mt7nrshlnc0nrn1t5.apps.googleusercontent.com';

const GoogleSignInButton = ({ onSuccess, onFailure, setLoading }: { 
    onSuccess: (userData: any, token: string) => void, 
    onFailure: () => void,
    setLoading: (loading: boolean) => void
}) => {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const userInfo = await res.json();
                onSuccess(userInfo, tokenResponse.access_token);
            } catch (error) {
                console.error('Google Auth Error:', error);
                onFailure();
            } finally {
                setLoading(false);
            }
        },
        onError: onFailure,
    });

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => login()}
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

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating login
        setTimeout(() => {
            localStorage.setItem('userToken', 'dummy_token');
            localStorage.setItem('userName', 'TestUser');
            dispatchAuthUpdate();
            onAuthSuccess();
            setLoading(false);
            toast.success('Welcome back!');
        }, 400);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating registration
        setTimeout(() => {
            localStorage.setItem('userToken', 'dummy_token');
            localStorage.setItem('userName', authName || 'NewUser');
            dispatchAuthUpdate();
            onAuthSuccess();
            setLoading(false);
            toast.success('Account created successfully!');
        }, 400);
    };

    const handleGoogleSuccess = (userData: any, token: string) => {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userProfilePicture', userData.picture);
        localStorage.setItem('userFirstName', userData.given_name);
        localStorage.setItem('userLastName', userData.family_name);
        localStorage.setItem('userEmail', userData.email);
        dispatchAuthUpdate();
        onAuthSuccess();
        toast.success(`Welcome back, ${userData.name}!`);
    };

    const handleGoogleFailure = () => {
        setMessage({ text: 'Google Login Failed. Please Try Again.', type: 'error' });
    };

    return (
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-w-md w-full border border-white/20 dark:border-slate-800 relative">
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
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleSignInButton
                            onSuccess={handleGoogleSuccess}
                            onFailure={handleGoogleFailure}
                            setLoading={setLoading}
                        />
                    </GoogleOAuthProvider>
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
