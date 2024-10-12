import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function setupScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Skybox color
    scene.background = new THREE.Color(0x87CEEB); // Blue sky color

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Physics world setup with Cannon.js
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Earth gravity

    // Cube geometry and Cannon.js body (Player)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = false;
    scene.add(cube);

    const cubeBody = new CANNON.Body({
        mass: 1, // Dynamic body
        shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
        position: new CANNON.Vec3(0, 2, 0), // Starting position
        angularDamping: 1
    });
    world.addBody(cubeBody);
    // Ground physics body
    const groundBody = new CANNON.Body({
        mass: 0, // Static body
        shape: new CANNON.Plane()
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Align it with the plane geometry
    world.addBody(groundBody);
    
    return { scene, camera, renderer, world, cube, cubeBody};
}