import { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { LuSun, LuMoon } from 'react-icons/lu';
import { cx } from '../ui/ProposalPrimitives';
import logoImg from '../../../../assets/logoImage.jpg';
import { useTheme } from '../../../../context/ThemeContext';

interface ProposalNavbarProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onGetStarted?: () => void;
  onSignIn?: () => void;
}

export default function ProposalNavbar({
  activeTab = 'home',
  onNavigate,
  onGetStarted,
  onSignIn,
}: ProposalNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', isHighlight: false },
    { id: 'discover', label: 'Search', isHighlight: false },
    { id: 'premium', label: '★ VIP', isHighlight: true },
    { id: 'pricing', label: 'Pricing', isHighlight: false },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b font-sinhala",
        isDark
          ? scrolled
            ? "bg-slate-950/95 backdrop-blur-xl border-slate-800/90 shadow-xl shadow-rose-500/5 py-2.5 text-white"
            : "bg-slate-950/90 backdrop-blur-md border-slate-900 py-3 text-white"
          : scrolled
            ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg shadow-blue-500/5 py-2.5 text-slate-800"
            : "bg-white/90 backdrop-blur-md border-slate-100 py-3 text-slate-800"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Far Left Back Button */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            title="Back to Main Website"
            className={cx(
              "p-2 sm:px-3 sm:py-2 rounded-xl border transition-all flex items-center gap-1.5 shrink-0",
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
            )}
          >
            <ArrowLeft size={16} />
          </a>

          {/* Main Logo & Name (The Uni Gang - Uni Porondam) */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            {/* Main Logo Image */}
            <div className="relative overflow-hidden rounded-full border-2 border-blue-500 p-0.5 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <img src={logoImg} alt="The Uni Gang" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" />
            </div>

            {/* Brand Title */}
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={cx("text-base sm:text-lg font-bold tracking-tight font-sans", isDark ? "text-white" : "text-slate-900")}>
                  The <span className="text-blue-500">Uni Gang</span>
                </span>
                <span className="text-xs font-extrabold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  Uni Porondam
                </span>
              </div>
              {/* <p className={cx("text-[10px] font-bold tracking-wider uppercase -mt-0.5 font-sinhala hidden sm:block", isDark ? "text-slate-400" : "text-slate-500")}>
                යූනි පොරොන්දම් මංගල සේවය
              </p> */}
            </div>
          </div>
        </div>

        {/* Central Nav Links */}
        <nav className={cx(
          "hidden md:flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-xl transition-all shadow-inner",
          isDark ? "bg-slate-900/90 border-slate-800/90" : "bg-slate-100/90 border-slate-200/90"
        )}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cx(
                  "px-5 py-2 rounded-full text-xs font-extrabold transition-all duration-300 relative font-sans cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 text-white shadow-lg shadow-rose-500/35 scale-105"
                    : item.isHighlight
                    ? "text-amber-400 font-extrabold hover:bg-amber-500/10 hover:text-amber-300"
                    : isDark
                    ? "text-slate-300 hover:text-white hover:bg-slate-800/70"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Auth & Theme Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Main Website Theme Switcher Button (LuSun / LuMoon) */}
          <button
            onClick={toggleTheme}
            className={cx(
              "p-2.5 rounded-full transition-all cursor-pointer",
              isDark
                ? "text-slate-300 hover:bg-slate-800 hover:text-amber-400"
                : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
            )}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <LuSun className="w-5 h-5 text-amber-400" /> : <LuMoon className="w-5 h-5 text-slate-700" />}
          </button>

          <button
            onClick={onSignIn || onGetStarted}
            className={cx(
              "px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-colors font-sinhala",
              isDark ? "text-slate-300 hover:text-rose-400" : "text-slate-700 hover:text-rose-600"
            )}
          >
            ඇතුළු වන්න
          </button>
          <button
            onClick={onGetStarted}
            className="px-4 sm:px-5 py-2.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 font-sinhala"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">ලියාපදිංචි වන්න</span>
            <span className="sm:hidden">Join</span>
          </button>
        </div>
      </div>
    </header>
  );
}
