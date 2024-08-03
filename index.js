import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = 450;
const h = 450;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);

const container = document.getElementById("container");
container.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wiremat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
});
const wiremesh = new THREE.Mesh(geo, wiremat);
wiremesh.scale.setScalar(1.001);
mesh.add(wiremesh);

const hemilight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemilight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    mesh.rotation.z = t * 0.0005;
    mesh.rotation.x = t * 0.0003;
    mesh.rotation.y = t * 0.0001;
    renderer.render(scene, camera);
    controls.update();
}

animate();
