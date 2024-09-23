import { createPlane, createSphere } from './shapes.js'; 
import  { createUI } from './ui-panel.js'; 
import * as THREE from 'three';

export function AddObjects(scene, world){
  const { sphereMesh, sphereBody } = createSphere(
    new THREE.Vector3(-43, 10, -6)
  );
  scene.add(sphereMesh);
  world.addBody(sphereBody);
  
  const { planeMesh: wallMesh, groundBody: wallBody } = createPlane(
      new THREE.Vector3(-45, -6, -1), 
      new THREE.Vector3(-Math.PI/2, 0, 0),
      35,
      70 
  );
  scene.add(wallMesh);
  world.addBody(wallBody);

  

  return { wallMesh, wallBody, sphereMesh, sphereBody};
}