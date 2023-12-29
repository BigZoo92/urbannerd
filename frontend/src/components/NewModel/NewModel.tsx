import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Test = ({url}: {url: string}) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  const maxRotation = Math.PI / 10; 
  const rotationSpeed = 0.5; 
  const floatAmplitude = 0.1; 

  useFrame((state, delta) => {
    if (modelRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      //@ts-ignore
      modelRef.current.position.y += Math.sin(elapsedTime) * delta * floatAmplitude;
      //@ts-ignore
      modelRef.current.rotation.y = Math.sin(elapsedTime * rotationSpeed) * maxRotation;
    }
  });

  const ambientLight = useMemo(() => new THREE.AmbientLight(0xffffff, 0.8), []);
  const directionalLight = useMemo(() => new THREE.DirectionalLight(0xffffff, 0.5), []);
  return (
    <>
    <primitive object={ambientLight} />
      <primitive object={directionalLight} position={[10, 10, 10]} />
      <primitive object={gltf.scene} ref={modelRef} />
      </>
  )
}


const NewModel = ({ url }: { url: string }) => {
  return (
    <Canvas>
      <Test url={url}></Test>
    </Canvas>
  );
};

export default NewModel;
