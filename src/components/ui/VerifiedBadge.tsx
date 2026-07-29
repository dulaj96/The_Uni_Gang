import React from 'react';

interface VerifiedBadgeProps {
  size?: number;
  className?: string;
  title?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 18, className = '', title = 'Verified Student' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 drop-shadow-sm ${className}`}
    >
      {title && <title>{title}</title>}
      {/* Facebook / Meta Signature Scalloped Rosette Circle */}
      <path
        d="M12 2C12.55 2 13.08 2.22 13.47 2.61L14.73 3.87C15.12 4.26 15.65 4.48 16.2 4.48H17.98C19.09 4.48 19.98 5.37 19.98 6.48V8.26C19.98 8.81 20.2 9.34 20.59 9.73L21.85 10.99C22.63 11.77 22.63 13.03 21.85 13.81L20.59 15.07C20.2 15.46 19.98 15.99 19.98 16.54V18.32C19.98 19.43 19.09 20.32 17.98 20.32H16.2C15.65 20.32 15.12 20.54 14.73 20.93L13.47 22.19C12.69 22.97 11.43 22.97 10.65 22.19L9.39 20.93C9 20.54 8.47 20.32 7.92 20.32H6.14C5.03 20.32 4.14 19.43 4.14 18.32V16.54C4.14 15.99 3.92 15.46 3.53 15.07L2.27 13.81C1.49 13.03 1.49 11.77 2.27 10.99L3.53 9.73C3.92 9.34 4.14 8.81 4.14 8.26V6.48C4.14 5.37 5.03 4.48 6.14 4.48H7.92C8.47 4.48 9 4.26 9.39 3.87L10.65 2.61C11.04 2.22 11.57 2 12 2Z"
        fill="url(#meta-verified-blue-gradient)"
      />
      {/* Crisp Bold White Checkmark */}
      <path
        d="M9.8 15.5L6.5 12.2L7.91 10.79L9.8 12.67L16.09 6.38L17.5 7.8L9.8 15.5Z"
        fill="white"
      />
      <defs>
        <linearGradient id="meta-verified-blue-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0084FF" />
          <stop offset="1" stopColor="#0052E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default VerifiedBadge;
