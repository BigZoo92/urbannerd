import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

const Model = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <>
    <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <primitive object={gltf.scene} />
        <OrbitControls />
        </Canvas>
     
    </>
  );
};

export default Model