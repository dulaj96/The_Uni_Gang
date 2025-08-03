import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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
        console.log('Logging in with:', authEmail, authPassword);
        setMessage({ text: 'Login functionality not implemented yet. Simulating login.', type: 'error' });
        // backend API call 
        // if success: localStorage.setItem('userToken', 'your_token_here'); onAuthSuccess();
        alert('Login functionality not implemented yet. Simulating login.');
        localStorage.setItem('userToken', 'dummy_token');
        localStorage.setItem('userName', 'TestUser');
        onAuthSuccess();
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Registering with:', authName, authEmail, authPassword);
        setMessage({ text: 'Registration functionality not implemented yet. Simulating registration.', type: 'error' });
        // backend API call
        // if success: localStorage.setItem('userToken', 'your_token_here'); onAuthSuccess();
        alert('Registration functionality not implemented yet. Simulating registration.');
        localStorage.setItem('userToken', 'dummy_token');
        localStorage.setItem('userName', authName || 'NewUser');
        onAuthSuccess();
    };

    const handleGoogleSuccess = (response: any) => {
        setLoading(true);
        setMessage(null);
        try {
            console.log('Google Login Response:', response);
            const credentialResponse = response;

            // get user's details decode the id_token 
            const decodedUser: any = jwtDecode(credentialResponse.credential);

            console.log('Decoded User Info:', decodedUser);

            localStorage.setItem('userToken', credentialResponse.credential);
            localStorage.setItem('userName', decodedUser.name);
            localStorage.setItem('userProfilePicture', decodedUser.picture);
            localStorage.setItem('userFirstName', decodedUser.given_name);
            localStorage.setItem('userLastName', decodedUser.family_name);
            localStorage.setItem('userEmail', decodedUser.email);

            setMessage({ text: 'Goodle Login Successful!', type: 'success' });
            onAuthSuccess();
        } catch (error) {
            console.log('Login Failed', error);
            setMessage({ text: 'Login Failed. Please Try Again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleFailure = () => {
        console.error('Google Login Failed');
        setMessage({ text: 'Google Login Failed. Please Try Again.', type: 'error' });
        setLoading(false);
    };

    return (
        <div className="bg-gray-800 shadow rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
                {isRegistering ? 'Register to Post an Ad' : 'Log In to Post an Ad'}
            </h2>
            {/* Status Message Box */}
            {message && (
                <div className={`p-3 rounded-md mb-4 text-sm ${message.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
                {isRegistering && (
                    <div>
                        <label htmlFor="authName" className="sr-only">Name</label>
                        <input
                            type="text"
                            id="authName"
                            className="p-3 block w-full border border-gray-300 placeholder-white text-white rounded-md focus:ring-red-500 focus:border-red-500"
                            placeholder="Your Name"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="authEmail" className="sr-only">Email</label>
                    <input
                        type="email"
                        id="authEmail"
                        className="p-3 block w-full border border-gray-300 placeholder-white text-white rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="Email Address"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="authPassword" className="sr-only">Password</label>
                    <input
                        type="password"
                        id="authPassword"
                        className="p-3 block w-full border border-gray-300 placeholder-white text-white rounded-md focus:ring-red-500 focus:border-red-500"
                        placeholder="Password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    {isRegistering ? 'Register' : 'Log In'}
                </button>
            </form>

            <div className="mt-4 text-sm text-white">
                {isRegistering ? (
                    <p>Already have an account? <button onClick={() => setIsRegistering(false)} className="text-red-500 hover:underline font-semibold">Log In</button></p>
                ) : (
                    <p>Don't have an account? <button onClick={() => setIsRegistering(true)} className="text-red-500 hover:underline font-semibold">Register</button></p>
                )}
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-200">Or</span>
                </div>
            </div>

            <div className="w-full flex justify-center ">
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <div style={{ pointerEvents: loading ? 'none' : 'auto' }}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}

                        />
                    </div>
                </GoogleOAuthProvider>
            </div>
        </div>
    );
};

export default AuthCard;
