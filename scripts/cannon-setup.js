import { setupScene } from './scene-setup.js'; // Import the scene setup function
import { PlayerControls } from './controls.js'; // Import the controls class
import { createPlane, createSphere } from './shapes.js'; // Import shape creation functions
import * as THREE from 'three';

// Setup the scene, camera, renderer, and Cannon.js world
const { scene, camera, renderer, world } = setupScene();

// Create the plane and sphere
const { planeMesh, groundBody } = createPlane();
const { sphereMesh, sphereBody } = createSphere();

const { planeMesh: wallMesh, groundBody: wallBody } = createPlane(
    new THREE.Vector3(0, 25, 0), // Position the wall
    new THREE.Vector3(Math.PI / 2, 0, 0) // Rotate it 90 degrees around the X-axis
);

scene.add(wallMesh);
world.addBody(wallBody);


scene.add(planeMesh);
world.addBody(groundBody);
scene.add(sphereMesh);
world.addBody(sphereBody);

// Setup PlayerControls
const controls = new PlayerControls(camera, document.body);

// Update movement logic in the animate loop
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    // Update Three.js sphere to match Cannon.js sphere position and rotation
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

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
