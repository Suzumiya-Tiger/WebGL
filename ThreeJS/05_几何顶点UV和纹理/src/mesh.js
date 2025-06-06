import * as THREE from 'three'

const geometry=new THREE.PlaneGeometry(2000,2000)

// 纹理贴图加载器TextureLoader
const textLoader=new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
const texture=textLoader.load('/image.png')
texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping
texture.repeat.set(12,12)
const material=new THREE.MeshLambertMaterial({
  // 设置贴图
  map:texture
})

const mesh=new THREE.Mesh(geometry,material)
mesh.rotateX(Math.PI/2)
export default mesh
