import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(20,20,20)


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
})

const group=new THREE.Group()
const group2=new THREE.Group()

for(let i=0;i<10;i++){
  const mesh=new THREE.Mesh(geometry,material)
  mesh.position.x=i*30
  mesh.name=i+6+'号楼'
  group.add(mesh)
}

for(let i=0;i<10;i++){
  const mesh2=new THREE.Mesh(geometry,material)
  mesh2.position.x=i*30
  mesh2.name=i+6+'号楼'
  group2.add(mesh2)
  
}

group2.position.z=50
group.position.y=15

const model=new THREE.Group()
model.name='小区房子'

model.add(group)
model.add(group2)

model.position.set(-50,0,-25)

// 遍历方法不会遍历group组，而是遍历组里面的所有模型节点对象
model.traverse(function (obj){
  if(obj.isMesh){
    console.log('obj.name',obj.name);
    obj.material.color.set(0x00ff00)
  }
    
})

const obj=model.getObjectByName('4号楼')
console.log('obj',obj);
obj.material.color.set(0x00ff00)

export default group