import { useState } from 'react';
import AuthCard from '../../components/auth/AuthCard';
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
  };

  const handleGoToLanding = () => {
    setAppState('LANDING');
  };

  if (showAuth) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center py-10 relative">
        <button 
          onClick={() => setShowAuth(false)}
          className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 font-bold"
        >
          &larr; Back
        </button>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Join the Proposals Hub</h2>
          <p className="text-slate-500">Please create an account or log in to continue.</p>
        </div>
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  if (appState === 'LANDING') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-white selection:bg-rose-500/30">
        <ProposalLandingPage dark={dark} onGetStarted={handleGetStarted} />
      </div>
    );
  }

  if (appState === 'ONBOARDING') {
    return <ProposalOnboardingPage onComplete={handleOnboardingComplete} onBack={handleGoToLanding} dark={dark} />;
  }

  return (
    <ErrorBoundary>
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
