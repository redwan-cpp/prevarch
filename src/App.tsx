import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import { ThemeProvider } from './components/ThemeProvider';
import useSmoothScroll from './hooks/useSmoothScroll';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AllProjects = lazy(() => import('./pages/AllProjects'));

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
  
  useSmoothScroll();

  useEffect(() => {
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
              <Loader key="loader\" onComplete={() => setLoading(false)} />
            ) : (
              <>
                <Header />
                <Suspense fallback={<Loader onComplete={() => {}} />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<AllProjects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                  </Routes>
                </Suspense>
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