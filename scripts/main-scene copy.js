import { setupScene } from './scene-setup.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './starting-scene-objects.js';
import { playerMovement } from './playerMovement.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

const { scene, camera, renderer, world, cube, cubeBody } = setupScene();

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

    const objectsToTest = [boxMesh]; // Add the button box to objects to test
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    
    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        toggleText();
        console.log('Hit:', firstIntersectedObject);

        // Change the script from starting-scene.js to circus-scene.js
        //switchSceneScript('scripts/circus-scene.js');
    }
}

// Function to remove all loaded assets from the scene
function removeAssets() {
    // Remove all children from the scene
    while (scene.children.length > 0) {
        const child = scene.children[0];
        scene.remove(child);
    }

    const glbAssetUrl = 'Assets\dark_circus_dlc_map.glb';
    loader.load(glbAssetUrl, (gltf) => {
        gltf.scene.scale.set(10, 10, 10); 
        gltf.scene.position.set(0, -40, 0);
        scene.add(gltf.scene);
});
}

// Function to switch scene script
function switchSceneScript(newScriptSrc) {
    //switch scene
}


const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
  controls.lock();
});
// const controls = new PlayerControls(cubeBody, camera, document.body);

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    console.log("Camera", camera.position.x, camera.position.y, camera.position.z);

    // Clamp camera position within the bounding box
    // camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    // camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));
    playerMovement(camera, cube, cubeBody);
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    // Update cube position and rotation
    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

    // Follow the cube with the camera
    // camera.position.set(cube.position.x, cube.position.y + 1.5, cube.position.z);

    // controls.updateMovement(0.05);
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
