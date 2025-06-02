import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Home, Hotel, Grid2X2 } from 'lucide-react';
import useAnimatedText from '../../hooks/useAnimatedText';
import { services } from '../../data/services';

interface CursorHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

interface ServicesProps {
  cursorHandlers: CursorHandlers;
}

const serviceIcons = {
  residential: Home,
  commercial: Building2,
  hospitality: Hotel,
  flooring: Grid2X2
};

export default function Services({ cursorHandlers }: ServicesProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useAnimatedText({ selector: '.services-animated-text', stagger: 0.02 });

  const handleInteraction = (serviceKey: string) => {
    if (isMobile) {
      setActiveService(activeService === serviceKey ? null : serviceKey);
    } else {
      setHoveredService(serviceKey);
    }
  };

  return (
    <section id="services" className="content-grid py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-white mb-6">
          <span className="services-animated-text">Transforming ideas into</span>
          <span className="services-animated-text block">digital reality</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Our comprehensive suite of services is designed to deliver end-to-end solutions that solve real business problems while pushing creative boundaries.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(services).map(([key, service], index) => {
          const Icon = serviceIcons[key as keyof typeof serviceIcons];
          const isActive = hoveredService === key || activeService === key;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`
                relative overflow-hidden rounded-lg transition-all duration-300
                ${isActive ? 'bg-white dark:bg-zinc-800 shadow-lg scale-[1.02] z-10' : 'bg-white/70 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800/90 shadow-sm'}
              `}
              onMouseEnter={() => !isMobile && handleInteraction(key)}
              onMouseLeave={() => !isMobile && setHoveredService(null)}
              onClick={() => isMobile && handleInteraction(key)}
              {...cursorHandlers}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{service.icon}</span>
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{service.description}</p>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700"
                    >
                      <ul className="space-y-2">
                        {service.items.map((item, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                            className="flex items-center text-zinc-700 dark:text-zinc-300"
                          >
                            <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-600 dark:bg-primary-400"></span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}