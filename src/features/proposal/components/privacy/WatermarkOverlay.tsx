import React from 'react';

export function WatermarkOverlay({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden group select-none">
      {children}

      {/* Single Clean Bottom Security Badge - Non-obstructive to candidate face */}
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-black tracking-wider uppercase bg-slate-950/70 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-md shadow-lg flex items-center gap-1.5">
          <span>🛡️</span> UNI PORONDAM • {text}
        </span>
      </div>
    </div>
  );
}
