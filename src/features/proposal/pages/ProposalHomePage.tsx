import { useState, useEffect } from 'react';
import { Compass, Send, Heart, Eye, CheckCircle2, Crown, ArrowRight, ShieldCheck, Lock, MessageCircle, User, Settings, Home, GraduationCap } from 'lucide-react';
import { cx, PrimaryButton, Card } from '../components/ui/ProposalPrimitives';
import { ACTIVITY_FEED } from '../data/mockProposalData';
import { proposalApi } from '../api/proposalApi';
import { ProfileGamification } from '../components/profile/ProfileGamification';
import { PremiumTrialCountdown } from '../components/premium/PremiumTrialCountdown';

export default function ProposalHomePage({
  setPage,
  openProfile,
  goToLanding
}: {
  setPage: (page: string) => void;
  openProfile: (p: any) => void;
  goToLanding: () => void;
}) {
  const [discoverProfiles, setDiscoverProfiles] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({ name: 'User', profileCompletion: 85, plan: 'free' });

  const handleTaskClick = () => {
    setPage('profile');
  };

  const handleClaimPremium = async () => {
    try {
      const res = await proposalApi.claimPremiumTrial();
      if (res.success) {
        setCurrentUser((prev: any) => ({ ...prev, plan: 'premium' }));
        alert('Premium Trial Activated!');
      } else {
        alert(res.message || 'Error claiming trial');
      }
    } catch (err) {
      console.error(err);
      alert('Error claiming trial');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Fetch user and feed
    const fetchData = async () => {
      try {
        const userRes = await proposalApi.getMyProfile();
        const gamificationRes = await proposalApi.getGamificationStatus();
        
        if (userRes.success && userRes.profile && gamificationRes.success) {
          setCurrentUser({
            name: userRes.profile.user?.name || 'User',
            profileCompletion: gamificationRes.completionPct || 0,
            plan: gamificationRes.isPremium ? 'premium' : 'free',
            missingTasks: gamificationRes.missingTasks || []
          });
        }
        
        const feedRes = await proposalApi.getFeed({});
        if (feedRes.success) {
          setDiscoverProfiles(feedRes.data.slice(0, 5)); // Just take top 5 for Today's Picks
        }
      } catch (err) {
        console.error('Failed to fetch home data:', err);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Ayubowan, {currentUser.name.split(" ")[0]} 👋
          </h1>
          <p className="text-sm font-medium mt-1.5 text-slate-600 dark:text-slate-400">
            Here's what's happening with your matches today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={goToLanding}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            title="Back to Main Site"
          >
            <Home size={20} />
          </button>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800 mx-1"></div>
          <button 
            onClick={() => setPage('profile')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Edit Profile"
          >
            <User size={20} />
          </button>
          <button 
            onClick={() => setPage('settings')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={() => setPage('inbox')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative group"
            title="Messages"
          >
            <MessageCircle size={20} className="transition-transform group-hover:scale-110" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800" />
          </button>
          <PrimaryButton icon={Compass} onClick={() => setPage("discover")}>
            Discover Proposals
          </PrimaryButton>
        </div>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Proposals Sent", value: "18", icon: Send },
          { label: "Matches", value: "6", icon: Heart },
          { label: "Profile Views", value: "142", icon: Eye },
          { label: "Profile Complete", value: `${currentUser.profileCompletion}%`, icon: CheckCircle2 },
        ].map((s) => (
          <Card key={s.label} className="p-5 hover:border-rose-200 dark:hover:border-rose-900/50">
            <div className="w-10 h-10 rounded-xl grid place-items-center mb-4 bg-rose-50 dark:bg-rose-500/10 text-rose-500">
              <s.icon size={18} strokeWidth={2.5} />
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{s.value}</p>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <ProfileGamification 
          completionPct={currentUser.profileCompletion} 
          missingTasks={currentUser.missingTasks || []} 
          onTaskClick={handleTaskClick} 
        />
        
        {currentUser.plan === 'free' && currentUser.profileCompletion === 100 ? (
          <div onClick={handleClaimPremium} className="cursor-pointer">
            <PremiumTrialCountdown onUpgrade={() => setPage("premium")} />
          </div>
        ) : currentUser.plan === "free" ? (
          <div className="rounded-2xl p-6 flex flex-col justify-center h-full premium-glass bg-gradient-to-r from-rose-500/10 to-fuchsia-500/10 border border-rose-500/20 shadow-xl shadow-rose-500/5 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center text-white shadow-lg shadow-amber-500/20 shrink-0 transform group-hover:scale-110 transition-transform">
                <Crown size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 dark:text-white">Upgrade to Premium</p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">See who liked you and unlock unlimited proposals.</p>
              </div>
            </div>
            <PrimaryButton onClick={() => setPage("premium")} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20 hover:shadow-amber-500/30 border-none">
              View Premium Plans
            </PrimaryButton>
          </div>
        ) : null}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Today's Picks</h3>
            <button onClick={() => setPage("discover")} className="text-xs font-bold flex items-center gap-1 text-rose-600 dark:text-rose-400 hover:underline">
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {discoverProfiles.length === 0 && <p className="text-sm text-slate-500 p-4">No new proposals matching your criteria today.</p>}
            {discoverProfiles.map((p) => (
              <div key={p.id} className="shrink-0 w-48 group">
                <div className="relative rounded-3xl overflow-hidden h-64 mb-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800">
                  <img src={p.images?.[0] || 'https://via.placeholder.com/300x400'} className={cx("w-full h-full object-cover transition-transform duration-700 group-hover:scale-105", p.blurPhoto && "blur-xl scale-110 brightness-75")} />
                  {p.blurPhoto && (
                    <div className="absolute inset-0 grid place-items-center bg-black/10">
                      <Lock size={24} className="text-white drop-shadow-md" />
                    </div>
                  )}
                  {p.isVerified && (
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 grid place-items-center shadow-lg border-2 border-white/20">
                      <ShieldCheck size={16} className="text-white" strokeWidth={2.5} />
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
                    <p className="text-white font-black text-lg drop-shadow-md">{p.name ? p.name.split(" ")[0] : 'Unknown'}, {p.age}</p>
                    <p className="text-white/80 text-xs font-medium truncate flex items-center gap-1 mt-1"><GraduationCap size={12} /> {p.university}</p>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <button 
                      onClick={() => openProfile(p)}
                      className="w-full py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm shadow-xl hover:bg-slate-100 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={async () => {
                        try {
                          await proposalApi.swipe(p.user_id, 'like');
                          alert("Proposal Sent!");
                        } catch (err) {
                          console.error(err);
                          alert("Error sending proposal");
                        }
                      }}
                      className="w-full py-2.5 bg-rose-500 text-white rounded-full font-bold text-sm shadow-xl shadow-rose-500/30 hover:bg-rose-600 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      Connect Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-5 text-slate-900 dark:text-white">Recent Activity</h3>
          <Card className="p-3">
            {ACTIVITY_FEED.map((a, i) => (
              <div key={i} className={cx("flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50", i !== ACTIVITY_FEED.length - 1 && "border-b border-slate-100 dark:border-slate-800")}>
                <div className="w-9 h-9 rounded-full grid place-items-center shrink-0 bg-slate-100 dark:bg-slate-800">
                  {a.icon === "Heart" && <Heart size={16} className={a.color} fill="currentColor" />}
                  {a.icon === "Eye" && <Eye size={16} className={a.color} />}
                  {a.icon === "MessageCircle" && <MessageCircle size={16} className={a.color} />}
                  {a.icon === "ShieldCheck" && <ShieldCheck size={16} className={a.color} />}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">{a.text}</p>
                  <p className="text-[11px] font-medium mt-1 text-slate-500">{a.time}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
