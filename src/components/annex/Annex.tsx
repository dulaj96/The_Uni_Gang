import { LuCirclePlus, LuHeart, LuMapPin, LuBuilding2, LuSearch, LuMail, LuUser } from 'react-icons/lu';

const listings = [
  {
    id: 1,
    title: 'Modern Studio',
    badge: 'Verified',
    location: 'Cambridge University Area',
    price: '$850',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh951Jlg7MYbwvFzfJf9upLeDfG_7Zn2pxRhQRkUFXZLsgg6fe-19GvCcDuQ89oo_VW3op_CpB0gYzDr2p7o-QTKru_nxRDTo1q03bXgTtldFoL6KbziUtCTZPYWKYty3d3lWUdSdiYjq1pVqZ53hy_TLud2KjoiQZbe_wjq8DVVrwc4bdY1N6r5Cie8o_HjM1CCRbe0MwQVZjfYc1xoctsW_-XHTilHavIHcUD5NS1QUr0cbQ8icxRdq1m70xy85GevMZ11OQOgYE',
    delay: '0ms'
  },
  {
    id: 2,
    title: 'Luxury Penthouse',
    badge: 'New',
    location: 'Oxford Campus Perimeter',
    price: '$1,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiIOA7KFhadnrPIQmskl2smwqS_ThYh_Zqw416OFDYG-7QYmMrxJ7A4xuWzfJAJhi_ObDtF7uyYmI-jdCUZhpLlPrxnTXewrOOJ2mO3yxs_Z7AGVsNrTham7WPNUejfKkskU94jDOe2L37ocgMYinRXlnMxutfTgCzmFiBkLFl-ygpKJ5-8sE56-Zil7_isB0Q9QPZ_mg67lm2rWy0t3jFeexVZFpEu-dieR9TGdS8Fhep-GBOa29njPEv_Vv_iYvferTCSbWdDspa',
    delay: '100ms'
  },
  {
    id: 3,
    title: 'Cozy Guest Wing',
    badge: 'Popular',
    location: 'LSE Central District',
    price: '$650',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37Gaa4eoeEvPdFKFh_GkOhKKM7UohB1P3fOUlxuTmrLPvZvjueRwYcTc0nm0Vt13tWwAFMcMJKq6CduU-2uHwhynldc-ivj9y94oN4AyVKAhHBq3zgrMbr1SatRyK9bJGPlCgzcUBM0UjdtM9-OmyfUSDgVUHKuFIQv2nmxMVBfsRAGKFuw4TDL59_HhO3PpK-7rSIojSLhmOzl36Jpow-kYfdObigOtCSpv_0HRTshjDjzbWxxesPoXvABqqXB7LLMGWuVeVOtLN',
    delay: '200ms'
  },
  {
    id: 4,
    title: 'The Nordic Suite',
    badge: 'Premium',
    location: 'UCL Bloomsbury',
    price: '$975',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3MJ-NzKv7_3gb-d37tcATpL8bMJDBhpfcJlbBUXKnW--J60iaFFJOv5-kPqswcrXhSHF9VppUCv-y1rWfeN_M8pa4C5xnP2oEEYqDq3jc7na52NZ0YmUefERnqS1TTeGebaQyfRGNihD9iLrUkMynV0OiXsb7Djp5DaNhanTdaLMBCLuOYLbNwtm08KNQ2QVAIYzXZAJURZ-WJNPRHm0rxBJq1Ve0p86cBpKLm6-DDEd8xCU2jJjopIVC15YHL_1sXrXWsAlh9tjl',
    delay: '300ms'
  },
  {
    id: 5,
    title: 'Creative Loft',
    badge: 'Artist Friendly',
    location: 'Central Saint Martins',
    price: '$1,100',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcwCaOqu16b-uvO7GErYZ2kBxrzEF14kSgnKyOvVrj8N7VIvFEMGMjtFQ4FrZbl0bZamoRi3kEw3zaDjV2QrsBRdpP7C2BbhEHXTlWJlWX2Ph0CM4zh1Vlng3nbeXQPDe85y1UW7hOCYJNG4-h_FAdbXa3sBcsPqeC5cMkzTBxfFzZM4rlSX_mDbZzLNnfPmawbweVRmOMRf3-kbhIW_98ZPJLVo_C4pDgddnBLr2O2BEz-kUMwQkFsXsZiyFIICuAypgcoBcUsHiB',
    delay: '400ms'
  }
];

