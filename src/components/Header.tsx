import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoImage.jpg';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userProfilePic, setUserProfilePic] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('userToken');
      const storedUserName = localStorage.getItem('userName');
      const storedProfilePic = localStorage.getItem('userProfilePicture');

      setIsLoggedIn(!!token); // Convert token presence to boolean
      setUserName(storedUserName);
      setUserProfilePic(storedProfilePic);
    };

    checkLoginStatus(); // Initial check

    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page on route change
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfilePicture');

    setIsLoggedIn(false);
    setUserName(null);
    setIsProfileDropdownOpen(false);
    setUserProfilePic(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false); // 3. Close dropdown if click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between px-4 relative">
        <div className="flex items-center">
          {/* Circular Logo */}
          <div className="mr-2">
            <img src={logo} alt="The Uni Gang Logo" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          </div>
          <div className="text-xl font-bold text-red-500">
            <Link to="/">The <span className="text-black">Uni Gang</span></Link>
          </div>
        </div>

        {/* Mobile Menu Button (Hamburger/Close) */}
        <div className="md:hidden flex items-center justify-center ">
          <div className="relative mr-4 flex" >
            <button
              onClick={toggleProfileDropdown}
              className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline"
              aria-label="Toggle Profile Menu"
            >
              {userProfilePic ? (
                <img src={userProfilePic} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-gray-300" />
              ) : (
                <FaUserCircle className="h-6 w-6" />
              )}
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute -right-13 mt-12 w-48 bg-gray-100 rounded-md shadow-lg py-1 z-30">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Profile</Link>
                    <Link to="/post-ad?tab=myAds" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>My Ads</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</button>
                  </>
                ) : (
                  <Link to="/post-ad" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Login / Register</Link>
                )}
              </div>
            )}
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline "
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Menu and Profile */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-6 z-10">
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="font-semibold text-black hover:text-red-600">Home</Link></li>
              <li><Link to="/find-accommodation" className="font-semibold text-black hover:text-red-600">Annex</Link></li>
              <li><Link to="/post-ad" className="font-semibold text-black hover:text-red-600">Advertisement</Link></li>
              <li><Link to="/contact-us" className="font-semibold text-black hover:text-red-500">Contact</Link></li>
            </ul>
          </nav>
        </div>

        {/* Profile Icon and Dropdown for Desktop */}
        <div className="hidden md:flex relative items-center ml-auto z-20" ref={dropdownRef}>
          {isLoggedIn && userName && (
            <span className="text-red-600 font-semibold mr-2 text-sm">{userName}</span>
          )}
          <button
            onClick={toggleProfileDropdown}
            className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline"
            aria-label="Toggle Profile Menu"
          >
            {userProfilePic ? (
              <img src={userProfilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-yellow-500" />
            ) : (
              <FaUserCircle className="h-8 w-8" />
            )}
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute -right-12 mt-30 w-48 bg-gray-100 rounded-md shadow-lg py-1 z-30">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Profile</Link>
                  <Link to="/post-ad?tab=myAds" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>My Ads</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</button>
                </>
              ) : (
                <Link to="/post-ad" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Login / Register</Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu (Full screen overlay) */}
        <nav
          className={`md:hidden ${isMobileMenuOpen ? 'fixed inset-0 bg-gray-100 z-20 flex justify-center items-center h-60 w-full mt-18 pt-5 pb-5' : 'hidden'
            }`}
        >
          <ul
            className={`flex space-y-6 ${isMobileMenuOpen ? 'flex-col items-center justify-center' : ''
              }`}
          >
            {/* {isMobileMenuOpen && (
              <li className="absolute top-4 right-4">
                <button
                  onClick={toggleMobileMenu}
                  className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline"
                  aria-label="Close Mobile Menu"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </li>
            )} */}
            <li className={isMobileMenuOpen ? 'my-4' : ''}>
              <Link
                to="/"
                className="font-semibold text-black hover:text-red-600"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Home
              </Link>
            </li>
            <li className={isMobileMenuOpen ? 'my-4' : ''}>
              <Link
                to="/find-accommodation"
                className="font-semibold text-black hover:text-red-600"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Annex
              </Link>
            </li>
            <li className={isMobileMenuOpen ? 'my-4' : ''}>
              <Link
                to="/post-ad"
                className="font-semibold text-black hover:text-red-600"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Advertisement
              </Link>
            </li>
            <li className={isMobileMenuOpen ? 'my-4' : ''}>
              <Link
                to="/contact-us"
                className="font-semibold text-black hover:text-red-500"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Contact
              </Link>
            </li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
