import * as THREE from 'three'

const geometry=new THREE.PlaneGeometry(50,50)

// 纹理贴图加载器TextureLoader
const textLoader=new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
const texture=textLoader.load('/转弯.png')

const material=new THREE.MeshBasicMaterial({
  // 设置贴图
  map:texture,
  // png贴图的透明部分如果需要忽略，则设置为true
  transparent:true
})

const mesh=new THREE.Mesh(geometry,material)
mesh.rotateX(-Math.PI/2)
export default mesh
