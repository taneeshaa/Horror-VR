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

const { sphereMesh, sphereBody } = createSphere();

const { planeMesh: wallMesh, groundBody: wallBody } = createPlane(
    new THREE.Vector3(-45, -6, -1), // Position the wall
    new THREE.Vector3(-Math.PI/2, 0, 0),
    35,
    70 
);
scene.add(wallMesh);
world.addBody(wallBody);

scene.add(sphereMesh);
world.addBody(sphereBody);



//add bounding box
var box = new THREE.Box3();
const min = new THREE.Vector3(-180, 0, -415); // Replace with your min coordinates
const max = new THREE.Vector3(-20, 11, 49); // Replace with your max coordinates

// Set the Box3 dimensions
box.set(min, max);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0); // Since crosshair is in the center, keep mouse coordinates at (0,0)

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);

    // Array of objects to check intersections with (e.g., interactive objects)
    const objectsToTest = [wallMesh]; // Add all objects you want to check against
    const intersects = raycaster.intersectObjects(objectsToTest, true);

    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        console.log('Hit:', firstIntersectedObject);

        // Perform the interaction logic (e.g., pick up an object, open a door)
        // Example: change the color of the hit object
        firstIntersectedObject.material.color.set(0xff0000); // Change color to red
    }
}

// Setup PlayerControls
const controls = new PlayerControls(camera, document.body);

// Update movement logic in the animate loop
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    checkIntersections();

    console.log(camera.position.x, camera.position.y, camera.position.z)
    if(camera.position.x > box.max.x){
        camera.position.x = box.max.x;
    }
    
    if(camera.position.x < box.min.x){
        camera.position.x = box.min.x;
    }
    
    if(camera.position.z > box.max.z){
        camera.position.z = box.max.z;
    }
    
    if(camera.position.z < box.min.z){
        camera.position.z = box.min.z;
    }

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