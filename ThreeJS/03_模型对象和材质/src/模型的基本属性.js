import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true,
  opacity: 0.5
})

const mesh = new THREE.Mesh(geometry, material)

// 创建一个三维向量对象Vector3
const v3 = new THREE.Vector3()
v3.set(50, 50, 50)

// 设置mesh的缩放
// mesh.scale.set(2, 2, 2)

// 通过position 设置mesh的x轴位置
// mesh.position.x = 100
/* // 通过translateX 设置mesh的x轴位置
mesh.translateX(100)

// 通过translateY 设置mesh的y轴位置
mesh.translateY(100)

// 通过translateZ 设置mesh的z轴位置
mesh.translateZ(100) */

const v = new THREE.Vector3(1, 1, 1)
// 转化为单位向量
v.normalize()
console.log('单位向量', v);
// 使网格模型沿着axe轴平移
mesh.translateOnAxis(v, 100)

export default mesh;
