import React from 'react';
import { useScreenshotDetection } from '../../hooks/useScreenshotDetection';
import { ShieldAlert, AlertTriangle } from 'lucide-react';

export function ScreenshotBlocker({ children, currentUserId }: { children: React.ReactNode, currentUserId: string }) {
  const { detected, reset } = useScreenshotDetection(() => {
    // Fire API call to backend to log the attempt
    fetch('http://localhost:5000/api/proposals/privacy/screenshot-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUserId, timestamp: new Date().toISOString() })
    }).catch(console.error);
  });

  return (
    <div className="relative w-full h-full">
      {/* 
        This is a common trick: applying a blur filter or making opacity 0 
        when the document loses focus / is printing.
      */}
      <div className={`w-full h-full transition-all duration-300 ${detected ? 'opacity-0 blur-xl select-none pointer-events-none' : 'opacity-100'}`}>
        {children}
      </div>

      {detected && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-3xl p-6 text-center animate-fade-up">
          <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
            <ShieldAlert size={48} className="text-rose-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" /> Security Alert
          </h2>
          <p className="text-slate-400 font-medium max-w-sm mb-8">
            Screenshots are strictly prohibited in private chats to ensure the privacy of our members. 
            <br/><br/>
            This attempt has been logged and reported to the administration. Repeated attempts will result in an account ban.
          </p>
          <button 
            onClick={reset}
            className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            I Understand
          </button>
        </div>
      )}
    </div>
  );
}
