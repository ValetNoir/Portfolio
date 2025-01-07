'use strict';

// --- CONST INIT ---

const WORLD_SIZE = 2;
const CHUNK_SIZE = 16;
const NOISENESS = 1;
const USELERP = true;
const SMOOTH_SHADING = true;

const NOISE_INCREMENT = 1 / (CHUNK_SIZE * NOISENESS); // 1 = repeating




// --- Three.js Init ---

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.10;
controls.enableZoom = true;

camera.position.x = WORLD_SIZE * CHUNK_SIZE * 2;
camera.position.y = WORLD_SIZE * CHUNK_SIZE / 2;
camera.position.z = WORLD_SIZE * CHUNK_SIZE / 2;

controls.target.set(WORLD_SIZE * CHUNK_SIZE / 2, WORLD_SIZE * CHUNK_SIZE / 2, WORLD_SIZE * CHUNK_SIZE / 2);
controls.update();

let pointLight = new THREE.PointLight(0xffffff, 1);
camera.add(pointLight);
scene.add(camera);



// MAIN LOOP

function draw() {
  requestAnimationFrame(draw);
  controls.update();
  renderer.render(scene, camera);
}

function logArr(arr) {
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}