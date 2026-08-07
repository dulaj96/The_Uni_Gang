import React, { useState } from 'react';
import ProposalLandingPage from './pages/ProposalLandingPage';
import ProposalOnboardingPage from './pages/ProposalOnboardingPage';
import ProposalHomePage from './pages/ProposalHomePage';
import ProposalDiscoverPage from './pages/ProposalDiscoverPage';
import ProposalPremiumPage from './pages/ProposalPremiumPage';

import ProposalInboxPage from './pages/ProposalInboxPage';

import ProposalProfilePage from './pages/ProposalProfilePage';
import ProposalSettingsPage from './pages/ProposalSettingsPage';
import ProposalFullProfilePage from './pages/ProposalFullProfilePage';
import ErrorBoundary from './components/ErrorBoundary';

export default function ProposalHubEntry() {
  const [appState, setAppState] = useState<'LANDING' | 'ONBOARDING' | 'HOME'>('LANDING');
  const [subPage, setSubPage] = useState<'dashboard' | 'discover' | 'premium' | 'inbox' | 'profile' | 'settings' | 'view_profile'>('dashboard');
  const [dark] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [previousSubPage, setPreviousSubPage] = useState<'dashboard' | 'discover'>('dashboard');

  const handleOpenProfile = (profile: any, from: 'dashboard' | 'discover') => {
    setSelectedProfile(profile);
    setPreviousSubPage(from);
    setSubPage('view_profile');
  };

  const handleGetStarted = () => {
    setAppState('ONBOARDING');
  };

  const handleOnboardingComplete = () => {
    setAppState('HOME');
  };

  const handleGoToLanding = () => {
    setAppState('LANDING');
  };

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
      {subPage === 'discover' && <ProposalDiscoverPage setPage={setSubPage} openProfile={(p) => handleOpenProfile(p, 'discover')} />}
      {subPage === 'premium' && <ProposalPremiumPage setPage={setSubPage} />}
      {subPage === 'inbox' && <ProposalInboxPage setPage={setSubPage} />}
      {subPage === 'profile' && <ProposalProfilePage setPage={setSubPage} />}
      {subPage === 'settings' && <ProposalSettingsPage setPage={setSubPage} />}
      {subPage === 'dashboard' && <ProposalHomePage setPage={setSubPage} openProfile={(p) => handleOpenProfile(p, 'dashboard')} goToLanding={handleGoToLanding} />}
      {subPage === 'view_profile' && <ProposalFullProfilePage profile={selectedProfile} goBack={() => setSubPage(previousSubPage)} />}
    </ErrorBoundary>
  );
}
