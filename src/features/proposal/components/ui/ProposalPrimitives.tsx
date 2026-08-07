import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const cx = (...a: (string | undefined | null | false)[]) => a.filter(Boolean).join(" ");

export function Logo({ dark }: { dark: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 grid place-items-center shadow-lg shadow-rose-500/20 shrink-0">
        <Heart size={16} className="text-white" fill="white" strokeWidth={0} />
      </div>
      <div className="leading-none">
        <h1 className="font-bold text-lg text-slate-900 dark:text-white">Uni පොරොන්දම්</h1>
        <p className="text-[10px] tracking-wide font-medium text-slate-500 dark:text-slate-400">The Uni Gang</p>
      </div>
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ElementType;
  small?: boolean;
  dark?: boolean;
}

export function PrimaryButton({ children, className, icon: Icon, small, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-1.5 font-semibold rounded-full transition-all active:scale-95",
        "bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 hover:brightness-110",
        small ? "text-xs px-4 py-2" : "text-sm px-6 py-2.5",
        className
      )}
      {...props}
    >
      {Icon && <Icon size={small ? 14 : 16} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

export function GhostButton({ children, className, icon: Icon, small, dark, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center gap-1.5 font-semibold rounded-full transition-all active:scale-95",
        "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-700",
        small ? "text-xs px-4 py-2" : "text-sm px-5 py-2.5",
        className
      )}
      {...props}
    >
      {Icon && <Icon size={small ? 14 : 16} strokeWidth={2.5} />}
      {children}
    </button>
  );
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-rose-100/80 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20 backdrop-blur-md">
      <Sparkles size={12} /> {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cx("glass-card rounded-2xl overflow-hidden transition-all duration-300", className)}>
      {children}
    </div>
  );
}

export function IconChip({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 min-w-0 bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
      <div className="shrink-0 grid place-items-center w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400">
        <Icon size={16} strokeWidth={2.5} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 truncate">{label}</p>
        <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100 truncate">{value}</p>
      </div>
    </div>
  );
}

export function Field({ label, placeholder, isSelect, options, required }: { label: string; placeholder: string; isSelect?: boolean, options?: string[], required?: boolean }) {
  const cls = "w-full text-sm rounded-xl px-4 py-3 outline-none transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 appearance-none cursor-pointer";
  
  const finalOptions = options 
    ? options 
    : (isSelect && placeholder.includes(' / ') ? placeholder.split(' / ') : [placeholder]);

  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-wider mb-2 block text-slate-600 dark:text-slate-400">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {isSelect ? (
        <div className="relative">
          <select className={cls} required={required} defaultValue="">
            <option value="" disabled>Select...</option>
            {finalOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      ) : (
        <input className={cls} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}
