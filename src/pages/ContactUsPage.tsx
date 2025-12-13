import React, { useState } from 'react';
import { LuPhone, LuMail, LuSend, LuMapPin, LuFacebook } from 'react-icons/lu';

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    setName('');
    setEmail('');
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help you find your perfect accommodation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-8 md:p-10 border border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none text-slate-800 dark:text-white"
                placeholder="How can we help you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Send Message <LuSend className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Info Side */}
        <div className="space-y-12 flex flex-col justify-center">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-900 transition-colors group">
              <div className="bg-brand-50 dark:bg-brand-900/20 p-3 rounded-full text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <LuPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Mon-Fri from 8am to 5pm</p>
                <a href="tel:+94724478148" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline text-lg">+94 72 44 78 148</a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-900 transition-colors group">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LuMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Our friendly team is here to help.</p>
                <a href="mailto:support@theunigang.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline text-lg">support@theunigang.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-900 transition-colors group">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-full text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <LuMapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Office</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Come say hello at our office HQ.</p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">123 University Road, Colombo 07</p>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Follow us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 hover:border-brand-200 dark:hover:border-brand-900 hover:text-brand-600 dark:hover:text-brand-400 shadow-sm transition-all hover:-translate-y-1">
                <LuFacebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;