const Annex = () => {
  return (
    <div className="relative z-10 font-sans pb-20 md:pb-0">
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-7xl pt-12 pb-24">
        {/* Hero Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-10 animate-fade-up">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6">
              Find Your Perfect Stay
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed font-light">
              Premium student accommodations curated for excellence. Discover annexes near your university that feel like home.
            </p>
          </div>
          {/* Primary Action */}
          <button className="group flex items-center justify-center gap-3 bg-blue-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_rgba(30,64,175,0.3)] transition-all hover:scale-[1.02] hover:bg-blue-900 active:scale-95 shrink-0 w-full md:w-auto">
            <LuCirclePlus className="text-2xl" />
            Post an Annex Ad
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16 animate-fade-up [animation-delay:100ms]">
          <span className="bg-blue-800 text-white px-8 py-3 rounded-full text-sm font-semibold cursor-pointer shadow-md shadow-blue-800/20 hover:bg-blue-900 transition-colors">
            All Listings
          </span>
          <span className="bg-white/60 text-slate-600 border border-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer backdrop-blur-md shadow-sm">
            Near Campus
          </span>
          <span className="bg-white/60 text-slate-600 border border-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer backdrop-blur-md shadow-sm">
            Budget Friendly
          </span>
          <span className="bg-white/60 text-slate-600 border border-white px-8 py-3 rounded-full text-sm font-medium hover:bg-white transition-colors cursor-pointer backdrop-blur-md shadow-sm">
            Premium Suites
          </span>
        </div>

        {/* Bento Grid of Annex Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings.map((listing) => (
            <div
              key={listing.id}
              style={{ animationDelay: listing.delay }}
              className="group animate-fade-up bg-white/45 backdrop-blur-[20px] border-2 border-white/70 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-[0_8px_32px_0_rgba(31,38,135,0.07),inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[0_16px_40px_0_rgba(30,64,175,0.15),inset_0_0_0_1px_rgba(255,255,255,0.4)] hover:-translate-y-2"
            >
              <div className="relative h-72 overflow-hidden m-4 rounded-[2rem]">
                <img
                  alt={listing.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={listing.image}
                />
                <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md p-3 rounded-full text-blue-800 cursor-pointer hover:bg-white transition-colors shadow-sm">
                  <LuHeart className="text-xl" />
                </div>
              </div>

              <div className="px-8 pb-10 pt-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-slate-800">{listing.title}</h3>
                  <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                    {listing.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 mb-8">
                  <LuMapPin className="text-blue-800/60 text-lg" />
                  <span className="text-sm font-medium">{listing.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-1">Monthly Fee</span>
                    <span className="text-3xl font-extrabold text-blue-800">
                      {listing.price}<span className="text-sm font-medium text-slate-500 ml-1">/mo</span>
                    </span>
                  </div>
                  <button className="bg-white/80 hover:bg-blue-800 hover:text-white text-blue-800 border border-blue-500/10 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Promo CTA Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden bg-blue-800 p-10 flex flex-col justify-center items-center text-center text-white shadow-[0_20px_40px_rgba(30,64,175,0.3)] group animate-fade-up [animation-delay:500ms]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none"></div>
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 transition-transform group-hover:scale-110 duration-500">
              <LuBuilding2 className="text-5xl opacity-90 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-5 leading-tight">Listing your own property?</h3>
            <p className="text-blue-100/90 mb-10 text-lg font-light">Reach thousands of students searching for their next home away from home.</p>
            <button className="bg-white text-blue-800 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl">
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 py-4 bg-white/80 backdrop-blur-2xl rounded-t-[2.5rem] border-t border-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="flex flex-col items-center justify-center text-blue-800">
          <LuSearch className="text-2xl" />
          <span className="text-[10px] font-bold uppercase mt-1">Explore</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500">
          <LuHeart className="text-2xl" />
          <span className="text-[10px] font-bold uppercase mt-1">Saved</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500">
          <LuMail className="text-2xl" />
          <span className="text-[10px] font-bold uppercase mt-1">Inbox</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500">
          <LuUser className="text-2xl" />
          <span className="text-[10px] font-bold uppercase mt-1">Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default Annex;