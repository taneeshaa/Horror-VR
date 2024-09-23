import { setupScene } from './scene-setup.js'; 
import { PlayerControls } from './controls.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {AddObjects } from './starting-scene-objects.js';

const { scene, camera, renderer, world } = setupScene();

// Load GLB asset
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/starting%20scene_basement.glb?v=1727029680810';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.15, 0.15, 0.15); 
    gltf.scene.position.set(0, -40, 0);
    scene.add(gltf.scene);
});

// Create objects
const { wallMesh, wallBody, sphereMesh, sphereBody } = AddObjects(scene, world);

document.body.appendChild(renderer.domElement);

// Function to toggle text visibility
const overlay = document.getElementById('overlay');

function toggleText() {
    overlay.style.display = overlay.style.display === 'none' ? 'block' : 'none'; // Toggle text visibility
}

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

    const objectsToTest = [wallMesh, sphereMesh]; // Add all objects you want to check against
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    
    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        toggleText();
        console.log('Hit:', firstIntersectedObject);

        // Perform the interaction logic (e.g., pick up an object, open a door)
        firstIntersectedObject.material.color.set(0xff0000); // Change color to red
    }
}

const controls = new PlayerControls(camera, document.body);

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    // Clamp camera position within the bounding box
    camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));

    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

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
