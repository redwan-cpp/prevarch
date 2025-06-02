import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const linkClasses = "relative font-medium text-zinc-900 dark:text-zinc-100 py-2 px-1 transition-colors hover:text-primary-600 dark:hover:text-primary-400 after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-primary-600 dark:after:bg-primary-400 after:left-0 after:bottom-0 after:transition-all hover:after:w-full";
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md shadow-sm' : 'py-6'
    }`}>
      <div className="content-grid">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 font-display font-bold text-xl text-zinc-900 dark:text-white"
          >
            <Home className="h-6 w-6 text-primary-600 dark:text-primary-500" />
            <span>PREVIEW ARCHITECT ENGINEERS</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'About', id: 'about' },
              { name: 'Services', id: 'services' },
              { name: 'Projects', id: 'projects' },
              { name: 'Contact', id: 'contact' }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={linkClasses}
              >
                {item.name}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5 text-zinc-200" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5 text-zinc-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            <Button 
              variant="default"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => handleNavigation('contact')}
            >
              Schedule consultation
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-white dark:bg-background-dark"
          >
            <div className="content-grid py-6 space-y-6">
              <nav className="flex flex-col space-y-4">
                {[
                  { name: 'About', id: 'about' },
                  { name: 'Services', id: 'services' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Contact', id: 'contact' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="text-lg font-medium text-zinc-900 dark:text-zinc-100 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
              
              <Button 
                variant="default"
                className="w-full"
                onClick={() => handleNavigation('contact')}
              >
                Schedule consultation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}