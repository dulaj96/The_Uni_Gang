import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Crown, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  ArrowRight,
  FileText,
  Star,
  Check,
  Compass,
  Lock,
  Award
} from 'lucide-react';
import { 
  NAKSHATRAS, 
  RASHIS, 
  calculateAstroPorondam, 
  AstroMatchReport 
} from '../utils/astroEngine';
import { cx } from '../components/ui/ProposalPrimitives';

// Rich Visual Image Assets
import astroCoupleHero from '../../../assets/astro_couple_hero.png';
import astroZodiacBg from '../../../assets/astro_zodiac_bg.png';
import astroCoupleCard from '../../../assets/astro_couple_card.png';

export default function ProposalAstroHubPage({ setPage }: { setPage: (p: string) => void }) {
  const [brideNakId, setBrideNakId] = useState<number>(1); // Aswida
  const [groomNakId, setGroomNakId] = useState<number>(2); // Berana
  const [brideRashiId, setBrideRashiId] = useState<number>(1); // Mesha
  const [groomRashiId, setGroomRashiId] = useState<number>(2); // Vrishabha
  const [hasKujaBride, setHasKujaBride] = useState(false);
  const [hasKujaGroom, setHasKujaGroom] = useState(false);
  const [showDetailedTable, setShowDetailedTable] = useState(true);

  // Real-time calculation from 20-porondam engine
  const report: AstroMatchReport = calculateAstroPorondam(
    brideNakId,
    groomNakId,
    brideRashiId,
    groomRashiId,
    hasKujaBride,
    hasKujaGroom
  );

  return (
    <div className="w-full min-h-screen py-10 px-4 sm:px-6 lg:px-12 font-sans bg-slate-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      
      {/* ATMOSPHERIC AMBIENT GLOW ORBS */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">

        {/* 1. HERO BANNER WITH REAL HIGH-RES VISUAL COUPLE IMAGE */}
        <div className="relative rounded-[3rem] p-1 bg-gradient-to-r from-purple-500/50 via-pink-500/40 to-amber-500/50 shadow-[0_20px_60px_0_rgba(147,51,234,0.3)]">
          <div className="rounded-[2.9rem] p-8 sm:p-12 bg-slate-950/90 backdrop-blur-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Background Texture Graphic */}
            <img 
              src={astroZodiacBg} 
              alt="Zodiac Sky Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-screen"
            />

            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 font-extrabold text-xs shadow-lg backdrop-blur-md">
                <Sparkles size={16} className="text-amber-400 animate-pulse" />
                <span className="font-sinhala">ශ්‍රී ලාංකේය පාරම්පරික ජ්‍යොතිෂ 20-පොරොන්දම් පද්ධතිය</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] font-plus-jakarta">
                Astro Match Hub <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-purple-300 font-sinhala">
                  ජ්‍යොතිෂ පොරොන්දම් පරීක්ෂාව
                </span>
              </h1>

              <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed font-sinhala">
                ඔබගේ සහ සහකරුගේ/සහකාරියගේ උපන් නැකත හා රාශිය අනුව 100%ක් නිවැරදි <strong className="text-amber-300 font-black">විසි පොරොන්දම් ගැලපීම</strong>, <strong className="text-rose-300 font-black">කුජ දෝෂය</strong> සහ <strong className="text-purple-300 font-black">සෙනසුරු ඒරාෂ්ටක දෝෂ</strong> ක්ෂණිකව ගණනය කරගන්න.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-slate-200 font-sinhala pt-1">
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-md shadow-md">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>නැකත් 27 & රාශි 12 පරීක්ෂාව</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-md shadow-md">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>කුජ දෝෂ භංග වීම්</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-md shadow-md">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>PDF වාර්තාව Download</span>
                </div>
              </div>
            </div>

            {/* Right Image Graphic Showcase */}
            <div className="lg:col-span-5 relative z-10 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[2.5rem] p-2 bg-gradient-to-tr from-amber-400/40 via-purple-500/40 to-pink-500/40 shadow-2xl">
                <div className="rounded-[2.2rem] overflow-hidden relative shadow-inner aspect-[4/5] bg-slate-900">
                  <img 
                    src={astroCoupleHero} 
                    alt="Astro Sri Lankan Couple" 
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/15 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300 font-sinhala flex items-center gap-1.5">
                        <Award size={14} className="text-amber-400" />
                        <span>100% නිවැරදි සාම්ප්‍රදායික ගණනය</span>
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sinhala font-medium">
                      Couples සඳහා හෝ Single Proposals සඳහා වෙනමම භාවිත කළ හැක.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. CALCULATOR SECTION - DUAL GLASS CARDS WITH ZODIAC BACKGROUND */}
        <div className="rounded-[3rem] p-1 bg-gradient-to-b from-slate-800/80 to-slate-900/90 shadow-2xl border border-white/10 backdrop-blur-2xl relative overflow-hidden">
          
          <img 
            src={astroZodiacBg} 
            alt="Zodiac Sky" 
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 pointer-events-none mix-blend-screen"
          />

          <div className="p-6 sm:p-10 space-y-8 relative z-10">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-[11px] font-black uppercase text-amber-400 tracking-widest flex items-center gap-1.5 mb-1">
                  <Compass size={14} /> LIVE COMPATIBILITY CALCULATOR
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 font-sinhala">
                  <span>පොරොන්දම් ගණක යන්ත්‍රය</span>
                </h2>
              </div>
              <span className="text-xs font-bold px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                100% Traditional Vedic Algorithm
              </span>
            </div>

            {/* INPUT FORM GRID (Bride vs Groom Glass Panels) */}
            <div className="grid md:grid-cols-2 gap-8 text-xs font-bold">
              
              {/* BRIDE INPUT CARD */}
              <div className="p-6 rounded-[2.2rem] bg-gradient-to-b from-pink-950/40 to-slate-950/90 border border-pink-500/30 shadow-[0_8px_32px_0_rgba(244,63,94,0.12)] space-y-5 relative overflow-hidden group">
                <div className="flex items-center justify-between border-b border-pink-500/20 pb-3">
                  <span className="text-sm font-black uppercase text-pink-300 tracking-wider flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/40">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <span className="font-sinhala">මනාලියගේ විස්තර (Bride)</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-sinhala">
                    මනාලිය
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] text-pink-200 uppercase font-black tracking-wider block mb-1.5 font-sinhala">
                      උපන් නැකත (Nakshatra)
                    </label>
                    <select
                      value={brideNakId}
                      onChange={(e) => setBrideNakId(Number(e.target.value))}
                      className="w-full bg-slate-900/90 border border-pink-500/30 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-inner cursor-pointer"
                    >
                      {NAKSHATRAS.map((n) => (
                        <option key={n.id} value={n.id}>{n.id}. {n.nameSinhala} ({n.name})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-pink-200 uppercase font-black tracking-wider block mb-1.5 font-sinhala">
                      උපන් රාශිය (Rashi)
                    </label>
                    <select
                      value={brideRashiId}
                      onChange={(e) => setBrideRashiId(Number(e.target.value))}
                      className="w-full bg-slate-900/90 border border-pink-500/30 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 shadow-inner cursor-pointer"
                    >
                      {RASHIS.map((r) => (
                        <option key={r.id} value={r.id}>{r.nameSinhala}</option>
                      ))}
                    </select>
                  </div>

                  <div 
                    onClick={() => setHasKujaBride(!hasKujaBride)}
                    className={cx(
                      "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                      hasKujaBride ? "bg-pink-500/20 border-pink-500/50 text-pink-200" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-pink-500/30"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cx(
                        "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                        hasKujaBride ? "bg-pink-500 border-pink-400 text-white" : "border-slate-700"
                      )}>
                        {hasKujaBride && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-bold font-sinhala">මනාලියට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                    </div>
                    {hasKujaBride && <span className="text-[10px] font-black text-pink-400 bg-pink-950/80 px-2 py-0.5 rounded-md border border-pink-500/30">Active</span>}
                  </div>
                </div>
              </div>

              {/* GROOM INPUT CARD */}
              <div className="p-6 rounded-[2.2rem] bg-gradient-to-b from-indigo-950/40 to-slate-950/90 border border-indigo-500/30 shadow-[0_8px_32px_0_rgba(99,102,241,0.12)] space-y-5 relative overflow-hidden group">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                  <span className="text-sm font-black uppercase text-indigo-300 tracking-wider flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/40">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    <span className="font-sinhala">මනාලයාගේ විස්තර (Groom)</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sinhala">
                    මනාලයා
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] text-indigo-200 uppercase font-black tracking-wider block mb-1.5 font-sinhala">
                      උපන් නැකත (Nakshatra)
                    </label>
                    <select
                      value={groomNakId}
                      onChange={(e) => setGroomNakId(Number(e.target.value))}
                      className="w-full bg-slate-900/90 border border-indigo-500/30 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner cursor-pointer"
                    >
                      {NAKSHATRAS.map((n) => (
                        <option key={n.id} value={n.id}>{n.id}. {n.nameSinhala} ({n.name})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-indigo-200 uppercase font-black tracking-wider block mb-1.5 font-sinhala">
                      උපන් රාශිය (Rashi)
                    </label>
                    <select
                      value={groomRashiId}
                      onChange={(e) => setGroomRashiId(Number(e.target.value))}
                      className="w-full bg-slate-900/90 border border-indigo-500/30 rounded-2xl px-4 py-3.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner cursor-pointer"
                    >
                      {RASHIS.map((r) => (
                        <option key={r.id} value={r.id}>{r.nameSinhala}</option>
                      ))}
                    </select>
                  </div>

                  <div 
                    onClick={() => setHasKujaGroom(!hasKujaGroom)}
                    className={cx(
                      "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between",
                      hasKujaGroom ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-200" : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-indigo-500/30"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={cx(
                        "w-5 h-5 rounded-md flex items-center justify-center border transition-colors",
                        hasKujaGroom ? "bg-indigo-500 border-indigo-400 text-white" : "border-slate-700"
                      )}>
                        {hasKujaGroom && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className="text-xs font-bold font-sinhala">මනාලයාට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                    </div>
                    {hasKujaGroom && <span className="text-[10px] font-black text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-500/30">Active</span>}
                  </div>
                </div>
              </div>

            </div>

            {/* RESULTS DISPLAY BOARD - GLOWING VERDICT BANNER */}
            <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 shadow-2xl">
              <div className="rounded-[2.4rem] p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-purple-950/90 to-slate-950 text-white relative overflow-hidden backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                  
                  <div className="text-center sm:text-left space-y-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 tracking-wider shadow-md font-sans">
                      <Star size={12} fill="currentColor" /> 20-PORONDAM RESULT VERDICT
                    </span>
                    
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans flex items-center justify-center sm:justify-start gap-3">
                      <span>{report.totalMatched} / 20</span>
                      <span className="text-xl sm:text-2xl text-purple-300 font-extrabold font-sinhala">පොරොන්දම් සාර්ථකයි</span>
                    </h3>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 font-sinhala pt-1">
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black flex items-center gap-1.5">
                        <CheckCircle2 size={15} /> Compatibility: {report.percentage}%
                      </span>
                      <span className="px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-black">
                        {report.verdict}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sinhala max-w-xl">
                      {report.kujaDoshayaStatus}
                    </p>
                  </div>

                  {/* Score Gauge Circle */}
                  <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 p-1.5 shadow-2xl shadow-purple-500/40 shrink-0 relative group">
                    <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center text-center backdrop-blur-md">
                      <span className="text-3xl font-black text-amber-300 font-sans tracking-tight">{report.percentage}%</span>
                      <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest mt-0.5">Score</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* GRANULAR 20-PORONDAM BREAKDOWN TABLE */}
            <div className="space-y-4 pt-2">
              <button
                onClick={() => setShowDetailedTable(!showDetailedTable)}
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-between border border-slate-700/80 transition-all cursor-pointer shadow-lg group"
              >
                <div className="flex items-center gap-2 text-purple-300 font-sinhala">
                  <Sparkles size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-sm">විසි පොරොන්දම් ලැයිස්තු විග්‍රහය (Full 20-Porondam Detailed Table)</span>
                </div>
                {showDetailedTable ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {showDetailedTable && (
                <div className="grid sm:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto custom-scrollbar pr-1 pt-1">
                  {report.items.map((item, idx) => (
                    <div
                      key={item.title}
                      className={cx(
                        "p-4 rounded-2xl border flex items-start justify-between gap-3 text-xs transition-all duration-300 hover:-translate-y-0.5",
                        item.passed 
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-white hover:border-emerald-500/50' 
                          : 'bg-rose-950/20 border-rose-500/30 text-white hover:border-rose-500/50'
                      )}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span className="font-extrabold text-slate-500 w-6 shrink-0 font-sans text-xs">{idx + 1}.</span>
                        <div className="space-y-1">
                          <h4 className="font-black text-xs flex items-center gap-1.5 font-sinhala text-amber-200">
                            <span>{item.titleSinhala}</span>
                            <span className="text-[10px] text-slate-400 font-sans font-normal">({item.title})</span>
                          </h4>
                          <p className="text-[11px] font-medium text-slate-300 font-sinhala leading-relaxed">{item.details}</p>
                        </div>
                      </div>

                      <span className={cx(
                        "text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 border uppercase tracking-wider font-sans",
                        item.passed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      )}>
                        {item.passed ? '✔ Pass' : '✖ Alert'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. SERVICE PACKAGES WITH RICH IMAGE CARD */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-black uppercase text-amber-400 tracking-widest px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
              PRICING & MEMBERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-serif">
              Astro Service Packages 💎
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-medium font-sinhala">
              එක් පොරොන්දම් පරීක්ෂාවක් සඳහා හෝ ලිපින සහිත සම්පූර්ණ PDF වාර්තාවක් ලබාගැනීමට පහත පැකේජයක් තෝරාගන්න.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Image Graphic Card */}
            <div className="lg:col-span-4 rounded-[2.5rem] overflow-hidden relative border border-white/10 shadow-2xl bg-slate-900 group">
              <img 
                src={astroCoupleCard} 
                alt="Sri Lankan Astro Couple" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 space-y-2">
                <span className="text-xs font-black text-amber-300 font-sinhala flex items-center gap-1.5">
                  <Sparkles size={14} /> 100% Confidential & Instant PDF
                </span>
                <h4 className="text-lg font-black text-white font-sinhala">
                  ඔබගේ සහ සහකරුගේ නැකත පරීක්ෂා කරගන්න.
                </h4>
                <p className="text-xs text-slate-300 font-sinhala leading-relaxed">
                  VIP members සඳහා සියලුම profiles හි පොරොන්දම් නොමිලේ බැලිය හැක.
                </p>
              </div>
            </div>

            {/* PACKAGE 1: Single Report Check */}
            <div className="lg:col-span-4 rounded-[2.5rem] p-1 bg-gradient-to-b from-purple-500/40 to-slate-800/40 shadow-xl">
              <div className="rounded-[2.4rem] p-8 bg-slate-900/90 backdrop-blur-2xl space-y-6 flex flex-col justify-between h-full border border-white/10">
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wider">
                    COUPLE / SINGLE CHECK
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-white font-sinhala">Single Astro Report</h3>
                    <p className="text-3xl font-black text-purple-300 mt-1">රු. 499/= <span className="text-xs text-slate-400 font-normal">/ එක පාරක් පමණයි</span></p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sinhala">
                    ඕනෑම එක් මංගල යෝජනාවක් සඳහා 100%ක් නිවැරදි විසි පොරොන්දම් ගණනය කිරීම හා මුද්‍රිත PDF වාර්තාව ලබාගැනීමට.
                  </p>
                  <div className="space-y-3 text-xs font-bold text-slate-300 pt-2 font-sinhala">
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Full 20-Porondam Score Analysis</div>
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Kuja & Shani Doshaya Cancellation Check</div>
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Official Downloadable PDF Report</div>
                  </div>
                </div>

                <button
                  onClick={() => alert("Redirecting to Rs. 499 Single Astro Report Checkout...")}
                  className="w-full py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center uppercase tracking-wider"
                >
                  Buy Single Report - Rs. 499/=
                </button>
              </div>
            </div>

            {/* PACKAGE 2: VIP Pro Unlimited Pass */}
            <div className="lg:col-span-4 rounded-[2.5rem] p-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-2xl relative overflow-hidden">
              <div className="rounded-[2.4rem] p-8 bg-gradient-to-b from-slate-900 via-amber-950/40 to-slate-950 backdrop-blur-2xl space-y-6 flex flex-col justify-between h-full relative">
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-lg">
                  BEST VALUE 👑
                </div>
                
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wider">
                    UNLIMITED MEMBERSHIP
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-amber-200 font-sinhala">VIP Pro Unlimited</h3>
                    <p className="text-3xl font-black text-amber-300 mt-1">රු. 1,499/= <span className="text-xs text-slate-400 font-normal">/ මසකට</span></p>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sinhala">
                    සියලුම Proposal Profiles සඳහා Unlimited Astro Matching, Direct Chat සහ Priority Verification ලබාගැනීමට.
                  </p>
                  <div className="space-y-3 text-xs font-bold text-slate-200 pt-2 font-sinhala">
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Unlimited Astro Porondam Reports</div>
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> 10x Proposal Match Visibility</div>
                    <div className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Direct Messaging & Horoscope Downloads</div>
                  </div>
                </div>

                <button
                  onClick={() => setPage('premium')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center flex items-center justify-center gap-2 uppercase tracking-wider font-sans"
                >
                  <span>Upgrade to VIP Pro (Rs. 1,499)</span>
                  <ArrowRight size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
