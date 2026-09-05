import { useState } from 'react';
import AuthCard from '../../components/auth/AuthCard';
import ProposalNavbar from './components/navbar/ProposalNavbar';
import ProposalLandingPage from './pages/ProposalLandingPage';
import ProposalOnboardingPage from './pages/ProposalOnboardingPage';
import ProposalHomePage from './pages/ProposalHomePage';
import ProposalDiscoverPage from './pages/ProposalDiscoverPage';
import ProposalPremiumPage from './pages/ProposalPremiumPage';
import ProposalInboxPage from './pages/ProposalInboxPage';
import ProposalProfilePage from './pages/ProposalProfilePage';
import ProposalSettingsPage from './pages/ProposalSettingsPage';
import ProposalFullProfilePage from './pages/ProposalFullProfilePage';
import ProposalLikesPage from './pages/ProposalLikesPage';
import ErrorBoundary from './components/ErrorBoundary';

export default function ProposalHubEntry() {
  const [appState, setAppState] = useState<'LANDING' | 'ONBOARDING' | 'HOME'>('LANDING');
  const [subPage, setSubPage] = useState<'dashboard' | 'discover' | 'premium' | 'inbox' | 'profile' | 'settings' | 'view_profile' | 'likes'>('dashboard');
  const [activeNavbarTab, setActiveNavbarTab] = useState('home');
  const [dark] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [previousSubPage, setPreviousSubPage] = useState<'dashboard' | 'discover'>('dashboard');

  const handleOpenProfile = (profile: any, from: 'dashboard' | 'discover') => {
    setSelectedProfile(profile);
    setPreviousSubPage(from);
    setSubPage('view_profile');
  };

  const [showAuth, setShowAuth] = useState(false);

  const handleGetStarted = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      setShowAuth(true);
      return;
    }
    setAppState('ONBOARDING');
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setAppState('ONBOARDING');
  };

  const handleOnboardingComplete = () => {
    setAppState('HOME');
    setSubPage('dashboard');
    setActiveNavbarTab('discover');
  };

  const handleGoToLanding = () => {
    setAppState('LANDING');
    setActiveNavbarTab('home');
  };

  const handleNavbarNavigate = (tabId: string) => {
    setActiveNavbarTab(tabId);
    if (tabId === 'home') {
      setAppState('LANDING');
    } else if (tabId === 'discover') {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setShowAuth(true);
      } else if (appState !== 'HOME') {
        setAppState('HOME');
        setSubPage('discover');
      } else {
        setSubPage('discover');
      }
    } else if (tabId === 'premium') {
      if (appState !== 'HOME') setAppState('HOME');
      setSubPage('premium');
    } else if (tabId === 'pricing') {
      if (appState === 'LANDING') {
        const el = document.getElementById('pricing');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setAppState('HOME');
        setSubPage('premium');
      }
    }
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center py-10 relative">
        <button 
          onClick={() => setShowAuth(false)}
          className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 font-bold text-sm"
        >
          &larr; Back to Hub
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">යූනි මංගල සේවයට ඇතුළු වන්න</h2>
          <p className="text-slate-500 text-sm">Please log in or create an account to continue.</p>
        </div>
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  if (appState === 'LANDING') {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-rose-500/30">
          <ProposalNavbar
            activeTab={activeNavbarTab}
            onNavigate={handleNavbarNavigate}
            onGetStarted={handleGetStarted}
            onSignIn={() => setShowAuth(true)}
          />
          <ProposalLandingPage dark={dark} onGetStarted={handleGetStarted} />
        </div>
      </ErrorBoundary>
    );
  }

  if (appState === 'ONBOARDING') {
    return <ProposalOnboardingPage onComplete={handleOnboardingComplete} onBack={handleGoToLanding} dark={dark} />;
  }

  return (
    <ErrorBoundary>
      <ProposalNavbar
        activeTab={subPage === 'discover' ? 'discover' : subPage === 'premium' ? 'premium' : 'home'}
        onNavigate={handleNavbarNavigate}
        onGetStarted={handleGetStarted}
        onSignIn={() => setShowAuth(true)}
      />
      {subPage === 'discover' && <ProposalDiscoverPage setPage={(p) => setSubPage(p as any)} openProfile={(p) => handleOpenProfile(p, 'discover')} />}
      {subPage === 'premium' && <ProposalPremiumPage setPage={(p) => setSubPage(p as any)} />}
      {subPage === 'inbox' && <ProposalInboxPage setPage={(p) => setSubPage(p as any)} />}
      {subPage === 'profile' && <ProposalProfilePage setPage={(p) => setSubPage(p as any)} />}
      {subPage === 'settings' && <ProposalSettingsPage setPage={(p) => setSubPage(p as any)} />}
      {subPage === 'dashboard' && <ProposalHomePage setPage={(p) => setSubPage(p as any)} openProfile={(p) => handleOpenProfile(p, 'dashboard')} goToLanding={handleGoToLanding} />}
      {subPage === 'likes' && <ProposalLikesPage setPage={(p) => setSubPage(p as any)} />}
      {subPage === 'view_profile' && <ProposalFullProfilePage profile={selectedProfile} goBack={() => setSubPage(previousSubPage)} />}
    </ErrorBoundary>
  );
}
