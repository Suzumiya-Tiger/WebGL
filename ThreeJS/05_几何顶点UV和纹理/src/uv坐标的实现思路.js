import * as THREE from 'three'

const geometry=new THREE.BufferGeometry()
// 类型数组创建UV坐标顶点数据
const vertices=new Float32Array([
  0,0,0,
  160,0,0,
  160,80,0,
  0,80,0
])
// 创建属性缓冲区对象

// 三个为一组，表示一个顶点的xyz坐标
const attributes=new THREE.BufferAttribute(vertices,3)

// 设置几何体attributes属性的位置属性
geometry.attributes.position=attributes


// Unit16Array类型数组创建顶点索引数据
const indexes=new Uint16Array([
  0,1,2,
  0,2,3
])

// 设置几何体attributes属性的索引属性
geometry.index=new THREE.BufferAttribute(indexes,1)

// 类型数组创建UV坐标顶点数据
const uvs=new Float32Array([
  0,0, //顶点1 uv坐标
  1,0, //顶点2 uv坐标
  1,1, //顶点3 uv坐标
  0,1 //顶点4 uv坐标
])
// 设置几何体attributes属性的uv属性
// 两个为一组，表示一个顶点的uv坐标
geometry.attributes.uv=new THREE.BufferAttribute(uvs,2)

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
