import { LayoutGrid, List, Filter } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

interface ProposalSearchHeaderProps {
  totalResults?: number;
  currentPage?: number;
  totalPages?: number;
  layoutMode: 'grid' | 'compact';
  onLayoutModeChange: (mode: 'grid' | 'compact') => void;
  onToggleMobileFilters: () => void;
  showingOnlyVIP?: boolean;
}

export default function ProposalSearchHeader({
  totalResults = 4022,
  currentPage = 1,
  totalPages = 202,
  layoutMode,
  onLayoutModeChange,
  onToggleMobileFilters,
  showingOnlyVIP = false,
}: ProposalSearchHeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-slate-800 font-sans">
      {/* Title & Count in Main Site Font-Sans Font-Black */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Search matches
          </h1>
          {showingOnlyVIP && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm font-sans">
              👑 VIP Only
            </span>
          )}
        </div>
        <p className={`text-xs sm:text-sm font-medium mt-1 font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Showing 1–20 of {totalResults.toLocaleString()} verified campus profiles
        </p>
      </div>

      {/* Controls & Pagination */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end font-sans">
        {/* Mobile Filter Toggle */}
        <button
          onClick={onToggleMobileFilters}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20 transition-all font-sans"
        >
          <Filter size={14} />
          Filters
        </button>

        {/* View Mode Switcher Pill Container (Matching Navbar Active Pill Style) */}
        <div className={`flex items-center p-1.5 rounded-full border shadow-sm backdrop-blur-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/90 border-slate-200'
        }`}>
          <button
            onClick={() => onLayoutModeChange('grid')}
            title="Grid Gallery View"
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans ${
              layoutMode === 'grid'
                ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 text-white shadow-lg shadow-rose-500/35 scale-105'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={14} />
            Grid View
          </button>

          <button
            onClick={() => onLayoutModeChange('compact')}
            title="Compact List View"
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans ${
              layoutMode === 'compact'
                ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 text-white shadow-lg shadow-rose-500/35 scale-105'
                : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List size={14} />
            Compact View
          </button>
        </div>

        {/* Pagination Pill */}
        <div className={`hidden sm:flex items-center px-4 py-2 rounded-full text-xs font-extrabold border shadow-sm font-sans ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          Page {currentPage}/{totalPages}
        </div>
      </div>
    </div>
  );
}
