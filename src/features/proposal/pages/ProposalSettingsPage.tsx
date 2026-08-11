import { useState } from 'react';

import { ChevronLeft, ShieldCheck, Mail, Link as LinkIcon, Smartphone, MessageCircle, Crown, Lock, EyeOff } from 'lucide-react';
import { PrimaryButton, Card, cx } from '../components/ui/ProposalPrimitives';

export default function ProposalSettingsPage({ setPage }: { setPage: (p: string) => void }) {
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'linkedin' | 'id' | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setPage('dashboard')} className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Settings & Verification</h1>
      </div>

      <div className="space-y-8">
        
        {/* Verification Status Card */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-100 dark:border-blue-900/30">
          <div className="flex items-start sm:items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400 grid place-items-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Profile Not Verified</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Verify your account to get the Gold Badge and increase your trust score.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Choose Verification Method</h3>
            
            <button 
              onClick={() => setVerificationMethod('email')}
              className={cx(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-colors",
                verificationMethod === 'email' ? "bg-white dark:bg-slate-800 border-blue-500 ring-1 ring-blue-500" : "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" size={20} />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">University Email</p>
                  <p className="text-xs text-slate-500">Fastest method if you have a .ac.lk email</p>
                </div>
              </div>
              <div className={cx("w-4 h-4 rounded-full border-2", verificationMethod === 'email' ? "border-blue-500 bg-blue-500" : "border-slate-300")} />
            </button>

            <button 
              onClick={() => setVerificationMethod('id')}
              className={cx(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-colors",
                verificationMethod === 'id' ? "bg-white dark:bg-slate-800 border-blue-500 ring-1 ring-blue-500" : "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="text-blue-500" size={20} />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Upload Campus ID</p>
                  <p className="text-xs text-slate-500">Upload a photo of your Student ID</p>
                </div>
              </div>
              <div className={cx("w-4 h-4 rounded-full border-2", verificationMethod === 'id' ? "border-blue-500 bg-blue-500" : "border-slate-300")} />
            </button>

            <button 
              onClick={() => setVerificationMethod('linkedin')}
              className={cx(
                "w-full flex items-center justify-between p-4 rounded-2xl border transition-colors",
                verificationMethod === 'linkedin' ? "bg-white dark:bg-slate-800 border-blue-500 ring-1 ring-blue-500" : "bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-300"
              )}
            >
              <div className="flex items-center gap-3">
                <LinkIcon className="text-blue-600" size={20} />
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Social Media Link</p>
                  <p className="text-xs text-slate-500">For passed out alumni without Uni emails</p>
                </div>
              </div>
              <div className={cx("w-4 h-4 rounded-full border-2", verificationMethod === 'linkedin' ? "border-blue-500 bg-blue-500" : "border-slate-300")} />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <PrimaryButton className="w-full sm:w-auto" disabled={!verificationMethod}>Submit for Verification</PrimaryButton>
            <a href="#" className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              <MessageCircle size={16} /> Need help? WhatsApp Us
            </a>
          </div>
        </Card>

        {/* Subscription Plan */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">Subscription <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full">Free Plan</span></h2>
              <p className="text-sm text-slate-500 max-w-sm mt-2">You currently have a limited amount of daily swipes and cannot see who liked you.</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-500 grid place-items-center">
              <Crown size={24} />
            </div>
          </div>
          <button onClick={() => setPage('premium')} className="mt-6 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline">Upgrade to Premium &rarr;</button>
        </Card>

        {/* Privacy & Account */}
        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Privacy & Account</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><Lock size={16} className="text-slate-400" /> Blur my photos</p>
                <p className="text-xs text-slate-500 mt-1">Your photos will be blurred to unverified users.</p>
              </div>
              <button className="w-12 h-6 bg-blue-500 rounded-full relative transition-colors duration-300">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><EyeOff size={16} className="text-slate-400" /> Pause my profile</p>
                <p className="text-xs text-slate-500 mt-1">Hide your profile from Discovery. You can still message matches.</p>
              </div>
              <button className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative transition-colors duration-300">
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" />
              </button>
            </div>
            
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <button className="text-sm font-bold text-rose-500 hover:underline">Delete Proposal Account</button>
            </div>
          </div>
        </Card>

        {/* Developer Options (Hidden in Prod usually) */}
        <Card className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/50 border-dashed border-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">🛠️ Developer Options</h2>
          <p className="text-sm text-slate-500 mb-6">Use these tools to test features like Inbox and Calls.</p>
          
          <PrimaryButton 
            className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
            onClick={async () => {
              try {
                const { proposalApi } = await import('../api/proposalApi');
                const res = await proposalApi.seedTestData();
                if (res.success) {
                  alert(res.message);
                }
              } catch (err) {
                console.error(err);
                alert("Failed to generate test data");
              }
            }}
          >
            Generate Test Dummy Data
          </PrimaryButton>
        </Card>

      </div>
    </div>
  );
}
