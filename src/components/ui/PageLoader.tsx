import React from 'react';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 dark:bg-slate-950/60 backdrop-blur-md">
      <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
      {message && (
        <p className="mt-4 text-slate-800 dark:text-slate-200 font-semibold tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default PageLoader;
