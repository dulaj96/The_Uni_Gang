import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { PrimaryButton, GhostButton } from '../components/ui/ProposalPrimitives';
import ProposalSearchHeader from '../components/search/ProposalSearchHeader';
import ProposalSearchTopFilterBar from '../components/search/ProposalSearchTopFilterBar';
import ProposalAdvancedFilterDrawer from '../components/search/ProposalAdvancedFilterDrawer';
import ProposalSearchResultCard, { CandidateProfile } from '../components/search/ProposalSearchResultCard';
import { SearchFilterState } from '../components/search/ProposalSearchSidebar';
import { useTheme } from '../../../context/ThemeContext';
import toast from 'react-hot-toast';

// Candidate Mock Data matching Reference Screenshots 1 to 5
const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 1,
    code: 'BR000158',
    name: 'Piyumali L.',
    age: 31,
    district: 'Colombo 1',
    profession: 'Lecturer',
    monthlyIncome: 'Rs 200,000 - Rs 300,000',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.4 ft',
    country: 'Sri Lanka',
    publishedDate: '8/31/2026',
  },
  {
    id: 2,
    code: 'BR000113',
    name: 'Kasuni D.',
    age: 31,
    district: 'Narammala',
    profession: 'Government Servant',
    monthlyIncome: 'Rs 100,000 - Rs 200,000',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.7 ft',
    country: 'Sri Lanka',
    publishedDate: '8/31/2026',
  },
  {
    id: 3,
    code: 'BR000902',
    name: 'Eranga R.',
    age: 40,
    district: 'Veyangoda',
    profession: 'Teacher',
    monthlyIncome: 'Rs 50,000 - Rs 100,000',
    images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Divorced (දික්කසාද වූ)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Bathgama',
    height: '5.8 ft',
    country: 'Sri Lanka',
    publishedDate: '8/26/2026',
  },
  {
    id: 4,
    code: 'GR000323',
    name: 'Sathira D. K. P.',
    age: 23,
    district: 'Akmeemana',
    profession: 'Doctor',
    monthlyIncome: 'Rs 200,000 - Rs 300,000',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: false,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.9 ft',
    country: 'Sri Lanka',
    publishedDate: '8/26/2026',
  },
  {
    id: 5,
    code: 'GR000730',
    name: 'Kisal P. S.',
    age: 23,
    district: 'Panadura',
    profession: 'Engineer',
    monthlyIncome: 'Rs 200,000 - Rs 300,000',
    images: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Catholic',
    caste: 'Govigama',
    height: '5.9 ft',
    country: 'Sri Lanka',
    publishedDate: '6/4/2026',
  },
  {
    id: 6,
    code: 'BR000064',
    name: 'Inoka D.',
    age: 32,
    district: 'Matale',
    profession: 'Teacher',
    monthlyIncome: 'Rs 100,000 - Rs 200,000',
    images: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.0 ft',
    country: 'Sri Lanka',
    publishedDate: '6/4/2026',
  },
  {
    id: 7,
    code: 'BR000112',
    name: 'Dharani P. A.',
    age: 31,
    district: 'Kuliyapitiya',
    profession: 'Doctor',
    monthlyIncome: 'Rs 300,000+',
    images: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: true,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.5 ft',
    country: 'Sri Lanka',
    publishedDate: '5/18/2026',
  },
  {
    id: 8,
    code: 'GR003256',
    name: 'Wasantha G.',
    age: 36,
    district: 'Elpitiya',
    profession: 'Accountant',
    monthlyIncome: 'Rs 200,000 - Rs 300,000',
    images: ['https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    isVIP: false,
    isVerified: true,
    civilStatus: 'Never Married (අවිවාහක)',
    ethnicity: 'Sinhalese',
    religion: 'Buddhist',
    caste: 'Govigama',
    height: '5.7 ft',
    country: 'Sri Lanka',
    publishedDate: '8/31/2026',
  },
];

const DEFAULT_FILTERS: SearchFilterState = {
  codeSearch: '',
  vipOnly: false,
  sortBy: 'Any',
  lookingFor: 'Bride',
  minAge: '',
  maxAge: '',
  minHeight: '',
  maxHeight: '',
  country: 'Any',
  district: 'Any',
  ethnicity: 'Any',
  caste: 'Any',
  religion: 'Any',
  civilStatus: 'Any',
  profession: 'Any',
  monthlyIncome: 'Any',
  education: 'Any',
  foodPreference: 'Any',
  drinking: 'Any',
  smoking: 'Any',
  differentlyAbled: 'Any',
  accountCreatedBy: 'Any',
  nicVerified: 'Any',
};

