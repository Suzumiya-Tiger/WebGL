import * as THREE from 'three'

const geometry=new THREE.CircleGeometry(100,32)
console.log('uv',geometry.attributes.uv);

// 纹理贴图加载器TextureLoader
const textLoader=new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
const texture=textLoader.load('/436853.jpg')

const material=new THREE.MeshLambertMaterial({
  // 设置贴图
  map:texture
})

const mesh=new THREE.Mesh(geometry,material)

export default mesh
