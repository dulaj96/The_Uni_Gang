import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FindAccommodationPage from './pages/FindAccommodationPage';
import PostAdPage from './pages/PostAdPage';
import ContactUsPage from './pages/ContactUsPage';
import AnnexDetailsPage from './pages/AnnexDetailsPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <Layout>
      <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
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