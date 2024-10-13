import { createPlane, createSphere, createBox } from './shape.js'; 
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

  // Create a box around the button
  const buttonBoxPosition = new THREE.Vector3(-55, -5, -17); // Position of the button
  const buttonBoxSize = new THREE.Vector3(5, 5, 5); // Adjust size to encapsulate button properly

  // Create the box around the button using the createBox function
  const { boxMesh, boxBody } = createBox(
      buttonBoxPosition,   // Position where the box should be
      new THREE.Vector3(0, 0, 0), // No rotation
      5,     // Width
      5,     // Height
      5      // Depth
  );

  // Add the box to the scene and physics world
  scene.add(boxMesh);
  world.addBody(boxBody);
  

  return { wallMesh, wallBody, sphereMesh, sphereBody, boxMesh, boxBody};
}