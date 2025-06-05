import * as THREE from 'three'

const geometry1 = new THREE.BoxGeometry(20, 20, 20)
const geometry2 = new THREE.BoxGeometry(20, 50, 20)

const group = new THREE.Group()
const group2 = new THREE.Group()

for(let i = 1; i <= 10; i++){
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    wireframe: true,
  })
  const mesh = new THREE.Mesh(geometry1, material)
  mesh.position.x = i * 50
  mesh.name = i + '号楼'
  group.add(mesh)
}

for(let j = 1; j <= 10; j++){
  const material2 = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
  })
  const mesh2 = new THREE.Mesh(geometry2, material2)
  mesh2.position.x = j * 50
  mesh2.name = j + '号楼'
  group2.add(mesh2)
}

group2.position.z = 50
group2.position.y = 15

const model = new THREE.Group()
model.name = '小区房子'

model.add(group)
model.add(group2)

model.position.set(-50, 0, -25)

model.traverse(function (obj){
  if(obj.isMesh){
    console.log('obj.name', obj.name);
    // parseInt会自动停在第一个非数字字符处，所以"10号楼"会正确解析为10
    const buildingNumber = parseInt(obj.name)
    if(buildingNumber <= 5){
      obj.material.color.set(0xff00ff)
    } else {
      obj.material.color.set(0x0000ff)
    }
  }
})

const obj = model.getObjectByName('4号楼')
console.log('obj', obj);

export default model