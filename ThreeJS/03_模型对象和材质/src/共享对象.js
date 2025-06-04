import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial(
  {
    color: 0xffff00
  }
)

const mesh = new THREE.Mesh(geometry, material)
const mesh2=new THREE.Mesh(geometry,material)

// 此时共享了同一个材质，因为material是一个对象，所以这里mesh和mesh2

// 本质上是引用了同一个对象，所以这里修改mesh的material的color，mesh2的color也会跟着改变
mesh.material.color.set('rgb(0,0,255)')

// mesh的position和mesh2的position是独立的，
// 所以这里修改mesh的position，mesh2的position不会跟着改变
mesh2.position.x=100

// 这里的mesh和mesh2也是共享了同一个几何体对象，
// 所以这里修改mesh的geometry，mesh2的geometry也会跟着改变
mesh.geometry.translate(0, 100, 0)

export { mesh, mesh2 };
