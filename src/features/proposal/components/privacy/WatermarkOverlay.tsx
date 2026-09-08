import React from 'react';

export function WatermarkOverlay({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden group select-none">
      {children}

      {/* Professional Luminous Security Watermark (Clean, Non-cluttered, Fixed Alignment) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 opacity-30 group-hover:opacity-50 transition-opacity duration-300 z-10">
        {/* Top Tier */}
        <div className="w-full flex justify-between items-center transform -rotate-12">
          <span className="text-white/80 font-black text-[9px] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/20 px-2 py-0.5 rounded backdrop-blur-[1px]">
            {text}
          </span>
          <span className="text-white/80 font-black text-[9px] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/20 px-2 py-0.5 rounded backdrop-blur-[1px]">
            {text}
          </span>
        </div>

        {/* Center Luminous Protection Shield */}
        <div className="w-full flex justify-center items-center transform -rotate-12">
          <span className="text-amber-300 font-extrabold text-[10px] uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] bg-slate-950/60 text-amber-300 px-3 py-1 rounded-full border border-amber-400/40 shadow-lg backdrop-blur-sm">
            🛡️ UNI PORONDAM • VERIFIED
          </span>
        </div>

        {/* Bottom Tier */}
        <div className="w-full flex justify-between items-center transform -rotate-12">
          <span className="text-white/80 font-black text-[9px] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/20 px-2 py-0.5 rounded backdrop-blur-[1px]">
            {text}
          </span>
          <span className="text-white/80 font-black text-[9px] uppercase tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-black/20 px-2 py-0.5 rounded backdrop-blur-[1px]">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
