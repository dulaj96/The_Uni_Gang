import { motion } from 'framer-motion';
import { LuHeart, LuMapPin, LuSearch, LuMail, LuUser } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard.tsx';
import PremiumTraceButton from '../ui/PremiumTraceButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const listings = [
  {
    id: 1,
    title: 'Modern Studio',
    badge: 'Verified',
    location: 'Cambridge University Area',
    price: '8500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh951Jlg7MYbwvFzfJf9upLeDfG_7Zn2pxRhQRkUFXZLsgg6fe-19GvCcDuQ89oo_VW3op_CpB0gYzDr2p7o-QTKru_nxRDTo1q03bXgTtldFoL6KbziUtCTZPYWKYty3d3lWUdSdiYjq1pVqZ53hy_TLud2KjoiQZbe_wjq8DVVrwc4bdY1N6r5Cie8o_HjM1CCRbe0MwQVZjfYc1xoctsW_-XHTilHavIHcUD5NS1QUr0cbQ8icxRdq1m70xy85GevMZ11OQOgYE',
    delay: 0
  },
  {
    id: 2,
    title: 'Luxury Penthouse',
    badge: 'New',
    location: 'Oxford Campus Perimeter',
    price: '12000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiIOA7KFhadnrPIQmskl2smwqS_ThYh_Zqw416OFDYG-7QYmMrxJ7A4xuWzfJAJhi_ObDtF7uyYmI-jdCUZhpLlPrxnTXewrOOJ2mO3yxs_Z7AGVsNrTham7WPNUejfKkskU94jDOe2L37ocgMYinRXlnMxutfTgCzmFiBkLFl-ygpKJ5-8sE56-Zil7_isB0Q9QPZ_mg67lm2rWy0t3jFeexVZFpEu-dieR9TGdS8Fhep-GBOa29njPEv_Vv_iYvferTCSbWdDspa',
    delay: 0.1
  },
  {
    id: 3,
    title: 'Cozy Guest Wing',
    badge: 'Popular',
    location: 'LSE Central District',
    price: '6500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37Gaa4eoeEvPdFKFh_GkOhKKM7UohB1P3fOUlxuTmrLPvZvjueRwYcTc0nm0Vt13tWwAFMcMJKq6CduU-2uHwhynldc-ivj9y94oN4AyVKAhHBq3zgrMbr1SatRyK9bJGPlCgzcUBM0UjdtM9-OmyfUSDgVUHKuFIQv2nmxMVBfsRAGKFuw4TDL59_HhO3PpK-7rSIojSLhmOzl36Jpow-kYfdObigOtCSpv_0HRTshjDjzbWxxesPoXvABqqXB7LLMGWuVeVOtLN',
    delay: 0.2
  },
  {
    id: 4,
    title: 'The Nordic Suite',
    badge: 'Premium',
    location: 'UCL Bloomsbury',
    price: '9000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3MJ-NzKv7_3gb-d37tcATpL8bMJDBhpfcJlbBUXKnW--J60iaFFJOv5-kPqswcrXhSHF9VppUCv-y1rWfeN_M8pa4C5xnP2oEEYqDq3jc7na52NZ0YmUefERnqS1TTeGebaQyfRGNihD9iLrUkMynV0OiXsb7Djp5DaNhanTdaLMBCLuOYLbNwtm08KNQ2QVAIYzXZAJURZ-WJNPRHm0rxBJq1Ve0p86cBpKLm6-DDEd8xCU2jJjopIVC15YHL_1sXrXWsAlh9tjl',
    delay: 0.3
  },
  {
    id: 5,
    title: 'Creative Loft',
    badge: 'Artist Friendly',
    location: 'Central Saint Martins',
    price: '11000',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwCaOqu16b-uvO7GErYZ2kBxrzEF14kSgnKyOvVrj8N7VIvFEMGMjtFQ4FrZbl0bZamoRi3kEw3zaDjV2QrsBRdpP7C2BbhEHXTlWJlWX2Ph0CM4zh1Vlng3nbeXQPDe85y1UW7hOCYJNG4-h_FAdbXa3sBcsPqeC5cMkzTBxfFzZM4rlSX_mDbZzLNnfPmawbweVRmOMRf3-kbhIW_98ZPJLVo_C4pDgddnBLr2O2BEz-kUMwQkFsXsZiyFIICuAypgcoBcUsHiB',
    delay: 0.4
  }
];

