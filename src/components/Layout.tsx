import React from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          className: '',
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#1e293b',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
            borderRadius: '1rem',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            fontSize: '0.95rem',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              border: '1px solid rgba(16, 185, 129, 0.2)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              border: '1px solid rgba(239, 68, 68, 0.2)',
            },
          },
        }}
      />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-0">
        <div className="container mx-auto max-w-7xl animate-fade-in">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;