import { setupScene } from './scene-setup.js'; 
import { PlayerControls } from './controls.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './starting-scene-objects.js';
import { createBox } from './shapes.js'; // Import the createBox function

const { scene, camera, renderer, world } = setupScene();

// Load GLB asset for the main scene
const loader = new GLTFLoader();
const glbAssetUrl = 'Assets\dark_circus_dlc_map.glb';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.15, 0.15, 0.15); 
    gltf.scene.position.set(0, -40, 0);
    scene.add(gltf.scene);
});

document.body.appendChild(renderer.domElement);


// Add bounding box
const box = new THREE.Box3();
const min = new THREE.Vector3(-180, 0, -415); 
const max = new THREE.Vector3(-20, 11, 49); 
box.set(min, max);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); 
document.addEventListener('click', () => {
    //checkIntersections(); 
    console.log('click');
});

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);

    const objectsToTest = [wallMesh, sphereMesh, boxMesh]; // Add the button box to objects to test
    const intersects = raycaster.intersectObjects(objectsToTest, true);
    
    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        toggleText();
        console.log('Hit:', firstIntersectedObject);
    }
}

const controls = new PlayerControls(camera, document.body);

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    console.log(camera.position.x, camera.position.y, camera.position.z);

    // Clamp camera position within the bounding box
    camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));

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
