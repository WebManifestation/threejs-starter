import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'stats.js';

let container, controls;
let camera, scene, renderer;
let cube;

const stats = new Stats();
stats.domElement.style.right = 0;
stats.domElement.style.left = 'initial';
document.body.appendChild(stats.dom);

init();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 200);
  camera.position.set(-4, 4, 4);

  scene = new THREE.Scene();
  // scene.fog = new THREE.Fog(0x000000, 10, 30);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.outputEncoding = THREE.sRGBEncoding

  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  // controls.enabled = false;
  // controls.autoRotate = true;
  controls.update();

  addLights();
  addItems();

  window.addEventListener('resize', onWindowResize, false);
  animate();
}


function addItems() {

  const color = new THREE.Color(`hsla(0, 80%, 50%, 1)`)

  const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color: color });
  cube = new THREE.Mesh(geometry, material);
  
  scene.add(cube);
}

function addLights() {

  const ambient = new THREE.AmbientLight(0xffffff, 0.05);
  scene.add(ambient);

  const topRight = new THREE.DirectionalLight(0xffffff, 0.5);
  topRight.position.set(4, 4, 4);
  const topRightHelper = new THREE.DirectionalLightHelper(topRight, 1);
  scene.add(topRight);
  scene.add(topRightHelper);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
  backLight.position.set(0, 2, -6);
  const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
  scene.add(backLight);
  scene.add(backLightHelper);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  stats.begin();

  cube.rotation.y += 0.01;
  cube.rotation.x += 0.02;
  controls.update();
  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(animate);
}