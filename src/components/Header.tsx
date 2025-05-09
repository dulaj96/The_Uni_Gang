import { Link } from 'react-router-dom';
import logo from '../assets/logoImage.jpg'

const Header = () => {
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
        <nav>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;