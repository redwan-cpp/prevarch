import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseAnimatedTextProps {
  selector: string;
  delay?: number;
  stagger?: number;
}

export default function useAnimatedText({ selector, delay = 0, stagger = 0.02 }: UseAnimatedTextProps) {
  useEffect(() => {
    const splitTextElements = document.querySelectorAll(selector);
    
    if (splitTextElements.length === 0) return;
    
    splitTextElements.forEach(textElement => {
      // Get the text content
      const text = textElement.textContent || '';
      
      // Clear the text element
      textElement.textContent = '';
      
      // Create wrapper container for the text
      const container = document.createElement('div');
      container.className = 'reveal-text-container inline-block';
      
      // Split text into words and create spans for each
      const words = text.split(' ');
      
      words.forEach((word, i) => {
        // Create a wrapper for the word
        const wordWrapper = document.createElement('span');
        wordWrapper.className = 'inline-block mr-[0.25em]';
        
        // Split the word into characters and create spans for each
        Array.from(word).forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.className = 'inline-block char-span opacity-0';
          charSpan.textContent = char;
          wordWrapper.appendChild(charSpan);
        });
        
        // Add the word to the container
        container.appendChild(wordWrapper);
      });
      
      // Add the container to the text element
      textElement.appendChild(container);
      
      // Create the animation
      const chars = textElement.querySelectorAll('.char-span');
      
      gsap.fromTo(
        chars,
        { 
          y: '100%',
          opacity: 0,
          rotateX: -80 
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          stagger: stagger,
          delay: delay,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textElement,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, delay, stagger]);
}