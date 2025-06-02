import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAnimatedText from '../../hooks/useAnimatedText';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

function HeroShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color={theme === 'light' ? '#4f46e5' : '#6366f1'}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  useAnimatedText({ selector: '.animated-text', delay: 0.5, stagger: 0.015 });

  return (
    <section id="home" className="min-h-[100svh] content-grid flex items-center pt-32 md:pt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-zinc-900 dark:text-white mb-8 tracking-wide">
            <span className="animated-text inline tracking-wider">Elevating</span>{' '}
            <span className="animated-text inline tracking-wider">Spaces</span>{' '}
            <span className="animated-text inline tracking-wider">Through</span>{' '}
            <span className="animated-text inline tracking-wider">Creative</span>{' '}
            <span className="animated-text inline tracking-wider">Architecture</span>{' '}
            <span className="animated-text inline tracking-wider">&</span>{' '}
            <span className="animated-text inline tracking-wider">Interior</span>{' '}
            <span className="animated-text inline tracking-wider">Excellence</span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl leading-relaxed tracking-wide">
            From luxurious residential interiors to innovative commercial spaces — Preview Architect Engineers crafts stylish, functional, and personalized environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="group"
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>Get a Free Consultation</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              as={Link}
              to="#services"
              onClick={() => {
                const element = document.getElementById('services');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Browse Our Services
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              as={Link}
              to="/projects"
              className="group"
            >
              <span>View Portfolio</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative w-full h-[300px] md:h-auto"
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <HeroShape />
            <Environment preset="city" />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}