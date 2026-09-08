import React from 'react';
import { Search, SlidersHorizontal, Crown, ChevronDown } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';
import { SearchFilterState } from './ProposalSearchSidebar';

interface ProposalSearchTopFilterBarProps {
  filters: SearchFilterState;
  onFilterChange: (filters: SearchFilterState) => void;
  onOpenAdvancedDrawer: () => void;
  activeFilterCount: number;
}

export default function ProposalSearchTopFilterBar({
  filters,
  onFilterChange,
  onOpenAdvancedDrawer,
  activeFilterCount,
}: ProposalSearchTopFilterBarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleChange = (field: keyof SearchFilterState, value: any) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="w-full mb-6 font-sans">
      {/* Glowing Outer Rim Container */}
      <div
        className={`p-[1px] rounded-[2.2rem] transition-all duration-500 shadow-2xl ${
          isDark
            ? 'bg-gradient-to-r from-rose-500/30 via-slate-800 to-amber-500/30 shadow-black/60 hover:from-rose-500/40 hover:to-amber-500/40'
            : 'bg-gradient-to-r from-rose-400/40 via-slate-200 to-amber-400/40 shadow-rose-500/10 hover:from-rose-400/60 hover:to-amber-400/60'
        }`}
      >
        {/* Inner Glassmorphism Panel */}
        <div
          className={`w-full rounded-[2.2rem] p-3 sm:p-4 backdrop-blur-2xl font-sans transition-all ${
            isDark
              ? 'bg-slate-900/90 text-white'
              : 'bg-white/90 text-slate-900'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 font-sans">

            {/* 1. PROMINENT GLOWING CODE / NAME SEARCH INPUT BOX */}
            <div className="relative flex-1 min-w-[210px] sm:min-w-[270px]">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center">
                  <Search size={14} strokeWidth={2.5} />
                </div>
              </div>
              <input
                type="text"
                placeholder="Search Name or Code (e.g. GR000149)..."
                value={filters.codeSearch}
                onChange={(e) => handleChange('codeSearch', e.target.value)}
                className={`w-full pl-12 pr-4 py-2.5 rounded-full text-xs font-bold border outline-none transition-all font-sans ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-500 focus:border-rose-500/60 focus:ring-2 focus:ring-rose-500/20'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                }`}
              />
            </div>

            {/* 2. GENDER SEGMENTED CONTROL SWITCHER */}
            <div className={`flex items-center p-1 rounded-full border shadow-inner backdrop-blur-md ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => handleChange('lookingFor', 'Groom')}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans ${
                  filters.lookingFor === 'Groom'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25 scale-105'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>🤵</span> Groom
              </button>
              <button
                type="button"
                onClick={() => handleChange('lookingFor', 'Bride')}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans ${
                  filters.lookingFor === 'Bride'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/25 scale-105'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>👰</span> Bride
              </button>
            </div>

            {/* 3. CUSTOM STYLED DISTRICT SELECT CHIP */}
            <div className="relative min-w-[135px]">
              <select
                value={filters.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className={`w-full pl-4 pr-8 py-2.5 rounded-full text-xs font-extrabold border appearance-none outline-none transition-all cursor-pointer font-sans ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 text-white hover:border-rose-500/30'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-rose-400/40'
                }`}
              >
                <option value="Any">📍 Any District</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Matale">Matale</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* 4. CUSTOM STYLED PROFESSION SELECT CHIP */}
            <div className="relative min-w-[145px] hidden sm:block">
              <select
                value={filters.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                className={`w-full pl-4 pr-8 py-2.5 rounded-full text-xs font-extrabold border appearance-none outline-none transition-all cursor-pointer font-sans ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-800 text-white hover:border-rose-500/30'
                    : 'bg-slate-50 border-slate-200 text-slate-900 hover:border-rose-400/40'
                }`}
              >
                <option value="Any">💼 Any Profession</option>
                <option value="Doctor">Doctor</option>
                <option value="Engineer">Engineer</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Accountant">Accountant</option>
                <option value="Teacher">Teacher</option>
                <option value="Government Servant">Government Servant</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={14} />
              </div>
            </div>

            {/* 5. VIP ONLY GLOW TOGGLE PILL */}
            <button
              type="button"
              onClick={() => handleChange('vipOnly', !filters.vipOnly)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer font-sans ${
                filters.vipOnly
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 text-slate-950 border-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.35)] scale-105 font-black'
                  : isDark
                  ? 'bg-slate-950/80 border-slate-800 text-amber-400 hover:border-amber-500/40'
                  : 'bg-slate-50 border-slate-200 text-amber-600 hover:border-amber-400/50'
              }`}
            >
              <Crown size={14} className={filters.vipOnly ? 'text-slate-950' : 'text-amber-500'} fill={filters.vipOnly ? 'currentColor' : 'none'} />
              <span>VIP Only</span>
            </button>

            {/* 6. ALL FILTERS DRAWER TRIGGER BUTTON */}
            <button
              type="button"
              onClick={onOpenAdvancedDrawer}
              className="ml-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer font-sans border border-rose-400/20"
            >
              <SlidersHorizontal size={14} />
              <span>All Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-rose-600 font-black text-[10px] flex items-center justify-center shadow-sm font-sans">
                  {activeFilterCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
