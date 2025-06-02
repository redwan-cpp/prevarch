import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cuboid as Cube } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500); // Small delay before transitions out
          return 100;
        }
        return newProgress;
      });
    }, 28); // Adjust timing to match the loader duration
    
    return () => clearInterval(interval);
  }, [onComplete]);
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background-light dark:bg-background-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <Cube size={64} className="text-primary-600 dark:text-primary-500" />
        </motion.div>
        
        <div className="w-64 h-[2px] bg-zinc-200 dark:bg-zinc-800 overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-primary-600 dark:bg-primary-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        <div className="mt-4 font-mono text-sm text-zinc-600 dark:text-zinc-400">
          <AnimatePresence mode="wait">
            <motion.div
              key={`progress-${Math.floor(progress / 10) * 10}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {progress < 100 ? `Loading ${progress}%` : 'Ready'}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}