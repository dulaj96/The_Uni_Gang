import { LuGraduationCap, LuActivity, LuUsers, LuBook, LuGlobe } from 'react-icons/lu';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-start justify-center px-4 lg:px-12 max-w-7xl mx-auto overflow-hidden pt-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        {/* Left Content Column */}
        <div className="space-y-8 order-2 lg:order-1 relative z-10">
          <div className="space-y-6 animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight font-sans">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 text-3xl sm:text-5xl lg:text-7xl">Uni Gang World</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-light">
              Experience the future of student collaboration. Connect with elite campuses, track your academic milestones, and join a global network of innovators in an environment designed for modern excellence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-6 animate-fade-up [animation-delay:200ms]">
            <button className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-white/60 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 28px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)'}
            >
              <FaApple className="text-slate-800 text-2xl flex-shrink-0" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 font-bold leading-none mb-0.5">Download on</p>
                <p className="text-base font-black tracking-tight text-slate-900 leading-none">App Store</p>
              </div>
            </button>

            <button className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl border border-white/60 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(20px) saturate(160%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 28px rgba(0,0,0,0.1)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)'}
            >
              <FaGooglePlay className="text-slate-800 text-[1.4rem] flex-shrink-0" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 font-bold leading-none mb-0.5">Get it on</p>
                <p className="text-base font-black tracking-tight text-slate-900 leading-none">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center animate-fade-right [animation-delay:400ms]">
          {/* Main Image Frame with Soft Frosted Glass */}
          <div className="relative w-full max-w-[14rem] sm:max-w-[18rem] lg:max-w-[20rem] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0px_40px_80px_rgba(220,38,38,0.1)] border-[10px] border-white/40 backdrop-blur-xl z-10 bg-white/20">
            <img
              alt="Modern University Architecture"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRFV7zovlhxOqNLIlMHmIV8r4A8byd5D4NvJlHk_apI8EpkWiMlGBbSFZxhO74seWe_R6-XvzvN6-XAJCX7Ys5PyPLPo6T7HSGAfid5fB02VsRMX0v9MjPy5W_YSGqOvMaEQw6usHEXlCJOOWwjczK51PTTkCtv7YJOeVWwMN6DMqZWFqW5BC2RgJXtNh8Aq9eYplzYIM_M0inQeE8cUxq-kByRJltNoMGkrZYfHY1KQtnheVXT4q7RSYp-CB4zBiMF6Q9FadmuYxl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-600/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Floating Glass Status Cards */}
          <div className="absolute -top-8 -right-4 lg:-right-12 glass-card p-4 rounded-3xl shadow-xl hidden sm:flex items-center gap-4 z-20 animate-[float_4s_ease-in-out_infinite]">
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
  );
};

export default Hero;
