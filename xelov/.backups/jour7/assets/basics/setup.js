'use strict';

// const
const WORLD_SIZE = 2;
const CHUNK_SIZE = 16;
// const VERTICAL_FADE = 0;
// const GROUND_LEVEL = 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.10;
controls.enableZoom = true;

camera.position.x = 200;
camera.position.y = 0;
camera.position.z = 0;

controls.target.set(WORLD_SIZE * CHUNK_SIZE / 2, WORLD_SIZE * CHUNK_SIZE / 2, WORLD_SIZE * CHUNK_SIZE / 2);
controls.update();

// some lights

// let ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

let pointLight = new THREE.PointLight(0xffffff, 0.7);
// pointLight.position.set(1,1,2);
camera.add(pointLight);
scene.add(camera);

  

function draw() {
  requestAnimationFrame(draw);
  controls.update();
  renderer.render(scene, camera);
}