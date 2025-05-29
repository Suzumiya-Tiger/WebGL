import * as THREE from 'three';
// 引入相机控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene()
// 模型
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 材质
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 })
// 漫反射材质
const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
// 网格
const mesh = new THREE.Mesh(geometry, material)
// 设置网格模型在三维空间中的位置坐标，默认是在坐标原点
mesh.position.set(0, 10, 0)
// 把模型添加到场景
scene.add(mesh)
// 创建三维坐标轴
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

// 创建一个光源对象(点光源)
const pointLight = new THREE.PointLight(0x00ffff)
// 变更光照强度
pointLight.intensity = 3.0
// 控制光源衰减
pointLight.decay = 0.1
// 设置光源位置
pointLight.position.set(400, 700, 300)
// 设置光源距离
pointLight.distance = 30000
// 添加到场景
scene.add(pointLight)


const width = window.innerWidth
const height = window.innerHeight
// 创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)

camera.position.set(200, 200, 200)
// camera.position.set(-1000, 0, 0)

// 定义相机的观察目标(视线) 观察目标点的坐标
camera.lookAt(0, 0, 0) //坐标原点
// camera.lookAt(-2000, 0, 0)
// camera.lookAt(mesh.position)

// 创建一个webGL渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) //cavnvas画布宽高度
function render() {
  requestAnimationFrame(render)

  renderer.render(scene, camera)
}
render()

// 把渲染结果canvas画布，也就是所谓的照片，添加到网页页面上
document.body.appendChild(renderer.domElement) //将渲染器添加到body中

// 创建相机控件对象
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
  console.log('camera.position', camera.position);
  renderer.render(scene, camera)
})


