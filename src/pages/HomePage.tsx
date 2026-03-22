import { Link } from 'react-router-dom';
import backgroundImage from '../assets/hero_bg.png'
import annex1 from '../assets/annex1.jpg'
import annex2 from '../assets/annex2.jpg'
import { useEffect, useState } from 'react';
import { LuMapPin, LuArrowRight, LuHouse, LuSearch, LuGraduationCap, LuBuilding, LuAward, LuActivity, LuUsers, LuBook, LuGlobe } from 'react-icons/lu';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import SEO from '../components/SEO';

interface Annex {
  id: string;
  title: string;
  price: string;
  description: string;
  address: string;
  images: string[];
  link: string;
  tag: string;
}

const dummyAnnexes: Annex[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  title: `Modern Annex Near University ${i + 1}`,
  price: `Rs. ${10000 + (i * 500)}/month`,
  description: `Experience comfortable living just minutes away from campus. Fully furnished and secure.`,
  address: `Colombo ${i + 1}, Sri Lanka`,
  images: [i % 2 === 0 ? annex1 : annex2],
  link: `/annex/${i + 1}`,
  tag: i % 2 === 0 ? 'Featured' : 'New'
}));

const HomePage = () => {
  const [allAnnexes, setAllAnnexes] = useState<Annex[]>([]);

  useEffect(() => {
    setAllAnnexes(dummyAnnexes);
  }, []);

  return (
    <div className="space-y-24">
      <SEO
        title="The Uni Gang - Find Your Perfect Student Annex in Sri Lanka"
        description="Connect with the best student accommodations near universities in Sri Lanka. Easy, secure, and student-friendly annex hunting."
      />
      {/* Hero Section Reimagined */}
      <section className="flex-grow flex items-center justify-center px-4 lg:px-12 max-w-7xl mx-auto w-full relative z-10 min-h-[85vh] -mt-24 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full py-12">
          {/* Left Content Column */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-600 font-sans">Now Live: Autumn 2026 Enrollment</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight font-sans">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Uni Gang World</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-light">
                Experience the future of student collaboration. Connect with elite campuses, track your academic milestones, and join a global network of innovators in an environment designed for modern excellence.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:bg-white transition-all scale-100 hover:scale-105 active:scale-95 group">
                <FaApple className="text-slate-900 text-3xl" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold leading-none">Download on</p>
                  <p className="text-lg font-bold text-slate-900 leading-none">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg hover:bg-white transition-all scale-100 hover:scale-105 active:scale-95 group">
                <FaGooglePlay className="text-slate-900 text-3xl" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500 font-bold leading-none">Get it on</p>
                  <p className="text-lg font-bold text-slate-900 leading-none">Google Play</p>
                </div>
              </button>
            </div>
            
            {/* Trust Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-6 grayscale opacity-60">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Affiliated with</p>
              <div className="flex gap-8 items-center">
                <LuGraduationCap className="text-4xl" />
                <LuBuilding className="text-4xl" />
                <LuAward className="text-4xl" />
              </div>
            </div>
          </div>
          
          {/* Right Visual Column */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            {/* Main Image Frame with Soft Frosted Glass */}
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0px_64px_96px_rgba(220,38,38,0.12)] border-[12px] border-white/30 backdrop-blur-md z-10">
              <img 
                alt="Modern University Architecture" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRFV7zovlhxOqNLIlMHmIV8r4A8byd5D4NvJlHk_apI8EpkWiMlGBbSFZxhO74seWe_R6-XvzvN6-XAJCX7Ys5PyPLPo6T7HSGAfid5fB02VsRMX0v9MjPy5W_YSGqOvMaEQw6usHEXlCJOOWwjczK51PTTkCtv7YJOeVWwMN6DMqZWFqW5BC2RgJXtNh8Aq9eYplzYIM_M0inQeE8cUxq-kByRJltNoMGkrZYfHY1KQtnheVXT4q7RSYp-CB4zBiMF6Q9FadmuYxl" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating Glass Status Cards */}
            <div className="absolute -top-8 -right-4 lg:-right-12 glass-card p-4 rounded-3xl shadow-xl flex items-center gap-4 z-20 animate-[float_4s_ease-in-out_infinite]">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                <LuActivity className="text-brand-600 text-xl" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Live Campus Pulse</p>
                <p className="text-lg font-extrabold text-slate-900">Active Now</p>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-4 lg:-left-12 glass-card p-4 rounded-3xl shadow-xl flex items-center gap-4 z-20 animate-[float_5s_ease-in-out_infinite_reverse]">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <LuUsers className="text-indigo-600 text-xl" />
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Student Stats</p>
                <p className="text-lg font-extrabold text-slate-900">12k+ Global</p>
              </div>
            </div>
            
            {/* Decorative Floating 3D Icons */}
            <div className="absolute top-1/4 -left-8 sm:-left-16 w-16 h-16 rounded-2xl glass-card flex items-center justify-center shadow-lg transform -rotate-12 z-20 animate-[float_6s_ease-in-out_infinite]">
              <LuBook className="text-brand-600 text-3xl" />
            </div>
            <div className="absolute bottom-1/4 -right-6 sm:-right-12 w-20 h-20 rounded-full glass-card flex items-center justify-center shadow-lg transform rotate-12 bg-white/80 z-20 animate-[float_4.5s_ease-in-out_infinite]">
              <LuGraduationCap className="text-indigo-600 text-4xl" />
            </div>
            <div className="absolute top-10 right-4 sm:right-10 w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-md z-20 animate-[float_5.5s_ease-in-out_infinite_reverse]">
              <LuGlobe className="text-brand-400 text-2xl" />
            </div>
            
            {/* Ambient Glows */}
            <div className="absolute -z-10 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-brand-400/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          </div>
        </div>
        
        {/* Connection Dots / Background Patterns */}
        <div className="absolute top-0 right-0 p-12 sm:p-24 opacity-10 pointer-events-none hidden sm:block">
          <div className="grid grid-cols-6 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-brand-600 rounded-full"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">Recently Added Places</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Fresh listings just for you.</p>
          </div>
          <Link to="/find-accommodation" className="hidden md:flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            View All <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allAnnexes.map((annex) => (
            <div key={annex.id} className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={annex.images[0]}
                  alt={annex.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {annex.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="bg-brand-600 text-white font-bold px-4 py-2 rounded-xl shadow-lg">
                    {annex.price}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-1">{annex.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-4 text-sm">
                  <LuMapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{annex.address}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm line-clamp-2 leading-relaxed flex-grow">
                  {annex.description}
                </p>
                <Link
                  to={annex.link}
                  className="w-full block text-center py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-brand-600 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-700 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/find-accommodation" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            View All <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Looking to Rent Out Your Annex?</h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed">
              Join thousands of landlords who trust The Uni Gang to find reliable student tenants. Simple, fast, and secure.
            </p>
            <Link to="/post-ad" className="inline-block bg-white text-slate-900 text-lg font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              List Your Property Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;