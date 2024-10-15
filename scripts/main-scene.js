import { setupScene } from './scene-setup.js'; 
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AddObjects } from './starting-scene-objects.js';
import { playerMovement } from './playerMovement.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.153.0/examples/jsm/controls/PointerLockControls.js';
import {createWall} from './shape.js';
//#region scene-setup
const { scene, camera, renderer, world, cube, cubeBody } = setupScene();
function createColliders(){
    createWall(world, scene, { x: 1, y: 1.5, z: -50 }, { width: 115, height: 5, depth: 0.5 }, { x: 0, y: Math.PI / 2, z: 0 }, false);
    createWall(world, scene, { x: -1, y: 1.5, z: -50 }, { width: 115, height: 5, depth: 0.5 }, { x: 0, y: Math.PI / 2, z: 0 }, false);
    
    createWall(world, scene, { x: 6, y: 1.5, z: -107 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -6, y: 1.5, z: -107 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    createWall(world, scene, { x: -4, y: 1.5, z: -115 }, { width: 20, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 8, y: 1.5, z: -118 }, { width: 25, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -1, y: 1.5, z: -124.5 }, { width: 15, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    
    createWall(world, scene, { x: 9.25, y: 1.5, z: -117 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -2, y: 1.5, z: -117 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    createWall(world, scene, { x: 7.3, y: 1.5, z: -129 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -3.7, y: 1.5, z: -129 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    createWall(world, scene, { x: 3.1, y: 1.5, z: -149 }, { width: 40, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 0.5, y: 1.5, z: -149 }, { width: 40, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    
    createWall(world, scene, { x: 1, y: 1.5, z: -164 }, { width: 10, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    //tiny room in living hall
    createWall(world, scene, { x: -2, y: 1.5, z: 6 }, { width: 7, height: 5, depth: 2 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -7, y: 1.5, z: 6 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -4, y: 1.5, z: 3.5 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -3.3, y: 1.5, z: 9.5 }, { width: 2, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -6.7, y: 1.5, z: 9.5 }, { width: 2, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    //furnace room next to main hall
    createWall(world, scene, { x: -11, y: 1.5, z: 9.5 }, { width: 7, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -19, y: 1.5, z: 9.5 }, { width: 6, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -22, y: 1.5, z: 14 }, { width: 8, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -15, y: 1.5, z: 18.7 }, { width: 12.5, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -8, y: 1.5, z: 11 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -8, y: 1.5, z: 18.5 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    
    //living hall
    createWall(world, scene, { x: -6, y: 1.5, z: 24 }, { width: 9, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 5.5, y: 1.5, z: 24 }, { width: 9, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 8, y: 1.5, z: 18.5 }, { width: 5, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 8, y: 1.5, z: 11 }, { width: 4, height: 5, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: 9, y: 1.5, z: 9 }, { width: 11, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: 20, y: 1.5, z: 9 }, { width: 15, height: 5, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    //change colour to brown
    createWall(world, scene, { x: 26, y: 1.5, z: 14 }, { width: 15, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 });
    createWall(world, scene, { x: 18, y: 1.5, z: 20 }, { width: 19, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 });
    
    createWall(world, scene, { x: 7, y: 1.5, z: 20 }, { width: 3, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: 0, y: 1.5, z: 26 }, { width: 12, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -7, y: 1.5, z: 20 }, { width: 2, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -14.5, y: 1.5, z: -14 }, { width: 12, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    //update the length
    createWall(world, scene, { x: -8, y: 1.5, z: -5 }, { width: 18, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    
    createWall(world, scene, { x: -13.5, y: 1.5, z: 6 }, { width: 7, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -10, y: 1.5, z: 4 }, { width: 5, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -26, y: 1.5, z: -6 }, { width: 11, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -21, y: 1.5, z: -13 }, { width: 2.5, height: 6, depth: 0.5 }, { x: 0, y: Math.PI/2, z: 0 }, false);
    createWall(world, scene, { x: -23, y: 1.5, z: -12 }, { width: 7, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    createWall(world, scene, { x: -22, y: 1.5, z: -0.9 }, { width: 8, height: 6, depth: 0.5 }, { x: 0, y: 0, z: 0 }, false);
    
    createWall(world, scene, { x: -17, y: 1.5, z: 2 }, { width: 16, height: 6, depth: 2 }, { x: 0, y: Math.PI/2, z: 0 }, false);
  }
  createColliders();

const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => {
  controls.lock();
});

document.body.appendChild(renderer.domElement);

// Function to toggle text visibility
const overlay = document.getElementById('overlay');

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(0, 0);
document.addEventListener('click', () => {
    checkIntersections();
});

let playerHoldingDoll = false;
let spiderCount = 6;
const spiders = [];
  const spiderPositions = [
    new THREE.Vector3(0, 0.2, 15),
    new THREE.Vector3(7, 0.2, -125),
    new THREE.Vector3(23, 0.2, 19.2),
    new THREE.Vector3(-4, 0.2, 4.6),
    new THREE.Vector3(-3, 0.2, -111),
    new THREE.Vector3(-8, 0.2, 0.7),
    new THREE.Vector3(-8, 0.2, -6.9)
  ];

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//#endregion

//#region assets
// Load GLB asset for the main scene
const loader = new GLTFLoader();
const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/the_mansion_interiors.glb?v=1728751045599';
loader.load(glbAssetUrl, (gltf) => {
    gltf.scene.scale.set(1, 1, 1); 
    gltf.scene.position.set(0, 0, 0);
    scene.add(gltf.scene);
});

let spider0, spider1, spider2, spider3, spider4, spider5, spider6, spider7;
// Load GLB asset for the button
const spiderAssetUrl = 'https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider.glb?v=1728809954090';
loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(0, 0.2, 15);
    scene.add(gltf.scene);
    spider0 = gltf.scene;
});
let spiderUpdateMesh = spider0;


loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(7, 0.2, -125);
    scene.add(gltf.scene);
    spider1 = gltf.scene;
});

loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(23, 0.2, 19.2);
    scene.add(gltf.scene);
    spider2 = gltf.scene;
});
loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(-4, 0.2, 4.6);
    scene.add(gltf.scene);
    spider3 = gltf.scene;
});
loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(-3, 0.2, -111);
    scene.add(gltf.scene);
    spider4 = gltf.scene;
});

loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(-8, 0.2, 0.7);
    scene.add(gltf.scene);
    spider5 = gltf.scene;
});

loader.load(spiderAssetUrl, (gltf) => {
    gltf.scene.scale.set(0.1, 0.1, 0.1); 
    gltf.scene.position.set(-8, 0.2, -6.9);
    scene.add(gltf.scene);
    spider6 = gltf.scene;
});

//#endregion


function toggleSpider() {
    if (playerHoldingDoll) {
        const furnacePosition = new THREE.Vector3(1.4, 1.5, -162); // Position of the furnace wall
        const distance = cube.position.distanceTo(furnacePosition);
        if (distance < 3) {
            overlay.textContent = "Spider burned!";
            scene.remove(spiderUpdateMesh);
            // scene.remove(boxMesh);
            playerHoldingDoll = false;
            spiderCount--;

            if (spiderCount > 0) {
                setTimeout(function () {
                    overlay.textContent = "Collect all the spiders and burn them, while escaping the Enemy!";
                }, 3000);
            } else {
                //game over logic
            }
        }
    } else {
            for(let i = 0; i < spiderPositions.length; i++){
                const distance = cube.position.distanceTo(spiderPositions[i]);
                if (distance < 2) {
                    overlay.textContent = "Go to the furnace and burn the spider!";
                    playerHoldingDoll = true;
                    if(i == 0) spiderUpdateMesh = spider0;
                    else if(i == 1) spiderUpdateMesh = spider1;
                    else if(i == 2) spiderUpdateMesh = spider2;
                    else if(i == 3) spiderUpdateMesh = spider3;
                    else if(i == 4) spiderUpdateMesh = spider4;
                    else if(i == 5) spiderUpdateMesh = spider5;
                    else if(i == 6) spiderUpdateMesh = spider6;
                } 
            }
        }
    }

function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    
    const objectsToTest = [spider0, spider1, spider2, spider3, spider4, spider5, spider6]; // Add the button box to objects to test
    const intersects = raycaster.intersectObjects(objectsToTest, true);

    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        toggleSpider();
        console.log('Hit:', firstIntersectedObject);
    }
}
// Load sounds
const crawlSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderCrawling.m4a?v=1726989205904'); 
const attackSound = new Audio('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/SpiderAttack_.m4a?v=1726988605221'); 

const deathMessage = document.getElementById('death-message');

//#region Ghost Bodies
//Create a cannon body for the ghost
let ghost1Body = new CANNON.Body({
    mass: 1, // Mass of the ghost
    position: new CANNON.Vec3(-25, 3, -10),
    angularFactor: new CANNON.Vec3(0, 1, 0) // Use the custom initial position
});

// Define a box shape around the ghost
let ghost1Shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // Adjust size as needed
ghost1Body.addShape(ghost1Shape);
world.addBody(ghost1Body);

//Create a cannon body for the ghost
let ghost2Body = new CANNON.Body({
    mass: 1, // Mass of the ghost
    position: new CANNON.Vec3(16, 3, 10),
    angularFactor: new CANNON.Vec3(0, 1, 0) // Use the custom initial position
});

// Define a box shape around the ghost
let ghost2Shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // Adjust size as needed
ghost2Body.addShape(ghost2Shape);
world.addBody(ghost2Body);

//Create a cannon body for the ghost
let ghost3Body = new CANNON.Body({
    mass: 1, // Mass of the ghost
    position: new CANNON.Vec3(4.3, 3, 25),
    angularFactor: new CANNON.Vec3(0, 1, 0) // Use the custom initial position
});
console.log(ghost1Body);

// Define a box shape around the ghost
let ghost3Shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)); // Adjust size as needed
ghost3Body.addShape(ghost3Shape);
world.addBody(ghost3Body);

// Load the GLTF model

let ghost1Model, ghost2Model, ghost3Model;
loader.load('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider_doll.glb?v=1726948097905', (gltf) => {
    ghost1Model = gltf.scene;
    ghost1Model.position.copy(ghost1Body.position);
    ghost1Model.rotation.copy(ghost1Body.quaternion);
    scene.add(ghost1Model);
});

loader.load('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider_doll.glb?v=1726948097905', (gltf) => {
    ghost2Model = gltf.scene;
    ghost2Model.position.copy(ghost2Body.position);
    ghost2Model.rotation.copy(ghost2Body.quaternion);
    scene.add(ghost2Model);
});

loader.load('https://cdn.glitch.global/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/spider_doll.glb?v=1726948097905', (gltf) => {
    ghost3Model = gltf.scene;
    ghost3Model.position.copy(ghost3Body.position);
    ghost3Model.rotation.copy(ghost3Body.quaternion);
    scene.add(ghost3Model);
});
//#endregion

// Set the desired speed for the ghost

// Function to update the ghost's movement towards the player
function moveGhostTowardsPlayer(playerbody, ghostbody, speed) {
    // Get the player's and ghost's current positions
    const playerPos = playerbody.position;
    const ghostPos = ghostbody.position;

    // Calculate the direction vector from ghost to player
    const direction = new CANNON.Vec3(
        playerPos.x - ghostPos.x,
        playerPos.y - ghostPos.y,
        playerPos.z - ghostPos.z
    );

    // Normalize the direction vector (get the unit vector)
    const distance = direction.length();
    if (distance > 0) {
        direction.x /= distance;
        direction.y /= distance;
        direction.z /= distance;
    }

    // Scale the direction by the desired speed
    const velocity = new CANNON.Vec3(
        direction.x * speed,
        direction.y * speed,
        direction.z * speed
    );

    // Set the ghost's velocity to move towards the player
    ghostbody.velocity.set(velocity.x, velocity.y, velocity.z);

    // Update ghost model's rotation to face the player
    const angle = Math.atan2(direction.z, direction.x); // Calculate the angle in radians
    ghostbody.quaternion.setFromEuler(0, angle, 0); // Set the quaternion to face the player
}
function calculateDistance(body1, body2) {
    // Get positions of both bodies
    const pos1 = body1.position;
    const pos2 = body2.position;

    // Calculate the differences in each dimension
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const dz = pos2.z - pos1.z;

    // Calculate and return the distance
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function ghostAI(playerbody, ghostbody){
    const playerPos = playerbody.position;
    const ghostPos = ghostbody.position;

    const distance = calculateDistance(playerbody, ghostbody);
    if(distance > 12){
        crawlSound.pause();
        return;
    }
    if(distance < 12 && distance > 6){
        moveGhostTowardsPlayer(playerbody, ghostbody, 0.2);
        crawlSound.loop = true;
        crawlSound.play();
    }
    else if(distance < 6 && distance > 2){
        moveGhostTowardsPlayer(playerbody, ghostbody, 1);
        crawlSound.play();
        
    }
    else{
        crawlSound.pause();
        attackSound.play();
        deathMessage.style.display = 'block'
        setTimeout(() => {
            location.reload();
        }, 3000);
        //attack music
        //restart level
    }
}

let cannonSpeed = 0.05;  // Speed when chasing
let fastSpeed = 0.1;     // Speed when close to player



function animate() {
    requestAnimationFrame(animate);
    world.step(1 / 60);
    
    // moveGhostTowardsPlayer(cubeBody, ghost1Body, 0.7);
    ghostAI(cubeBody, ghost1Body);
    ghostAI(cubeBody, ghost2Body);
    ghostAI(cubeBody, ghost3Body);
    console.log("Camera", camera.position.x, camera.position.y, camera.position.z);

    playerMovement(camera, cube, cubeBody);

    cube.position.copy(cubeBody.position);
    cube.quaternion.copy(cubeBody.quaternion);

    // Update ghost model position and rotation
    ghost1Model.position.copy(ghost1Body.position);
    ghost1Model.quaternion.copy(ghost1Body.quaternion);

    ghost2Model.position.copy(ghost2Body.position);
    ghost2Model.quaternion.copy(ghost2Body.quaternion);

    ghost3Model.position.copy(ghost3Body.position);
    ghost3Model.quaternion.copy(ghost3Body.quaternion);

    if (playerHoldingDoll) {
        // Update the spider's position to follow the player (cubebody)
        spiderUpdateMesh.position.set(
            cubeBody.position.x + 0.9,
            cubeBody.position.y + 0.8,
            cubeBody.position.z + 0.5
        );
    }

    renderer.render(scene, camera);
}

animate();