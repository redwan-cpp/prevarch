import { Home, Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 py-16">
      <div className="content-grid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a 
              href="/" 
              className="flex items-center space-x-2 font-display font-bold text-xl text-zinc-900 dark:text-white mb-4"
            >
              <Home className="h-6 w-6 text-primary-700 dark:text-primary-500" />
              <span>PREVIEW ARCHITECT ENGINEERS</span>
            </a>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6 max-w-md">
              A modern interior design studio specializing in residential and commercial spaces, creating timeless and functional environments.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/previewarchitect' },
                { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/company/previewinterior/' },
                { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/previewarchitectsengineers' }
              ].map(({ icon: Icon, label, url }) => (
                <a 
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-zinc-800 p-2 rounded-full text-zinc-700 hover:text-primary-700 dark:text-zinc-300 dark:hover:text-primary-400 transition-colors cursor-pointer"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-zinc-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Work', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map(item => (
                <li key={item.name}>
                  <button 
                    onClick={() => handleSmoothScroll(item.id)}
                    className="text-zinc-700 hover:text-primary-700 dark:text-zinc-300 dark:hover:text-primary-400 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-zinc-900 dark:text-white mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-zinc-700 dark:text-zinc-300">
              <p>House 31, Road 1/D</p>
              <p>Nikunja-2, Khilkhet, Dhaka-1229</p>
              <p>
                <a 
                  href="mailto:previewbd@gmail.com" 
                  className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer"
                >
                  previewbd@gmail.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+8801819252989" 
                  className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer"
                >
                  +8801819-252989
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center text-zinc-700 dark:text-zinc-400 text-sm">
          <p>© {currentYear} Preview Architect Engineers. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a 
              href="/privacy-policy" 
              className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              className="hover:text-primary-700 dark:hover:text-primary-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}