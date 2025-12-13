import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { LuUser, LuMail, LuLock, LuArrowRight } from 'react-icons/lu';

interface AuthCardProps {
    onAuthSuccess: () => void;
}

const GOOGLE_CLIENT_ID = '750632401016-kr68r15hln088k0mt7nrshlnc0nrn1t5.apps.googleusercontent.com';

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
            onAuthSuccess();
            setLoading(false);
        }, 1000);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating registration
        setTimeout(() => {
            localStorage.setItem('userToken', 'dummy_token');
            localStorage.setItem('userName', authName || 'NewUser');
            onAuthSuccess();
            setLoading(false);
        }, 1000);
    };

    const handleGoogleSuccess = (response: any) => {
        setLoading(true);
        try {
            const credentialResponse = response;
            const decodedUser: any = jwtDecode(credentialResponse.credential);
            localStorage.setItem('userToken', credentialResponse.credential);
            localStorage.setItem('userName', decodedUser.name);
            localStorage.setItem('userProfilePicture', decodedUser.picture);
            localStorage.setItem('userFirstName', decodedUser.given_name);
            localStorage.setItem('userLastName', decodedUser.family_name);
            localStorage.setItem('userEmail', decodedUser.email);
            onAuthSuccess();
        } catch (error) {
            console.error('Login Failed', error);
            setMessage({ text: 'Login Failed. Please Try Again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleFailure = () => {
        setMessage({ text: 'Google Login Failed. Please Try Again.', type: 'error' });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden max-w-md w-full border border-slate-100 dark:border-slate-700">
            <div className="p-8 pb-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isRegistering ? 'Join The Uni Gang today' : 'Please sign in to continue'}
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                    {isRegistering && (
                        <div className="relative">
                            <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 dark:text-white"
                                placeholder="Full Name"
                                value={authName}
                                onChange={(e) => setAuthName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="relative">
                        <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="email"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 dark:text-white"
                            placeholder="Email Address"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="password"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-slate-800 dark:text-white"
                            placeholder="Password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                    >
                        {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Sign In')}
                        {!loading && <LuArrowRight className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-wider">
                        <span className="px-4 bg-white dark:bg-slate-800 text-slate-400">Or continue with</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            width="100%"
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 text-center border-t border-slate-100 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="ml-2 font-bold text-brand-600 hover:text-brand-700"
                    >
                        {isRegistering ? 'Log In' : 'Register now'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthCard;
