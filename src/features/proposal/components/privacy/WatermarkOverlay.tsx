import React from 'react';
import logoImg from '../../../../assets/logoImage.jpg';

export function WatermarkOverlay({ text, children }: { text: string; children: React.ReactNode }) {
  // Extract clean short ID (e.g., "BR000158" from "ID: BR000158 • Uni Porondam")
  const shortId = text.replace(/ID:\s*/i, '').replace(/•.*/i, '').trim();

  return (
    <div className="relative w-full h-full overflow-hidden group select-none">
      {children}

      {/* 1. Top-Left Faint Brand Watermark Logo */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/15 shadow-sm">
        <img src={logoImg} alt="The Uni Gang Logo" className="w-4 h-4 rounded-full object-cover border border-blue-400/60" />
        <span className="text-[9px] font-black tracking-wide text-white/90 font-sans">
          Uni <span className="text-rose-400">Porondam</span>
        </span>
      </div>

      {/* 2. Bottom-Right Shortened Clean ID Security Badge */}
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-black tracking-wider uppercase bg-slate-950/80 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 backdrop-blur-md shadow-md flex items-center gap-1 font-sans">
          <span>🛡️</span> {shortId || 'VERIFIED'}
        </span>
      </div>
    </div>
  );
}
