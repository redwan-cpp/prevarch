import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Home as HomeIcon, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === Number(id));

useEffect(() => {
  const timer = setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 0);
  return () => clearTimeout(timer);
}, []);;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-32">
      <div className="content-grid">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-zinc-600 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-[60vh] object-cover rounded-lg mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                {project.title}
              </h1>
              
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                  {project.fullDescription}
                </p>

                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p>{project.challenge}</p>

                <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
                <p>{project.approach}</p>

                <h2 className="text-2xl font-bold mb-4">The Outcome</h2>
                <p>{project.outcome}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                <h3 className="font-display text-xl font-bold mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Year</p>
                      <p className="font-medium">{project.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <HomeIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Type</p>
                      <p className="font-medium">{project.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Duration</p>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3" />
                    <div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">Client</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                <h3 className="font-display text-xl font-bold mb-4">Services Provided</h3>
                <ul className="space-y-2">
                  {project.services.map((service, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {project.gallery && (
            <div className="mt-16">
              <h2 className="font-display text-3xl font-bold mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    className="w-full h-[400px] object-cover rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}