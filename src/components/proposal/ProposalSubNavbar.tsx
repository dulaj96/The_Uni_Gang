import { motion } from 'framer-motion';
import { 
  LuHeart, 
  LuSearch, 
  LuUsers, 
  LuCirclePlus, 
  LuShieldCheck, 
  LuCrown, 
  LuCircleHelp
} from 'react-icons/lu';

interface ProposalSubNavbarProps {
  activeSubNav: string;
  onSubNavChange: (tabId: 'directory' | 'swiper' | 'create' | 'safety' | 'pricing' | 'howItWorks') => void;
}

const ProposalSubNavbar = ({ activeSubNav, onSubNavChange }: ProposalSubNavbarProps) => {
  const subNavItems = [
    { id: 'directory', label: '💍 Proposals Directory', icon: LuSearch },
    { id: 'swiper', label: '🔥 Campus Swiper', icon: LuUsers },
    { id: 'create', label: '✍️ Post Proposal Ad', icon: LuCirclePlus },
    { id: 'safety', label: '🔒 Safety & Privacy', icon: LuShieldCheck },
    { id: 'pricing', label: '👑 VIP Membership', icon: LuCrown },
    { id: 'howItWorks', label: '❓ How It Works', icon: LuCircleHelp }
  ];

  return (
    <div className="sticky top-16 sm:top-20 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-rose-200/80 dark:border-slate-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4 overflow-x-auto hide-scrollbar">
          
          {/* Sub-Main Portal Brand Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center text-sm shadow-md animate-pulse">
              <LuHeart />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white block">Uni පොරොන්දම්</span>
              <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest block -mt-0.5">Sub-Main Portal</span>
            </div>
          </div>

          {/* Dedicated Sub-Navbar Links */}
          <div className="flex items-center gap-1 shrink-0">
            {subNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSubNavChange(item.id as any)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-none cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProposalSubNav"
                      className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-xl shadow-md -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <Icon size={14} className={isActive ? 'text-white' : ''} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProposalSubNavbar;
