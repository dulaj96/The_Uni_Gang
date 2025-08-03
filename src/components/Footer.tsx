const Footer = () => {
  return (
    <footer className="bg-gray-200 py-5 text-center font-bold text-gray-600">
      <div className="container mx-auto">
        <p className="">Copyright © {new Date().getFullYear()} Theunigang. All Rights Reserved.</p>
        {/* <ul className="flex justify-center space-x-4">
          <li><a href="/privacy-policy" className="hover:text-indigo-600">Privacy Policy</a></li>
          <li><a href="/terms-of-service" className="hover:text-indigo-600">Terms of Service</a></li>
          <li><a href="/contact-us" className="hover:text-indigo-600">Contact Us</a></li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;