import { ArrowRight, PlayCircle, ShieldCheck, Heart, School, CheckCircle, Crown, Lock, Video, CheckCircle2, Star, Sparkles, UserCheck } from 'lucide-react';
import { PrimaryButton, GhostButton, Card } from '../components/ui/ProposalPrimitives';
import { SUCCESS_STORIES } from '../data/mockProposalData';

export default function ProposalLandingPage({
  dark,
  onGetStarted
}: {
  dark: boolean;
  onGetStarted: () => void;
}) {
  return (
    <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="pt-12 sm:pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="animate-fade-up z-10 relative">
          {/* Floating Hero Icons */}
          <div className="absolute -top-10 -left-10 w-12 h-12 rounded-full glass flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)] transform -rotate-12 z-20 animate-[float_6s_ease-in-out_infinite] hidden lg:flex border border-white/20">
            <Heart className="text-rose-500 text-xl drop-shadow-md" fill="currentColor" />
          </div>
          <div className="absolute top-20 right-10 w-12 h-12 rounded-2xl glass flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] transform rotate-12 z-20 animate-[float_4.5s_ease-in-out_infinite_reverse] hidden lg:flex border border-white/20">
            <School className="text-indigo-500 text-xl drop-shadow-md" />
          </div>

          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Sri Lanka's #1 Elite Matchmaking
          </div> */}

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Find your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-600 drop-shadow-sm">perfect match</span><br /> within the campus.
          </h1>
          <p className="mt-6 text-base sm:text-xl leading-relaxed max-w-xl text-slate-600 dark:text-slate-400 font-medium">
            Uni Porondam exclusively connects verified undergraduates and alumni from Sri Lanka's universities based on shared values, faculties, and lifestyle.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <PrimaryButton onClick={onGetStarted} icon={ArrowRight} className="shadow-[0_0_40px_rgba(244,63,94,0.4)]">Create Your Profile</PrimaryButton>
            <GhostButton dark={dark} icon={PlayCircle}>Watch Demo</GhostButton>
          </div>

          <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex -space-x-4">
              {[32, 51, 44, 12, 65].map((img, i) => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${img}`} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-950 object-cover relative z-[5-i] shadow-md" alt="User Avatar" />
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-950 bg-rose-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-rose-600 dark:text-white relative z-0 shadow-md">
                +12K
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1 drop-shadow-sm">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trusted by Alumni</p>
            </div>
          </div>
        </div>

        <div className="relative h-[550px] hidden lg:flex justify-center items-center z-10">
          {/* Floating UI Elements Right */}
          <div className="absolute -top-8 -right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-800 flex items-center gap-4 z-20 animate-[float_4s_ease-in-out_infinite]">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shadow-inner">
              <ShieldCheck className="text-emerald-600 dark:text-emerald-400 text-xl" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Verified Status</p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">100% Authentic</p>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-200 dark:border-slate-800 flex items-center gap-4 z-20 animate-[float_5s_ease-in-out_infinite_reverse]">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/40 flex items-center justify-center shadow-inner">
              <Heart className="text-rose-600 dark:text-rose-400 text-xl" fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Success Rate</p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">540+ Marriages</p>
            </div>
          </div>

          {/* Main Hero Image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 to-fuchsia-500/30 rounded-[3rem] rotate-3 blur-3xl pointer-events-none"></div>
          <div className="relative w-full max-w-[22rem] aspect-[3/4] rounded-[3rem] overflow-hidden glass border-[8px] border-white/60 dark:border-slate-800/60 shadow-2xl z-10 transition-transform duration-700 hover:scale-[1.02]">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Couple" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/20 dark:bg-black/40 backdrop-blur-2xl p-3 rounded-2xl flex items-center justify-between mb-4 shadow-xl border border-white/30 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-600 flex items-center justify-center shadow-inner">
                    <Heart size={16} className="text-white" fill="white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">98% Match</p>
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Proposal Accepted!</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                  <img src="https://i.pravatar.cc/100?img=44" className="w-full h-full object-cover" alt="User Match" />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">Kasun & Sanduni</h2>
              <p className="text-white/90 font-medium text-xs mt-1.5 flex items-center gap-1.5 drop-shadow-sm">
                <ShieldCheck size={14} className="text-blue-400" /> University of Moratuwa Alumni
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & SAFETY SECTION */}
      <section className="py-16 relative">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-8 text-center hover:-translate-y-2 transition-transform duration-500 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 shadow-inner">
              <Lock size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">100% Confidential</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Your profile is invisible to search engines like Google or Facebook. Only verified members can view your details.
            </p>
          </Card>
          <Card className="p-8 text-center hover:-translate-y-2 transition-transform duration-500 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 border-rose-200 dark:border-rose-900/30">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-6 text-rose-500 shadow-inner">
              <UserCheck size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Elite Community</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Strictly for undergraduates and graduates. Every profile is manually vetted using University ID or Alumni proof.
            </p>
          </Card>
          <Card className="p-8 text-center hover:-translate-y-2 transition-transform duration-500 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-500 shadow-inner">
              <ShieldCheck size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Privacy First</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Keep your photos blurred to the public. Reveal your identity only to those whose proposals you explicitly accept.
            </p>
          </Card>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 relative border-t border-slate-100 dark:border-slate-900/50">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-black mt-4 text-slate-900 dark:text-white tracking-tight">How Uni Porondam Works</h2>
        </div>

        <div className="space-y-24 w-full">
          {/* Step 1 */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center group">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 mb-6 font-black text-xl shadow-inner">01</div>
              <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Create a Verified Profile</h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Join an exclusive community. Your profile is strictly verified using your University Student ID or Alumni details to keep out fake accounts and casual daters.
              </p>
              <ul className="space-y-4">
                {["Manual verification within 24 hours", "Add your faculty, profession, and district", "Set up your privacy preferences (e.g. Blur photos)"].map(point => (
                  <li key={point} className="flex items-center gap-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle size={20} className="text-emerald-500 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl glass-card transition-all duration-700 hover:shadow-rose-500/20">
              <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Students studying" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-800 animate-fade-up">
                <ShieldCheck size={36} className="text-emerald-500" />
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Identity Verified</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">UCSC Registration confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center group">
            <div className="relative h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl glass-card transition-all duration-700 hover:shadow-fuchsia-500/20">
              <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Friends laughing" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex items-center gap-4 border border-slate-200 dark:border-slate-800 animate-fade-up">
                <Sparkles size={36} className="text-fuchsia-500" />
                <div>
                  <p className="text-slate-900 dark:text-white font-bold text-lg">Smart Algorithm</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Matching based on lifestyle & district</p>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 mb-6 font-black text-xl shadow-inner">02</div>
              <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Discover & Get Matched</h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Our smart filters do the heavy lifting. We surface individuals who perfectly align with your relationship goals, geographical preferences, and academic background.
              </p>
              <ul className="space-y-4">
                {["Swipe through highly compatible profiles", "Filter by specific Universities and Faculties", "See mutual hobbies and lifestyle choices"].map(point => (
                  <li key={point} className="flex items-center gap-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle size={20} className="text-fuchsia-500 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center group">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 mb-6 font-black text-xl shadow-inner">03</div>
              <h3 className="text-3xl font-black mb-4 text-slate-900 dark:text-white tracking-tight">Send a Proposal & Connect</h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                When you find someone special, send them a proposal. If they accept, you unlock a private chat room to start the conversation securely in real-time.
              </p>
              <ul className="space-y-4">
                {["Real-time Secure Messaging with instant delivery", "Live Online/Offline status tracking", "In-App Voice & Video calls for Premium members"].map(point => (
                  <li key={point} className="flex items-center gap-4 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
                    <CheckCircle size={20} className="text-amber-500 shrink-0" /> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl glass-card transition-all duration-700 hover:shadow-amber-500/20">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Couple holding hands" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none"></div>

              {/* Floating Chat bubbles inside the image */}
              <div className="absolute top-1/3 left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 pr-6 rounded-2xl rounded-bl-none shadow-xl border border-slate-200 dark:border-slate-800 animate-[float_4s_ease-in-out_infinite]">
                <p className="text-slate-900 dark:text-white text-sm font-bold">Hi! I saw you're from UoM too? 👋</p>
              </div>
              <div className="absolute top-1/2 right-8 bg-rose-500 p-3 pr-6 rounded-2xl rounded-br-none shadow-xl shadow-rose-500/30 animate-[float_5s_ease-in-out_infinite_reverse]">
                <p className="text-white text-sm font-bold">Yes! Batch of '19. Nice to meet you! 😊</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. SUCCESS STORIES (NEW) */}
      <section className="py-24 border-t border-slate-100 dark:border-slate-900/50">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mt-4 text-slate-900 dark:text-white tracking-tight">Happily Ever After</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Real stories from verified university alumni who found their perfect match right here on Uni Porondam.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUCCESS_STORIES.slice(0, 3).map((story) => (
            <Card key={story.id} className="p-6 flex flex-col hover:-translate-y-2 transition-transform duration-500 border-slate-200/60 dark:border-slate-800/60">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <img src={story.image} alt="Couple" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-black text-lg">{story.names}</p>
                  <p className="text-rose-400 font-bold text-xs">Married {story.date}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed line-clamp-4">
                  "{story.quote}"
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 5. PRICING PLANS */}
      <section className="py-24 border-t border-slate-100 dark:border-slate-900/50 w-full font-sans">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mt-4 text-slate-900 dark:text-white tracking-tight">Choose your path</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Start for free and experience the platform, or upgrade to Premium for unlimited access and advanced matching features.
          </p>
        </div>

        <div className="relative">
          {/* Deep glow effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full items-stretch relative z-10">
            {/* Free Tier */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex flex-col h-full relative overflow-hidden group hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Basic Plan</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-800 dark:text-slate-300">Free</span>
                  <span className="text-sm font-bold text-slate-500">forever</span>
                </div>
              </div>

              <ul className="space-y-5 flex-1">
                {[
                  "Create a verified profile",
                  "View 15 profiles per day",
                  "Send 15 proposals per day",
                  "Basic district & age filtering",
                  "10 Messages per match",
                  "AI Phone Number Masking (Security)",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">{f}</span>
                  </li>
                ))}

                {/* Teaser for Premium Features in Free card */}
                <li className="flex items-start gap-4 opacity-40">
                  <Lock size={20} className="text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-slate-500 line-through decoration-slate-400 dark:decoration-slate-600 decoration-2">In-App Voice & Video Calling</span>
                </li>
                <li className="flex items-start gap-4 opacity-40">
                  <Lock size={20} className="text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-slate-500 line-through decoration-slate-400 dark:decoration-slate-600 decoration-2">See who liked your profile</span>
                </li>
              </ul>

              <PrimaryButton onClick={onGetStarted} className="w-full mt-10 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-none border-none">
                Get Started for Free
              </PrimaryButton>
            </div>

            {/* Premium Tier */}
            <div className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-b from-amber-500/10 to-rose-500/5 dark:from-amber-500/20 dark:to-rose-500/5 backdrop-blur-xl border border-amber-500/30 dark:border-amber-500/40 flex flex-col h-full relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] group transform hover:-translate-y-1 transition-transform duration-500">
              {/* Premium Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 blur-[80px] pointer-events-none rounded-full" />

              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-amber-500/30">
                <Crown size={12} strokeWidth={3} /> Most Popular
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-2">Premium</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">Rs. 1,500</span>
                  <span className="text-sm font-bold text-slate-500">/ month</span>
                </div>
              </div>

              <ul className="space-y-5 flex-1 relative z-10">
                {[
                  "Unlimited profile viewing & proposals",
                  "See exactly who liked your profile",
                  "Advanced filters (Profession, Diet, Hobbies)",
                  "Priority profile placement (5x more views)",
                  "Read receipts & Undo accidental swipes",
                  "Exclusive Grid / Gallery View",
                  "Ad-free experience"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5 drop-shadow-sm" />
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">{f}</span>
                  </li>
                ))}

                {/* Highlighted Video Call Feature */}
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-amber-500/30">
                    <Video size={12} className="text-white" fill="white" />
                  </div>
                  <span className="text-sm font-black text-amber-700 dark:text-amber-400 leading-relaxed">
                    Exclusive In-App Video & Voice Calling (100% Privacy)
                  </span>
                </li>
              </ul>

              <button className="w-full mt-10 py-3.5 px-6 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/40 hover:scale-[1.02] transition-all relative z-10">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Ready to find your match?</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-xl mx-auto">
          Join thousands of verified undergraduates and alumni across Sri Lanka who are already writing their success stories.
        </p>
        <PrimaryButton onClick={onGetStarted} icon={Heart}>Join Uni Porondam Today</PrimaryButton>
      </section>
    </div>
  );
}
