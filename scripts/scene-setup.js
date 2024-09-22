import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function setupScene() {
    // Create a Three.js scene
    const scene = new THREE.Scene();

    // Create and position the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-140, 5, 0);
    camera.lookAt(0, 0, 0);

    // Create a WebGL renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Setup Cannon.js world
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5).normalize();
    scene.add(light);


    return { scene, camera, renderer, world };
}
