import * as THREE from 'three'

// 创建一个空的几何体对象
const geometry=new THREE.BufferGeometry()

// 添加顶点数据

// 类型化数组定义的一组顶点坐标数据
const vertices=new Float32Array([
// 矩形平面的第一个三角形
0,0,0, //0
80,0,0,  //1
80,80,0, //2
// 矩形平面的第二个三角形
/* 0,0,0, //该顶点和顶点1位置重复
80,80,0, // 该顶点和顶点2位置重复 */
0,80,0, //3


])
// Unit16Array 类型数组是用于创建顶点索引数据
const indexes=new Uint16Array([
  // 下面的各个索引值和顶点坐标数据组一一对应，并且按照三角形绘制顺序来
  0,1,2,0,2,3
])
// 将顶点数据添加到几何体对象中

// 基于顶点定义法线数据,法线数据和顶点的关系是一一对应的
const normals=new Float32Array([
  0,0,1,
  0,0,1,
  0,0,1,
  0,0,1,
])
geometry.setAttribute('normal',new THREE.BufferAttribute(normals,3))
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))

// 设置顶点索引数据
geometry.index=new THREE.BufferAttribute(indexes,1)
const material=new THREE.MeshLambertMaterial({color:0x00ff00})

const mesh=new THREE.Mesh(geometry,material)

export default mesh