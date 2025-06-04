import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';


const gui=new GUI()


const scene=new THREE.Scene()

const geometry=new THREE.BoxGeometry(100,100,100)

const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
  transparent:true,
  wireframe:true,
  opacity:0.5
})

const mesh=new THREE.Mesh(geometry,material)

scene.add(mesh)


gui.add(mesh.position,'x').min(-300).max(300).step(1).name('x轴位置')
gui.add(mesh.position,'y').min(-300).max(300).step(1).name('y轴位置')
gui.add(mesh.position,'z').min(-300).max(300).step(1).name('z轴位置')
gui.addColor(material,'color').onChange(function(color){
  console.log('color',color);
})
gui.add(mesh.position,'y',[-100,0,100]).name('y轴位置')
gui.add(mesh.position,'x',{
  '位置100':100,
  '位置200':200,
  '位置300':300
}).name('x轴位置')
const directionLight=new THREE.DirectionalLight(0xffffff,1)
directionLight.position.set(100,60,50)

scene.add(directionLight)

const ambientLight=new THREE.AmbientLight(0xffffff,0.4)
scene.add(ambientLight)

console.log('ambient.intensity',ambientLight.intensity);

gui.add(ambientLight,'intensity').min(0).max(20).step(0.01).name('环境光强度')

const axesHelper=new THREE.AxesHelper(1000)
scene.add(axesHelper)
scene.add(axesHelper)

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,3000)

camera.position.set(292,223,185)
camera.lookAt(0,0,0)

const renderer=new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)


const controls=new OrbitControls(camera,renderer.domElement)

function render(){
requestAnimationFrame(render)
  renderer.render(scene,camera)
}

render()

document.body.appendChild(renderer.domElement) //将渲染器添加到body中
console.log('查看当前屏幕设备像素比',window.devicePixelRatio);

// 告诉three.js 我的屏幕的设备像素比
renderer.setPixelRatio(window.devicePixelRatio)

// onresize事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏状况下:设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 渲染器执行render方法的时候，会读取相机对象的投影矩阵属性
  // 但是不会每渲染一帧就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateprojectionmatrix方法更新投影矩阵
  camera.updateProjectionMatrix()
}

