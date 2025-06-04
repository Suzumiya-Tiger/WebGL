import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial(
  {
    color: 0xffff00
  }
)

const mesh = new THREE.Mesh(geometry, material)

const mesh2=mesh.clone()

console.log('mesh2',mesh2);

mesh2.position.x=200
mesh2.translateY(100)

// 网格模型的克隆默认会共享同样的材质和几何体对象
// 如果我们克隆了原模型的材质和几何体，那么我们克隆的网格模型和原网格模型是独立的
mesh2.material=material.clone()
mesh2.geometry=geometry.clone()
mesh2.material.color.set('rgb(0,0,255)')

// 假设mesh想基于mesh2来进行调整
mesh.position.copy(mesh2.position)
mesh.position.y=0


const v1=new THREE.Vector3(1,2,3)

const v2=v1.clone()

console.log('v2',v2);

const v3=new THREE.Vector3(4,5,6)
v3.copy(v1)
// v3执行了复制操作以后，会把v1的值复制给v3，从而改变v3的值
console.log('v3', v3);

export {mesh,mesh2}