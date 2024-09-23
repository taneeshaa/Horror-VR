import * as THREE from 'three';

export function createPlane(
    position = new THREE.Vector3(0, 0, 0), 
    rotation = new THREE.Vector3(0, 0, 0),
    width = 50, 
    height = 50
) {
    // Create a Three.js plane with adjustable width and height
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
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
