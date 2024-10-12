import * as THREE from 'three';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Light sky blue background

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 0); // Initial position above the cube

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10).normalize();
scene.add(directionalLight);

// Create a transparent cube
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2; // Rotate to lay flat
scene.add(ground);

// Pointer lock controls for looking around
const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
    controls.lock(); // Lock the pointer when the screen is clicked
});

// Handle player movement with WASD keys
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const moveSpeed = 0.1;

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': keys.forward = true; break;
        case 'KeyS': keys.backward = true; break;
        case 'KeyA': keys.left = true; break;
        case 'KeyD': keys.right = true; break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': keys.forward = false; break;
        case 'KeyS': keys.backward = false; break;
        case 'KeyA': keys.left = false; break;
        case 'KeyD': keys.right = false; break;
    }
}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update movement direction based on key input
    direction.z = Number(keys.forward) - Number(keys.backward);
    direction.x = Number(keys.right) - Number(keys.left);
    direction.normalize(); // Prevent faster diagonal movement

    // Apply movement to the cube
    cube.position.x += direction.x * moveSpeed;
    cube.position.z += direction.z * moveSpeed;

    // Move the camera to follow the cube
    camera.position.set(cube.position.x, cube.position.y + 10, cube.position.z);

    renderer.render(scene, camera); // Render the scene
}

animate();