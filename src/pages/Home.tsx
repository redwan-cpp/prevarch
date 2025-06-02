import MainScene from '../components/3d/MainScene';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';

export default function Home() {
  return (
    <main className="relative z-10">
      <div className="canvas-container">
        <MainScene />
      </div>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}