import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorProps {
  variant: string;
}

export default function Cursor({ variant }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setVisible(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setVisible(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    let cursor = { x: 0, y: 0 };
    let previousCursor = { x: 0, y: 0 };
    
    const moveCursor = () => {
      const dx = cursor.x - previousCursor.x;
      const dy = cursor.y - previousCursor.y;
      
      previousCursor.x += dx * 0.15;
      previousCursor.y += dy * 0.15;
      
      setPosition({ x: previousCursor.x, y: previousCursor.y });
      requestAnimationFrame(moveCursor);
    };
    
    const updateMousePosition = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    window.addEventListener('mousemove', updateMousePosition);
    requestAnimationFrame(moveCursor);
    
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-difference"
      style={{ 
        translateX: position.x - 4,
        translateY: position.y - 4
      }}
    >
      <motion.div
        className="relative"
        animate={variant}
        variants={{
          default: {
            scale: 1,
            backgroundColor: 'white',
            width: '8px',
            height: '8px',
            borderRadius: '50%'
          },
          hover: {
            scale: 2.5,
            backgroundColor: 'white'
          },
          click: {
            scale: 0.8,
            backgroundColor: 'white'
          }
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      />
    </motion.div>
  );
}