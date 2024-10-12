import * as THREE from 'three';

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
        transparent: true, // Enable transparency
        opacity: 0, // Set transparency level (50% opacity)
        side: THREE.DoubleSide // Optional: render both sides
    });

    // Create the mesh
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    
    // Set position and rotation
    boxMesh.position.copy(position);
    boxMesh.rotation.set(rotation.x, rotation.y, rotation.z);

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
