import React, { useState } from 'react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import { FiPhone, FiMail } from 'react-icons/fi';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      email,
      message,
    });
    setName('');
    setEmail('');
    setMessage('');
    alert('Message sent successfully!');
  };

  const whatsappLink = 'https://wa.me/YOUR_WHATSAPP_NUMBER';
  const facebookLink = 'https://www.facebook.com/YOUR_FACEBOOK_PAGE';
  const phoneNumber = '+94 72 44 78 148';
  const emailAddress = 'your.email@example.com';

  return (
    <div
      className="container bg-gray-200 mx-auto py-8 px-4 sm:px-6 lg:px-8 relative rounded-md"
    // style={{
    //   backgroundImage: `url('${backgroundImage}')`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   minHeight: '400px', // Adjust as needed
    // }}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 bg-opacity-70">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1">
                <textarea
                  id="message"
                  rows={5}
                  className="p-2 block w-full sm:text-sm bg-gray-200 rounded-md"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center mt-1 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information Card with WhatsApp and Facebook in a Row */}
        <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 bg-opacity-70">
          <h2 className="text-lg font-bold text-gray-700 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <FiPhone className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></FiPhone>
              <p className="block text-sm font-medium text-gray-700">Phone: <a href={`tel:${phoneNumber}`} className="text-indigo-500 hover:underline">{phoneNumber}</a></p>
            </div>
            <div className="flex items-center">
              <FiMail className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m0 0l-7.89 5.26a2 2 0 01-2.22 0L3 8m0 0l1.66-5.66a2 2 0 012.83 0l14.11 5.66m-14.11-5.66L9.9 13.26a2 2 0 01-2.22 0L3 8z"></path></FiMail>
              <p className="block text-sm font-medium text-gray-700">Email: <a href={`mailto:${emailAddress}`} className="text-indigo-500 hover:underline">{emailAddress}</a></p>
            </div>

            {/* WhatsApp and Facebook Cards in a Row */}
            <div className="flex space-x-2 mt-5">
              {/* WhatsApp Card */}
              <div className="bg-green-500 rounded-md p-4 shadow-md w-50">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-white">
                  <FaWhatsapp className="w-6 h-6 mr-3" />
                  <span className="font-bold text-sm">WhatsApp</span>
                </a>
              </div>

              {/* Facebook Card */}
              <div className="bg-blue-500 rounded-md p-4 shadow-md w-50">
                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-white">
                  <FaFacebook className="w-6 h-6 mr-3" />
                  <span className="font-bold text-sm">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;