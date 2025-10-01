import { Suspense, useRef, useEffect, memo, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
// Import only what we need from Three.js to reduce bundle size
import { 
  Group, 
  Mesh, 
  Vector3,
  Camera
} from 'three';
import './Building3D.scss';

// Building Model Component - Memoized for performance
const BuildingModel = memo(() => {
  const { scene } = useGLTF('/29.09.2025 г..glb');
  const modelRef = useRef<Group>(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  // --- Instead of OrbitControls, rotate the building group ---
  const rotateBuilding = (angle: number) => {
    // Rotate around Y-axis (horizontal rotation)
    if (modelRef.current) {
      modelRef.current.rotation.y = angle;
    }
  };

  // Handle mouse drag for rotation
  const handleMouseDown = (event: React.MouseEvent) => {
    const startX = event.clientX;
    const startRotation = rotationAngle;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newAngle = startRotation + deltaX * 0.01; // Adjust sensitivity
      setRotationAngle(newAngle);
      rotateBuilding(newAngle);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Optimize the model on load
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          // Enable frustum culling for better performance
          child.frustumCulled = true;
          // Reduce shadow quality for distant objects
          if (child.position.distanceTo(new Vector3(0, -155, 0)) > 500) {
            child.castShadow = false;
            child.receiveShadow = false;
          }
          // Optimize materials
          const mesh = child as Mesh;
          if (mesh.material && Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.needsUpdate = false);
          } else if (mesh.material && !Array.isArray(mesh.material)) {
            mesh.material.needsUpdate = false;
          }
        }
      });
    }
  }, [scene]);

  return (
    <group 
      ref={modelRef} 
      scale={[250, 250, 250]} 
      position={[0, -155, 0]}
      onPointerDown={handleMouseDown}
      style={{ cursor: 'grab' }}
    >
      <primitive object={scene} />
    </group>
  );
});

// Camera Setup Component
const CameraSetup = () => {
  const { camera } = useThree();

  useEffect(() => {
    // --- Camera setup ---
    // Put the camera closer to the building, at second floor height
    const secondFloorHeight = -149;

    // Move a bit farther away — 180 is a nice middle ground
    camera.position.set(0, secondFloorHeight, 180);

    // Always look at the building's center/facade
    camera.lookAt(0, secondFloorHeight, 0);
  }, [camera]);

  return null;
};

