import { motion } from 'framer-motion';
import { LuCirclePlus, LuHeart, LuMapPin, LuBuilding2, LuSearch, LuMail, LuUser } from 'react-icons/lu';
import TiltCard from '../ui/TiltCard.tsx';

const listings = [
  {
    id: 1,
    title: 'Modern Studio',
    badge: 'Verified',
    location: 'Cambridge University Area',
    price: '$850',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh951Jlg7MYbwvFzfJf9upLeDfG_7Zn2pxRhQRkUFXZLsgg6fe-19GvCcDuQ89oo_VW3op_CpB0gYzDr2p7o-QTKru_nxRDTo1q03bXgTtldFoL6KbziUtCTZPYWKYty3d3lWUdSdiYjq1pVqZ53hy_TLud2KjoiQZbe_wjq8DVVrwc4bdY1N6r5Cie8o_HjM1CCRbe0MwQVZjfYc1xoctsW_-XHTilHavIHcUD5NS1QUr0cbQ8icxRdq1m70xy85GevMZ11OQOgYE',
    delay: 0
  },
  {
    id: 2,
    title: 'Luxury Penthouse',
    badge: 'New',
    location: 'Oxford Campus Perimeter',
    price: '$1,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiIOA7KFhadnrPIQmskl2smwqS_ThYh_Zqw416OFDYG-7QYmMrxJ7A4xuWzfJAJhi_ObDtF7uyYmI-jdCUZhpLlPrxnTXewrOOJ2mO3yxs_Z7AGVsNrTham7WPNUejfKkskU94jDOe2L37ocgMYinRXlnMxutfTgCzmFiBkLFl-ygpKJ5-8sE56-Zil7_isB0Q9QPZ_mg67lm2rWy0t3jFeexVZFpEu-dieR9TGdS8Fhep-GBOa29njPEv_Vv_iYvferTCSbWdDspa',
    delay: 0.1
  },
  {
    id: 3,
    title: 'Cozy Guest Wing',
    badge: 'Popular',
    location: 'LSE Central District',
    price: '$650',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37Gaa4eoeEvPdFKFh_GkOhKKM7UohB1P3fOUlxuTmrLPvZvjueRwYcTc0nm0Vt13tWwAFMcMJKq6CduU-2uHwhynldc-ivj9y94oN4AyVKAhHBq3zgrMbr1SatRyK9bJGPlCgzcUBM0UjdtM9-OmyfUSDgVUHKuFIQv2nmxMVBfsRAGKFuw4TDL59_HhO3PpK-7rSIojSLhmOzl36Jpow-kYfdObigOtCSpv_0HRTshjDjzbWxxesPoXvABqqXB7LLMGWuVeVOtLN',
    delay: 0.2
  },
  {
    id: 4,
    title: 'The Nordic Suite',
    badge: 'Premium',
    location: 'UCL Bloomsbury',
    price: '$975',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3MJ-NzKv7_3gb-d37tcATpL8bMJDBhpfcJlbBUXKnW--J60iaFFJOv5-kPqswcrXhSHF9VppUCv-y1rWfeN_M8pa4C5xnP2oEEYqDq3jc7na52NZ0YmUefERnqS1TTeGebaQyfRGNihD9iLrUkMynV0OiXsb7Djp5DaNhanTdaLMBCLuOYLbNwtm08KNQ2QVAIYzXZAJURZ-WJNPRHm0rxBJq1Ve0p86cBpKLm6-DDEd8xCU2jJjopIVC15YHL_1sXrXWsAlh9tjl',
    delay: 0.3
  },
  {
    id: 5,
    title: 'Creative Loft',
    badge: 'Artist Friendly',
    location: 'Central Saint Martins',
    price: '$1,100',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwCaOqu16b-uvO7GErYZ2kBxrzEF14kSgnKyOvVrj8N7VIvFEMGMjtFQ4FrZbl0bZamoRi3kEw3zaDjV2QrsBRdpP7C2BbhEHXTlWJlWX2Ph0CM4zh1Vlng3nbeXQPDe85y1UW7hOCYJNG4-h_FAdbXa3sBcsPqeC5cMkzTBxfFzZM4rlSX_mDbZzLNnfPmawbweVRmOMRf3-kbhIW_98ZPJLVo_C4pDgddnBLr2O2BEz-kUMwQkFsXsZiyFIICuAypgcoBcUsHiB',
    delay: 0.4
  }
];

const Annex = () => {
  return (
    <div className="relative z-10 font-sans pb-8 md:pb-0 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl pt-12 pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-10"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Find Your <br /> Perfect <span className="text-blue-800 italic">Stay</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Premium student accommodations curated for excellence. Discover annexes near your university that feel like home.
            </p>
          </div>
          {/* Primary Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center gap-3 bg-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(30,64,175,0.3)] transition-all shrink-0 w-full md:w-auto"
          >
            <LuCirclePlus className="text-2xl" />
            Post an Annex Ad
          </motion.button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {['All Listings', 'Near Campus', 'Budget Friendly', 'Premium Suites'].map((filter, i) => (
            <motion.span
              key={filter}
              whileHover={{ scale: 1.05 }}
              className={`${i === 0 ? 'bg-blue-800 text-white shadow-md shadow-blue-800/20' : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-white dark:border-slate-700/50'} px-8 py-3 rounded-full text-sm font-semibold cursor-pointer backdrop-blur-md shadow-sm transition-all`}
            >
              {filter}
            </motion.span>
          ))}
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

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Monthly Fee</span>
                        <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-400">
                          {listing.price}<span className="text-sm font-medium text-slate-400 ml-1">/mo</span>
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white/80 dark:bg-slate-800/80 hover:bg-blue-800 hover:text-white dark:hover:bg-blue-800 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}

          {/* Promo CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TiltCard className="h-full group">
              <div className="relative h-full rounded-[2.5rem] overflow-hidden bg-blue-800 p-10 flex flex-col justify-center items-center text-center text-white shadow-2xl">
                {/* Animated Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20"
                >
                  <LuBuilding2 className="text-5xl opacity-90 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-5 leading-tight">Listing your own property?</h3>
                <p className="text-blue-100/90 mb-10 text-lg font-light leading-relaxed">Reach thousands of students searching for their next home away from home.</p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-800 px-10 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-2"
                >
                  Get Started Free
                </motion.button>
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