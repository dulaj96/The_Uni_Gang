import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Header />
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