// Landscape Component - Memoized for performance
const Landscape = memo(() => {
  const groundRef = useRef<Mesh>(null);

  return (
    <>
      {/* Ground - Reduced geometry complexity */}
      <mesh ref={groundRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -200, 0]} receiveShadow>
        <planeGeometry args={[4000, 4000, 32, 32]} />
        <meshLambertMaterial color="#2a5a3a" />
      </mesh>

      {/* Hills */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const distance = 1200 + Math.random() * 2000;
        const size = 400 + Math.random() * 600;
        const colors = ['#4a7c59', '#5a8a6a', '#3a6b4a', '#6b9a7a', '#7aab8a', '#8abb9a'];
        
        return (
          <mesh
            key={`hill-${i}`}
            position={[
              Math.cos(angle) * distance,
              -200 - Math.random() * 200,
              Math.sin(angle) * distance
            ]}
            scale={[1, 0.2 + Math.random() * 0.6, 1]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[size, 32, 32]} />
            <meshLambertMaterial color={colors[Math.floor(Math.random() * colors.length)]} />
          </mesh>
        );
      })}

      {/* Trees - Reduced from 150 to 30 */}
      {Array.from({ length: 30 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 600 + Math.random() * 2000;
        const height = 200 + Math.random() * 150;
        const treeColors = ['#2d5016', '#1a3a0a', '#3a5a2a', '#4a6a3a', '#5a7a4a', '#6a8a5a'];
        
        return (
          <mesh
            key={`tree-${i}`}
            position={[
              Math.cos(angle) * radius,
              -200 + Math.random() * 50,
              Math.sin(angle) * radius
            ]}
            scale={[
              0.5 + Math.random() * 1.0,
              0.5 + Math.random() * 1.0,
              0.5 + Math.random() * 1.0
            ]}
            castShadow
            receiveShadow
          >
            <coneGeometry args={[60 + Math.random() * 40, height, 6]} />
            <meshLambertMaterial color={treeColors[Math.floor(Math.random() * treeColors.length)]} />
          </mesh>
        );
      })}

      {/* Mountains */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const distance = 3000 + Math.random() * 2000;
        const height = 1200 + Math.random() * 800;
        const radius = 800 + Math.random() * 600;
        
        return (
          <mesh
            key={`mountain-${i}`}
            position={[
              Math.cos(angle) * distance,
              -200,
              Math.sin(angle) * distance
            ]}
            scale={[1, 0.6 + Math.random() * 0.8, 1]}
            castShadow
            receiveShadow
          >
            <coneGeometry args={[radius, height, 8]} />
            <meshLambertMaterial color="#1a3a2a" transparent opacity={0.9} />
          </mesh>
        );
      })}

      {/* Flowers - Reduced from 300 to 50 */}
      {Array.from({ length: 50 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 300 + Math.random() * 2000;
        const size = 4 + Math.random() * 6;
        const flowerColors = ['#ff6b9d', '#ffa726', '#66bb6a', '#42a5f5', '#ab47bc', '#ffeb3b', '#ff5722', '#9c27b0'];
        
        return (
          <mesh
            key={`flower-${i}`}
            position={[
              Math.cos(angle) * radius,
              -180,
              Math.sin(angle) * radius
            ]}
            scale={[
              0.3 + Math.random() * 0.7,
              0.3 + Math.random() * 0.7,
              0.3 + Math.random() * 0.7
            ]}
          >
            <sphereGeometry args={[size, 6, 6]} />
            <meshLambertMaterial color={flowerColors[Math.floor(Math.random() * flowerColors.length)]} />
          </mesh>
        );
      })}

      {/* Sky */}
      <mesh>
        <sphereGeometry args={[20000, 32, 32]} />
        <meshBasicMaterial color="#87CEEB" side={2} transparent opacity={0.95} />
      </mesh>

      {/* Clouds - Reduced from 25 to 8 */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={`cloud-${i}`}
          position={[
            (Math.random() - 0.5) * 8000,
            400 + Math.random() * 600,
            (Math.random() - 0.5) * 8000
          ]}
          scale={[
            1 + Math.random() * 3,
            0.2 + Math.random() * 0.6,
            1 + Math.random() * 3
          ]}
        >
          <sphereGeometry args={[100 + Math.random() * 200, 12, 12]} />
          <meshLambertMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Water Features */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 800 + Math.random() * 1500;
        const size = 300 + Math.random() * 200;
        
        return (
          <mesh
            key={`water-${i}`}
            position={[
              Math.cos(angle) * distance,
              -190,
              Math.sin(angle) * distance
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[size, size]} />
            <meshLambertMaterial color="#4fc3f7" transparent opacity={0.9} />
          </mesh>
        );
      })}

      {/* Rocks - Reduced from 50 to 15 */}
      {Array.from({ length: 15 }, (_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = 400 + Math.random() * 1800;
        const size = 20 + Math.random() * 40;
        
        return (
          <mesh
            key={`rock-${i}`}
            position={[
              Math.cos(angle) * radius,
              -180,
              Math.sin(angle) * radius
            ]}
            scale={[
              0.5 + Math.random() * 1.0,
              0.3 + Math.random() * 0.7,
              0.5 + Math.random() * 1.0
            ]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[size, 6, 6]} />
            <meshLambertMaterial color="#4a4a4a" />
          </mesh>
        );
      })}

      {/* Paths */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const distance = 1000 + Math.random() * 1000;
        const length = 200 + Math.random() * 400;
        
        return (
          <mesh
            key={`path-${i}`}
            position={[
              Math.cos(angle) * distance,
              -195,
              Math.sin(angle) * distance
            ]}
            rotation={[-Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[20, length]} />
            <meshLambertMaterial color="#8a6a3a" />
          </mesh>
        );
      })}
    </>
  );
});

function Building3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      className="building-3d-container"
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="building-3d-header">
        <h3>🧊 3D Model</h3>
      </div>
      <div className="building-3d-viewer">
        <Canvas
          shadows
          gl={{ 
            antialias: false, 
            alpha: true, 
            powerPreference: "high-performance",
            preserveDrawingBuffer: false,
            stencil: false,
            depth: true
          }}
          performance={{ min: 0.5 }}
        >
          {/* Optimized Lighting Setup - Reduced from 8 to 4 lights */}
          <ambientLight intensity={8.0} />
          <directionalLight
            position={[400, 400, 200]}
            intensity={10.0}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <directionalLight position={[-400, 400, -200]} intensity={8.0} />
          <pointLight position={[0, 600, 0]} intensity={6.0} distance={4000} />

          {/* Camera Setup */}
          <CameraSetup />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* Building Model */}
          <Suspense fallback={
            <mesh position={[0, -155, 0]}>
              <boxGeometry args={[100, 200, 100]} />
              <meshLambertMaterial color="#cccccc" />
            </mesh>
          }>
            <BuildingModel />
          </Suspense>

          {/* Landscape */}
          <Landscape />

        </Canvas>
      </div>
      <div className="building-3d-info">
        <div className="info-item" aria-live="polite">
          <span className="icon">🔄</span>
          <span>Drag to rotate the 3D model</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Building3D;
