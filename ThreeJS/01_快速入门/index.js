import * as THREE from 'three';

const scene = new THREE.Scene()
// 模型
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 材质
const material=new THREE.MeshBasicMaterial({color:0x00ff00})
// 网格
const mesh=new THREE.Mesh(geometry,material)
// 添加到场景
scene.add(mesh)




