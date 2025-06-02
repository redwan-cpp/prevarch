import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';

function GeometricShapes() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  
  const positions = [
    [0, 0, 0],
    [2, -1, -3],
    [-3, 1, -2],
    [3, 1, -2],
    [-1, -2, -1],
    [2, 1, -3],
    [-2, 0, -1],
    [0, -2, -2]
  ];

  const meshColor = isLight ? '#8b5cf6' : '#a78bfa';
  const emissiveColor = isLight ? '#4c1d95' : '#6d28d9';
  const material = new THREE.MeshStandardMaterial({ 
    color: meshColor,
    roughness: 0.2,
    metalness: 0.8,
    emissive: emissiveColor,
    emissiveIntensity: 0.1,
    transparent: true,
    opacity: 0.8
  });

  return (
    <group scale={0.6}>
      {positions.map((position, i) => (
        <Float
          key={i}
          speed={i % 3 === 0 ? 1.5 : 1}
          rotationIntensity={i % 2 === 0 ? 1 : 2}
          floatIntensity={i % 3 === 0 ? 2 : 1}
          position={position as [number, number, number]}
        >
          {i % 4 === 0 && (
            <mesh material={material}>
              <octahedronGeometry args={[0.7, 0]} />
            </mesh>
          )}
          {i % 4 === 1 && (
            <mesh material={material}>
              <tetrahedronGeometry args={[0.7, 0]} />
            </mesh>
          )}
          {i % 4 === 2 && (
            <mesh material={material}>
              <icosahedronGeometry args={[0.7, 0]} />
            </mesh>
          )}
          {i % 4 === 3 && (
            <mesh material={material}>
              <dodecahedronGeometry args={[0.7, 0]} />
            </mesh>
          )}
        </Float>
      ))}
    </group>
  );
}

function CameraController() {
  const { camera, mouse } = useThree();
  const initialCameraPosition = useRef(new THREE.Vector3(0, 0, 10));
  
  useEffect(() => {
    camera.position.copy(initialCameraPosition.current);
  }, [camera]);
  
  useFrame(() => {
    // Move camera slightly based on mouse position
    camera.position.x = initialCameraPosition.current.x + (mouse.x * 0.5);
    camera.position.y = initialCameraPosition.current.y + (mouse.y * 0.5);
  });
  
  return null;
}

export default function MainScene() {
  const { theme } = useTheme();
  
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }}>
      <CameraController />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <GeometricShapes />
      <Environment preset="city" />
      <fog attach="fog" args={[theme === 'light' ? '#ffffff' : '#0a0a0c', 5, 30]} />
    </Canvas>
  );
}