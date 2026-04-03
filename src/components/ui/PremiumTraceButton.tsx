import { motion } from 'framer-motion';
import React from 'react';

interface PremiumTraceButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    index?: number;
}

const PremiumTraceButton: React.FC<PremiumTraceButtonProps> = ({ 
    children, 
    onClick, 
    className = "", 
    icon,
    index = 0 
}) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative flex items-center justify-center gap-3 px-8 py-4 premium-glass rounded-2xl transition-all shadow-lg shadow-black/5 hover:bg-white/30 dark:hover:bg-slate-800/30 overflow-hidden text-sky-900 dark:text-sky-300 ${className}`}
        >
            {/* 🌀 Glowing Electric Blue Gradient Trace Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg className="w-full h-full">
                    <defs>
                        <linearGradient id={`blue-gradient-btn-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f0f9ff" />
                            <stop offset="50%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#0ea5e9" />
                        </linearGradient>
                    </defs>

                    {/* 1. Outer Glow Layer */}
                    <motion.rect
                        x="1"
                        y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        fill="none"
                        stroke={`url(#blue-gradient-btn-${index})`}
                        strokeWidth="6"
                        rx="16"
                        strokeDasharray="400 600"
                        style={{ filter: 'blur(5px)', opacity: 0.8 }}
                        animate={{
                            strokeDashoffset: [0, -1000],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "linear",
                        }}
                    />

                    {/* 2. Sharp Inner Layer */}
                    <motion.rect
                        x="1"
                        y="1"
                        width="calc(100% - 2px)"
                        height="calc(100% - 2px)"
                        fill="none"
                        stroke={`url(#blue-gradient-btn-${index})`}
                        strokeWidth="2.5"
                        rx="16"
                        strokeDasharray="400 600"
                        animate={{
                            strokeDashoffset: [0, -1000],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "linear",
                        }}
                    />
                </svg>
            </div>

            {/* Button content */}
            <span className="font-bold tracking-tight uppercase text-xs tracking-widest relative z-10">
                {children}
            </span>
            {icon && (
                <span className="relative z-10 transition-transform group-hover:translate-x-1">
                    {icon}
                </span>
            )}
        </motion.button>
    );
};

export default PremiumTraceButton;
