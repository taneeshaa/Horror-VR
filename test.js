import * as THREE from 'three';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';

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

    // Ground Plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(ground);

    // Physics world setup with Cannon.js
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0); // Earth gravity

    // Cube geometry and Cannon.js body
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
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

    // PointerLockControls for player movement
    const controls = new PointerLockControls(camera, document.body);
    document.body.addEventListener('click', () => {
      controls.lock();
    });

    // Attach camera to the cube (player)
    camera.position.set(0, 1, 0); // Slightly above the cube body

    // WASD Movement
    const moveSpeed = 5;
    const velocity = new THREE.Vector3();

    const keysPressed = {
      w: false,
      a: false,
      s: false,
      d: false
    };

    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyW') keysPressed.w = true;
      if (event.code === 'KeyA') keysPressed.a = true;
      if (event.code === 'KeyS') keysPressed.s = true;
      if (event.code === 'KeyD') keysPressed.d = true;
    });

    document.addEventListener('keyup', (event) => {
      if (event.code === 'KeyW') keysPressed.w = false;
      if (event.code === 'KeyA') keysPressed.a = false;
      if (event.code === 'KeyS') keysPressed.s = false;
      if (event.code === 'KeyD') keysPressed.d = false;
    });

    // Game loop
    function animate() {
      requestAnimationFrame(animate);
    
      // Update Cannon.js physics
      world.step(1 / 60);
    
      // Prevent cube from rotating by locking angular velocity
      cubeBody.angularVelocity.set(0, 0, 0); // Ensure no spin
    
      // Update cube's position from the physics body
      cube.position.copy(cubeBody.position);
      cube.quaternion.copy(cubeBody.quaternion);
    
      // Log the cubeBody's position (x, y, z)
      console.log(`Cube position: x=${cubeBody.position.x.toFixed(2)}, y=${cubeBody.position.y.toFixed(2)}, z=${cubeBody.position.z.toFixed(2)}`);
    
      // Camera should follow the cube
      camera.position.set(
        cubeBody.position.x,
        cubeBody.position.y + 1, // Raise camera slightly above cube
        cubeBody.position.z
      );
    
      // Movement
      velocity.set(0, 0, 0);
    
      // Reverse the velocity calculation to fix direction
      if (keysPressed.w) velocity.z += moveSpeed;  // Forward
      if (keysPressed.s) velocity.z -= moveSpeed;  // Backward
      if (keysPressed.a) velocity.x += moveSpeed;  // Left
      if (keysPressed.d) velocity.x -= moveSpeed;  // Right
    
      // Rotate velocity according to camera direction
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0; // Keep movement horizontal
    
      const forwardVector = new THREE.Vector3(direction.x, 0, direction.z).normalize();
      const rightVector = new THREE.Vector3().crossVectors(camera.up, forwardVector).normalize();
    
      // Apply movement in the correct direction based on camera orientation
      cubeBody.velocity.x = forwardVector.x * velocity.z + rightVector.x * velocity.x;
      cubeBody.velocity.z = forwardVector.z * velocity.z + rightVector.z * velocity.x;
    
      // Render the scene
      renderer.render(scene, camera);
    }
    
    

    animate();