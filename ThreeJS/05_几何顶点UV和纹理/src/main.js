import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {mesh,texture} from './mesh.js';

const scene = new THREE.Scene();

scene.add(mesh);

const ambientLight=new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


const directionLight = new THREE.DirectionalLight(0xffffff);
directionLight.position.set(100, 100, 100);
scene.add(directionLight);

const helper = new THREE.AxesHelper(100);
scene.add(helper);

// 添加地面辅助网格对象
// 参数分别是网格的尺寸和网格的间隔，网格颜色和中线颜色
const gridHelper=new THREE.GridHelper(600,50,0x00ffff,0x004444)
scene.add(gridHelper)



const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height)

function render() {
  texture.offset.x+=0.01
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

