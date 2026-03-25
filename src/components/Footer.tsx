import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              The <span className="text-brand-600">Uni Gang</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted platform for finding the best student accommodations closer to your university. Secure, reliable, and student-first. Stay with us for more features!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Home</Link></li>
              <li><Link to="/find-accommodation" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Find Annex</Link></li>
              <li><Link to="/feed" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Feed</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Services</Link></li>
              <li><Link to="/events" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Events</Link></li>
              <li><Link to="/contact-us" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h4 className="font-semibold text-slate-800 mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-brand-600 transition-colors text-sm font-medium">FAQ</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-6">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} The Uni Gang. All rights reserved.
          </p>
          <p className="text-slate-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;