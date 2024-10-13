import { setupScene } from './scene-setup.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './starting-scene-objects.js';
import { playerMovement } from './playerMovement.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';
import {createWall} from './shape.js';

const { scene, camera, renderer, world, cube, cubeBody } = setupScene();
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
// Load GLB asset for the main scene
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/the_mansion_interiors.glb?v=1728751045599';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(1, 1, 1); 
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
});

// Load GLB asset for the button
const spiderAssetUrl = 'https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider.glb?v=1728809954090';
loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(0, 0.2, 15);
    scene.add(gltf.scene);
});

// Create other objects in the scene
const { sphereMesh, sphereBody, boxMesh, boxBody } = AddObjects(scene, world);

document.body.appendChild(renderer.domElement);

// Function to toggle text visibility
const overlay = document.getElementById('overlay');

function toggleText() {
    overlay.textContent = "Collect all the spiders and burn them, while escaping the Enemy!";
    //change from this scene to another scene
}

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
    }
}

const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
  controls.lock();
});

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    console.log("Camera", camera.position.x, camera.position.y, camera.position.z);

    playerMovement(camera, cube, cubeBody);
    
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
