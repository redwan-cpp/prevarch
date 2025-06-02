import { useEffect } from 'react';

export default function useSmoothScroll() {
  useEffect(() => {
    // Skip if we're in a server environment
    if (typeof window === 'undefined') return;

    // Check if device supports smooth scrolling natively
    // and if it's not a mobile device (which may have performance issues)
    const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (supportsNativeSmoothScroll && !isMobile) {
      // Use native smooth scrolling via CSS
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    // For browsers without native support or mobile devices,
    // we'll implement a basic JS-based smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (!anchor) return;
      
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: 'smooth'
      });
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (supportsNativeSmoothScroll) {
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, []);
}