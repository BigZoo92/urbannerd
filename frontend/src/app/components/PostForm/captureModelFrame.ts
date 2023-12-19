import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const captureModelFrame = (modelUrl: string) => {
  return new Promise((resolve, reject) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(200, 200);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);

      camera.position.z = 5;
      const model = gltf.scene;
      model.position.set(0, 0, 0);

      renderer.render(scene, camera);

      renderer.domElement.toBlob((blob) => {
        if(!blob) return
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    }, undefined, (error) => {
      console.error(error);
      reject(error);
    });
  });
};
