import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAnimatedText from '../../hooks/useAnimatedText';
import { projects } from '../../data/projects';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useAnimatedText({ selector: '.projects-animated-text', stagger: 0.02 });

  return (
    <section id="projects" className="content-grid py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-white mb-6 whitespace-normal">
          <span className="projects-animated-text inline">Featured projects</span>{' '}
          <span className="projects-animated-text inline">and case studies</span>
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Explore our portfolio of award-winning interior design projects that showcase our approach to creating beautiful, functional spaces.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.slice(0, 2).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index % 2), duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            onClick={() => {
              navigate(`/projects/${project.id}`, {
                state: { from: location.pathname }
              });
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 opacity-50 group-hover:opacity-70" />
            
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-zinc-300 text-sm mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                  
                  <AnimatePresence>
                    {activeProject === project.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-zinc-300 text-sm max-w-md"
                      >
                        {project.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                
                <p className="text-sm font-mono">{project.year}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Button 
          size="lg" 
          variant="outline"
          className="group"
          onClick={() => navigate('/projects')}
        >
          <span>View all projects</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </section>
  );
}