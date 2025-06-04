import * as THREE from 'three'

// 矩形平面,最后两个参数代表了在水平和垂直方向上进行分段
// const geometry=new THREE.BoxGeometry(100,100,100,2,2,2)

// 球体，后面的两个参数代表了在水平和垂直方向上进行分段
const geometry=new THREE.SphereGeometry(100,32,16)


console.log('position',geometry.attributes.position);
console.log('index',geometry.index);


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
  wireframe:true
})

const mesh=new THREE.Mesh(geometry,material)

export default mesh