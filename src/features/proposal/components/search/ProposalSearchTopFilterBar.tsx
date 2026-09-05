import React from 'react';
import { Search, SlidersHorizontal, Crown } from 'lucide-react';
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
    <div
      className={`w-full rounded-[2rem] p-3 sm:p-4 mb-6 border shadow-xl backdrop-blur-2xl font-sans transition-all duration-300 ${
        isDark
          ? 'bg-slate-900/95 border-slate-800/90 text-white shadow-black/40'
          : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-rose-500/5'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 font-sans">

        {/* 1. PROMINENT CODE / NAME SEARCH INPUT BOX */}
        <div className="relative flex-1 min-w-[200px] sm:min-w-[260px]">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={16} className="text-rose-500" />
          </div>
          <input
            type="text"
            placeholder="Search Name or Code (e.g. GR000149)"
            value={filters.codeSearch}
            onChange={(e) => handleChange('codeSearch', e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-full text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-sans ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
          />
        </div>

        {/* 2. GENDER TOGGLE PILLS (MATCHING NAVBAR ACTIVE BUTTON STYLING) */}
        <div className={`flex items-center p-1 rounded-full border shadow-sm backdrop-blur-md ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => handleChange('lookingFor', 'Groom')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 cursor-pointer font-sans ${
              filters.lookingFor === 'Groom'
                ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 text-white shadow-md scale-105'
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
                ? 'bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 text-white shadow-md scale-105'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>👰</span> Bride
          </button>
        </div>

        {/* 3. QUICK DISTRICT SELECT CHIP */}
        <div className="relative min-w-[130px]">
          <select
            value={filters.district}
            onChange={(e) => handleChange('district', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-full text-xs font-bold border focus:outline-none cursor-pointer font-sans ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
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
        </div>

        {/* 4. QUICK PROFESSION SELECT CHIP */}
        <div className="relative min-w-[140px] hidden sm:block">
          <select
            value={filters.profession}
            onChange={(e) => handleChange('profession', e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-full text-xs font-bold border focus:outline-none cursor-pointer font-sans ${
              isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
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
        </div>

        {/* 5. VIP ONLY TOGGLE PILL */}
        <button
          type="button"
          onClick={() => handleChange('vipOnly', !filters.vipOnly)}
          className={`px-4 py-2.5 rounded-full text-xs font-extrabold border transition-all flex items-center gap-1.5 cursor-pointer font-sans ${
            filters.vipOnly
              ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 border-amber-300 shadow-md scale-105'
              : isDark ? 'bg-slate-950 border-slate-800 text-amber-400' : 'bg-slate-50 border-slate-200 text-amber-600'
          }`}
        >
          <Crown size={14} className={filters.vipOnly ? 'text-slate-950' : 'text-amber-500'} fill={filters.vipOnly ? 'currentColor' : 'none'} />
          <span>VIP Only</span>
        </button>

        {/* 6. ALL FILTERS DRAWER TRIGGER BUTTON */}
        <button
          type="button"
          onClick={onOpenAdvancedDrawer}
          className="ml-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 hover:from-rose-600 hover:to-fuchsia-700 text-white font-extrabold text-xs shadow-lg shadow-rose-500/25 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer font-sans"
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
  );
}
