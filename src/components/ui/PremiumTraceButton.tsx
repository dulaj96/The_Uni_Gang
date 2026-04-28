import { motion } from 'framer-motion';
import React from 'react';
import { LuLoader } from 'react-icons/lu';

interface PremiumTraceButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
    index?: number;
    isLoading?: boolean;
}

const PremiumTraceButton: React.FC<PremiumTraceButtonProps> = ({ 
    children, 
    onClick, 
    className = "", 
    icon,
    index = 0,
    isLoading = false
}) => {
    return (
        <motion.button
            onClick={isLoading ? undefined : onClick}
            whileHover={isLoading ? {} : { scale: 1.05 }}
            whileTap={isLoading ? {} : { scale: 0.95 }}
            disabled={isLoading}
            className={`group relative flex items-center justify-center gap-3 px-8 py-4 premium-glass rounded-2xl transition-all shadow-lg shadow-black/5 hover:bg-white/30 dark:hover:bg-slate-800/30 overflow-hidden text-sky-900 dark:text-sky-300 ${isLoading ? 'cursor-wait bg-white/40 dark:bg-slate-800/40' : ''} ${className}`}
        >
            {/* 🌀 Glowing Electric Blue Gradient Trace Effect */}
            <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isLoading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
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
            <div className="relative z-10 flex items-center gap-3">
                {isLoading && (
                    <LuLoader className="animate-spin text-sky-600 dark:text-sky-400" />
                )}
                <span className="font-bold tracking-tight uppercase text-xs tracking-widest">
                    {isLoading ? 'Processing...' : children}
                </span>
                {!isLoading && icon && (
                    <span className="transition-transform group-hover:translate-x-1">
                        {icon}
                    </span>
                )}
            </div>
        </motion.button>
    );
};

export default PremiumTraceButton;
