import * as THREE from 'three'

// 创建一个空的几何体对象
const geometry=new THREE.BufferGeometry()

// 添加顶点数据

// 类型化数组定义的一组顶点坐标数据
const vertices=new Float32Array([
  // 数组里面编写顶点的坐标数据
0,0,0,
50,0,0,
0,100,0,
0,0,10,
0,0,100,
50,0,10
])

// 将顶点数据添加到几何体对象中
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))
const material=new THREE.PointsMaterial({color:0x00ff00,size:5.0})
// 创建一个几何体对象
const pointMesh=new THREE.Points(geometry,material)


export default pointMesh