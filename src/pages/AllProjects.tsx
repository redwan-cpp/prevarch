import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function AllProjects() {
  return (
    <main className="pt-32">
      <div className="content-grid">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white mb-6">
            Our Projects
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Explore our complete portfolio of interior design projects, each crafted with precision and creativity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index % 3), duration: 0.5 }}
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <Link to={`/projects/${project.id}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 opacity-50 group-hover:opacity-70" />
                
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                  <div className="flex flex-col">
                    <p className="text-zinc-300 text-sm mb-2">{project.category}</p>
                    <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                    <p className="text-zinc-300 text-sm mb-2">{project.description}</p>
                    <p className="text-sm font-mono mt-2">{project.year}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}