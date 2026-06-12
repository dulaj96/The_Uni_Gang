import confetti from 'canvas-confetti';

/**
 * Fires a multi-angled, colorful canvas confetti blast using the system theme colors.
 * Lasts for exactly 3 seconds and runs dynamically at 60fps using requestAnimationFrame.
 */
export const celebrate = () => {
  const duration = 3000; // 3 seconds in milliseconds
  const animationEnd = Date.now() + duration;
  const colors = [
    '#3b82f6', // Blue
    '#6366f1', // Indigo
    '#a855f7', // Purple
    '#f43f5e', // Rose/Pink
    '#10b981', // Emerald
    '#f59e0b', // Amber
  ];

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return;
    }

    // Left side blast shooting towards the center-right
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.85 },
      colors: colors,
    });

    // Right side blast shooting towards the center-left
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.85 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  }());
};
