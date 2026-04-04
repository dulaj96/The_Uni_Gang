import { useNavigate } from 'react-router-dom';
import {
  LuStar, LuBadgeCheck, LuWifi, LuBath, LuSnowflake, LuCar, LuUtensils,
  LuZap, LuGraduationCap, LuMapPin, LuMap, LuPhone,
  LuMessageCircle, LuX,
  LuCircleCheckBig
} from 'react-icons/lu';
import SEO from '../components/SEO';
import { useEffect } from 'react';

const AnnexDetailsPage = () => {
  const navigate = useNavigate();

  // Scroll to top when opening the modal (helps centering)
  useEffect(() => {
    window.scrollTo(0, 0);
    // Lock background scroll when this page is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 font-sans">
      <SEO
        title="Modern Studio near UOM - Annex Details"
        description="Luxury modern student studio room with large windows, minimalist desk, aesthetic lighting, and organized bookshelf."
      />

      {/* Modal Backdrop / Container */}
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-md cursor-pointer"
        onClick={() => navigate(-1)}
      ></div>

      {/* Main Modal */}
      <main className="relative z-10 w-full max-w-6xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,63,221,0.12)] border border-white/50 dark:border-slate-700/50 overflow-hidden flex flex-col md:flex-row h-[90vh] md:max-h-[850px] animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md flex items-center justify-center text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm border border-white/40 dark:border-slate-600 transition-all z-50 hover:scale-105 active:scale-95 text-xl"
        >
          <LuX />
        </button>

        {/* Left Column: Media Experience */}
        <section className="w-full md:w-[45%] p-6 md:p-10 flex flex-col gap-6 bg-white/30 dark:bg-slate-950/30 overflow-y-auto custom-scrollbar md:overflow-hidden">
          {/* Desktop Image Grid */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="relative group rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl border border-white/20 dark:border-slate-700/50">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="luxury modern student studio room"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6kwxMXfOSgxcWir6NewPzV_Jim0gPZf21ni2RrJe_JP9v5HHZBIJArCvpnKQiMF75Iivwu_P1ompk9-uXYEFz-zk1RprDCd8Og38pWmxqnJsTT85pFmtePwfRl4T8t_M-GaPLMtCRjxbg34rC57l__gFvbRWpuexxwW_fgiArDCESGiCtj77J3P0VWsBFIHATnBU1fDbA4208hQa5xUpt6ne1llRLztRKRKexTMSc8QqmmUMkVEPMSUOimriHrn58XnmbFKHsj0-n"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-wider text-blue-800 dark:text-blue-400 shadow-sm flex items-center gap-1.5 border border-white/50 dark:border-slate-700">
                  <LuStar className="fill-blue-500" /> PREMIUM
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:ring-2 ring-blue-600 transition-all shadow-md">
                <img className="w-full h-full object-cover" alt="sleek modern kitchenette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD9_78edkWGErtPfIlAkfSf4hN-fESFqnjNXJiX60cG5zwj0Oj2uGxuqxyNPylH52PPXoYc9r1RMReCVI7XmoF_5Z7NX6i_4QVmr6ws1U1U2OcUjW2uLNRxffpLbOhAEdKoDe4FRX-SWj-lq5vUqAp9W5zaPH3Pa6eM1r2pGQ0e08RrP7ReTpTVc9IZqadSWFrURMdQDZA_nuH2H55E0wbHJHgAxmUzkvlel98mo2Vi3MjDey0aXNGT-ylnlXZiZW4fHLC3H_f4Hg1" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:ring-2 ring-blue-600 transition-all shadow-md">
                <img className="w-full h-full object-cover" alt="clean contemporary bathroom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAN8ADW9H0mJ0RF_aitbOBZrnt6SUNqYHtb7Xuw-iZTTbNRjG5m8yuWOQt4AEdfIxJIRECcxtR75BfjZq3q3FnHlBeWj5D6fC_gws4xzHtPA6oPyAXw_UBTTQ7BmfaVnRw2wMzGKoxAxllgaGbAKr0ji3l3sRkT16DvIGupqTtQL2rZuQ2IV3qJRjdlxFzIdX4TBIDpMJthHXB2n3iBOVNt3JBsobZM_0GFFQoDPZkUj-2B2uaIukWH5jV-W3Iiug59zBrFaQxBLfqw" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:ring-2 ring-blue-600 transition-all shadow-md">
                <img className="w-full h-full object-cover" alt="cozy common area" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKqRmOmTQdmXTuBy6ZOQ2v06oQHmTanJNCv4wusghymjCtax5AtDh5Fj9joWgm0Q1FaJeyDI-PLfJMFq767_-N73MAQ7s2AacBu2LVCr-0zphZRRPgVBJtXudBbu77pDkXjzI3vTAe-jNbp7hozO-_0iGgzzRbsnjNxXaxySLT_Y0sZJ_6xp-4SqHHUxnYpPSoqlzagIm7NnrIo4b79a6MvySGJjgaDmmDDUXYI_r0SgvmICScu-gzxxtGqSiYjgVXr3-Eg0BGKvwf" />
              </div>
            </div>
          </div>

          {/* Mobile View: Horizontal Snap Carousel */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 custom-scrollbar">
            {[
              "https://lh3.googleusercontent.com/aida-public/AB6AXuC6kwxMXfOSgxcWir6NewPzV_Jim0gPZf21ni2RrJe_JP9v5HHZBIJArCvpnKQiMF75Iivwu_P1ompk9-uXYEFz-zk1RprDCd8Og38pWmxqnJsTT85pFmtePwfRl4T8t_M-GaPLMtCRjxbg34rC57l__gFvbRWpuexxwW_fgiArDCESGiCtj77J3P0VWsBFIHATnBU1fDbA4208hQa5xUpt6ne1llRLztRKRKexTMSc8QqmmUMkVEPMSUOimriHrn58XnmbFKHsj0-n",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAD9_78edkWGErtPfIlAkfSf4hN-fESFqnjNXJiX60cG5zwj0Oj2uGxuqxyNPylH52PPXoYc9r1RMReCVI7XmoF_5Z7NX6i_4QVmr6ws1U1U2OcUjW2uLNRxffpLbOhAEdKoDe4FRX-SWj-lq5vUqAp9W5zaPH3Pa6eM1r2pGQ0e08RrP7ReTpTVc9IZqadSWFrURMdQDZA_nuH2H55E0wbHJHgAxmUzkvlel98mo2Vi3MjDey0aXNGT-ylnlXZiZW4fHLC3H_f4Hg1",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAN8ADW9H0mJ0RF_aitbOBZrnt6SUNqYHtb7Xuw-iZTTbNRjG5m8yuWOQt4AEdfIxJIRECcxtR75BfjZq3q3FnHlBeWj5D6fC_gws4xzHtPA6oPyAXw_UBTTQ7BmfaVnRw2wMzGKoxAxllgaGbAKr0ji3l3sRkT16DvIGupqTtQL2rZuQ2IV3qJRjdlxFzIdX4TBIDpMJthHXB2n3iBOVNt3JBsobZM_0GFFQoDPZkUj-2B2uaIukWH5jV-W3Iiug59zBrFaQxBLfqw",
              "https://lh3.googleusercontent.com/aida-public/AB6AXuCKqRmOmTQdmXTuBy6ZOQ2v06oQHmTanJNCv4wusghymjCtax5AtDh5Fj9joWgm0Q1FaJeyDI-PLfJMFq767_-N73MAQ7s2AacBu2LVCr-0zphZRRPgVBJtXudBbu77pDkXjzI3vTAe-jNbp7hozO-_0iGgzzRbsnjNxXaxySLT_Y0sZJ_6xp-4SqHHUxnYpPSoqlzagIm7NnrIo4b79a6MvySGJjgaDmmDDUXYI_r0SgvmICScu-gzxxtGqSiYjgVXr3-Eg0BGKvwf"
            ].map((src, i) => (
              <div key={i} className="relative min-w-full aspect-[4/3] rounded-[2rem] overflow-hidden snap-center shadow-md border border-white/20 dark:border-slate-700/50">
                <img className="w-full h-full object-cover" src={src} alt={`property view ${i + 1}`} />
                {i === 0 && (
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider text-blue-800 dark:text-blue-400 shadow-sm flex items-center gap-1.5 border border-white/50 dark:border-slate-700">
                      <LuStar className="fill-blue-500 w-3.5 h-3.5" /> PREMIUM
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Information Architecture */}
        <section className="w-full md:w-[55%] p-6 md:p-10 overflow-y-auto flex flex-col gap-8 custom-scrollbar">

          {/* Header Information */}
          <div className="space-y-4 pt-10 md:pt-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Modern Studio near UOM</h1>
              <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-200 dark:border-blue-800/50">
                <LuBadgeCheck className="text-base fill-blue-500 text-white dark:text-slate-900" />
                Verified
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-blue-800 dark:text-blue-400">Rs. 18,000</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">/mo</span>
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">4 Months Security Deposit</p>
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Key Amenities</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuWifi className="text-blue-700 dark:text-blue-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">High-speed Wifi</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuBath className="text-teal-600 dark:text-teal-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Attached Bath</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuSnowflake className="text-red-500 dark:text-red-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Air Conditioning</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuCar className="text-orange-600 dark:text-orange-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Safe Parking</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuUtensils className="text-indigo-600 dark:text-indigo-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Equipped Kitchen</span>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex flex-col gap-3 items-start border border-white/60 dark:border-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white dark:hover:bg-slate-800/80">
                <LuZap className="text-yellow-600 dark:text-yellow-400 text-2xl" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Power Backup</span>
              </div>
            </div>
          </div>

          {/* Proximity & Rules Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Proximity Hub */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Proximity Hub</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                  <LuGraduationCap className="text-blue-700 dark:text-blue-400 text-2xl" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">University of Moratuwa</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">400m Away</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                  <LuMapPin className="text-teal-600 dark:text-teal-400 text-2xl" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">City Center</p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">1.2km Away</p>
                  </div>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div className="space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">House Rules</h2>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <LuCircleCheckBig className="text-green-500 dark:text-green-400 text-xl font-bold" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Girls Only</span>
                </div>
                <div className="flex items-center gap-3">
                  <LuCircleCheckBig className="text-green-500 dark:text-green-400 text-xl font-bold" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Quiet Hours after 11 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <LuCircleCheckBig className="text-green-500 dark:text-green-400 text-xl font-bold" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">No Smoking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Location Map */}
          <div className="space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Property Location</h2>
            <div className="relative rounded-[2rem] overflow-hidden border border-white/40 dark:border-slate-700/50 p-1 group bg-white/40 dark:bg-slate-800/40">
              <div className="aspect-[16/6] md:aspect-[16/9] w-full rounded-[1.8rem] overflow-hidden relative">
                <img
                  className="w-full h-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-105"
                  alt="Modern Google Map view"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn-l3x4k14M_ZkUu3xQ_SRE734e_O64o3L8yH3uE_L4Hw3hR1_W3G4M_zYwU8T_R4X9l_W3U4M_zYwU8T_R4X9l_W"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative">
                    <LuMapPin className="text-blue-600 dark:text-blue-400 text-5xl drop-shadow-lg fill-blue-100 animate-bounce" />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/30 blur-sm rounded-full"></div>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 z-20">
                  <button className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white text-slate-900 dark:text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 border border-white/20 dark:border-slate-700">
                    <LuMap className="text-blue-600 dark:text-blue-400 text-lg" /> View on Maps
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Sticky Contact Simulation */}
          <div className="mt-auto pt-8 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap items-center justify-between gap-6 pb-6 md:pb-0">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm"
                alt="Profile portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdLMvlpC9Vt7UeMBobVXPXTRP9YPDjUPsvoi4RSj8SWJbIjSrbozCzp5yqSJ_i8FmbXNv6P_Ush0ikbf5jnv3o-ic1ZNRW_FD_tVJMYR10_MKRZfNBcGneKMAShJ32dvrFu4EvxbQpjOjTPMdkWjnc4pS-iQN-oTEz4RNx2Z0yZF8wvrDT1_TlGKWahbwTdmdvxQ5s1yuif1b0UoYbTRg8Z4Pru8xNMvYe8WeEYoemCwgT3q7NEgiZBnrE_A7RpIiVWUTUotGsPfti"
              />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Listed by</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">Mr. Aruna Silva</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full sm:w-[320px]">
              <button className="bg-blue-800 hover:bg-blue-900 text-white py-3.5 rounded-full font-bold shadow-lg shadow-blue-800/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base">
                <LuPhone className="text-xl shrink-0" /> Call Now
              </button>
              <button className="bg-[#075E54] dark:bg-[#128C7E] hover:brightness-110 text-white py-3.5 rounded-full font-bold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base">
                <LuMessageCircle className="text-xl shrink-0 fill-current" /> WhatsApp
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default AnnexDetailsPage;