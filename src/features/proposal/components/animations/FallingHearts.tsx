import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

interface HeartItem {
  id: number;
  left: number; // 0-100 %
  size: number; // px
  duration: number; // s
  delay: number; // s
  opacity: number;
  colorClass: string;
}

export default function FallingHearts({
  count = 24,
  contained = false,
}: {
  count?: number;
  contained?: boolean;
}) {
  const hearts = useMemo<HeartItem[]>(() => {
    const colors = [
      'text-rose-500 fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]',
      'text-fuchsia-500 fill-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]',
      'text-pink-400 fill-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]',
      'text-rose-400 fill-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.9)]',
    ];

    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.floor(Math.random() * 14) + 12, // 12px to 26px
      duration: Math.random() * 5 + 5, // 5s to 10s
      delay: Math.random() * 4,
      opacity: Math.random() * 0.5 + 0.4,
      colorClass: colors[i % colors.length],
    }));
  }, [count]);

  return (
    <div
      className={
        contained
          ? "absolute inset-0 overflow-hidden pointer-events-none z-10"
          : "fixed inset-0 overflow-hidden pointer-events-none z-20"
      }
    >
      <style>{`
        @keyframes floatHeartContained {
          0% {
            transform: translateY(-30px) rotate(0deg) scale(0.7);
            opacity: 0;
          }
          15% {
            opacity: var(--heart-opacity);
          }
          85% {
            opacity: var(--heart-opacity);
          }
          100% {
            transform: translateY(${contained ? '550px' : '105vh'}) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
      {hearts.map((h) => (
        <div
          key={h.id}
          className={`absolute ${h.colorClass}`}
          style={{
            left: `${h.left}%`,
            top: '-30px',
            '--heart-opacity': h.opacity,
            animation: `floatHeartContained ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
          } as React.CSSProperties}
        >
          <Heart size={h.size} />
        </div>
      ))}
    </div>
  );
}
