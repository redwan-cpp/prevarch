

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../ui/Button'; // Adjust based on ui/Button location
import { Send } from 'lucide-react';
import { services } from '../../../../data/services'; // Adjust based on data/services location
import { db } from '../../lib/firebase'; // Updated path
import { collection, addDoc } from 'firebase/firestore';

interface CursorHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

interface ContactProps {
  cursorHandlers: CursorHandlers;
}

export default function Contact({ cursorHandlers }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        ...formState,
        createdAt: new Date().toISOString()
      });

      console.log('Document written with ID: ', docRef.id);
      setSubmitStatus('success');
      setFormState({
        name: '',
        email: '',
        message: '',
        service: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="content-grid py-20 md:py-32 bg-zinc-50 dark:bg-zinc-900/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="font-display font-bold text-3xl md:text-4xl text-zinc-900 dark:text-white mb-6">
          Let's Create Your Dream Space
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Ready to transform your space? Get in touch with us for a free consultation and let's discuss your vision.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Get in touch</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Email</h4>
              <a 
                href="mailto:previewbd@gmail.com"
                className="text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                {...cursorHandlers}
              >
                previewbd@gmail.com
              </a>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Phone</h4>
              <a 
                href="tel:+8801819252989"
                className="text-zinc-600 dark:text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                {...cursorHandlers}
              >
                +8801819-252989
              </a>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Office</h4>
              <address className="not-italic text-zinc-600 dark:text-zinc-400">
                House 31, Road 1/D<br />
                Nikunja-2, Khilkhet<br />
                Dhaka-1229, Bangladesh
              </address>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                {...cursorHandlers}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                {...cursorHandlers}
              />
            </div>
            
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formState.service}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                {...cursorHandlers}
              >
                <option value="">Select a service</option>
                {Object.entries(services).map(([key, service]) => (
                  <option key={key} value={key}>{service.title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formState.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white resize-none"
                {...cursorHandlers}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-md">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-md">
                An error occurred. Please try again later.
              </div>
            )}
            
            <Button 
              type="submit" 
              size="lg"
              className="w-full group"
              disabled={isSubmitting}
              {...cursorHandlers}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send message'}</span>
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}