import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logoImage.jpg';


import { LuMenu, LuX, LuUser, LuLogOut, LuLayoutDashboard, LuSun, LuMoon, LuBell, LuDownload } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';
import { dispatchAuthUpdate, listenToAuthUpdate } from '../utils/authEvents';
import toast from 'react-hot-toast';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  // const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for ScrollSpy
  useEffect(() => {
    const sectionIds = ['home', 'annex', 'services', 'events', 'stats', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // More balanced for better section detection
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, []);

  // Smooth Scroll Handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    const hash = path.split('#')[1];
    if (location.pathname === '/' && hash) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        const offset = 90; // Slightly more offset for a cleaner top-padding look
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        setIsMobileMenuOpen(false);
        // Update URL hash without jumping
        window.history.pushState(null, '', `#${hash}`);
      }
    }
  };

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
    { name: 'Home', path: '/#home', id: 'home' },
    { name: 'Annex', path: '/#annex', id: 'annex' },
    { name: 'Services', path: '/#services', id: 'services' },
    { name: 'Events', path: '/#events', id: 'events' },
    { name: 'Stats', path: '/#stats', id: 'stats' },
    { name: 'Contact', path: '/#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 py-2'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-full border-2 border-blue-500 p-0.5 transition-transform duration-300 group-hover:scale-105">
            <img src={logo} alt="The Uni Gang" className="w-9 h-9 rounded-full object-cover" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            The <span className="text-blue-600">Uni Gang</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/30 dark:bg-slate-800/30 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/20 dark:border-slate-700/30 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <motion.a
                key={link.id}
                href={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${isActive
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-500/40 -z-10"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                {link.name}
              </motion.a>
            );
          })}
        </nav>

        {/* Desktop Profile / Auth / Actions */}
        <div className="hidden md:flex items-center gap-3" ref={dropdownRef}>
          {/* Notification Icon */}
          <button className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors relative">
            <LuBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {theme === 'dark' ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none transition-all hover:bg-slate-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-100"
              >
                {userProfilePic ? (
                  <img src={userProfilePic} alt="Profile" className="w-9 h-9 rounded-full border border-slate-200 object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200">
                    <LuUser className="w-5 h-5" />
                  </div>
                )}
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{userName}</p>
                </div>
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 transform transition-all duration-200 origin-top-right ${isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
              >
                <div className="px-4 py-3 border-b border-slate-100 mb-1">
                  <p className="text-sm font-semibold text-slate-800">{userName}</p>
                  <p className="text-xs text-slate-500">Student Profile</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <LuUser className="w-4 h-4" /> Profile
                </Link>
                <Link
                  to="/post-ad?tab=myAds"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  <LuLayoutDashboard className="w-4 h-4" /> My Ads
                </Link>
                <div className="h-px bg-slate-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                >
                  <LuLogOut className="w-4 h-4" /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/post-ad"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/20"
            >
              Sign In
            </Link>
          )}

          {/* Download App Button */}
          <Link
            to="/download"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all shadow-sm hover:shadow-md"
          >
            Download App <LuDownload className="w-4 h-4" />
          </Link>
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden"
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
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.path}
                      onClick={(e) => scrollToSection(e, link.path)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative text-2xl font-bold transition-all duration-300 ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-800 dark:text-white'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileActive"
                          className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-8 bg-blue-600 rounded-full"
                        />
                      )}
                      {link.name}
                    </motion.a>
                  );
                })}

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
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
