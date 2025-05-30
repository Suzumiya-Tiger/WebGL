import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 

const scene=new THREE.Scene()

/**
 * 球体
 * 它是一个球面，由许多三角形组成
 * 参数：
 * 半径
 * 分段数
 * 分段数
 * 分段数
 * 分段数
 */
// const geometry=new THREE.SphereGeometry(100,32,32)

/**
 * 圆柱体
 * 参数：
 * 半径
 * 高度
 * 分段数
 * 分段数
 */
// const geometry=new THREE.CylinderGeometry(100,100,100,32,32)

/**
 * 矩形平面
 * 
 * 参数：
 * 宽度
 * 高度
 * 宽度分段数
 * 高度分段数
 * 
 */
//  const geometry=new THREE.PlaneGeometry(100,100,32,32)


/**
 * 圆形平面
 * 参数：
 * 半径
 * 分段数
 */
 const geometry=new THREE.CircleGeometry(100,32)


const material=new THREE.MeshBasicMaterial({
  color:0x00ffff,
  wireframe:true
})
const mesh=new THREE.Mesh(geometry,material)

scene.add(mesh)

const light=new THREE.AmbientLight(0xffffff,1000)
light.position.set(100,100,100)

scene.add(light)

const axesHelper=new THREE.AxesHelper(100)
scene.add(axesHelper)

const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

camera.position.set(300,400,500)
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

