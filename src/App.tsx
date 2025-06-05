import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AllProjects from './pages/AllProjects';
import { ThemeProvider } from './components/ThemeProvider';
import useSmoothScroll from './hooks/useSmoothScroll';

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  
  // Initialize smooth scroll
  useSmoothScroll();

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToSection />
        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <Loader key="loader" onComplete={() => setLoading(false)} />
            ) : (
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<AllProjects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                </Routes>
                <Footer />
              </>
            )}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;