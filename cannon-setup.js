import * as THREE from 'three';

// Create a Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// Add a Three.js plane (floor)
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(planeMesh);

// Add a Three.js sphere (ball)
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh);

// Position the camera
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Cannon.js world setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Set gravity

// Create a Cannon.js plane (floor)
const groundBody = new CANNON.Body({
    mass: 0, // Static body
    shape: new CANNON.Plane()
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Rotate to match Three.js plane
world.addBody(groundBody);

// Create a Cannon.js sphere (ball)
const sphereBody = new CANNON.Body({
    mass: 1, // Dynamic body
    shape: new CANNON.Sphere(1) // Radius 1 matches the Three.js sphere
});
sphereBody.position.set(0, 5, 0); // Start above the plane
world.addBody(sphereBody);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Step the physics world
    world.step(1 / 60);

    // Update Three.js sphere to match Cannon.js sphere position and rotation
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);

    // Render the scene
    renderer.render(scene, camera);
}

// Resize event handler to adjust camera aspect ratio and renderer size
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();