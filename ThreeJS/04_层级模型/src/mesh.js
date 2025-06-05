import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(20,20,20)


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
})

const mesh=new THREE.Mesh(geometry,material)

mesh.position.x=50
const group=new THREE.Group()
group.add(mesh)
group.position.x=50
export default group 