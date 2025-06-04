import * as THREE from 'three';


const geometry = new THREE.BoxGeometry(50, 50, 50)
const material = new THREE.MeshLambertMaterial(
  {
    color: 0xffff00
  }
)



const mesh = new THREE.Mesh(geometry, material)


const color = new THREE.Color()
// color.setRGB(0, 1, 0)

// setRGB的简写
// color.set(0xff0000)

// console.log('color', color);

// material.color.set(0x00ff00)
material.color.set('rgb(0,0,255)')



export default mesh;
