import { useEffect, useState } from 'react';

export function useScreenshotDetection(onDetect: () => void) {
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect PrintScreen or Cmd+Shift+3/4 (Mac)
      if (
        e.key === 'PrintScreen' || 
        (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4'))
      ) {
        setDetected(true);
        onDetect();
      }
    };

    const handleVisibilityChange = () => {
      // Crude heuristic for mobile screenshot or backgrounding
      if (document.hidden) {
        // We can't strictly know if it was a screenshot on mobile web, 
        // but we can blur the screen when hidden to prevent background screenshots.
      }
    };

    window.addEventListener('keyup', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onDetect]);

  return { detected, reset: () => setDetected(false) };
}
