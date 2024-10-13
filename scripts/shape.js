import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createPlane(
    position = new THREE.Vector3(0, 0, 0), 
    rotation = new THREE.Vector3(0, 0, 0),
    width = 50, 
    height = 50
) {
    // Create a Three.js plane with adjustable width and height
    const planeGeometry = new THREE.PlaneGeometry(width, height);

    // Create a transparent material
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888, // Set any color you want
        transparent: true, // Enable transparency
        opacity: 0.5, // Set the level of transparency (0 = fully transparent, 1 = fully opaque)
        side: THREE.DoubleSide // Optional, renders both sides of the plane
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Set position and rotation
    planeMesh.position.copy(position);
    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);

    // Create a Cannon.js plane (ground) at the specified position and rotation
    const groundBody = new CANNON.Body({
        mass: 0, // Static body
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: new CANNON.Plane()
    });
    groundBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Set rotation for Cannon.js body

    return { planeMesh, groundBody };
}

export function createColliderPlane(
    position = new THREE.Vector3(0, 0, 0), 
    rotation = new THREE.Vector3(0, 0, 0),
    width = 50, 
    height = 50
) {
    // Create a Three.js plane with adjustable width and height
    const planeGeometry = new THREE.PlaneGeometry(width, height);

    // Create a transparent material
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x888888, // Set any color you want
        transparent: true, // Enable transparency
        opacity: 0.5, // Set the level of transparency (0 = fully transparent, 1 = fully opaque)
        side: THREE.DoubleSide // Optional, renders both sides of the plane
    });

    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Set position and rotation
    planeMesh.position.copy(position);
    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);

    // Create a Cannon.js box that matches the visual plane's dimensions
    const halfExtents = new CANNON.Vec3(width / 2, height / 2, 0.1); // Small thickness for the box
    const groundBody = new CANNON.Body({
        mass: 0, // Static body
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: new CANNON.Box(halfExtents) // Use box shape instead of plane
    });
    groundBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Set rotation for Cannon.js body

    return { planeMesh, groundBody };
}

export function createSphere(
    position = new THREE.Vector3(0, 0, 0), 
    rotation = new THREE.Vector3(0, 0, 0), 
    radius = 1
) {
    // Add a Three.js sphere (ball) with customizable radius
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Set position and rotation
    sphereMesh.position.copy(position);
    sphereMesh.rotation.set(rotation.x, rotation.y, rotation.z);

    // Create a Cannon.js sphere (ball) with the same radius
    const sphereBody = new CANNON.Body({
        mass: 1, // Dynamic body
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: new CANNON.Sphere(radius) // Radius matches the Three.js sphere
    });
    
    sphereBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Set rotation for Cannon.js body

    return { sphereMesh, sphereBody };
}

export function createBox(
    position = new THREE.Vector3(0, 0, 0), 
    rotation = new THREE.Vector3(0, 0, 0), 
    width = 1, 
    height = 1, 
    depth = 1
) {
    // Create a box geometry
    const boxGeometry = new THREE.BoxGeometry(width, height, depth);
    
    // Create a transparent material
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000, // Red color for the box
        transparent: false, // Enable transparency
        opacity: 0, // Set transparency level (50% opacity)
        side: THREE.DoubleSide // Optional: render both sides
    });

    // Create the mesh
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
    // Set position and rotation
    boxMesh.position.copy(position);
    boxMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    boxMesh.name = "Spider Mesh"; 

    // Create a corresponding Cannon.js body
    const boxShape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2));
    const boxBody = new CANNON.Body({
        mass: 0, // Static body
        position: new CANNON.Vec3(position.x, position.y, position.z)
    });
    boxBody.addShape(boxShape);
    boxBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Set rotation

    return { boxMesh, boxBody };
}

export function createWall(world, scene, position, dimensions, rotation, isVisible = true, color = 0xff0000, name = "wall") {
    // Destructure dimensions for clarity
    const { width, height, depth } = dimensions;

    // Wall geometry and material
    const wallGeometry = new THREE.BoxGeometry(width, height, depth);
    const wallMaterial = new THREE.MeshPhongMaterial({ color }); // Use provided color

    // Create wall mesh
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.name = name;
    wall.position.set(position.x, position.y, position.z); // Set custom position
    wall.rotation.set(rotation.x, rotation.y, rotation.z); // Set custom rotation
    scene.add(wall);

    // Create Cannon.js body for the wall
    const wallBody = new CANNON.Body({
        mass: 0, // Static body
        position: new CANNON.Vec3(position.x, position.y, position.z) // Same position as the wall mesh
    });

    // Create a shape for the wall body
    const shape = new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)); // Half extents
    wallBody.addShape(shape);

    // Set rotation for the Cannon.js body
    wallBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Use the same rotation for physics body
    world.addBody(wallBody);

    // Set wall visibility
    wall.visible = isVisible; // Control visibility of the wall mesh

    return { wall }; 
}

export function createSpider(
    scene,
    world,
    position = new THREE.Vector3(-5, 0.5, 6),
    scale = new THREE.Vector3(0.1, 0.1, 0.1)
    
) {
    const loader = new GLTFLoader();

    const spiderAssetUrl = 'https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider.glb?v=1728809954090';

    // Load the spider model
    loader.load(spiderAssetUrl, (gltf) => {
        // Set the scale and position for the spider model
        gltf.scene.scale.set(scale.x, scale.y, scale.z);
        gltf.scene.position.set(position.x, position.y, position.z);
        // scene.add(gltf.scene); // Add the model to the scene 
        // Update the function to return both the glTF model and the physics body
    });
    const boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const boxMaterial = new THREE.MeshPhongMaterial( 0xff0000 ); // Use provided color

    // Create wall mesh
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.name = "spider mesh";
    boxMesh.position.set(position.x, position.y, position.z); // Set custom position

    // Add the box to the scene and physics world
    scene.add(boxMesh);
    // world.addBody(boxBody);

    return { boxMesh};
}

