# Three.js 快速入门代码解析

这个文档解析了一个基础的 Three.js 场景的 Javascript 代码。

## 1. 引入必要的模块

```javascript
import * as THREE from 'three';
// 引入相机控件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

- `import * as THREE from 'three';`: 这行代码导入了 Three.js 库的核心功能，并将其命名为 `THREE`。之后我们可以通过 `THREE.名词` 的方式来访问库中的类和方法。
- `import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';`: 这行代码从 Three.js 的示例模块中导入了 `OrbitControls`。`OrbitControls` 是一个非常有用的相机控件，它允许用户通过鼠标来旋转、缩放和平移场景。

## 2. 初始化场景

```javascript
const scene = new THREE.Scene()
```

- `const scene = new THREE.Scene()`: 创建了一个新的场景对象。场景是所有 3D 对象的容器，比如模型、光源、相机等。

## 3. 创建模型

```javascript
// 模型
const geometry = new THREE.BoxGeometry(100, 100, 100)
// 材质
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 })
// 漫反射材质
const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
// 网格
const mesh = new THREE.Mesh(geometry, material)
// 设置网格模型在三维空间中的位置坐标，默认是在坐标原点
mesh.position.set(0, 10, 0)
// 把模型添加到场景
scene.add(mesh)
```

- `const geometry = new THREE.BoxGeometry(100, 100, 100)`: 创建了一个立方体的几何体（Geometry）。`BoxGeometry` 的参数分别代表立方体的宽度、高度和深度。
- `const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })`: 创建了一个材质（Material）。这里使用的是 `MeshLambertMaterial`，这是一种对光照有反应的材质，可以产生漫反射效果。`color: 0x00ffff` 设置材质的颜色为青色。
    - 被注释掉的 `MeshBasicMaterial` 是一种基础材质，它不受光照影响，通常用于测试或特殊效果。
- `const mesh = new THREE.Mesh(geometry, material)`: 将几何体和材质结合起来，创建了一个网格模型（Mesh）。网格模型是场景中实际可见的物体。
- `mesh.position.set(0, 10, 0)`: 设置了模型在场景中的位置。`set(x, y, z)` 方法将模型的中心点移动到指定的坐标。
- `scene.add(mesh)`: 将创建好的模型添加到场景中，这样它才能被渲染出来。

## 4. 创建坐标轴辅助器

```javascript
// 创建三维坐标轴
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)
```

- `const axesHelper = new THREE.AxesHelper(200)`: 创建了一个三维坐标轴辅助器。`AxesHelper` 可以帮助我们更好地理解场景中的方向和位置，参数 `200` 是坐标轴的长度。
- `scene.add(axesHelper)`: 将坐标轴辅助器添加到场景中。

## 5. 创建光源

```javascript
// 创建一个光源对象(点光源)
const pointLight = new THREE.PointLight(0x00ffff)
// 变更光照强度
pointLight.intensity = 3.0
// 控制光源衰减
pointLight.decay = 0.1
// 设置光源位置
pointLight.position.set(400, 700, 300)
// 设置光源距离
pointLight.distance = 30000
// 添加到场景
scene.add(pointLight)
```

- `const pointLight = new THREE.PointLight(0x00ffff)`: 创建了一个点光源（PointLight）。点光源从一个点向所有方向发射光线。参数 `0x00ffff` 是光源的颜色。
- `pointLight.intensity = 3.0`: 设置光源的强度。数值越大，光照越强。
- `pointLight.decay = 0.1`: 设置光源的衰减程度。光线会随着距离的增加而减弱，`decay` 值控制衰减的速度。
- `pointLight.position.set(400, 700, 300)`: 设置光源在场景中的位置。
- `pointLight.distance = 30000`: 设置光源的最大影响距离。超过这个距离的物体将不会受到该光源的影响。
- `scene.add(pointLight)`: 将点光源添加到场景中。

## 6. 创建相机

```javascript
const width = window.innerWidth
const height = window.innerHeight
// 创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)

camera.position.set(200, 200, 200)
// camera.position.set(-1000, 0, 0)

// 定义相机的观察目标(视线) 观察目标点的坐标
camera.lookAt(0, 0, 0) //坐标原点
// camera.lookAt(-2000, 0, 0)
// camera.lookAt(mesh.position)
```

- `const width = window.innerWidth`: 获取浏览器窗口的宽度。
- `const height = window.innerHeight`: 获取浏览器窗口的高度。
- `const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)`: 创建了一个透视投影相机（PerspectiveCamera）。
    - `50`: 视场角（Field of View, FOV），表示相机可以看到的范围，单位是度。
    - `width / height`: 宽高比（Aspect Ratio），通常设置为渲染区域的宽高比，以避免图像变形。
    - `1`: 近裁切面（Near Clipping Plane），相机能看到的最近距离。
    - `1000`: 远裁切面（Far Clipping Plane），相机能看到的最远距离。
- `camera.position.set(200, 200, 200)`: 设置相机在场景中的位置。
- `camera.lookAt(0, 0, 0)`: 设置相机的观察目标。`lookAt` 方法让相机始终朝向指定的坐标点。这里是朝向坐标原点 `(0,0,0)`。
    - 被注释掉的代码展示了如何让相机看向其他位置或特定模型。

## 7. 创建渲染器

```javascript
// 创建一个webGL渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height) //cavnvas画布宽高度
```

- `const renderer = new THREE.WebGLRenderer()`: 创建了一个 WebGL 渲染器。渲染器负责将场景和相机的信息计算出来，并将其绘制到 HTML 的 `<canvas>` 元素上。
- `renderer.setSize(width, height)`: 设置渲染器输出的 `<canvas>` 画布的尺寸，通常与浏览器窗口大小一致。

## 8. 渲染循环

```javascript
function render() {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()
```

- `function render() { ... }`: 定义了一个名为 `render` 的函数，这个函数是渲染循环的核心。
- `requestAnimationFrame(render)`: `requestAnimationFrame` 是浏览器提供的一个 API，它会在下一次浏览器重绘之前调用指定的函数。通过递归调用 `render` 函数，可以实现持续的动画效果。
- `renderer.render(scene, camera)`: 这是实际执行渲染操作的命令。它告诉渲染器使用指定的相机来渲染指定的场景。
- `render()`: 首次调用 `render` 函数，启动渲染循环。

## 9. 将渲染结果添加到页面

```javascript
// 把渲染结果canvas画布，也就是所谓的照片，添加到网页页面上
document.body.appendChild(renderer.domElement) //将渲染器添加到body中
```

- `document.body.appendChild(renderer.domElement)`: `renderer.domElement` 是渲染器创建的 `<canvas>` 元素。这行代码将这个 `<canvas>` 元素添加到 HTML 页面的 `<body>` 标签中，从而在网页上显示渲染结果。

## 10. 创建相机控件

```javascript
// 创建相机控件对象
const controls = new OrbitControls(camera, renderer.domElement)
```

- `const controls = new OrbitControls(camera, renderer.domElement)`: 创建了一个 `OrbitControls` 的实例。
    - `camera`: 需要控制的相机对象。
    - `renderer.domElement`: 用于监听鼠标事件的 HTML 元素，通常是渲染器的 `<canvas>`。
- 创建控件后，用户就可以通过鼠标交互来控制相机的视角了。`OrbitControls` 会自动监听鼠标事件并在 `render` 循环中更新相机状态，因此不需要在 `render` 函数中显式调用 `controls.update()` (虽然在某些旧版本或特定情况下可能需要)。







