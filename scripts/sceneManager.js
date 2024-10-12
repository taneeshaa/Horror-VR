import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { createPlane, createWall} from './shapes';

export function createAllScenes(scene){
  scene1 = createScene1(scene);
  scene2 = createScene2(scene);
  scene3 = createScene3(scene);
  scene4 = createScene4(scene);
  return {scene1, scene2, scene3, scene4};
}
function createScene1(scene){
  const scene = new THREE.Scene();

  return scene;
}

function createScene2(scene){
  const scene = new THREE.Scene();

  // Load GLB asset for the main scene
  const loader = new GLTFLoader();
  const glbAssetUrl = 'https://cdn.glitch.me/eb03fb9f-99e3-4e02-8dbe-548da61ab77c/the_mansion_interiors.glb?v=1728751045599';
  loader.load(glbAssetUrl, (gltf) => {
      gltf.scene.scale.set(1, 1, 1); 
      gltf.scene.position.set(0, 0, 0);
      scene.add(gltf.scene);
  });

  createWall(world, scene,  { x: 1, y: 0.5, z: 5 }, {width: 10, height: 2, depth: 0.5}, true);
  return scene;
}

function createScene3(scene){
  const scene = new THREE.Scene();

  return scene;
}

function createScene4(scene){
  const scene = new THREE.Scene();

  return scene;
}