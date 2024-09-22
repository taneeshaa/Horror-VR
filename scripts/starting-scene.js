import { setupScene } from './scene-setup.js'; // Import the scene setup function
import { PlayerControls } from './controls.js'; // Import the controls class
import { createPlane, createSphere } from './shapes.js'; // Import shape creation functions
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const { scene, camera, renderer, world } = setupScene();

// Load GLB asset
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/starting%20scene_basement.glb?v=1727029680810';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.15, 0.15, 0.15); // Set the scale of the model
    gltf.scene.position.set(0, -40, 0);
    scene.add(gltf.scene);
});


//add bounding box
var box = new THREE.Box3();
const min = new THREE.Vector3(-150, 0, -45); // Replace with your min coordinates
const max = new THREE.Vector3(615, 11, 41); // Replace with your max coordinates

// Set the Box3 dimensions
box.set(min, max);

// Setup PlayerControls
const controls = new PlayerControls(camera, document.body);

// Update movement logic in the animate loop
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    console.log(camera.position.x, camera.position.y, camera.position.z)
    // if(camera.position.x > box.max.x){
    //     camera.position.x = box.max.x;
    // }
    
    // if(camera.position.x < box.min.x){
    //     camera.position.x = box.min.x;
    // }
    
    // if(camera.position.z > box.max.z){
    //     camera.position.z = box.max.z;
    // }
    
    // if(camera.position.z < box.min.z){
    //     camera.position.z = box.min.z;
    // }

    // Update player controls
    controls.updateMovement(0.05); // Pass deltaTime

    // Render the scene
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