import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(20,20,20)


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
})

const mesh1=new THREE.Mesh(geometry,material)
const mesh2=new THREE.Mesh(geometry,material)
mesh2.translateX(50)

// 创建一个组对象
const group=new THREE.Group()
// 通过add方法将mesh1和mesh2添加到组对象中
group.add(mesh1)
group.add(mesh2)
// 利用group可以统一来控制所有内部子对象的属性
group.position.set(50,50,50)
group.scale.set(2,2,2)
group.rotation.set(Math.PI/4,Math.PI/4,Math.PI/4)
console.log('group.children',group.children);




export  default group