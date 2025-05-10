import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logoImage.jpg'
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Scroll to top of the page on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <header className="bg-white py-4 shadow-md sticky top-0 z-10"> 
      <div className="container mx-auto flex items-center justify-between px-4">
      <div className="flex items-center">
          {/* Circular Logo */}
          <div className="mr-2">
            <img src={logo} alt="The Uni Gang Logo" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          </div>
          <div className="text-xl font-bold text-red-500">
            <Link to="/">The <span className="text-black">Uni Gang</span></Link>
          </div>
        </div>

          {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

         {/* Navigation Menu */}
         <nav
          className={`md:block ${
            isMobileMenuOpen ? 'fixed inset-0 bg-white z-20 flex justify-center items-center h-60 w-full mt-18 pt-5 pb-5' : 'hidden'
          }`}
        >
          <ul
            className={`flex space-x-6 ${
              isMobileMenuOpen ? 'flex-col items-center justify-center' : ''
            }`}
          >
            {isMobileMenuOpen && (
              <li className="absolute top-4 right-4">
                <button
                  onClick={toggleMobileMenu}
                  className="text-black hover:text-red-600 focus:outline-none focus:shadow-outline"
                  aria-label="Close Mobile Menu"
                >
                </button>
              </li>
            )}
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
                Post Annex Ad
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
        {/* <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="font-semibold text-black hover:text-red-600"> 
                Home
              </Link>
            </li>
            <li>
              <Link to="/find-accommodation" className="font-semibold text-black hover:text-red-600">
                Annex
              </Link>
            </li>
            <li>
              <Link to="/post-ad" className="font-semibold text-black hover:text-red-600"> 
                Post Annex Ad
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="font-semibold text-black hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;