import * as THREE from 'three';

// WASD Movement
const moveSpeed = 4;
const velocity = new THREE.Vector3();
let canJump = false; // Jump flag to ensure the player is grounded before jumping

const keysPressed = {
  w: false,
  a: false,
  s: false,
  d: false,
  space: false
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') keysPressed.w = true;
  if (event.code === 'KeyA') keysPressed.a = true;
  if (event.code === 'KeyS') keysPressed.s = true;
  if (event.code === 'KeyD') keysPressed.d = true;
  if (event.code === 'Space') keysPressed.space = true;
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'KeyW') keysPressed.w = false;
  if (event.code === 'KeyA') keysPressed.a = false;
  if (event.code === 'KeyS') keysPressed.s = false;
  if (event.code === 'KeyD') keysPressed.d = false;
  if (event.code === 'Space') keysPressed.space = false;
});

export function playerMovement(camera, cube, cubeBody){
  // Update cube's position from the physics body
  cube.position.copy(cubeBody.position);
  cube.quaternion.copy(cubeBody.quaternion);

  // Smoothing the camera following the cube with lerp (linear interpolation)
  const targetPosition = new THREE.Vector3(
    cubeBody.position.x,
    cubeBody.position.y + 1, // Slightly above the cube
    cubeBody.position.z
  );

  camera.position.lerp(targetPosition, 0.1); // Smooth follow by interpolating

  // Movement
  velocity.set(0, 0, 0);

  if (keysPressed.w) velocity.z += moveSpeed;  // Forward
  if (keysPressed.s) velocity.z -= moveSpeed;  // Backward
  if (keysPressed.a) velocity.x += moveSpeed;  // Left
  if (keysPressed.d) velocity.x -= moveSpeed;  // Right

  // Rotate velocity according to camera direction
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  direction.y = 0; 
  console.log("Camera", cubeBody.position.x, cubeBody.position.y, cubeBody.position.z);
  const forwardVector = new THREE.Vector3(direction.x, 0, direction.z).normalize();
  const rightVector = new THREE.Vector3().crossVectors(camera.up, forwardVector).normalize();

  cubeBody.velocity.x = forwardVector.x * velocity.z + rightVector.x * velocity.x;
  cubeBody.velocity.z = forwardVector.z * velocity.z + rightVector.z * velocity.x;

  // Check if cube is on the ground to allow jumping
  canJump = cubeBody.position.y <= 1.01;

  // Jump if space is pressed and the player is on the ground
  if (keysPressed.space && canJump) {
    cubeBody.velocity.y = 5; // Jump strength
  }

}
