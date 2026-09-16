import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Heart,
  ArrowRight,
  Star,
  Check,
  Award,
  Crown,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  NAKSHATRAS, 
  RASHIS, 
  calculateAstroPorondam, 
  AstroMatchReport 
} from '../utils/astroEngine';

// Rich Visual Image Assets
import astroCoupleHero from '../../../assets/astro_couple_hero.png';
import astroCoupleCard from '../../../assets/astro_couple_card.png';

export default function ProposalAstroHubPage({ setPage }: { setPage: (p: string) => void }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [brideNakId, setBrideNakId] = useState<number>(1); // Aswida
  const [groomNakId, setGroomNakId] = useState<number>(2); // Berana
  const [brideRashiId, setBrideRashiId] = useState<number>(1); // Mesha
  const [groomRashiId, setGroomRashiId] = useState<number>(2); // Vrishabha
  const [hasKujaBride, setHasKujaBride] = useState(false);
  const [hasKujaGroom, setHasKujaGroom] = useState(false);
  const [filterMode, setFilterMode] = useState<'all' | 'passed' | 'alerts'>('all');

  // Real-time calculation from 20-porondam engine
  const report: AstroMatchReport = calculateAstroPorondam(
    brideNakId,
    groomNakId,
    brideRashiId,
    groomRashiId,
    hasKujaBride,
    hasKujaGroom
  );

  const filteredItems = useMemo(() => {
    if (filterMode === 'passed') return report.items.filter(i => i.passed);
    if (filterMode === 'alerts') return report.items.filter(i => !i.passed);
    return report.items;
  }, [report.items, filterMode]);

  const passedCount = report.items.filter(i => i.passed).length;
  const alertCount = report.items.filter(i => !i.passed).length;

  return (
    <div className={`w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sinhala transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-12">

        {/* 1. HERO SECTION WITH IMAGE & FLOATING MOTION BADGES (PROPOSAL HOME STYLE) */}
        <div className={`rounded-[2.5rem] p-6 sm:p-10 border shadow-2xl transition-all duration-300 relative overflow-hidden group ${
          isDark 
            ? 'bg-slate-900/95 border-slate-800 text-white shadow-purple-900/10' 
            : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}>
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-500 font-extrabold text-xs uppercase tracking-wider border border-rose-500/20">
                <Sparkles size={14} className="animate-pulse text-rose-500" />
                <span>20-Porondam Astro System</span>
              </div>

              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Astro Match <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500">(ජ්‍යොතිෂ පොරොන්දම් පරීක්ෂාව)</span>
              </h1>

              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Uni Porondam මංගල සේවාව පිළිබඳ 100%ක් නිවැරදි සාම්ප්‍රදායික විසි පොරොන්දම් ගැලපීම, කුජ දෝෂය සහ සෙනසුරු ඒරාෂ්ටක දෝෂ ක්ෂණිකව ගණනය කරගන්න.
              </p>

              <div className="space-y-2.5 text-xs font-semibold pt-1">
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> නැකත් 27 & රාශි 12 පාරම්පරික විද්‍යාත්මක පරීක්ෂාව
                </div>
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> කුජ දෝෂ සහ සෙනසුරු ඒරාෂ්ටක දෝෂ භංග වීම්
                </div>
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> මුද්‍රිත නිවැරදි PDF වාර්තාව Download කරගන්න
                </div>
              </div>
            </div>

            {/* Right Visual Image Side with Floating Motion Badges */}
            <div className="lg:col-span-5 relative h-[320px] sm:h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group/img">
              <img 
                src={astroCoupleHero} 
                alt="Sri Lankan Astro Couple" 
                className="w-full h-full object-cover object-top opacity-95 group-hover/img:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Badge Top Right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-amber-400/40 text-amber-300 backdrop-blur-xl shadow-xl flex items-center gap-1.5 text-xs font-black uppercase tracking-wider"
              >
                <Sparkles size={14} className="text-amber-400" />
                <span>100% Traditional Match</span>
              </motion.div>

              {/* Floating Badge Top Left */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-rose-500 text-white shadow-xl flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              >
                <Heart size={13} fill="currentColor" /> 20-Porondam Engine
              </motion.div>

              {/* Bottom Glass Overlay */}
              <div className={`absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl backdrop-blur-xl shadow-xl flex items-center justify-between border ${
                isDark ? 'bg-slate-900/90 border-slate-700 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                    <Heart size={18} fill="white" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight">
                      විසි පොරොන්දම් ගණනය
                    </h4>
                    <p className="text-[11px] font-semibold text-rose-500 mt-0.5">
                      සාර්ථකත්වය: 100% Verified
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase">
                  VERIFIED
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. DUAL CALCULATOR CARDS (BRIDE VS GROOM) */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* BRIDE CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-base font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2">
                <Heart size={18} className="fill-current" />
                <span>මනාලියගේ විස්තර (Bride)</span>
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                මනාලිය
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  උපන් නැකත (Nakshatra)
                </label>
                <select
                  value={brideNakId}
                  onChange={(e) => setBrideNakId(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.id} value={n.id}>{n.id}. {n.nameSinhala} ({n.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  උපන් රාශිය (Rashi)
                </label>
                <select
                  value={brideRashiId}
                  onChange={(e) => setBrideRashiId(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>{r.nameSinhala}</option>
                  ))}
                </select>
              </div>

              <div 
                onClick={() => setHasKujaBride(!hasKujaBride)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasKujaBride 
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${hasKujaBride ? 'bg-rose-500 text-white border-rose-500' : 'border-slate-400'}`}>
                    {hasKujaBride && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>මනාලියට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                </div>
              </div>
            </div>
          </div>

          {/* GROOM CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <span className="text-base font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                <Heart size={18} className="fill-current" />
                <span>මනාලයාගේ විස්තර (Groom)</span>
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                මනාලයා
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  උපන් නැකත (Nakshatra)
                </label>
                <select
                  value={groomNakId}
                  onChange={(e) => setGroomNakId(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.id} value={n.id}>{n.id}. {n.nameSinhala} ({n.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  උපන් රාශිය (Rashi)
                </label>
                <select
                  value={groomRashiId}
                  onChange={(e) => setGroomRashiId(Number(e.target.value))}
                  className="w-full rounded-xl px-4 py-3 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>{r.nameSinhala}</option>
                  ))}
                </select>
              </div>

              <div 
                onClick={() => setHasKujaGroom(!hasKujaGroom)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  hasKujaGroom 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs font-semibold">
                  <div className={`w-4 h-4 rounded flex items-center justify-center border ${hasKujaGroom ? 'bg-indigo-500 text-white border-indigo-500' : 'border-slate-400'}`}>
                    {hasKujaGroom && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>මනාලයාට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. VERDICT RESULT BANNER */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
              ★ 20-Porondam Match Result
            </span>
            <h2 className="text-3xl sm:text-4xl font-black flex items-center justify-center sm:justify-start gap-3">
              <span>{report.totalMatched} / 20</span>
              <span className="text-lg font-bold text-rose-100 font-sinhala">පොරොන්දම් සාර්ථකයි ({report.percentage}%)</span>
            </h2>
            <p className="text-xs text-rose-100 max-w-xl font-sinhala leading-relaxed">
              {report.kujaDoshayaStatus}
            </p>
          </div>

          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center shrink-0 shadow-lg">
            <span className="text-2xl font-black text-white">{report.percentage}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-100">Score</span>
          </div>
        </div>

        {/* 4. BREAKDOWN TABLE */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-sinhala flex items-center gap-2">
              <Sparkles size={18} className="text-rose-500" />
              <span>විසි පොරොන්දම් ලැයිස්තු විග්‍රහය (Full Breakdown)</span>
            </h3>
            
            <div className="flex gap-2 text-xs font-bold font-sinhala">
              <button 
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'all' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                සියල්ල ({report.items.length})
              </button>
              <button 
                onClick={() => setFilterMode('passed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'passed' ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                සාර්ථකයි ({passedCount})
              </button>
              <button 
                onClick={() => setFilterMode('alerts')}
                className={`px-3 py-1.5 rounded-lg transition-all ${filterMode === 'alerts' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
              >
                අවධානය ({alertCount})
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.title}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs transition-all ${
                  item.passed 
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200' 
                    : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="font-extrabold text-slate-400 w-5 shrink-0 text-xs">{idx + 1}.</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs font-sinhala text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{item.titleSinhala}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({item.title})</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sinhala leading-relaxed">{item.details}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 border ${
                  item.passed ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}>
                  {item.passed ? '✔ Pass' : '✖ Alert'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. PRICING CARDS WITH VISUAL GRAPHIC CARD */}
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Service Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Astro Membership Packages 💎
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Graphic Showcase Card */}
            <div className="lg:col-span-4 rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-xl group min-h-[280px]">
              <img 
                src={astroCoupleCard} 
                alt="Sri Lankan Astro Couple" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 space-y-1.5 text-white">
                <span className="text-xs font-extrabold text-amber-300 font-sinhala flex items-center gap-1.5">
                  <Sparkles size={14} /> 100% Confidential & Instant PDF
                </span>
                <h4 className="text-base font-bold font-sinhala">
                  ඔබගේ සහ සහකරුගේ නැකත පරීක්ෂා කරගන්න.
                </h4>
                <p className="text-xs text-slate-300 font-sinhala leading-relaxed">
                  VIP members සඳහා සියලුම profiles හි පොරොන්දම් නොමිලේ බැලිය හැක.
                </p>
              </div>
            </div>

            {/* Single Report Card */}
            <div className="lg:col-span-4 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Single Proposal Check
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Single Astro Report</h3>
                  <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">රු. 499/= <span className="text-xs font-normal text-slate-500">/ එක පාරක් පමණයි</span></p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sinhala">
                  ඕනෑම එක් මංගල යෝජනාවක් සඳහා 100%ක් නිවැරදි විසි පොරොන්දම් ගණනය කිරීම හා මුද්‍රිත PDF වාර්තාව ලබාගැනීමට.
                </p>
              </div>

              <button
                onClick={() => alert("Redirecting to Rs. 499 Single Astro Report Checkout...")}
                className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Buy Single Report - Rs. 499/=
              </button>
            </div>

            {/* VIP Pass Card */}
            <div className="lg:col-span-4 p-8 rounded-3xl bg-gradient-to-b from-rose-500/10 via-pink-500/5 to-purple-500/10 dark:from-rose-500/20 dark:via-pink-500/15 dark:to-purple-500/20 border-2 border-rose-500 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500 text-white shadow-md flex items-center gap-1">
                <Sparkles size={12} /> Best Value
              </span>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                  VIP Membership Pass
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">VIP Pro Unlimited</h3>
                  <p className="text-3xl font-extrabold text-rose-500 dark:text-rose-400 mt-1">රු. 1,499/= <span className="text-xs font-normal text-slate-500">/ මසකට</span></p>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sinhala">
                  සියලුම Proposal Profiles සඳහා Unlimited Astro Matching, Direct Chat සහ Priority Verification ලබාගැනීමට.
                </p>
              </div>

              <button
                onClick={() => setPage('premium')}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-500/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 border-none"
              >
                <Crown size={16} /> Upgrade to VIP Pro (Rs. 1,499)
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
