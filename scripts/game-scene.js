import * as THREE from 'three';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setupScene } from './scene-setup.js'; 
import { playerMovement } from './playerMovement.js';
import {createWall} from './shapes';
import { createAllScenes } from './sceneManager.js';

const { scene, camera, renderer, world, cube, cubeBody} = setupScene();

// Load GLB asset for the main scene
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/the_mansion_interiors.glb?v=1728751045599';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(1, 1, 1); 
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
});

// Load GLB asset for the button
const buttonAssetUrl = 'https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/red_button.glb?v=1727126741728';
loader.load(buttonAssetUrl, (gltf) => {
    gltf.scene.scale.set(13, 13, 13); 
    gltf.scene.position.set(-55, -5, -17);
    scene.add(gltf.scene);
});
// const {scene1, scene2, scene3, scene4} = createAllScenes();

createWall(world, scene, { x: 1, y: 0.5, z: 5 }, {width: 10, height: 2, depth: 0.5});



// Wall geometry and Cannon.js body
const wallGeometry = new THREE.BoxGeometry(10, 2, 0.5);
const wallMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 }); // Red wall for visibility
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(5, 1, 0); // Position the wall
scene.add(wall);

const wallBody = new CANNON.Body({
  mass: 0, // Static body
  shape: new CANNON.Box(new CANNON.Vec3(5, 1, 0.25)), // Half extents of the wall
  position: new CANNON.Vec3(5, 1, 0) // Same position as the wall mesh
});
world.addBody(wallBody);

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

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); 
document.addEventListener('click', () => {
    checkIntersections(); 
});

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);

    // const objectsToTest = [boxMesh]; // Add the button box to objects to test
    const objectsToTest = []; // Add the button box to objects to test
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    
    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        toggleText();
        console.log('Hit:', firstIntersectedObject);

        // Change the script from starting-scene.js to circus-scene.js
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