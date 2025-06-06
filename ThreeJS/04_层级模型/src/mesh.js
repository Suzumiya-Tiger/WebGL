import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(50,50,50)


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
})
const mesh=new THREE.Mesh(geometry,material)
geometry.translate(50/2,0,0)
 mesh.rotateY(Math.PI/4)
export default mesh 