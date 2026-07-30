import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuHeart, 
  LuCrown, 
  LuCirclePlus, 
  LuGraduationCap, 
  LuX, 
  LuSend, 
  LuMessageSquare
} from 'react-icons/lu';
import SEO from '../../components/SEO';
import TiltCard from '../../components/ui/TiltCard';
import ProposalHeroBanner from '../../components/proposal/ProposalHeroBanner';
import ProposalSearchFilterBar from '../../components/proposal/ProposalSearchFilterBar';
import ProposalTrustBadges from '../../components/proposal/ProposalTrustBadges';
import ProposalPricingCards from '../../components/proposal/ProposalPricingCards';
import ProposalHowItWorks from '../../components/proposal/ProposalHowItWorks';
import toast from 'react-hot-toast';

const sampleProposalsList = [
  {
    id: 1,
    name: 'Kasun Bandara',
    age: 25,
    gender: 'Male',
    lookingFor: 'Female',
    status: 'Uni Alumni',
    university: 'University of Moratuwa',
    faculty: 'Engineering - Civil',
    profession: 'Civil Engineer (Consultant)',
    district: 'Colombo',
    religion: 'Buddhism',
    height: "5' 10\"",
    bio: 'Looking for an educated, understanding partner for a serious long-term relationship / marriage.',
    hobbies: ['Photography', 'Hiking', 'Classical Guitar'],
    isVerified: true,
    badgeType: 'Verified Uni Alumni 🏫',
    badgeClass: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop']
  },
  {
    id: 2,
    name: 'Dilini Perera',
    age: 23,
    gender: 'Female',
    lookingFor: 'Male',
    status: 'Undergraduate',
    university: 'SLIIT Malabe',
    faculty: 'Computing - Software Eng',
    profession: 'Final Year Student / Trainee',
    district: 'Kandy',
    religion: 'Buddhism',
    height: "5' 4\"",
    bio: 'Software enthusiast who loves coffee, sunsets, and tech summits. Looking for a genuine partner.',
    hobbies: ['Coding', 'Badminton', 'Traveling'],
    isVerified: true,
    badgeType: 'Verified Undergrad 🎓',
    badgeClass: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    images: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop']
  },
  {
    id: 3,
    name: 'Dr. Tharindu Fernando',
    age: 28,
    gender: 'Male',
    lookingFor: 'Female',
    status: 'General Professional',
    university: 'University of Peradeniya',
    faculty: 'Medicine',
    profession: 'Medical Officer (Doctor)',
    district: 'Gampaha',
    religion: 'Buddhism',
    height: "5' 11\"",
    bio: 'Passionate doctor who enjoys classical music, literature, and quiet weekends.',
    hobbies: ['Reading', 'Chess', 'Violin'],
    isVerified: true,
    badgeType: 'Verified Professional 💼',
    badgeClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop']
  },
  {
    id: 4,
    name: 'Ashi Jayawardena',
    age: 24,
    gender: 'Female',
    lookingFor: 'Male',
    status: 'Uni Alumni',
    university: 'University of Sri Jayewardenepura',
    faculty: 'Management Studies',
    profession: 'Brand Manager',
    district: 'Colombo',
    religion: 'Christianity',
    height: "5' 5\"",
    bio: 'Creative marketer who loves art exhibitions, beach trips, and deep conversations.',
    hobbies: ['Art', 'Marketing', 'Yoga'],
    isVerified: true,
    badgeType: 'Verified Uni Alumni 🏫',
    badgeClass: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop']
  }
];

