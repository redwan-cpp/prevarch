import { motion } from 'framer-motion';
import { Activity, Code, Palette, Globe } from 'lucide-react';

interface CursorHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

interface AboutProps {
  cursorHandlers: CursorHandlers;
}

function FeatureItem({ 
  icon: Icon, 
  title, 
  description, 
  delay,
  cursorHandlers 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  delay: number;
  cursorHandlers: CursorHandlers;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      {...cursorHandlers}
    >
      <div className="rounded-full bg-primary-100 dark:bg-primary-900/30 p-3 inline-flex mb-4">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </motion.div>
  );
}

export default function About({ cursorHandlers }: AboutProps) {
  const features = [
    {
      icon: Globe,
      title: "Innovative Design",
      description: "Creating unique and functional spaces that reflect your style and meet your needs."
    },
    {
      icon: Code,
      title: "Expert Planning",
      description: "Detailed space planning and layout optimization for maximum efficiency and comfort."
    },
    {
      icon: Palette,
      title: "Quality Materials",
      description: "Using premium materials and finishes to ensure lasting beauty and durability."
    },
    {
      icon: Activity,
      title: "Timely Execution",
      description: "Professional project management ensuring on-time and on-budget delivery."
    }
  ];

  return (
    <section id="about" className="content-grid py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-white mb-6">
          Crafting Beautiful Spaces Since 2015
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          With over a decade of experience, Preview Architect has established itself as a leader in interior design and architecture, delivering exceptional spaces that inspire and delight.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={0.1 * index}
            cursorHandlers={cursorHandlers}
          />
        ))}
      </div>
    </section>
  );
}