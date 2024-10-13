import * as THREE from 'three';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setupScene } from './scene-setup.js'; 
import { playerMovement } from './playerMovement.js';
import {createWall, createSpider} from './shape.js';
// import { createAllScenes } from './sceneManager.js';

const { scene, camera, renderer, world, cube, cubeBody} = setupScene();
console.log(scene);
// Load GLB asset for the main scene
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/the_mansion_interiors.glb?v=1728751045599';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(1, 1, 1); 
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
});

function createColliders(){
  createWall(world, scene, { x: 1, y: 1.5, z: -50 }, { width: 115, height: 5, depth: 0.5 }, { x: 0, y: Math.PI / 2, z: 0 }, false);
  createWall(world, scene, { x: -1, y: 1.5, z: -50 }, { width: 115, height: 5, depth: 0.5 }, { x: 0, y: Math.PI / 2, z: 0 }, false);
  
  createWall(world, scene, { x: 6, y: 1.5, z: -107 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -6, y: 1.5, z: -107 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  createWall(world, scene, { x: -4, y: 1.5, z: -115 }, { width: 20, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 8, y: 1.5, z: -118 }, { width: 25, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -1, y: 1.5, z: -124.5 }, { width: 15, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  
  createWall(world, scene, { x: 9.25, y: 1.5, z: -117 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -2, y: 1.5, z: -117 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  createWall(world, scene, { x: 7.3, y: 1.5, z: -129 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -3.7, y: 1.5, z: -129 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  createWall(world, scene, { x: 3.1, y: 1.5, z: -149 }, { width: 40, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 0.5, y: 1.5, z: -149 }, { width: 40, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  
  createWall(world, scene, { x: 1, y: 1.5, z: -164 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  //tiny room in living hall
  createWall(world, scene, { x: -2, y: 1.5, z: 6 }, { width: 7, height: 5, depth: 2 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -7, y: 1.5, z: 6 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -4, y: 1.5, z: 3.5 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -3.3, y: 1.5, z: 9.5 }, { width: 2, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -6.7, y: 1.5, z: 9.5 }, { width: 2, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  //furnace room next to main hall
  createWall(world, scene, { x: -11, y: 1.5, z: 9.5 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -19, y: 1.5, z: 9.5 }, { width: 6, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -22, y: 1.5, z: 14 }, { width: 8, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -15, y: 1.5, z: 18.7 }, { width: 12.5, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -8, y: 1.5, z: 11 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -8, y: 1.5, z: 18.5 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  
  //living hall
  createWall(world, scene, { x: -6, y: 1.5, z: 24 }, { width: 9, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 5.5, y: 1.5, z: 24 }, { width: 9, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 8, y: 1.5, z: 18.5 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 8, y: 1.5, z: 11 }, { width: 4, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: 9, y: 1.5, z: 9 }, { width: 11, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: 20, y: 1.5, z: 9 }, { width: 15, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  //change colour to brown
  createWall(world, scene, { x: 26, y: 1.5, z: 14 }, { width: 15, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 });
  createWall(world, scene, { x: 18, y: 1.5, z: 20 }, { width: 19, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 });
  
  createWall(world, scene, { x: 7, y: 1.5, z: 20 }, { width: 3, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: 0, y: 1.5, z: 26 }, { width: 12, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -7, y: 1.5, z: 20 }, { width: 2, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -14.5, y: 1.5, z: -14 }, { width: 12, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  //update the length
  createWall(world, scene, { x: -8, y: 1.5, z: -5 }, { width: 18, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  
  createWall(world, scene, { x: -13.5, y: 1.5, z: 6 }, { width: 7, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -10, y: 1.5, z: 4 }, { width: 5, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -26, y: 1.5, z: -6 }, { width: 11, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -21, y: 1.5, z: -13 }, { width: 2.5, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  createWall(world, scene, { x: -23, y: 1.5, z: -12 }, { width: 7, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  createWall(world, scene, { x: -22, y: 1.5, z: -0.9 }, { width: 8, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
  
  createWall(world, scene, { x: -17, y: 1.5, z: 2 }, { width: 16, height: 6, depth: 2 }, { x: 0, y: Math.PI/2, z: 0 }, false);
}
createColliders();

const newMesh = createWall(world, scene, {x: 0, y:1, z:17}, {width: 1, depth: 1, height: 1}, { x: 0, y: 0, z: 0 }, true, 0xff0000, "Spider Mesh");

// PointerLockControls for player movement
const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
  controls.lock();
});

// Attach camera to the cube (player)
camera.position.set(0, 1, 0); // Slightly above the cube body

// Add bounding box
const box = new THREE.Box3();
const min = new THREE.Vector3(-180, 0, -415); 
const max = new THREE.Vector3(-20, 11, 49); 
box.set(min, max);

function toggleText() {
  overlay.textContent = "Collect all the spiders and burn them, while escaping the Enemy!";
  //change from this scene to another scene
}
console.log(scene.children);
function raycastFromCamera(camera) {
  // Create a raycaster
  const raycaster = new THREE.Raycaster();

  // Get the center of the camera's viewport
  const mouse = new THREE.Vector2(0, 0); // (0,0) is the center of the viewport

  // Calculate the normalized device coordinates of the mouse
  mouse.x = (0 / window.innerWidth) * 2 - 1; // x coordinate (center of screen)
  mouse.y = -(0 / window.innerHeight) * 2 + 1; // y coordinate (center of screen)

  // Set the raycaster from the camera and mouse coordinates
  raycaster.setFromCamera(mouse, camera);

  // Cast the ray and get the intersected objects
  const intersects = raycaster.intersectObjects(scene.children); // Check only against spiderMesh

  if (intersects.length > 0) {
      // Log the first intersected object
      console.log("Hit object:", intersects[0].object);
  } else {
      console.log("No objects were hit.");
  }
}



// const spiderMesh = createSpider(scene, world);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); 
document.addEventListener('click', () => {
    console.log("Camera", cubeBody.position.x, cubeBody.position.y, cubeBody.position.z);
  console.log(newMesh.wall.position);
    raycastFromCamera(camera, scene);
    // checkIntersections(); 
});


function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    console.log("Raycast");
    const objectsToTest = [spiderMesh]; // Add the button box to objects to test
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    
    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        console.log('Hit:', firstIntersectedObject);
        toggleText();
        //make the object on the right side of the camera
    }
}

// Game loop
function animate() {
  requestAnimationFrame(animate);

  // Update Cannon.js physics
  world.step(1 / 60);

  playerMovement(camera, cube, cubeBody);
  // Clamp camera position within the bounding box
    // camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    // camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));
    
  // Prevent cube from rotating by locking angular velocity
  cubeBody.angularVelocity.set(0, 0, 0); // Ensure no spin
  
  // Render the scene
  renderer.render(scene, camera);
}
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
animate();