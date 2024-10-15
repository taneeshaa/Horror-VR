import { createPlane, createSphere, createBox } from './shape.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function AddObjects(scene, world){

  // Create a box around the button
  const buttonBoxPosition = new THREE.Vector3(0, 0.2, 15); // Position of the button
  const buttonBoxSize = new THREE.Vector3(0.6, 0.6, 0.6); // Adjust size to encapsulate button properly

  // Create the box around the button using the createBox function
  const { boxMesh, boxBody } = createBox(
      buttonBoxPosition,   // Position where the box should be
      new THREE.Vector3(0, 0, 0), // No rotation
      buttonBoxSize.x,     // Width
      buttonBoxSize.y,     // Height
      buttonBoxSize.z      // Depth
  );

  // Add the box to the scene and physics world
  // scene.add(boxMesh);

  const spiders = [];
  const spiderPositions = [
    new THREE.Vector3(20, 0.2, -1.6),
    new THREE.Vector3(23, 0.2, 19.2),
    new THREE.Vector3(-4, 0.2, 4.6),
    new THREE.Vector3(-26, 0.2, 17.9),
    new THREE.Vector3(-8, 0.2, 0.7),
    new THREE.Vector3(-8, 0.2, -6.9)
  ];

  // Create each spider and add them to the array
  spiderPositions.forEach(position => {
    const { spider } = createSpider(scene, world, position);
    spiders.push({ spider, position });
  });

  return { spiders};
}

function createSpider(scene, world, position,  ){
  let spider;
  const loader = new GLTFLoader();

  // Load GLB asset for the button
  const spiderAssetUrl = 'https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider.glb?v=1728809954090';
  loader.load(spiderAssetUrl, (gltf) => {
      gltf.scene.scale.set(0.1, 0.1, 0.1); 
      gltf.scene.position.set(position.x, 0.2, position.z);
      scene.add(gltf.scene);
      spider = gltf.scene;
  });

  //create box around button
  const { boxMesh, boxBody } = createBox(
    position,   // Position where the box should be
    new THREE.Vector3(0, 0, 0), // No rotation
    0.6,     // Width
    0.6,     // Height
    0.6      // Depth
);

// Add the box to the scene and physics world
// scene.add(boxMesh);

return {spider};
}