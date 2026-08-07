import { useState, useEffect } from 'react';
import { Clock, Crown, Zap } from 'lucide-react';
import { PrimaryButton } from '../ui/ProposalPrimitives';

export function PremiumTrialCountdown({ onUpgrade }: { onUpgrade: () => void }) {
  // Hardcoded for demo: 71 hours, 59 minutes, 59 seconds from now
  // In a real app, you'd fetch the trial end date from the backend
  const [timeLeft, setTimeLeft] = useState({ hours: 71, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else {
            if (hours > 0) {
              hours--;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-2xl p-5 premium-glass bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[80px] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 grid place-items-center text-white shadow-lg shadow-amber-500/30 shrink-0">
            <Crown size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              Free Premium Trial Active <Zap size={16} className="text-amber-400 animate-pulse" />
            </h3>
            <p className="text-sm font-medium text-slate-400 mt-1">
              You are experiencing the full power of Uni Porondam.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-white font-mono bg-black/40 px-4 py-2 rounded-xl border border-white/10 shadow-inner backdrop-blur-md">
            <Clock size={16} className="text-amber-500" />
            <div className="flex items-center gap-1 text-lg font-black tracking-widest text-amber-400">
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-slate-500 animate-[pulse_1s_ease-in-out_infinite]">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-slate-500 animate-[pulse_1s_ease-in-out_infinite]">:</span>
              <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
          <PrimaryButton small onClick={onUpgrade} className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20 hover:shadow-amber-500/40 border-none">
            Keep Premium
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
