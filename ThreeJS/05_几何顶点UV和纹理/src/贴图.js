import * as THREE from 'three'

const geometry=new THREE.SphereGeometry(100,30,30)

// 纹理贴图加载器TextureLoader
const textLoader=new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
const texture=textLoader.load('/earth.jpg')

const material=new THREE.MeshLambertMaterial({
  // 设置贴图
  map:texture
})

const mesh=new THREE.Mesh(geometry,material)

export default mesh