const Annex = () => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleViewAllAds = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate('/annex-list');
      // The state reset happens after navigation, usually not strictly required 
      // if unmounted, but good practice if Annex stays mounted in background
      setTimeout(() => setIsNavigating(false), 100);
    }, 2000); // 2 seconds loading delay
  };

  return (
    <div className="relative z-10 font-sans pb-8 md:pb-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-7xl pt-12 pb-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            Find Your Perfect <span className="text-blue-800 italic">Annex</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Premium student accommodations curated for excellence. Discover annexes near your university that feel like home.
          </p>
        </motion.div>

        {/* Filters & Actions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16"
        >
          {/* Left Side: Filter */}
          <div className="flex flex-wrap gap-4">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="bg-blue-800 text-white shadow-md shadow-blue-800/20 px-8 py-3 rounded-full text-sm font-semibold cursor-pointer backdrop-blur-md transition-all"
            >
              Latest Annexes
            </motion.span>
          </div>

          {/* Right Side Actions: PREMIUM TRACE BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <PremiumTraceButton
              index={10}
              icon={<span className="material-symbols-outlined">east</span>}
              onClick={handleViewAllAds}
              className="w-full sm:w-auto"
            >
              View All Ads
            </PremiumTraceButton>

            <PremiumTraceButton
              index={11}
              icon={<span className="material-symbols-outlined">auto_awesome</span>}
              onClick={() => window.location.href = '/post-ad'}
              className="w-full sm:w-auto"
            >
              Post an Annex Ad
            </PremiumTraceButton>
          </div>
        </motion.div>

        {/* Bento Grid of Annex Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: listing.delay }}
            >
              <TiltCard className="h-full">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="h-full bg-white/45 dark:bg-slate-900/45 backdrop-blur-[24px] border border-white/40 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl group flex flex-col"
                >
                  <div className="relative h-72 overflow-hidden m-4 rounded-[2rem]">
                    <img
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={listing.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-5 right-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-full text-blue-800 cursor-pointer shadow-sm border border-white/20"
                    >
                      <LuHeart className="text-xl" />
                    </motion.div>
                  </div>

                  <div className="px-8 pb-10 pt-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-blue-800 transition-colors uppercase tracking-tight">{listing.title}</h3>
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800/50">
                        {listing.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-8">
                      <LuMapPin className="text-blue-800/60 text-lg" />
                      <span className="text-sm font-medium">{listing.location}</span>
                    </div>

                    <div className="mt-auto pt-4 flex flex-row items-end justify-between gap-2 border-t border-slate-100 dark:border-slate-800/50">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Monthly Fee</span>
                        <span className="text-xl md:text-2xl font-extrabold text-blue-800 dark:text-blue-400 leading-none">
                          <span className="text-xs mr-0.5">Rs.</span>{listing.price}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/annex/${listing.id}`)}
                        className="w-auto text-[11px] md:text-sm bg-blue-50 dark:bg-slate-800/80 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-800 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700 px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
                      >
                        Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}

          {/* Promo CTA Card - Redesigned with Image & Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TiltCard className="h-full group overflow-hidden rounded-[2.5rem] shadow-2xl relative">
              {/* Background Image with Scaling Effect */}
              <motion.div
                className="absolute inset-0 z-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <img
                  src="/images/property_listing_cta.png"
                  alt="Property Listing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px] group-hover:bg-blue-900/40 transition-colors duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/20 to-transparent"></div>
              </motion.div>

              {/* Dynamic Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10"></div>

              {/* Content Container with Glassmorphism */}
              <div className="relative z-20 h-full p-10 flex flex-col justify-center items-center text-center text-white">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-xl border border-white/30 shadow-2xl"
                >
                  <span className="material-symbols-outlined text-5xl opacity-90 text-white">add_business</span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-extrabold mb-5 leading-tight tracking-tight"
                >
                  Listing your <br /> <span className="text-blue-300">own property?</span>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-blue-50/90 mb-10 text-lg font-light leading-relaxed max-w-[280px]"
                >
                  Reach thousands of students searching for their next home away from home.
                </motion.p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255,255,255,0.3)",
                    backgroundColor: "#f8fafc"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-3 group/btn hover:text-blue-800 transition-all"
                >
                  <span>Get Started Free</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </motion.span>
                </motion.button>

                {/* Bottom Badge for urgency/trust */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-blue-200/60"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Join 500+ Local Landlords
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-t-[3rem] border-t border-white/20 shadow-2xl z-[1001]">
        {[
          { icon: LuSearch, label: 'Explore', active: true },
          { icon: LuHeart, label: 'Saved' },
          { icon: LuMail, label: 'Inbox' },
          { icon: LuUser, label: 'Profile' }
        ].map((item) => (
          <motion.div
            key={item.label}
            whileTap={{ scale: 0.8 }}
            className={`flex flex-col items-center justify-center ${item.active ? 'text-blue-800' : 'text-slate-400'}`}
          >
            <item.icon className="text-2xl" />
            <span className="text-[10px] font-bold uppercase mt-1 tracking-wider">{item.label}</span>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default Annex;
