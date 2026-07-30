import { LuCheck, LuX, LuCrown, LuSparkles } from 'react-icons/lu';
import toast from 'react-hot-toast';

interface ProposalPricingCardsProps {
  onSubscribeClick: () => void;
}

const ProposalPricingCards = ({ onSubscribeClick }: ProposalPricingCardsProps) => {
  return (
    <div id="proposal-pricing-section" className="py-12 mb-12">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-widest block mb-2">Transparent Pricing</span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Unlock Premium <span className="text-rose-500 dark:text-rose-400 italic">Possibilities</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-2">
          Start for free or upgrade to VIP to unlock unlimited messaging and direct contact phone numbers.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Free Plan Card */}
        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-1">Standard Plan</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Free Plan</h3>
            
            <ul className="space-y-3.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-8">
              <li className="flex items-center gap-2.5"><LuCheck className="text-emerald-500" size={16} /> Create & View Proposal Profiles</li>
              <li className="flex items-center gap-2.5"><LuCheck className="text-emerald-500" size={16} /> 5 Swipes / Likes per day</li>
              <li className="flex items-center gap-2.5"><LuCheck className="text-emerald-500" size={16} /> 3 Messages FREE per Match</li>
              <li className="flex items-center gap-2.5 opacity-40"><LuX className="text-red-400" size={16} /> Phone / WhatsApp Contact Reveal</li>
            </ul>
          </div>

          <button
            onClick={() => toast.success("You are currently using the Free Plan!")}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-800 dark:text-white font-black text-xs uppercase tracking-widest rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
          >
            Currently Active
          </button>
        </div>

        {/* VIP Pass Card */}
        <div className="p-8 rounded-[2.5rem] bg-gradient-to-b from-rose-500/10 via-pink-500/10 to-purple-500/10 border-2 border-rose-500 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-black uppercase bg-rose-500 text-white shadow-md flex items-center gap-1">
            <LuSparkles size={12} /> Most Popular
          </span>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-rose-500 dark:text-rose-400 block mb-1">VIP Membership</span>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">LKR 990 <span className="text-xs font-bold text-slate-500 dark:text-slate-400">/ month</span></h3>
            
            <ul className="space-y-3.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-8">
              <li className="flex items-center gap-2.5"><LuCheck className="text-rose-500 dark:text-rose-400" size={16} /> Unlimited Swipes & Likes ♾️</li>
              <li className="flex items-center gap-2.5"><LuCheck className="text-rose-500 dark:text-rose-400" size={16} /> Unlimited In-App Chat Messages</li>
              <li className="flex items-center gap-2.5"><LuCheck className="text-rose-500 dark:text-rose-400" size={16} /> Direct Phone & WhatsApp Contact Reveal</li>
              <li className="flex items-center gap-2.5"><LuCheck className="text-rose-500 dark:text-rose-400" size={16} /> See Who Liked Your Profile</li>
            </ul>
          </div>

          <button
            onClick={onSubscribeClick}
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-rose-500/30 hover:scale-[1.02] transition-transform border-none cursor-pointer flex items-center justify-center gap-2"
          >
            <LuCrown size={16} /> Upgrade to VIP Pass Now
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProposalPricingCards;
