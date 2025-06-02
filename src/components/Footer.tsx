import { Home, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

interface CursorHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

interface FooterProps {
  cursorHandlers: CursorHandlers;
}

export default function Footer({ cursorHandlers }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-100 dark:bg-zinc-900 py-16">
      <div className="content-grid">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <a 
              href="#" 
              className="flex items-center space-x-2 font-display font-bold text-xl text-zinc-900 dark:text-white mb-4"
              {...cursorHandlers}
            >
              <Home className="h-6 w-6 text-primary-600 dark:text-primary-500" />
              <span>PREVIEW ARCHITECT ENGINEERS</span>
            </a>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
              A modern interior design studio specializing in residential and commercial spaces, creating timeless and functional environments.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' }
              ].map(({ icon: Icon, label }) => (
                <a 
                  key={label}
                  href="#"
                  className="bg-white dark:bg-zinc-800 p-2 rounded-full text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 transition-colors"
                  aria-label={label}
                  {...cursorHandlers}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-zinc-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Contact', 'Careers'].map(item => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`}
                    className="text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 transition-colors"
                    {...cursorHandlers}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-zinc-900 dark:text-white mb-4">Contact</h3>
            <address className="not-italic space-y-3 text-zinc-600 dark:text-zinc-400">
              <p>House 31, Road 1/D</p>
              <p>Nikunja-2, Khilkhet, Dhaka-1229</p>
              <p>
                <a 
                  href="mailto:previewbd@gmail.com" 
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  {...cursorHandlers}
                >
                  previewbd@gmail.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  {...cursorHandlers}
                >
                  +8801819-252989
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row md:justify-between items-center text-zinc-500 dark:text-zinc-500 text-sm">
          <p>© {currentYear} Preview Architect. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <a 
              href="#" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              {...cursorHandlers}
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              {...cursorHandlers}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}