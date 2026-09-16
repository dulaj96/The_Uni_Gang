import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  Heart,
  ArrowRight,
  Star,
  Check,
  Award,
  Crown,
  Printer,
  Download,
  RotateCcw,
  User,
  Zap,
  X,
  FileText
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { 
  NAKSHATRAS, 
  RASHIS, 
  calculateAstroPorondam, 
  AstroMatchReport 
} from '../utils/astroEngine';

// Visual Image Assets
import astroCoupleHero from '../../../assets/astro_couple_hero.png';
import astroCoupleCard from '../../../assets/astro_couple_card.png';

export default function ProposalAstroHubPage({ setPage }: { setPage: (p: string) => void }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Form Inputs
  const [brideName, setBrideName] = useState('මනාලිය (Bride)');
  const [groomName, setGroomName] = useState('මනාලයා (Groom)');
  const [brideNakId, setBrideNakId] = useState<number>(1); // Aswida
  const [groomNakId, setGroomNakId] = useState<number>(2); // Berana
  const [brideRashiId, setBrideRashiId] = useState<number>(1); // Mesha
  const [groomRashiId, setGroomRashiId] = useState<number>(2); // Vrishabha
  const [hasKujaBride, setHasKujaBride] = useState(false);
  const [hasKujaGroom, setHasKujaGroom] = useState(false);

  // Workflow States: 'form' | 'calculating' | 'result'
  const [workflowState, setWorkflowState] = useState<'form' | 'calculating' | 'result'>('form');
  const [filterMode, setFilterMode] = useState<'all' | 'passed' | 'alerts'>('all');
  const [showPdfModal, setShowPdfModal] = useState(false);

  // Real-time report calculation (computed on submit)
  const report: AstroMatchReport = useMemo(() => {
    return calculateAstroPorondam(
      brideNakId,
      groomNakId,
      brideRashiId,
      groomRashiId,
      hasKujaBride,
      hasKujaGroom
    );
  }, [brideNakId, groomNakId, brideRashiId, groomRashiId, hasKujaBride, hasKujaGroom]);

  const filteredItems = useMemo(() => {
    if (filterMode === 'passed') return report.items.filter(i => i.passed);
    if (filterMode === 'alerts') return report.items.filter(i => !i.passed);
    return report.items;
  }, [report.items, filterMode]);

  const passedCount = report.items.filter(i => i.passed).length;
  const alertCount = report.items.filter(i => !i.passed).length;

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWorkflowState('calculating');
    setTimeout(() => {
      setWorkflowState('result');
      // Scroll to result smoothly
      const el = document.getElementById('astro-result-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  const handleResetForm = () => {
    setWorkflowState('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sinhala transition-colors duration-500 relative overflow-hidden ${
      isDark ? 'bg-[#0B0F17] text-slate-100 selection:bg-purple-500/30' : 'bg-slate-50/80 text-slate-900 selection:bg-rose-500/20'
    }`}>
      
      {/* ATMOSPHERIC AMBIENT GLOW ORBS FOR GLASSMORPHISM */}
      <div className={`absolute top-10 left-1/4 w-[650px] h-[650px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 ${
        isDark ? 'bg-purple-600/15' : 'bg-purple-300/25'
      }`} />
      <div className={`absolute top-1/3 right-10 w-[550px] h-[550px] rounded-full blur-[170px] pointer-events-none transition-all duration-700 ${
        isDark ? 'bg-rose-500/15' : 'bg-rose-300/25'
      }`} />
      <div className={`absolute bottom-10 left-10 w-[650px] h-[650px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 ${
        isDark ? 'bg-indigo-600/15' : 'bg-indigo-300/25'
      }`} />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        {/* 1. HERO SECTION - FROSTED GLASSMORPHISM CONTAINER WITH FLOATING MOTION BADGES */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-[2.8rem] p-6 sm:p-10 border backdrop-blur-2xl shadow-2xl transition-all duration-500 relative overflow-hidden group ${
            isDark 
              ? 'bg-slate-900/70 border-white/10 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]' 
              : 'bg-white/75 border-white/80 text-slate-900 shadow-[0_20px_60px_-15px_rgba(31,38,135,0.08)]'
          }`}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-500 dark:text-rose-400 font-extrabold text-xs uppercase tracking-wider border border-rose-500/20 backdrop-blur-md">
                <Sparkles size={14} className="animate-pulse text-rose-500" />
                <span>20-Porondam Astro Match System</span>
              </div>

              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Astro Match <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500">(ජ්‍යොතිෂ පොරොන්දම් පරීක්ෂාව)</span>
              </h1>

              <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                මනාලයාගේ සහ මනාලියගේ විස්තර ඇතුළත් කර <strong className="text-rose-500">"පොරොන්දම් පරීක්ෂා කරන්න"</strong> බටන් එක ක්ලික් කරන්න. සම්පූර්ණ 20-පොරොන්දම් වාර්තාව ලබාගෙන PDF එකක් ලෙස ඩවුන්ලෝඩ් කරගන්න.
              </p>

              <div className="space-y-2.5 text-xs font-semibold pt-1">
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> නැකත් 27 & රාශි 12 පාරම්පරික විද්‍යාත්මක පරීක්ෂාව
                </div>
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> කුජ දෝෂ සහ සෙනසුරු ඒරාෂ්ටක දෝෂ භංග වීම්
                </div>
                <div className={`flex items-center gap-2.5 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> මුද්‍රිත නිවැරදි PDF වාර්තාව Instant Download
                </div>
              </div>
            </div>

            {/* Right Visual Image Side with Frosted Glass Floating Motion Badges */}
            <div className="lg:col-span-5 relative h-[320px] sm:h-[360px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700 group/img">
              <img 
                src={astroCoupleHero} 
                alt="Sri Lankan Astro Couple" 
                className="w-full h-full object-cover object-top opacity-95 group-hover/img:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Glass Badge Top Right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 z-20 px-4 py-2 rounded-2xl bg-slate-950/80 border border-amber-400/40 text-amber-300 backdrop-blur-xl shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <Sparkles size={14} className="text-amber-400" />
                <span>100% Traditional Engine</span>
              </motion.div>

              {/* Floating Glass Badge Top Left */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-rose-500/90 text-white shadow-xl backdrop-blur-md flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider border border-white/20"
              >
                <Heart size={13} fill="currentColor" /> Submit & Result
              </motion.div>

              {/* Bottom Glass Overlay Box */}
              <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-2xl shadow-2xl flex items-center justify-between border ${
                isDark ? 'bg-slate-950/85 border-white/15 text-white' : 'bg-white/85 border-white/80 text-slate-900'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
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
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase backdrop-blur-md">
                  VERIFIED
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. DUAL GLASS INPUT FORM WITH SUBMIT CTA BUTTON */}
        <form onSubmit={handleCalculateSubmit} className="space-y-8">
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* BRIDE INPUT FROSTED GLASS CARD */}
            <div className={`p-6 sm:p-8 rounded-[2.5rem] border backdrop-blur-2xl shadow-xl space-y-5 transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/70 border-rose-500/30 text-white shadow-[0_8px_32px_0_rgba(244,63,94,0.12)]' 
                : 'bg-white/75 border-rose-200/80 text-slate-900 shadow-[0_8px_32px_0_rgba(244,63,94,0.06)]'
            }`}>
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
                <span className="text-base font-bold text-rose-500 dark:text-rose-400 flex items-center gap-2">
                  <Heart size={18} className="fill-current" />
                  <span>මනාලියගේ විස්තර (Bride)</span>
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/20 font-sinhala backdrop-blur-md">
                  මනාලිය
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    මනාලියගේ නම (නොනිල)
                  </label>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="මනාලියගේ නම ඇතුළත් කරන්න"
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-inner border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-rose-500/30 text-white' : 'bg-white/90 border-rose-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    උපන් නැකත (Nakshatra)
                  </label>
                  <select
                    value={brideNakId}
                    onChange={(e) => setBrideNakId(Number(e.target.value))}
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-inner cursor-pointer border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-rose-500/30 text-white' : 'bg-white/90 border-rose-200 text-slate-900'
                    }`}
                  >
                    {NAKSHATRAS.map((n) => (
                      <option key={n.id} value={n.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {n.id}. {n.nameSinhala} ({n.name})
                      </option>
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
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-inner cursor-pointer border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-rose-500/30 text-white' : 'bg-white/90 border-rose-200 text-slate-900'
                    }`}
                  >
                    {RASHIS.map((r) => (
                      <option key={r.id} value={r.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {r.nameSinhala}
                      </option>
                    ))}
                  </select>
                </div>

                <div 
                  onClick={() => setHasKujaBride(!hasKujaBride)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between backdrop-blur-md ${
                    hasKujaBride 
                      ? 'bg-rose-500/15 border-rose-400 text-rose-600 dark:text-rose-300' 
                      : (isDark ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-rose-500/30' : 'bg-white/80 border-slate-200 text-slate-600 hover:border-rose-300')
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border ${hasKujaBride ? 'bg-rose-500 text-white border-rose-500' : 'border-slate-400'}`}>
                      {hasKujaBride && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span>මනාලියට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GROOM INPUT FROSTED GLASS CARD */}
            <div className={`p-6 sm:p-8 rounded-[2.5rem] border backdrop-blur-2xl shadow-xl space-y-5 transition-all duration-300 ${
              isDark 
                ? 'bg-slate-900/70 border-indigo-500/30 text-white shadow-[0_8px_32px_0_rgba(99,102,241,0.12)]' 
                : 'bg-white/75 border-indigo-200/80 text-slate-900 shadow-[0_8px_32px_0_rgba(99,102,241,0.06)]'
            }`}>
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
                <span className="text-base font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                  <Heart size={18} className="fill-current" />
                  <span>මනාලයාගේ විස්තර (Groom)</span>
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 font-sinhala backdrop-blur-md">
                  මනාලයා
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    මනාලයාගේ නම (නොනිල)
                  </label>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    placeholder="මනාලයාගේ නම ඇතුළත් කරන්න"
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-indigo-500/30 text-white' : 'bg-white/90 border-indigo-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    උපන් නැකත (Nakshatra)
                  </label>
                  <select
                    value={groomNakId}
                    onChange={(e) => setGroomNakId(Number(e.target.value))}
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-indigo-500/30 text-white' : 'bg-white/90 border-indigo-200 text-slate-900'
                    }`}
                  >
                    {NAKSHATRAS.map((n) => (
                      <option key={n.id} value={n.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {n.id}. {n.nameSinhala} ({n.name})
                      </option>
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
                    className={`w-full rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner cursor-pointer border backdrop-blur-md ${
                      isDark ? 'bg-slate-950/80 border-indigo-500/30 text-white' : 'bg-white/90 border-indigo-200 text-slate-900'
                    }`}
                  >
                    {RASHIS.map((r) => (
                      <option key={r.id} value={r.id} className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
                        {r.nameSinhala}
                      </option>
                    ))}
                  </select>
                </div>

                <div 
                  onClick={() => setHasKujaGroom(!hasKujaGroom)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between backdrop-blur-md ${
                    hasKujaGroom 
                      ? 'bg-indigo-500/15 border-indigo-400 text-indigo-600 dark:text-indigo-300' 
                      : (isDark ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-indigo-500/30' : 'bg-white/80 border-slate-200 text-slate-600 hover:border-indigo-300')
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <div className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border ${hasKujaGroom ? 'bg-indigo-500 text-white border-indigo-500' : 'border-slate-400'}`}>
                      {hasKujaGroom && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span>මනාලයාට කුජ දෝෂය පවතී (Kuja Doshaya)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* HIGH-IMPACT SUBMIT CTA BUTTON */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-2xl shadow-rose-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-3 uppercase tracking-wider border-none font-sans"
            >
              <Sparkles size={18} className="animate-spin-slow text-amber-300" />
              <span>🔮 පොරොන්දම් පරීක්ෂා කරන්න (Calculate Porondam Match)</span>
            </button>
          </div>

        </form>

        {/* CALCULATING ANIMATED SCANNER STATE */}
        {workflowState === 'calculating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-10 rounded-[2.5rem] border backdrop-blur-2xl text-center space-y-4 ${
              isDark ? 'bg-slate-900/80 border-purple-500/40 text-white' : 'bg-white/80 border-purple-200 text-slate-900'
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 mx-auto flex items-center justify-center animate-spin">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-black font-sinhala">
              නිරායන ජ්‍යොතිෂ 20-පොරොන්දම් ගණනය වෙමින් පවතී...
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sinhala">
              මනාලයාගේ හා මනාලියගේ නැකත්, රාශි, යෝනි, රාශ්‍යාධිපති හා කුජ දෝෂ භංග වීම් පරික්ෂා වේ.
            </p>
          </motion.div>
        )}

        {/* 3. REVEALED RESULTS BOARD (SHOWN AFTER SUBMIT) */}
        {workflowState === 'result' && (
          <motion.div 
            id="astro-result-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pt-4 border-t border-slate-200/80 dark:border-slate-800"
          >
            
            {/* ACTION HEADER BAR FOR RESULT BOARD */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-sinhala">
                  ගණනය කරන ලද විසි පොරොන්දම් වාර්තාව
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setShowPdfModal(true)}
                  className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-2 border-none font-sinhala"
                >
                  <Download size={15} />
                  <span>📄 PDF වාර්තාව ලබාගන්න (Download PDF)</span>
                </button>

                <button
                  onClick={handleResetForm}
                  className="px-4 py-2.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border-none font-sinhala"
                >
                  <RotateCcw size={14} />
                  <span>නැවත පරීක්ෂා කරන්න</span>
                </button>
              </div>
            </div>

            {/* FROSTED GLASS VERDICT BANNER */}
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-r from-rose-500/90 via-pink-500/90 to-purple-600/90 backdrop-blur-2xl border border-white/30 text-white shadow-[0_15px_40px_-10px_rgba(244,63,94,0.35)] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2.5 text-center sm:text-left relative z-10">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30">
                  ★ 20-PORONDAM VERDICT FOR {brideName.toUpperCase()} & {groomName.toUpperCase()}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black flex items-center justify-center sm:justify-start gap-3">
                  <span>{report.totalMatched} / 20</span>
                  <span className="text-lg font-bold text-rose-100 font-sinhala">පොරොන්දම් සාර්ථකයි ({report.percentage}%)</span>
                </h2>
                <p className="text-xs text-rose-100 max-w-xl font-sinhala leading-relaxed">
                  {report.kujaDoshayaStatus}
                </p>
              </div>

              {/* Score Circle Gauge */}
              <div className="w-24 h-24 rounded-full bg-white/15 backdrop-blur-xl border border-white/40 flex flex-col items-center justify-center shrink-0 shadow-2xl relative z-10">
                <span className="text-2xl font-black text-white tracking-tight">{report.percentage}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-100">Score</span>
              </div>
            </div>

            {/* FROSTED GLASS BREAKDOWN TABLE */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-sinhala flex items-center gap-2">
                  <Sparkles size={18} className="text-rose-500" />
                  <span>විසි පොරොන්දම් ලැයිස්තු විග්‍රහය (Full Breakdown)</span>
                </h3>
                
                <div className={`flex gap-2 text-xs font-bold font-sinhala p-1 rounded-2xl border backdrop-blur-xl ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/60 border-slate-200'
                }`}>
                  <button 
                    onClick={() => setFilterMode('all')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${filterMode === 'all' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    සියල්ල ({report.items.length})
                  </button>
                  <button 
                    onClick={() => setFilterMode('passed')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${filterMode === 'passed' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    සාර්ථකයි ({passedCount})
                  </button>
                  <button 
                    onClick={() => setFilterMode('alerts')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${filterMode === 'alerts' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    අවධානය ({alertCount})
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
                {filteredItems.map((item, idx) => (
                  <div 
                    key={item.title}
                    className={`p-4 rounded-2xl border backdrop-blur-xl flex items-start justify-between gap-3 text-xs transition-all ${
                      item.passed 
                        ? (isDark ? 'bg-slate-900/60 border-slate-800/80 text-slate-200' : 'bg-white/70 border-slate-200/80 text-slate-800') 
                        : (isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-900')
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

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 border backdrop-blur-md ${
                      item.passed ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    }`}>
                      {item.passed ? '✔ Pass' : '✖ Alert'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* 4. FROSTED GLASS PRICING CARDS */}
        <div className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-slate-800">
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
            <div className="lg:col-span-4 rounded-[2.2rem] overflow-hidden relative border border-white/40 dark:border-slate-800 shadow-xl group min-h-[280px]">
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
            <div className={`lg:col-span-4 p-8 rounded-[2.2rem] border backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 ${
              isDark ? 'bg-slate-900/70 border-slate-800/80 text-white' : 'bg-white/75 border-white/80 text-slate-900'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-300 border border-slate-500/20 backdrop-blur-md">
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
                onClick={() => setShowPdfModal(true)}
                className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Buy Single Report - Rs. 499/=
              </button>
            </div>

            {/* VIP Pass Card */}
            <div className="lg:col-span-4 p-8 rounded-[2.2rem] bg-gradient-to-b from-rose-500/15 via-pink-500/10 to-purple-500/15 dark:from-rose-500/20 dark:via-pink-500/15 dark:to-purple-500/20 border-2 border-rose-500 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <span className="absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-rose-500 text-white shadow-md flex items-center gap-1 backdrop-blur-md">
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

      {/* OFFICIAL PRINTABLE PDF REPORT MODAL */}
      <AnimatePresence>
        {showPdfModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6 font-sinhala"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPdfModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* PDF Header Seal */}
              <div className="text-center border-b pb-6 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-wider border border-rose-200">
                  <Award size={14} /> Official Verified Horoscope Report
                </div>
                <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
                  The Uni Gang - 20-Porondam Astro Certificate
                </h2>
                <p className="text-xs text-slate-500">
                  නිරායන ජ්‍යොතිෂ 20-පොරොන්දම් පරීක්ෂණ නිල වාර්තාව
                </p>
              </div>

              {/* Couple Info Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border text-xs">
                <div>
                  <span className="font-bold text-slate-400 block uppercase">මනාලිය (Bride):</span>
                  <span className="font-black text-sm text-slate-900">{brideName}</span>
                  <p className="text-slate-600 mt-1">නැකත: <strong>{report.brideNakshatra.nameSinhala}</strong> ({report.brideNakshatra.name})</p>
                  <p className="text-slate-600">රාශිය: <strong>{report.brideRashi.nameSinhala}</strong></p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 block uppercase">මනාලයා (Groom):</span>
                  <span className="font-black text-sm text-slate-900">{groomName}</span>
                  <p className="text-slate-600 mt-1">නැකත: <strong>{report.groomNakshatra.nameSinhala}</strong> ({report.groomNakshatra.name})</p>
                  <p className="text-slate-600">රාශිය: <strong>{report.groomRashi.nameSinhala}</strong></p>
                </div>
              </div>

              {/* Score Banner */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">Match Result</span>
                  <h3 className="text-2xl font-black">{report.totalMatched} / 20 ({report.percentage}%)</h3>
                  <p className="text-xs text-slate-300 font-sinhala">{report.verdict}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-xl shadow-lg">
                  {report.percentage}%
                </div>
              </div>

              {/* Detailed Porondam Items */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Porondam Items Breakdown</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {report.items.map((item, idx) => (
                    <div key={item.title} className="p-2.5 rounded-xl border bg-white flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900">{idx + 1}. {item.titleSinhala}</span>
                        <span className="block text-[10px] text-slate-500">{item.passed ? '✔ Pass' : '✖ Alert'}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${item.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                        {item.passed ? 'Pass' : 'Alert'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Printer size={16} /> Print / Save as PDF
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
