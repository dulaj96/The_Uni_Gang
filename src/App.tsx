import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SubLayout from './components/layout/SubLayout';
import ScrollHandler from './components/layout/ScrollHandler';

// Home Sections Imports
import Hero from './components/home/Hero';
import FeaturedAnnexes from './components/annex/Annex';
import Services from './components/services/Services';
import Events from './components/events/Events';

import Contact from './components/contact/Contact';

// Pages Imports
import FindAccommodationPage from './pages/FindAccommodationPage';
import PostAdPage from './pages/PostAdPage';
import ContactUsPage from './pages/ContactUsPage';
import AnnexDetailsPage from './pages/annex/AnnexDetailsPage';
import ProfilePage from './pages/ProfilePage';
import WhatsAppButton from './components/whatsAppButton/WhatsAppButton';
import SEO from './components/SEO';
import './App.css';
import AnnexList from './pages/annex/AnnexList';
import EventList from './pages/events/EventList';

function App() {
  return (
    <Router>
      <ScrollHandler />
      <Routes>
        {/* Home Route containing all sections inline */}
        <Route
          path="/"
          element={
            <Layout>
              <div className="flex flex-col">
                <SEO
                  title="The Uni Gang - Find Your Perfect Student Annex in Sri Lanka"
                  description="Connect with the best student accommodations near universities in Sri Lanka. Easy, secure, and student-friendly annex hunting."
                />

                <Hero />

                <div className="w-full space-y-8 lg:space-y-12">
                  <div id="annex"><FeaturedAnnexes /></div>

                  {/* Future Placeholders handling Navigation Anchors */}
                  <div id="feed" className="min-h-[10px]"></div>
                  <Services />
                  <Events />
                  <Contact />
                </div>
              </div>
            </Layout>
          }
        />

        {/* Single Pages using standard Layout */}
        <Route path="/find-accommodation" element={<Layout><FindAccommodationPage /></Layout>} />
        <Route path="/post-ad" element={<Layout><PostAdPage /></Layout>} />
        <Route path="/contact-us" element={<Layout><ContactUsPage /></Layout>} />
        <Route path="/annex/:id" element={<Layout><AnnexDetailsPage /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />

        {/* AnnexList using SubLayout */}
        <Route path="/annex-list" element={<SubLayout><AnnexList /></SubLayout>} />

        {/* EventList using SubLayout */}
        <Route path="/event-list" element={<SubLayout><EventList /></SubLayout>} />
      </Routes>

      <WhatsAppButton />
    </Router>
  );
}

export default App;