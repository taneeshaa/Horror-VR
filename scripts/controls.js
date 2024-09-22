import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import * as THREE from 'three';

export class PlayerControls {
    constructor(camera, documentBody) {
        this.camera = camera;
        this.controls = new PointerLockControls(camera, documentBody);
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isOnGround = true; // Start on the ground
        this.gravity = 9.82;
        this.playerHeight = 10; // Simulate player height

        document.addEventListener('click', () => this.controls.lock());
        this.setupKeyboardListeners();
    }

    setupKeyboardListeners() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW': this.moveForward = true; break;
                case 'KeyS': this.moveBackward = true; break;
                case 'KeyA': this.moveLeft = true; break;
                case 'KeyD': this.moveRight = true; break;
                case 'Space':
                    if (this.isOnGround) {
                        this.velocity.y = 15; // Jump velocity
                        this.isOnGround = false;
                    }
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'KeyW': this.moveForward = false; break;
                case 'KeyS': this.moveBackward = false; break;
                case 'KeyA': this.moveLeft = false; break;
                case 'KeyD': this.moveRight = false; break;
            }
        });
    }

    updateMovement(deltaTime) {
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize(); // Normalize diagonal movement

        if (this.controls.isLocked) {
            // Apply movement friction
            this.velocity.x -= this.velocity.x * 10.0 * deltaTime;
            this.velocity.z -= this.velocity.z * 10.0 * deltaTime;

            // Apply directional movement
            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 20.0 * deltaTime;
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 20.0 * deltaTime;

            this.controls.moveRight(-this.velocity.x * deltaTime);
            this.controls.moveForward(-this.velocity.z * deltaTime);

            // Apply gravity
            if (!this.isOnGround) {
                this.velocity.y -= this.gravity * deltaTime; // Simulate gravity
            }

            this.camera.position.y += this.velocity.y * deltaTime; // Update player vertical position

            // Check for ground collision
            if (this.camera.position.y < this.playerHeight) {
                this.velocity.y = 0; // Stop falling
                this.camera.position.y = this.playerHeight; // Set position to ground level
                this.isOnGround = true; // Set the player as on the ground
            } else {
                this.isOnGround = false; // Player is in the air
            }
        }
    }
}
