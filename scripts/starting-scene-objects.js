import { createPlane, createSphere, createBox } from './shape.js'; 
import * as THREE from 'three';

export function AddObjects(scene, world){
  const { sphereMesh, sphereBody } = createSphere(
    new THREE.Vector3(-43, 10, -6)
  );
  scene.add(sphereMesh);
  world.addBody(sphereBody);

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
  scene.add(boxMesh);
  world.addBody(boxBody);
  

  return { sphereMesh, sphereBody, boxMesh, boxBody};
}