import { setupScene } from './scene-setup.js'; 
import { PlayerControls } from './controls.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './first-scene-objects.js';
import { createBox, createSphere } from './shapes.js'; // Import the createBox function

const { scene, camera, renderer, world } = setupScene();

let isHoldingDoll = false;
let lastObject = null;
// Load GLB asset for the main scene
const loader = new GLTFLoader();
const buttonAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/dark_circus_dlc_map.glb?v=1727210288944';
loader.load(buttonAssetUrl, (gltf) => {
    gltf.scene.scale.set(13, 13, 13); 
    gltf.scene.position.set(-55, -7, -17);
    scene.add(gltf.scene);
});

// Create other objects in the scene
const { wallMesh, wallBody, sphereMesh, sphereBody, boxMesh, boxBody } = AddObjects(scene, world);

document.body.appendChild(renderer.domElement);

// Function to toggle text visibility
const overlay = document.getElementById('overlay');

function toggleText() {
    overlay.textContent = "Collect all the spiders and burn them, while escaping the Enemy!";
    //change from this scene to another scene
}

// Add bounding box
const box = new THREE.Box3();
const min = new THREE.Vector3(-190, 0, -112); 
const max = new THREE.Vector3(110, 11, 34); 
box.set(min, max);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); 
document.addEventListener('click', () => {
    checkIntersections(); 
});


function checkIntersections() {
  raycaster.setFromCamera(mouse, camera);

  const objectsToTest = [sphereMesh]; // Add the button box to objects to test
  const intersects = raycaster.intersectObjects(objectsToTest, true);

  if (intersects.length > 0) {
      const firstIntersectedObject = intersects[0].object;
      toggleText();

      console.log('Hit:', firstIntersectedObject);

      isHoldingDoll = true;
      // Move the object in front of the camera
      moveObjectInFrontOfCamera(firstIntersectedObject, sphereBody);
  }
}

function moveObjectInFrontOfCamera(object, objectBody) {
  const distanceFromCamera = 10; // Distance in front of the camera
  const offset = 4; // Offset distance to position in the bottom right corner

  // Get the direction the camera is looking at
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  // Get the camera's right vector
  const cameraRight = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  cameraRight.crossVectors(cameraDirection, camera.up).normalize(); // Right vector

  // Get the camera's down vector (the opposite of the camera's up vector)
  const cameraDown = camera.up.clone().normalize(); // Down vector

  // Calculate the new position for the sphere based on the camera's position and direction
  const newPosition = new THREE.Vector3()
      .copy(camera.position)
      .add(cameraDirection.multiplyScalar(distanceFromCamera)) // Move in the direction the camera is facing
      .add(cameraRight.multiplyScalar(offset)) // Move to the right
      .sub(cameraDown.multiplyScalar(offset)); // Move down

  // Update the sphere's position
  object.position.copy(newPosition);

  // If the object has a physics body, update its position as well
  objectBody.position.copy(object.position);
  objectBody.quaternion.copy(object.quaternion);
}

document.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // Prevent the default context menu from appearing
  if (isHoldingDoll) {
      isHoldingDoll = false; // Stop holding the doll
      // No need to change gravity or position
  } 
});

function updateSphereMeshAndBody() {
  if (isHoldingDoll) {
      moveObjectInFrontOfCamera(sphereMesh, sphereBody);
  } else {
      // When not holding, sync the sphere mesh and body positions
      sphereMesh.position.copy(sphereBody.position);
      sphereMesh.quaternion.copy(sphereBody.quaternion);
  }
}


const controls = new PlayerControls(camera, document.body);

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    console.log("Camera", camera.position.x, camera.position.y, camera.position.z);

    // Clamp camera position within the bounding box
    camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));

    updateSphereMeshAndBody();

    controls.updateMovement(0.05);
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation loop
animate();
