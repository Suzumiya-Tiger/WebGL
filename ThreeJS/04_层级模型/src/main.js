import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import group from './mesh.js';

const scene = new THREE.Scene();

scene.add(group);

const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(100, 100, 100);
scene.add(directionLight);

// 观察场景的子对象
console.log('scene.children',scene.children);

const helper = new THREE.AxesHelper(100);
scene.add(helper);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 10000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

