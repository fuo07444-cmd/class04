import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// シーン、カメラ、レンダラーを作成
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControlsを追加
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// カメラの位置を設定
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// ライトを追加
const light = new THREE.PointLight(0xffffff, 50, 10);
light.position.set(3, 3, 3);
scene.add(light);

// 座標軸を表示
const axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

// 球
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// 立方体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// グループを作成
const group = new THREE.Group();

// 球と立方体をグループに追加
group.add(sphere);
group.add(cube);

// それぞれの位置を設定
sphere.position.x = 2;
cube.position.x = -2;

// グループをシーンに追加
scene.add(group);

// アニメーション
function animate() {
  requestAnimationFrame(animate);

  // グループ全体をY軸の周りに回転
  group.rotation.y += 0.01;

  // OrbitControlsの慣性を更新
  controls.update();

  renderer.render(scene, camera);
}

animate();