export default function ProposalDiscoverPage({
  openProfile,
}: {
  setPage: (p: any) => void;
  openProfile: (p: any) => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact'>('grid');
  const [filters, setFilters] = useState<SearchFilterState>(DEFAULT_FILTERS);
  const [candidates] = useState<CandidateProfile[]>(INITIAL_CANDIDATES);
  const [isAdvancedDrawerOpen, setIsAdvancedDrawerOpen] = useState(false);
  const [selectedInterestProfile, setSelectedInterestProfile] = useState<CandidateProfile | null>(null);

  // Active filter counter
  const activeFilterCount = Object.entries(filters).filter(([key, val]) => {
    if (key === 'lookingFor') return false;
    if (typeof val === 'boolean') return val === true;
    return val !== '' && val !== 'Any';
  }).length;

  // Filter calculation logic
  const filteredCandidates = candidates.filter((item) => {
    if (filters.vipOnly && !item.isVIP) return false;
    if (filters.codeSearch && !item.code.toLowerCase().includes(filters.codeSearch.toLowerCase())) return false;
    if (filters.district !== 'Any' && item.district !== filters.district) return false;
    if (filters.profession !== 'Any' && item.profession !== filters.profession) return false;
    if (filters.religion !== 'Any' && item.religion !== filters.religion) return false;
    if (filters.civilStatus !== 'Any' && item.civilStatus && !item.civilStatus.includes(filters.civilStatus)) return false;
    return true;
  });

  const handleSendInterest = (profile: CandidateProfile) => {
    setSelectedInterestProfile(profile);
  };

  const handleConfirmInterest = () => {
    if (selectedInterestProfile) {
      toast.success(`Proposal Interest sent to ${selectedInterestProfile.name} (${selectedInterestProfile.code})! 💕`);
      setSelectedInterestProfile(null);
    }
  };

  return (
    <div className={`w-full min-h-screen py-8 px-4 sm:px-6 lg:px-12 font-sans transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto">

        {/* 1. SEARCH HEADER CONTROLS */}
        <ProposalSearchHeader
          totalResults={filteredCandidates.length > 0 ? filteredCandidates.length * 502 : 4022}
          currentPage={1}
          totalPages={202}
          layoutMode={layoutMode}
          onLayoutModeChange={setLayoutMode}
          onToggleMobileFilters={() => setIsAdvancedDrawerOpen(true)}
          showingOnlyVIP={filters.vipOnly}
        />

        {/* 2. TOP HORIZONTAL QUICK-FILTER PILL BAR (REPLACES HEAVY LEFT SIDEBAR) */}
        <ProposalSearchTopFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onOpenAdvancedDrawer={() => setIsAdvancedDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* 3. FULL-WIDTH 3-COLUMN CANDIDATE RESULTS GRID */}
        <div className="w-full">
          {filteredCandidates.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className="text-xl font-bold mb-2">No matching profiles found</h3>
              <p className="text-sm text-slate-500 mb-6">Try resetting some of your filters to view more profiles.</p>
              <PrimaryButton onClick={() => setFilters(DEFAULT_FILTERS)} className="px-6 py-2.5">
                Reset All Filters
              </PrimaryButton>
            </div>
          ) : layoutMode === 'grid' ? (
            /* MODERN 3-COLUMN GRID GALLERY VIEW (FULL WIDTH SCREEN REAL ESTATE) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCandidates.map((profile) => (
                <ProposalSearchResultCard
                  key={profile.id}
                  profile={profile}
                  layoutMode="grid"
                  onSendInterest={handleSendInterest}
                  onViewProfile={openProfile}
                />
              ))}
            </div>
          ) : (
            /* SLEEK COMPACT LIST VIEW */
            <div className="space-y-5">
              {filteredCandidates.map((profile) => (
                <ProposalSearchResultCard
                  key={profile.id}
                  profile={profile}
                  layoutMode="compact"
                  onSendInterest={handleSendInterest}
                  onViewProfile={openProfile}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 4. SLIDE-OVER ADVANCED FILTER DRAWER (20+ FILTERS) */}
      <ProposalAdvancedFilterDrawer
        isOpen={isAdvancedDrawerOpen}
        onClose={() => setIsAdvancedDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={() => setFilters(DEFAULT_FILTERS)}
        onApplyFilters={() => toast.success('Advanced search filters applied!')}
      />

      {/* CONFIRM PROPOSAL INTEREST MODAL */}
      <AnimatePresence>
        {selectedInterestProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`p-6 sm:p-8 rounded-3xl max-w-md w-full border shadow-2xl text-center relative ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <button
                onClick={() => setSelectedInterestProfile(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <Heart size={32} fill="currentColor" />
              </div>

              <h3 className="text-2xl font-black font-serif mb-2">Send Proposal Interest?</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                You are about to express interest to <strong className="text-rose-500">{selectedInterestProfile.name}</strong> ({selectedInterestProfile.code}). They will receive an instant notification!
              </p>

              <div className="flex gap-3">
                <GhostButton dark={isDark} onClick={() => setSelectedInterestProfile(null)} className="flex-1 py-3 text-xs">
                  Cancel
                </GhostButton>
                <PrimaryButton onClick={handleConfirmInterest} icon={Heart} className="flex-1 py-3 text-xs">
                  Send Proposal
                </PrimaryButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
