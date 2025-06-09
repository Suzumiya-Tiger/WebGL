import * as THREE from 'three'

const geometry=new THREE.PlaneGeometry(200,20)

// 纹理贴图加载器TextureLoader
const textLoader=new THREE.TextureLoader()
// .load()方法加载图像，返回一个纹理对象Texture
const texture=textLoader.load('/纹理.png')

const material=new THREE.MeshBasicMaterial({
  // 设置贴图
  map:texture,
  // png贴图的透明部分如果需要忽略，则设置为true
  transparent:true
})

const mesh=new THREE.Mesh(geometry,material)
mesh.rotateX(-Math.PI/2)

// 纹理对象的偏移属性,相当于在对应的平面内移动uv坐标
/* texture.offset.x=0.5
texture.offset.y=0.5 */

// 纹理对象的缩放属性
/* texture.repeat.x=2
texture.repeat.y=2 */

// 纹理对象的重复模式属性
/* texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping */

// 解释：repeat.x=50 表示在x轴方向上重复50次，
// wrapS=THREE.RepeatWrapping 表示在x轴方向上重复，
// wrapT=THREE.RepeatWrapping 表示在y轴方向上重复
texture.repeat.x=50
texture.wrapS=THREE.RepeatWrapping
export {mesh,texture}