const ProposalHubPage = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'swiper' | 'create'>('feed');

  // Search Filters State
  const [filters, setFilters] = useState({
    lookingFor: 'Any',
    minAge: 18,
    maxAge: 45,
    religion: 'Any',
    district: 'Any',
    university: 'Any',
    keyword: ''
  });

  // Active Swiper Card Index
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);

  // Chat Drawer & Paywall Modal State
  const [activeChatProfile, setActiveChatProfile] = useState<any | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>([
    { sender: 'them', text: 'Hi! Happy to connect with you on Uni පොරොන්දම් 🌸' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showVipPaywall, setShowVipPaywall] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered List
  const filteredProposals = sampleProposalsList.filter((item) => {
    if (filters.district !== 'Any' && item.district.toLowerCase() !== filters.district.toLowerCase()) return false;
    if (filters.university !== 'Any' && !item.university.toLowerCase().includes(filters.university.toLowerCase())) return false;
    if (filters.lookingFor !== 'Any' && item.gender.toLowerCase() !== filters.lookingFor.toLowerCase()) return false;
    if (filters.religion !== 'Any' && item.religion.toLowerCase() !== filters.religion.toLowerCase()) return false;
    if (item.age < filters.minAge || item.age > filters.maxAge) return false;
    if (filters.keyword && !item.profession.toLowerCase().includes(filters.keyword.toLowerCase()) && !item.name.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Mask Phone numbers using Regex
    const phoneRegex = /(?:\+?94|0)?\s*7[0-9]{1}\s*[\-\s]?[0-9]{3}\s*[\-\s]?[0-9]{4}/gi;
    let masked = inputMessage.replace(phoneRegex, '[Phone Number Masked - Upgrade to VIP to Unlock Contact]');

    const newMessages = [...chatMessages, { sender: 'me', text: masked }];
    setChatMessages(newMessages);
    setInputMessage('');

    // Trigger Paywall after 3 user messages
    const userMsgCount = newMessages.filter(m => m.sender === 'me').length;
    if (userMsgCount >= 3) {
      setTimeout(() => {
        setShowVipPaywall(true);
      }, 600);
    }
  };

  const handleSwipeLike = () => {
    toast.success("It's a Uni පොරොන්දම් Match! 💖 Opening Chat...");
    setActiveChatProfile(filteredProposals[currentSwiperIndex] || sampleProposalsList[0]);
    if (currentSwiperIndex < filteredProposals.length - 1) {
      setCurrentSwiperIndex(prev => prev + 1);
    }
  };

  const handleSwipePass = () => {
    if (currentSwiperIndex < filteredProposals.length - 1) {
      setCurrentSwiperIndex(prev => prev + 1);
    } else {
      setCurrentSwiperIndex(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-28 pt-20 relative overflow-hidden">
      <SEO
        title="Uni පොරොන්දම් - Verified Campus Proposals & Matchmaking | The Uni Gang"
        description="Discover verified university undergraduates, alumni, and working professionals in Sri Lanka for genuine lifelong connections."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── 1) HERO LANDING SUB-MAIN BANNER ── */}
        <ProposalHeroBanner
          onSearchClick={scrollToFeed}
          onCreateClick={() => setActiveTab('create')}
        />

        {/* ── 2) "FIND YOUR PERFECT MATCH" MULTI-FILTER SEARCH WIDGET ── */}
        <ProposalSearchFilterBar
          onSearch={(newFilters) => {
            setFilters(newFilters);
            scrollToFeed();
          }}
        />

        {/* ── 3) PROPOSAL FEED & SWIPER DIRECTORY ── */}
        <div ref={feedRef} className="space-y-8 mb-16">
          
          {/* Feed View Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-none cursor-pointer ${
                  activeTab === 'feed' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                💍 Proposals Feed Grid ({filteredProposals.length})
              </button>
              <button
                onClick={() => setActiveTab('swiper')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-none cursor-pointer ${
                  activeTab === 'swiper' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎓 Campus Swiper Deck
              </button>
            </div>

            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">
              100% Student Verified Profiles
            </span>
          </div>

          {/* GRID VIEW */}
          {activeTab === 'feed' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProposals.map((proposal) => (
                <TiltCard key={proposal.id}>
                  <div className="relative group bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between h-full hover:border-rose-500/40 transition-all">
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-slate-950">
                      <img src={proposal.images[0]} alt={proposal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border shadow-md ${proposal.badgeClass}`}>
                        {proposal.badgeType}
                      </span>
                      <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-white border border-white/20">
                        📍 {proposal.district} • {proposal.age} yrs
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight line-clamp-1">{proposal.name}</h3>
                      <p className="text-xs text-rose-400 font-extrabold uppercase tracking-wider">{proposal.profession}</p>
                      <p className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <LuGraduationCap size={14} className="text-rose-400" /> {proposal.university}
                      </p>
                      <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed italic pt-1">
                        "{proposal.bio}"
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveChatProfile(proposal);
                        toast.success(`Connected with ${proposal.name}!`);
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                    >
                      <LuMessageSquare size={16} /> Start Conversation
                    </button>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          {/* SWIPER VIEW */}
          {activeTab === 'swiper' && filteredProposals.length > 0 && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-full max-w-md bg-slate-900 rounded-[2.5rem] p-6 border border-slate-800 shadow-2xl relative overflow-hidden text-center">
                <div className="relative h-80 rounded-3xl overflow-hidden mb-5 bg-slate-950">
                  <img src={filteredProposals[currentSwiperIndex]?.images[0]} alt="Swiper Card" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
                    {filteredProposals[currentSwiperIndex]?.badgeType}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-left">
                    <h3 className="text-xl font-black uppercase tracking-tight">{filteredProposals[currentSwiperIndex]?.name}, {filteredProposals[currentSwiperIndex]?.age}</h3>
                    <p className="text-xs text-rose-300 font-bold">{filteredProposals[currentSwiperIndex]?.profession}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 font-medium italic mb-6">
                  "{filteredProposals[currentSwiperIndex]?.bio}"
                </p>

                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={handleSwipePass}
                    className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 hover:text-red-400 flex items-center justify-center text-2xl shadow-lg border-none cursor-pointer active:scale-95 transition-all"
                  >
                    <LuX />
                  </button>
                  <button
                    onClick={handleSwipeLike}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-center text-3xl shadow-xl shadow-rose-500/40 border-none cursor-pointer active:scale-95 transition-all animate-pulse"
                  >
                    <LuHeart />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CREATE PROFILE FORM VIEW */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-400 mb-3">
                  <LuCirclePlus size={28} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Post Your Proposal Profile</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Register for free on Uni පොරොන්දම්</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); toast.success("Proposal Profile submitted for review!"); setActiveTab('feed'); }} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Full Name / Nickname *</label>
                  <input required type="text" placeholder="E.g. Kasun Bandara" className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Age *</label>
                    <input required type="number" placeholder="25" className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">District *</label>
                    <input required type="text" placeholder="E.g. Colombo" className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">University / Institute *</label>
                    <input required type="text" placeholder="E.g. University of Moratuwa" className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Profession / Degree *</label>
                    <input required type="text" placeholder="E.g. Software Engineer" className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Bio / Looking For *</label>
                  <textarea required rows={3} placeholder="Describe yourself and what kind of soulmate you are looking for..." className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white resize-none" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl border-none cursor-pointer">
                  Submit Proposal Profile
                </button>
              </form>
            </div>
          )}

        </div>

        {/* ── 4) TRUST & TARGET AUDIENCE CARDS ── */}
        <ProposalTrustBadges />

        {/* ── 5) FREE VS VIP PRICING CARDS & PAYMENT FLOW ── */}
        <ProposalPricingCards onSubscribeClick={() => setShowVipPaywall(true)} />

        {/* ── 6) 3-STEP HOW IT WORKS JOURNEY ── */}
        <ProposalHowItWorks />

      </div>

      {/* ── IN-APP CHAT DRAWER WITH MASKING & 3-MSG FREE TEASER ── */}
      <AnimatePresence>
        {activeChatProfile && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50 w-full max-w-sm bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={activeChatProfile.images[0]} alt="Match" className="w-10 h-10 rounded-full object-cover border border-white" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight">{activeChatProfile.name}</h4>
                  <span className="text-[9px] font-bold opacity-90 block">{activeChatProfile.profession}</span>
                </div>
              </div>
              <button onClick={() => setActiveChatProfile(null)} className="p-1 text-white border-none bg-transparent cursor-pointer">
                <LuX size={18} />
              </button>
            </div>

            <div className="p-4 h-64 overflow-y-auto space-y-3 bg-slate-950">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-xs font-bold ${
                    m.sender === 'me' ? 'bg-rose-500 text-white' : 'bg-slate-900 text-slate-200 border border-slate-800'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold outline-none text-white"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-rose-500 text-white border-none cursor-pointer">
                <LuSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIP PAYWALL MODAL ── */}
      <AnimatePresence>
        {showVipPaywall && (
          <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-rose-500 shadow-2xl text-center relative"
            >
              <button onClick={() => setShowVipPaywall(false)} className="absolute top-4 right-4 p-2 text-slate-400 border-none bg-transparent cursor-pointer">
                <LuX size={18} />
              </button>

              <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <LuCrown size={32} />
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Upgrade to Uni පොරොන්දම් VIP</h3>
              <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                You've enjoyed your 3 FREE messages! Upgrade to VIP to unlock unlimited messaging & direct WhatsApp contact details.
              </p>

              <button
                onClick={() => { toast.success("Redirecting to PayHere Secure Payment..."); setShowVipPaywall(false); }}
                className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl border-none cursor-pointer mb-3"
              >
                Subscribe VIP Pass - LKR 990/mo
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProposalHubPage;
