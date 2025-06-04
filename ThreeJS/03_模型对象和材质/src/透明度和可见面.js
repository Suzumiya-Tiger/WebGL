import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial(
  {
    color: 0xffff00
  }
)
// 必须设置transparent为true，否则单独设置opacity无法显示
material.transparent = true
material.opacity = 0.5

// 设置双面渲染
material.side=THREE.DoubleSide
// 不同的side对应的是一个数字，打印即可知道
const mesh = new THREE.Mesh(geometry, material)

export default mesh;
