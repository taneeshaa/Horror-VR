import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Create a Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cannon.js world setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Set gravity

// Load GLB asset
const loader = new GLTFLoader();
loader.load('https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/fnaf_sb_vanny_hallway.glb?v=1726927327935', function (gltf) {
    gltf.scene.scale.set(1, 1, 1); // Set the scale of the model
    gltf.scene.position.set(0, 40, 0);
    scene.add(gltf.scene);
});

// Position the camera
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// Add a Three.js plane (floor)
const planeGeometry = new THREE.PlaneGeometry(50, 50);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
planeMesh.position.y = 0;
scene.add(planeMesh);

// Add a Three.js sphere (ball)
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);


// Create a Cannon.js plane (floor)
const groundBody = new CANNON.Body({
    mass: 0, // Static body
    shape: new CANNON.Plane()
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); 
world.addBody(groundBody);

// Create a Cannon.js sphere (ball)
const sphereBody = new CANNON.Body({
    mass: 1, // Dynamic body
    shape: new CANNON.Sphere(1) // Radius 1 matches the Three.js sphere
});
sphereBody.position.set(0, 5, 0); // Start above the plane
world.addBody(sphereBody);

// Gravity variables
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let isOnGround = true; // Start on the ground
const gravity = 9.82;
const playerHeight = 10; // Simulate player height

// Setup PointerLockControls
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());

// Handle keyboard input for movement
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
        case 'Space':
            if (isOnGround) {
                velocity.y = 15; // Jump velocity
                isOnGround = false;
            }
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
    }
});

// Update movement logic in the animate loop
function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);

    // Update Three.js sphere to match Cannon.js sphere position and rotation
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    // Update movement direction
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // Normalize diagonal movement

    // Handle movement if controls are locked
    if (controls.isLocked) {
        // Apply movement friction
        velocity.x -= velocity.x * 10.0 * 0.1;
        velocity.z -= velocity.z * 10.0 * 0.1;

        // Apply directional movement
        if (moveForward || moveBackward) velocity.z -= direction.z * 20.0 * 0.1;
        if (moveLeft || moveRight) velocity.x -= direction.x * 20.0 * 0.1;

        controls.moveRight(-velocity.x * 0.1);
        controls.moveForward(-velocity.z * 0.1);

        // Apply gravity and check if player is on the ground
        if (!isOnGround) {
            velocity.y -= gravity * 0.05; // Simulate gravity
        }

        camera.position.y += velocity.y * 0.05; // Update player vertical position

        // Check for ground collision
        if (camera.position.y < playerHeight) {
            velocity.y = 0; // Stop falling
            camera.position.y = playerHeight; // Set position to ground level
            isOnGround = true; // Set the player as on the ground
        } else {
            isOnGround = false; // Player is in the air
        }
    }

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
