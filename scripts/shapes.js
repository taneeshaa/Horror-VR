import * as THREE from 'three';

export function createPlane(position = new THREE.Vector3(0, 0, 0), rotation = new THREE.Vector3(0, 0, 0)) {
    // Create a Three.js plane
    const planeGeometry = new THREE.PlaneGeometry(50, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, side: THREE.DoubleSide });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Set position and rotation
    planeMesh.position.copy(position);
    planeMesh.rotation.set(rotation.x, rotation.y, rotation.z);

    // Create a Cannon.js plane (ground)
    const groundBody = new CANNON.Body({
        mass: 0, // Static body
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: new CANNON.Plane()
    });
    groundBody.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z); // Set rotation for Cannon.js body

    return { planeMesh, groundBody };
}

export function createSphere() {
    // Add a Three.js sphere (ball)
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Create a Cannon.js sphere (ball)
    const sphereBody = new CANNON.Body({
        mass: 1, // Dynamic body
        shape: new CANNON.Sphere(1) // Radius 1 matches the Three.js sphere
    });
    sphereBody.position.set(0, 5, 0); // Start above the plane

    return { sphereMesh, sphereBody };
}
