import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoImage.jpg';


import { LuMenu, LuX, LuUser, LuLogOut, LuLayoutDashboard, LuSun, LuMoon } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';
import { dispatchAuthUpdate, listenToAuthUpdate } from '../utils/authEvents';
import toast from 'react-hot-toast';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check Login Status
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('userToken');
      const storedUserName = localStorage.getItem('userName');
      const storedProfilePic = localStorage.getItem('userProfilePicture');

      setIsLoggedIn(!!token);
      setUserName(storedUserName);
      setUserProfilePic(storedProfilePic);
    };

    checkLoginStatus();

    // Listen for custom auth events (same tab)
    const cleanup = listenToAuthUpdate(checkLoginStatus);

    // Also listen for storage events (cross tab)
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      cleanup();
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfilePicture');
    setIsLoggedIn(false);
    setUserName(null);
    setUserProfilePic(null);
    setIsProfileDropdownOpen(false);
    dispatchAuthUpdate();
    toast.success('Logged out successfully');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Annex', path: '/find-accommodation' },
    { name: 'Advertisement', path: '/post-ad' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-full border-2 border-brand-500 p-0.5 transition-transform duration-300 group-hover:scale-105">
            <img src={logo} alt="The Uni Gang" className="w-9 h-9 rounded-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            The <span className="text-brand-600">Uni Gang</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/20 dark:border-white/10 shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-white/80 dark:hover:bg-slate-700/80'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Profile / Auth */}
        <div className="hidden md:flex items-center gap-4" ref={dropdownRef}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
          </button>
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none transition-opacity hover:opacity-80"
              >
                <div className="text-right hidden lg:block">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Welcome,</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">{userName}</p>
                </div>
                {userProfilePic ? (
                  <img src={userProfilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-brand-100 object-cover shadow-sm" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center border-2 border-brand-100">
                    <LuUser className="w-5 h-5" />
                  </div>
                )}
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 transform transition-all duration-200 origin-top-right ${isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 mb-1">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{userName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Member</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <LuUser className="w-4 h-4" /> Profile
                </Link>
                <Link
                  to="/post-ad?tab=myAds"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <LuLayoutDashboard className="w-4 h-4" /> My Ads
                </Link>
                <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
                >
                  <LuLogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/post-ad"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
            >
              Sign In <LuUser className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-800 dark:text-white focus:outline-none p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <LuX className="w-7 h-7" /> : <LuMenu className="w-7 h-7" />}
        </button>

        {/* Mobile Navigation Overlay */}
        {/* Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } md:hidden`}
        >
          {/* Theme Toggle (Mobile) */}
          <button
            onClick={toggleTheme}
            className="absolute top-6 right-6 p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <LuSun className="w-6 h-6" /> : <LuMoon className="w-6 h-6" />}
          </button>

          {/* Mobile Links */}
          <div className="flex flex-col items-center space-y-6 w-full px-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-2xl font-medium text-slate-800 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="w-24 h-1 bg-slate-100 dark:bg-slate-800 rounded-full my-4"></div>

            {isLoggedIn ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl w-full justify-center">
                  {userProfilePic ? (
                    <img src={userProfilePic} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <LuUser className="w-8 h-8 text-slate-400" />
                  )}
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{userName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Logged In</p>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-slate-600 dark:text-slate-300 font-medium">Profile</Link>
                <Link to="/post-ad?tab=myAds" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 text-slate-600 dark:text-slate-300 font-medium">My Ads</Link>
                <button onClick={handleLogout} className="text-red-500 font-medium mt-4">Log Out</button>
              </div>
            ) : (
              <Link
                to="/post-ad"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-brand-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-brand-200 flex items-center justify-center gap-2"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
