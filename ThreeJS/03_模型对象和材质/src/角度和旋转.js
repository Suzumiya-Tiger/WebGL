import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,

})

const mesh = new THREE.Mesh(geometry, material)
// 直接改变mesh的rotation对应轴的角度，来实现旋转
mesh.rotation.y = Math.PI / 8
mesh.rotation.y += Math.PI / 8
// 通过rotate方向轴 来实现对应方向轴的旋转
mesh.rotateY(Math.PI / 8)
const eu = new THREE.Euler(0, Math.PI, 0)

export default mesh;
