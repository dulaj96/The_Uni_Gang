import React from 'react';
import { LuShieldAlert, LuX, LuGraduationCap } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

interface VerificationModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <LuX size={16} />
        </button>

        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
          <LuShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Student Verification Required</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          To maintain a zero-scam community, you need to verify your university student email or student ID before posting ads or accessing protected features.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              navigate('/profile');
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <LuGraduationCap className="w-5 h-5" />
            <span>Verify Profile Now</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};
