import React, { useState } from 'react';
import { Search, ShieldCheck, Lock, Heart, Calendar, User, ArrowRight, ChevronDown } from 'lucide-react';
import { PrimaryButton } from '../ui/ProposalPrimitives';
import FallingHearts from '../animations/FallingHearts';

interface ProposalHeroSectionProps {
  onGetStarted: () => void;
  onSearch?: (filters: any) => void;
}

export default function ProposalHeroSection({ onGetStarted, onSearch }: ProposalHeroSectionProps) {
  const [lookingFor, setLookingFor] = useState<'Female' | 'Male'>('Female');
  const [showGenderPopup, setShowGenderPopup] = useState(false);
  const [ageRange, setAgeRange] = useState('18 - 80');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ lookingFor, ageRange });
    } else {
      onGetStarted();
    }
  };

  return (
    <section className="relative pt-20 sm:pt-24 pb-48 sm:pb-56 rounded-[3rem] my-6 border border-slate-800 shadow-2xl bg-slate-950 font-sans z-20">
      {/* Background Image & Falling Hearts Wrapper (Contained with overflow-hidden) */}
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none z-0">
        {/* 1. Confined Falling Hearts (Only inside Hero Section Box) */}
        <FallingHearts count={24} contained={true} />

        {/* 2. Lead UI/UX Hero Background Image with Crisp Contrast Overlay */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Sri Lankan Matrimony Hero Background"
          className="w-full h-full object-cover opacity-60 filter contrast-125 saturate-150 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />

        {/* Radial Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-rose-500/20 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* 2-Column Split Hero Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: English Headline & CTAs */}
          <div className="lg:col-span-7 text-left animate-fade-up">

            {/* Main Headline in English */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-md">
              Find your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-fuchsia-500 font-black drop-shadow-lg">
                perfect match
              </span><br />
              within the campus.
            </h1>

            {/* Subtitle (English + Sinhala Sub-badge) */}
            <p className="mt-6 text-base sm:text-lg font-medium text-slate-200 max-w-xl leading-relaxed">
              Uni Porondam exclusively connects verified undergraduates and alumni from Sri Lanka's universities based on shared values, faculties, and lifestyle.
            </p>
            <p className="mt-2 text-xs sm:text-sm font-semibold text-rose-300 font-sinhala">
              (යූනි පොරොන්දම් - ශ්‍රී ලාංකීය විශ්වවිද්‍යාල සිසුන් හා උපාධිධාරීන් සඳහාම වෙන්වූ මංගල සේවාව)
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <PrimaryButton onClick={onGetStarted} icon={ArrowRight} className="shadow-[0_0_35px_rgba(244,63,94,0.4)] px-8 py-4 font-bold text-sm">
                Create Your Profile
              </PrimaryButton>
            </div>
          </div>

          {/* Right Column: High-Res Couple Frame + Floating Glass Badges */}
          <div className="lg:col-span-5 relative hidden lg:flex justify-center items-center">
            {/* 3D Floating Glass Badge 1 (Top Left) */}
            <div className="absolute -top-4 -left-6 bg-slate-900/90 backdrop-blur-xl p-3.5 px-4 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-3 z-20 animate-[float_4.5s_ease-in-out_infinite]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Verified Status</p>
                <p className="text-xs font-extrabold text-white leading-tight">100% Authentic</p>
              </div>
            </div>

            {/* 3D Floating Glass Badge 2 (Bottom Right) */}
            <div className="absolute -bottom-6 -right-6 bg-slate-900/90 backdrop-blur-xl p-3.5 px-4 rounded-3xl border border-white/20 shadow-2xl flex items-center gap-3 z-20 animate-[float_5.5s_ease-in-out_infinite_reverse]">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <Heart size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Success Rate</p>
                <p className="text-xs font-extrabold text-white leading-tight">540+ Marriages</p>
              </div>
            </div>

            {/* Main Couple Card */}
            <div className="relative w-full max-w-[21rem] aspect-[3/4] rounded-[3rem] overflow-hidden glass border-[6px] border-white/20 shadow-2xl z-10 transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Couple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-slate-900/90 backdrop-blur-xl p-3 rounded-2xl flex items-center justify-between mb-3 border border-white/10 shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 flex items-center justify-center">
                      <Heart size={16} className="text-white" fill="white" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-white">98% Match</p>
                      <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Proposal Accepted!</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">Kasun & Sanduni</h3>
                <p className="text-white/90 font-medium text-xs mt-1 flex items-center gap-1 drop-shadow-sm">
                  <ShieldCheck size={14} className="text-blue-400" /> University of Moratuwa Alumni
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. FLOATING WHITE PILL SEARCH BAR (MATCHING REFERENCE SCREENSHOT 1) */}
        <div className="mt-12 max-w-4xl mx-auto relative animate-fade-up z-30">
          <form
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 rounded-[2.5rem] bg-white/95 backdrop-blur-2xl text-slate-900 shadow-[0_25px_60px_rgba(244,63,94,0.3)] flex flex-col sm:flex-row items-center gap-2 border border-white/80 relative"
          >
            {/* Field 1: LOOKING FOR (Bride or Groom) */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                onClick={() => setShowGenderPopup(!showGenderPopup)}
                className="w-full flex items-center gap-3 px-5 py-3 rounded-full hover:bg-slate-100/90 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <User size={20} />
                </div>
                <div className="flex-1">
                  <span className="block text-[10px] font-black text-slate-400 tracking-wider uppercase font-sans">
                    LOOKING FOR
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1 font-sinhala">
                    {lookingFor === 'Female' ? 'Bride (සහකාරියක්)' : 'Groom (සහකරුවෙක්)'}
                  </span>
                </div>
                <ChevronDown size={18} className="text-slate-400" />
              </button>

              {/* Popup Picker matching Screenshot 1 (OPENS DOWNWARDS BELOW SEARCH BAR) */}
              {showGenderPopup && (
                <div className="absolute top-full left-0 mt-3 w-full sm:w-[360px] bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 z-50 animate-fade-up text-left">
                  <span className="block text-[11px] font-black text-slate-400 tracking-wider uppercase mb-3 font-sans">
                    SELECT TYPE
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setLookingFor('Female');
                        setShowGenderPopup(false);
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${lookingFor === 'Female'
                        ? 'border-rose-500 bg-rose-50/70 text-rose-600 shadow-sm'
                        : 'border-slate-100 hover:border-rose-200 text-slate-700'
                        }`}
                    >
                      <span className="text-3xl mb-1">👰</span>
                      <span className="font-extrabold text-sm font-sans">Bride</span>
                      <span className="text-[10px] font-bold text-slate-500 font-sinhala">සහකාරියක්</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLookingFor('Male');
                        setShowGenderPopup(false);
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${lookingFor === 'Male'
                        ? 'border-rose-500 bg-rose-50/70 text-rose-600 shadow-sm'
                        : 'border-slate-100 hover:border-rose-200 text-slate-700'
                        }`}
                    >
                      <span className="text-3xl mb-1">🤵</span>
                      <span className="font-extrabold text-sm font-sans">Groom</span>
                      <span className="text-[10px] font-bold text-slate-500 font-sinhala">සහකරුවෙක්</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Divider line */}
            <div className="hidden sm:block w-px h-10 bg-slate-200" />

            {/* Field 2: AGE RANGE */}
            <div className="flex-1 w-full flex items-center gap-3 px-5 py-3 rounded-full hover:bg-slate-100/90 transition-colors text-left">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black text-slate-400 tracking-wider uppercase font-sans">
                  AGE RANGE
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-transparent text-sm font-extrabold text-slate-900 focus:outline-none cursor-pointer font-sans"
                >
                  <option value="18 - 25">18 – 25 Years</option>
                  <option value="26 - 32">26 – 32 Years</option>
                  <option value="33 - 40">33 – 40 Years</option>
                  <option value="18 - 80">18 – 80 Years</option>
                </select>
              </div>
            </div>

            {/* Field 3: Search Action Button */}
            <button
              type="submit"
              className="w-full sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white flex items-center justify-center shadow-xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all shrink-0"
              title="Search Proposals"
            >
              <Search size={22} strokeWidth={2.5} />
            </button>
          </form>

          {/* Sub-Badges under Search Bar */}
          <div className="mt-4 flex items-center justify-center gap-6 text-slate-300 text-xs font-extrabold font-sans">
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <ShieldCheck size={14} className="text-emerald-400" /> NIC verified
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <Lock size={14} className="text-blue-400" /> Privacy first
            </span>
            <span className="flex items-center gap-1.5 drop-shadow-md">
              <Heart size={14} className="text-rose-400" fill="currentColor" /> Genuine matches
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
