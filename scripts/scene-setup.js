import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function setupScene() {
    // Create a Three.js scene
    const scene = new THREE.Scene();

    // Create and position the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, 0, 0);
    // Camera setup
    camera.position.set(0, 1.5, 5);

    // Create a WebGL renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Setup Cannon.js world
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Set gravity

    //create player body
    const cubeBody = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(-11.5, -0.4, -26),
        fixedRotation: true // Prevents rotation
    });
    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    cubeBody.addShape(cubeShape);
    world.addBody(cubeBody);

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: '#00ff00' });
    // Set cube visible to false
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.visible = false;  // Make the cube invisible
    cube.castShadow = true;
    scene.add(cube);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5).normalize();
    scene.add(light);

    return { scene, camera, renderer, world, cube, cubeBody };
}