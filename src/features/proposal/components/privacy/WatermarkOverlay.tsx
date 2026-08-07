import React from 'react';

export function WatermarkOverlay({ text, children }: { text: string; children: React.ReactNode }) {
  // Create an array to repeat the watermark across the screen
  const pattern = Array(15).fill(text);

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {children}
      
      {/* Invisible/Light Watermark Pattern */}
      <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-12 p-4 justify-center content-center opacity-0 group-hover:opacity-40 transition-opacity duration-300">
        {pattern.map((t, i) => (
          <span 
            key={i} 
            className="text-white/30 font-black text-xl -rotate-45 select-none drop-shadow-md"
            style={{ 
              transform: `rotate(-45deg) translate(${Math.random() * 20}px, ${Math.random() * 20}px)` 
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
