import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 

const scene=new THREE.Scene()

const geometry=new THREE.BoxGeometry(100,100,100)

const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
  transparent:true,
  opacity:0.5
})

for (let i = 0; i < 10; i++) {
  
for(let j=0;j<10;j++){

  const mesh=new THREE.Mesh(geometry,material)
  // 在XOZ平面分布
mesh.position.set(i*200,0,j*200)
  scene.add(mesh)
}
}
// 参数分别代表光源颜色，光源强度，光源位置，光源方向
const light=new THREE.DirectionalLight(0xffffff,500)
light.position.set(100,100,100)

scene.add(light)

const axesHelper = new THREE.AxesHelper(3000)
scene.add(axesHelper)


const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,8000)

camera.position.set(300,400,500)
camera.lookAt(1000,0,1000)

const renderer=new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth,window.innerHeight)


const controls=new OrbitControls(camera,renderer.domElement)
controls.target.set(1000,0,1000)
controls.update()
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

