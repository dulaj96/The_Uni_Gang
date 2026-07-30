import { useState } from 'react';
import { LuSearch, LuHeart } from 'react-icons/lu';

interface ProposalSearchFilterBarProps {
  onSearch: (filters: {
    lookingFor: string;
    minAge: number;
    maxAge: number;
    religion: string;
    district: string;
    university: string;
    keyword: string;
  }) => void;
}

const ProposalSearchFilterBar = ({ onSearch }: ProposalSearchFilterBarProps) => {
  const [lookingFor, setLookingFor] = useState('Any');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(45);
  const [religion, setReligion] = useState('Any');
  const [district, setDistrict] = useState('Any');
  const [university, setUniversity] = useState('Any');
  const [keyword, setKeyword] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      lookingFor,
      minAge,
      maxAge,
      religion,
      district,
      university,
      keyword
    });
  };

  return (
    <div id="proposal-search-widget" className="p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-2xl mb-12 transition-colors duration-300">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 dark:text-rose-400 flex items-center justify-center">
            <LuHeart size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Find Your Perfect Match</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Filter verified profiles by age, university, profession & district</p>
          </div>
        </div>

        <span className="px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 hidden sm:inline-block">
          Instant Smart Search
        </span>
      </div>

      <form onSubmit={handleSearchSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Looking For */}
          <div>
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">I'm Looking For A</label>
            <select
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 text-xs font-bold text-slate-900 dark:text-white outline-none"
            >
              <option value="Any">Any Gender</option>
              <option value="Female">Bride / Female</option>
              <option value="Male">Groom / Male</option>
            </select>
          </div>

          {/* Age Range */}
          <div>
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">Age From - To</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={18}
                max={60}
                value={minAge}
                onChange={(e) => setMinAge(Number(e.target.value))}
                className="w-1/2 px-3 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white text-center outline-none"
              />
              <span className="text-slate-400 font-bold text-xs">-</span>
              <input
                type="number"
                min={18}
                max={60}
                value={maxAge}
                onChange={(e) => setMaxAge(Number(e.target.value))}
                className="w-1/2 px-3 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white text-center outline-none"
              />
            </div>
          </div>

          {/* Religion */}
          <div>
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">Religion / Ethnicity</label>
            <select
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 text-xs font-bold text-slate-900 dark:text-white outline-none"
            >
              <option value="Any">Any Religion</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Christianity">Christianity</option>
              <option value="Hinduism">Hinduism</option>
              <option value="Islam">Islam</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 text-xs font-bold text-slate-900 dark:text-white outline-none"
            >
              <option value="Any">Any District</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Galle">Galle</option>
              <option value="Kurunegala">Kurunegala</option>
            </select>
          </div>

          {/* University */}
          <div>
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">University / Institute</label>
            <select
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 text-xs font-bold text-slate-900 dark:text-white outline-none"
            >
              <option value="Any">All Universities</option>
              <option value="Moratuwa">Uni of Moratuwa</option>
              <option value="Peradeniya">Uni of Peradeniya</option>
              <option value="Jayewardenepura">Uni of Sri Jayewardenepura</option>
              <option value="SLIIT">SLIIT Malabe</option>
            </select>
          </div>

          {/* Keyword Search */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-1.5">Name or Profession Keyword</label>
            <input
              type="text"
              placeholder="Search keyword (e.g. Engineer, Doctor)..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-rose-500 text-xs font-bold text-slate-900 dark:text-white outline-none"
            />
          </div>

          {/* Search Button */}
          <div className="sm:col-span-2 lg:col-span-1 pt-1">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/30 hover:scale-[1.02] transition-transform border-none cursor-pointer flex items-center justify-center gap-2"
            >
              <LuSearch size={16} /> Search Now
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default ProposalSearchFilterBar;
