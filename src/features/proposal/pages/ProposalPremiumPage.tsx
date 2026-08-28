import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Crown, CheckCircle2, Star, Sparkles, Heart, Video, Lock, X, UploadCloud, FileImage, CreditCard } from 'lucide-react';
import { GhostButton } from '../components/ui/ProposalPrimitives';

export default function ProposalPremiumPage({ setPage }: { setPage: (p: string) => void }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    date: '',
    reference: '',
    whatsapp: ''
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentData.date || !paymentData.whatsapp || !receiptFile) {
      alert("Please fill all required fields and upload the receipt.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('payment_date', paymentData.date);
      formData.append('reference_number', paymentData.reference);
      formData.append('whatsapp_number', paymentData.whatsapp);
      formData.append('receipt', receiptFile);

      const token = localStorage.getItem('userToken');
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'}/api/proposals/payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Payment submitted successfully! An admin will verify your account shortly.");
        setShowPaymentModal(false);
        setPage('dashboard');
      } else {
        alert(data.message || "Failed to submit payment");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const premiumFeatures = [
    "Unlimited profile viewing & proposals (No daily limits)",
    "Instant 'Who Liked You' unlocking & match now",
    "Sri Lankan Advanced Filters (Hometown, Past Affairs Openness, MSc/PhD Goals)",
    "Priority profile placement (5x more views in Discover stack)",
    "Read receipts & Undo accidental swipes",
    "Exclusive 3x3 Grid / Gallery View",
    "Ad-free premium experience"
  ];

  const freeFeatures = [
    "Create verified student / graduate profile",
    "Fill Sri Lankan Story & Ideal Partner Prompts",
    "View 6 profiles per day",
    "Send 6 proposals per day",
    "Basic District, Age & Gender filtering",
    "6 Messages per matched connection",
    "Automated AI Contact Number & Social Masking (Security)",
    "Default Photo Blurring & Screenshot Protection"
  ];

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
                    Rs. 1500
                  </span>
                  <span className="text-sm font-bold text-slate-400">/ month</span>
                </div>
              </div>
              
              <ul className="space-y-5 flex-1 relative z-10">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="text-amber-500 shrink-0 mt-0.5 drop-shadow-sm" />
                    <span className="text-sm font-bold text-slate-200 leading-relaxed drop-shadow-sm">{f}</span>
                  </li>
                ))}
                
                {/* Highlighted Video Call Feature */}
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-amber-500/30">
                    <Video size={12} className="text-white" fill="white" />
                  </div>
                  <span className="text-sm font-black text-amber-500 leading-relaxed drop-shadow-sm">
                    Exclusive In-App Video & Voice Calling (100% Privacy)
                  </span>
                </li>
              </ul>
              
              <div className="mt-10 relative z-10">
                <button onClick={() => setShowPaymentModal(true)} className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white text-base font-black shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] hover:shadow-[0_10px_35px_-5px_rgba(245,158,11,0.6)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                  Upgrade to Premium <Crown size={20} />
                </button>
                <p className="text-center text-xs text-slate-500 font-medium mt-4">One-time manual transfer verification.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => !isSubmitting && setShowPaymentModal(false)} 
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <CreditCard className="text-amber-500" /> Manual Bank Transfer
                </h3>
                <button onClick={() => !isSubmitting && setShowPaymentModal(false)} className="text-slate-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6">
                  <p className="text-amber-400 text-sm font-bold mb-2 uppercase tracking-wider text-center">Bank Details</p>
                  <div className="space-y-1 text-center">
                    <p className="text-white font-medium">Bank: <span className="font-bold">Commercial Bank</span></p>
                    <p className="text-white font-medium">Branch: <span className="font-bold">Colombo 07</span></p>
                    <p className="text-white font-medium">Account Name: <span className="font-bold">The Uni Gang (Pvt) Ltd</span></p>
                    <p className="text-amber-500 text-2xl font-black mt-2">1234 5678 9101</p>
                  </div>
                </div>

                <form id="payment-form" onSubmit={handlePaymentSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Transfer Date & Time *</label>
                    <input 
                      type="datetime-local" 
                      required
                      value={paymentData.date}
                      onChange={e => setPaymentData({...paymentData, date: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Reference Number / Remarks</label>
                    <input 
                      type="text" 
                      placeholder="e.g. TR-291039 or 'Premium'"
                      value={paymentData.reference}
                      onChange={e => setPaymentData({...paymentData, reference: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="07X XXX XXXX"
                      value={paymentData.whatsapp}
                      onChange={e => setPaymentData({...paymentData, whatsapp: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <p className="text-xs text-slate-500 mt-1">We will contact you if there's an issue with the slip.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2">Upload Transfer Slip (Image/PDF) *</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-slate-900 transition-colors"
                    >
                      {receiptFile ? (
                        <>
                          <FileImage size={32} className="text-amber-500 mb-2" />
                          <p className="text-white font-bold text-sm">{receiptFile.name}</p>
                        </>
                      ) : (
                        <>
                          <UploadCloud size={32} className="text-slate-500 mb-2" />
                          <p className="text-slate-400 font-medium text-sm">Click to browse file</p>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*,application/pdf"
                      required
                      onChange={e => {
                        if (e.target.files?.[0]) setReceiptFile(e.target.files[0]);
                      }}
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-slate-800 flex gap-4">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="payment-form"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 disabled:opacity-50 transition-all flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit for Review"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
