import { setupScene } from './scene-setup.js'; 
import { PlayerControls } from './controls.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './first-scene-objects.js';
import { createBox, createPlane, createColliderPlane, createSphere } from './shapes.js'; // Import the createBox function

const { scene, camera, renderer, world } = setupScene();

// Load GLB asset for the main scene
const loader = new GLTFLoader();
// Load GLB asset for the button
const buttonAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/dark_circus_dlc_map.glb?v=1727210288944';
loader.load(buttonAssetUrl, (gltf) => {
    gltf.scene.scale.set(13, 13, 13); 
    gltf.scene.position.set(-55, -7, -17);
    scene.add(gltf.scene);
});

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

//Add Objects
const playerBody = new CANNON.Body({
    mass: 1, // You can adjust the mass based on your desired physics behavior
    shape: new CANNON.Sphere(3), // A sphere with radius 5 for the player's collider
    position: new CANNON.Vec3(camera.position.x, 10, camera.position.z),
    material: new CANNON.Material({ friction: 0.5, restitution: 0.3 }), // Optional physics properties
});

world.addBody(playerBody);

const { planeMesh: wallMesh, groundBody: wallBody } = createColliderPlane(
    new THREE.Vector3(-160, 5, -1), 
    new THREE.Vector3(-Math.PI/2, 0, 0),
    35,
    70 
);
scene.add(wallMesh);
world.addBody(wallBody);


const { sphereMesh, sphereBody } = createSphere(
    new THREE.Vector3(-43, 12, -6)
  );
  scene.add(sphereMesh);
  world.addBody(sphereBody);






//raycast
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




const controls = new PlayerControls(camera, document.body);

function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    //console.log(camera.position.x, camera.position.y, camera.position.z);
    console.log(playerBody.position.x, playerBody.position.y, playerBody.position.z);

    // Clamp camera position within the bounding box
    camera.position.x = Math.max(box.min.x, Math.min(camera.position.x, box.max.x));
    camera.position.z = Math.max(box.min.z, Math.min(camera.position.z, box.max.z));
    playerBody.position.set(camera.position.x, camera.position.y, camera.position.z);

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
