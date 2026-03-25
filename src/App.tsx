import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollHandler from './components/ScrollHandler';

// Home Sections Imports
import Hero from './components/home/Hero';
import FeaturedAnnexes from './components/annex/Annex';
import Services from './components/services/Services';
import Events from './components/events/Events';

// Pages Imports
import FindAccommodationPage from './pages/FindAccommodationPage';
import PostAdPage from './pages/PostAdPage';
import ContactUsPage from './pages/ContactUsPage';
import AnnexDetailsPage from './pages/AnnexDetailsPage';
import ProfilePage from './pages/ProfilePage';
import SEO from './components/SEO';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <ScrollHandler />
        <Routes>
          {/* Home Route containing all sections inline */}
          <Route
            path="/"
            element={
              <div className="flex flex-col">
                <SEO
                  title="The Uni Gang - Find Your Perfect Student Annex in Sri Lanka"
                  description="Connect with the best student accommodations near universities in Sri Lanka. Easy, secure, and student-friendly annex hunting."
                />

                <Hero />

                <div className="w-full space-y-16 lg:space-y-24">
                  <div id="annex"><FeaturedAnnexes /></div>

                  {/* Future Placeholders handling Navigation Anchors */}
                  <div id="feed" className="min-h-[10px]"></div>
                  <Services />
                  <Events />
                  <div id="contact" className="min-h-[10px]"></div>
                </div>
              </div>
            }
          />

          {/* Single Pages */}
          <Route path="/find-accommodation" element={<FindAccommodationPage />} />
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/annex/:id" element={<AnnexDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;