import * as THREE from 'three';
// 引入相机控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 引入性能监视器
import Stats from 'three/examples/jsm/libs/stats.module.js';


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
const pointLight = new THREE.PointLight(0x00ffff, 10)
// 变更光照强度
pointLight.intensity = 3.0
// 控制光源衰减
pointLight.decay = 0.1
// 设置光源位置
pointLight.position.set(400, 200, 300)
// 设置光源距离
// pointLight.distance = 30000
// 添加到场景
// scene.add(pointLight)
// 创建一个辅助光源对象
const pointlighthelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointlighthelper)
// 添加一个环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算光的方向，并非单纯的位置属性
directionalLight.position.set(80, 100, 50)
// 方向光指向对象网格模型mesh，可以不设置，如果你不设置position属性，默认的位置是坐标原点
directionalLight.target = mesh

scene.add(directionalLight)

// 平行光辅助观察 DirectionalLightHelper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000)
scene.add(directionalLightHelper)



// 通过window.innerWidth和window.innerHeight获取窗口的宽度和高度，并且将其渲染到一个canvas画布上
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

// 创建一个webGL渲染器,本质上是一个canvas画布，通过setSize方法设置画布的宽度和高度，然后通过render方法将场景和相机渲染到画布上
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) //cavnvas画布宽高度
// 周期性执行，默认理想状态下每秒执行60次


// 创建Stats对象
const stats = new Stats()
// stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement)

// 创建一个时钟对象
const clock = new THREE.Clock()
function render() {
  // 获取时间间隔,使用毫秒作为单位
  const spt = clock.getDelta() * 1000

  // 更新性能监视器
  stats.update()

  // 获取时间间隔
  // console.log('spt', spt);
  // 获取帧率
  // console.log('渲染帧率', 1000 / spt);
  
  // requestAnimationframe循环调用的函数中调用update()来刷新时间
  requestAnimationFrame(render)
  // 周期性旋转，每次旋转0.01个弧度
  mesh.rotateY(0.01)
  // 周期性执行渲染功能，更新canvas画布上的内容
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



