import React from 'react';
import { Heart, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { WatermarkOverlay } from '../privacy/WatermarkOverlay';
import { useTheme } from '../../../../context/ThemeContext';

export interface CandidateProfile {
  id: string | number;
  code: string;
  name: string;
  age: number;
  district: string;
  hometown?: string;
  profession: string;
  monthlyIncome?: string;
  images: string[];
  blurPhoto?: boolean;
  isVIP?: boolean;
  isVerified?: boolean;
  isPhoneVerified?: boolean;
  civilStatus?: string;
  ethnicity?: string;
  religion?: string;
  caste?: string;
  height?: string;
  country?: string;
  publishedDate?: string;
}

interface ProposalSearchResultCardProps {
  profile: CandidateProfile;
  layoutMode?: 'grid' | 'compact';
  onSendInterest: (profile: CandidateProfile) => void;
  onViewProfile: (profile: CandidateProfile) => void;
}

export default function ProposalSearchResultCard({
  profile,
  layoutMode = 'grid',
  onSendInterest,
  onViewProfile,
}: ProposalSearchResultCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    code = 'BR000158',
    name = 'Piyumali L.',
    age = 31,
    district = 'Colombo 1',
    profession = 'Lecturer',
    monthlyIncome = 'Rs 200,000 - Rs 300,000',
    images = ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    blurPhoto = false,
    isVIP = true,
    isVerified = true,
    civilStatus = 'Never Married (අවිවාහක)',
    ethnicity = 'Sinhalese',
    religion = 'Buddhist',
    caste = 'Govigama',
    height = '5.4 ft',
    country = 'Sri Lanka',
    publishedDate = '8/31/2026',
  } = profile;

  /* ========================================================================= */
  /* 1. MODERN 2-COLUMN GRID GALLERY CARD VIEW                                 */
  /* ========================================================================= */
  if (layoutMode === 'grid') {
    return (
      <div
        className={`relative w-full rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 border overflow-hidden shadow-lg hover:shadow-2xl group font-sans ${
          isVIP
            ? isDark
              ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400'
              : 'bg-gradient-to-b from-amber-50/60 to-white border-amber-300/80 hover:border-amber-400'
            : isDark
            ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/40'
            : 'bg-white border-slate-200 hover:border-rose-300'
        }`}
      >
        {/* VIP Ribbon Badge */}
        {isVIP && (
          <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-20 font-sans">
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] uppercase tracking-wider py-1 text-center rotate-45 transform translate-x-7 translate-y-4 shadow-md font-sans border-y border-amber-200">
              VIP
            </div>
          </div>
        )}

        <div>
          {/* Top Info Bar: Code & Verified Badge */}
          <div className="flex items-center justify-between mb-3 pr-10 font-sans">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border font-sans ${
              isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              {code}
            </span>
            {isVerified && (
              <span className="text-[10px] font-bold text-blue-500 flex items-center gap-1 font-sans">
                <ShieldCheck size={13} /> Verified
              </span>
            )}
          </div>

          {/* High-Impact Portrait Photo Frame */}
          <div
            onClick={() => onViewProfile(profile)}
            className={`relative w-full h-60 rounded-2xl overflow-hidden cursor-pointer border-2 transition-transform duration-500 group-hover:scale-[1.01] shadow-md mb-4 ${
              isVIP ? 'border-amber-400/90 shadow-amber-500/10' : isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <WatermarkOverlay text={`ID: ${code} • Uni Porondam`}>
              <img
                src={images[0]}
                alt={name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  blurPhoto ? 'blur-xl opacity-80' : ''
                }`}
              />
            </WatermarkOverlay>

            {blurPhoto && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm font-sans">
                <span className="bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                  Photo Blurred
                </span>
              </div>
            )}
          </div>

          {/* Candidate Name (Font-Sans Font-Black) & Quick Details */}
          <div className="mb-3 font-sans">
            <h3
              onClick={() => onViewProfile(profile)}
              className={`text-xl font-black tracking-tight cursor-pointer hover:text-rose-500 transition-colors font-sans ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {name}, <span className="text-base font-bold font-sans">{age} yrs</span>
            </h3>

            <p className={`text-xs font-semibold mt-1 flex items-center gap-1.5 flex-wrap font-sans ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <span>{district}</span>
              <span className="text-slate-400">•</span>
              <span>{profession}</span>
            </p>

            {monthlyIncome && (
              <p className="text-xs font-extrabold text-rose-500 mt-1 font-sans">
                {monthlyIncome}
              </p>
            )}
          </div>

          {/* Verification Indicators */}
          <div className="flex items-center gap-3 mb-3 text-[11px] font-bold font-sans">
            <span className="flex items-center gap-1 text-emerald-500">
              Photos <Check size={12} strokeWidth={3} />
            </span>
            <span className="flex items-center gap-1 text-emerald-500">
              Phone <Check size={12} strokeWidth={3} />
            </span>
          </div>

          {/* Attribute Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4 font-sinhala">
            {civilStatus && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {civilStatus}
              </span>
            )}
            {religion && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {religion}
              </span>
            )}
            {height && (
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {height}
              </span>
            )}
          </div>
        </div>

        {/* Action Button & Footer Link */}
        <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 font-sans">
          <button
            type="button"
            onClick={() => onSendInterest(profile)}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg shadow-rose-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-sans mb-2"
          >
            <Heart size={14} fill="white" className="text-white" />
            <span>Send interest</span>
          </button>

          <div className="flex items-center justify-between text-[11px] font-sans">
            <button
              type="button"
              onClick={() => onViewProfile(profile)}
              className="text-slate-900 dark:text-white font-extrabold hover:text-rose-500 flex items-center gap-1 transition-colors font-sans cursor-pointer"
            >
              View profile <ArrowRight size={12} />
            </button>
            {publishedDate && <span className="text-slate-400 font-sans">{publishedDate}</span>}
          </div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /* 2. SLEEK COMPACT LIST CARD VIEW                                           */
  /* ========================================================================= */
  return (
    <div
      className={`relative w-full rounded-3xl p-5 transition-all duration-300 border overflow-hidden shadow-lg hover:shadow-2xl group font-sans ${
        isVIP
          ? isDark
            ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400'
            : 'bg-amber-50/40 border-amber-300/80 hover:border-amber-400'
          : isDark
          ? 'bg-slate-900/80 border-slate-800 hover:border-rose-500/40'
          : 'bg-white border-slate-200 hover:border-rose-300'
      }`}
    >
      {isVIP && (
        <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none z-20 font-sans">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-[10px] uppercase tracking-wider py-1 text-center rotate-45 transform translate-x-7 translate-y-4 shadow-md font-sans border-y border-amber-200">
            VIP
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center font-sans">
        {/* Left Photo */}
        <div
          onClick={() => onViewProfile(profile)}
          className={`relative w-full sm:w-36 h-44 rounded-2xl overflow-hidden shrink-0 cursor-pointer border-2 transition-transform duration-500 group-hover:scale-[1.02] shadow-md ${
            isVIP ? 'border-amber-400/90' : isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <WatermarkOverlay text={`ID: ${code}`}>
            <img src={images[0]} alt={name} className="w-full h-full object-cover" />
          </WatermarkOverlay>
        </div>

        {/* Right Info */}
        <div className="flex-1 w-full flex flex-col justify-between font-sans">
          <div className="flex items-start justify-between gap-3 pr-10 font-sans">
            <div>
              <div className="flex items-center gap-2">
                <h3 onClick={() => onViewProfile(profile)} className={`text-xl font-black tracking-tight cursor-pointer hover:text-rose-500 font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {name}
                </h3>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border font-sans ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {code}
                </span>
              </div>
              <p className={`text-xs font-semibold mt-1 font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {age} yrs • {district} • {profession} • <span className="text-rose-500 font-extrabold font-sans">{monthlyIncome}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSendInterest(profile)}
              className="shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white font-extrabold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
            >
              <Heart size={14} fill="white" />
              <span>Send interest</span>
            </button>
          </div>

          <div className="flex items-center gap-4 my-2 text-xs font-bold text-emerald-500 font-sans">
            <span>Photos ✔</span>
            <span>Phone ✔</span>
            {isVerified && <span className="text-blue-500 flex items-center gap-1 font-sans"><ShieldCheck size={14} /> NIC Verified</span>}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50 text-xs font-sans">
            <button type="button" onClick={() => onViewProfile(profile)} className="text-slate-900 dark:text-white font-extrabold hover:text-rose-500 flex items-center gap-1 font-sans cursor-pointer">
              View profile <ArrowRight size={14} />
            </button>
            {publishedDate && <span className="text-[11px] text-slate-400 font-sans">Published {publishedDate}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
