
import { motion } from 'framer-motion';
import { ChevronLeft, Crown, CheckCircle2, Star, Sparkles, Heart, ShieldCheck, Zap, Video, Undo2, Lock } from 'lucide-react';
import { PrimaryButton, GhostButton, cx } from '../components/ui/ProposalPrimitives';

export default function ProposalPremiumPage({ setPage }: { setPage: (p: string) => void }) {

  const premiumFeatures = [
    { text: "Secure In-App Video & Audio Calls", icon: Video },
    { text: "See exactly who liked your profile", icon: Eye },
    { text: "Unlimited Swipes & Proposals", icon: Heart },
    { text: "Advanced filtering (Profession, Hobbies)", icon: Filter },
    { text: "Read receipts in private chats", icon: MessageCircle },
    { text: "Priority profile placement (5x more views)", icon: Zap },
    { text: "Undo accidental left swipes (Rewind)", icon: Undo2 },
    { text: "Ad-free experience", icon: ShieldCheck }
  ];

  const freeFeatures = [
    "Create a verified profile",
    "View 15 profiles per day",
    "Send 3 proposals per week",
    "Basic district & age filtering",
    "Text chat with mutual matches",
    "AI Phone Number Masking (Security)"
  ];

  // Dummy imports for icons used in features list
  function Eye(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>; }
  function Filter(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>; }
  function MessageCircle(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>; }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-950 pb-24 relative overflow-hidden font-sans">
      
      {/* Deep Dark/Gold Background Gradients for Premium Feel */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <button onClick={() => setPage('dashboard')} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group">
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" /> Back to Dashboard
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          
          {/* Floating animated elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 hidden md:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white items-center justify-center shadow-xl shadow-amber-500/20 rotate-12"
          >
            <Crown size={32} />
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute top-20 -right-10 hidden md:flex w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 text-white items-center justify-center shadow-xl shadow-amber-500/20 -rotate-12"
          >
            <Heart size={28} fill="currentColor" />
          </motion.div>

          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-500/10 text-amber-400 mb-6 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.2)] relative">
            <Crown size={48} className="drop-shadow-lg" />
            <Sparkles size={24} className="absolute -top-2 -right-2 text-amber-300 animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-sm">
            Upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-orange-500">Gold</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto">
            Unlock exclusive tools to discover, connect, and safely video chat with Sri Lanka's finest university graduates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Free Tier */}
          <div className="p-8 sm:p-10 rounded-[2.5rem] bg-slate-900/50 backdrop-blur-md border border-slate-800 flex flex-col h-full relative overflow-hidden group hover:border-slate-700 transition-colors">
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-white mb-2">Basic Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-300">Free</span>
                <span className="text-sm font-bold text-slate-500">forever</span>
              </div>
            </div>
            
            <ul className="space-y-5 flex-1">
              {freeFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
                  <span className="text-sm font-bold text-slate-300 leading-relaxed">{f}</span>
                </li>
              ))}
              
              {/* Teaser for Premium Features in Free card */}
              <li className="flex items-start gap-4 opacity-40">
                <Lock size={20} className="text-slate-500 shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-slate-500 line-through decoration-slate-600 decoration-2">In-App Video Calling</span>
              </li>
              <li className="flex items-start gap-4 opacity-40">
                <Lock size={20} className="text-slate-500 shrink-0 mt-0.5" />
                <span className="text-sm font-bold text-slate-500 line-through decoration-slate-600 decoration-2">See who liked you</span>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-slate-800/50">
              <GhostButton dark={true} className="w-full !py-4 opacity-50 cursor-not-allowed text-white border-slate-700">Current Plan</GhostButton>
            </div>
          </div>

          {/* Premium Tier (The Gold Card) */}
          <div className="relative p-1 rounded-[2.5rem] group h-full">
            {/* Animated Glowing Border Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 rounded-[2.5rem] opacity-75 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative p-8 sm:p-10 rounded-[2.4rem] bg-slate-950 flex flex-col h-full overflow-hidden">
              
              {/* Internal subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
              
              <div className="absolute top-6 right-6 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                Most Popular
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-black text-amber-500 mb-2 flex items-center gap-2">Premium <Star size={20} fill="currentColor" /></h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white drop-shadow-md">
                    Rs. 990
                  </span>
                  <span className="text-sm font-bold text-slate-400">/ month</span>
                </div>
              </div>
              
              <ul className="space-y-5 flex-1 relative z-10">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 relative">
                      <div className="absolute inset-0 bg-amber-500/20 blur-sm rounded-full" />
                      <f.icon size={20} className="text-amber-400 relative z-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-200 leading-relaxed drop-shadow-sm">{f.text}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 relative z-10">
                <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-base font-black shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_10px_35px_-5px_rgba(245,158,11,0.6)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  Upgrade to Premium <Crown size={20} />
                </button>
                <p className="text-center text-xs text-slate-500 font-medium mt-4">Cancel anytime. Billed monthly.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
