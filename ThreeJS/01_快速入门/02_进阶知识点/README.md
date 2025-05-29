# 🔦 光源作用原理讲解

![image-20250521233628193](/Users/heinrichhu/前端项目/WebGL/ThreeJS/01_快速入门/02_进阶知识点/README.assets/image-20250521233628193.png)

光源大体有四种类型，点光源，环境光，平行光和聚光灯光源。

## 点光源

#### **✅ 概念：**

模拟灯泡或火把等点状光源，从一点向四周发散。

#### **✅ 特点：**

- 位置决定光源中心。
- 会随距离衰减（受 distance 和 decay 控制）。
- 越远强度越小。

```JS
pointLight.intensity = 3.0
pointLight.decay = 0.1
pointLight.position.set(400, 200, 300)
```

这个光源位于空间中一点，它照向所有方向，靠近模型时能明显看到局部的亮处。

### 点光源辅助观察

通过点光源辅助观察对象PointLightHelper可视化点光源。 

```typescript
// 创建一个辅助光源对象
const pointlighthelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointlighthelper)

```

![image-20250521233220718](/Users/heinrichhu/前端项目/WebGL/ThreeJS/01_快速入门/02_进阶知识点/README.assets/image-20250521233220718.png)







## 环境光

#### **✅ 概念：**

模拟环境中的散射光（如天空光、反弹光），是无方向的光照，照亮场景中的每个角落。

#### **✅ 特点：**

- 不产生阴影。
- 不考虑方向和位置。
- 主要用于“填光”，防止未被其他光照到的地方完全黑暗。

```typescript
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
```

提供基础照明，防止模型背光面全黑。

![image-20250521233446301](/Users/heinrichhu/前端项目/WebGL/ThreeJS/01_快速入门/02_进阶知识点/README.assets/image-20250521233446301.png)

环境光是均匀且没有方向的，它会在物体上均匀地发亮。





## 平行光

#### **✅ 概念：**

模拟来自无限远的光，如阳光。所有光线方向一致，不考虑距离衰减。

#### **✅ 特点：**

- 适合大范围均匀照明。
- 光照方向由 .position 与 .target 决定，而不是 position 本身。
- 没有 distance 和 decay 参数。

#### ✅ 你代码中的用法：

```typescript
directionalLight.position.set(80, 100, 50)
directionalLight.target = mesh
```

代表“阳光从 (80,100,50) 的方向照向 mesh 模型”。



## **📐 图示讲解：光线入射角与反射规律（结合漫反射）**

你提供的图中，解释了两种反射模型：

![image-20250521235024582](/Users/heinrichhu/前端项目/WebGL/ThreeJS/01_快速入门/02_进阶知识点/README.assets/image-20250521235024582.png)

### 🌫️ 漫反射（图左）Diffuse Reflection

- **入射光**（蓝色箭头）照射到表面。
- 与法线构成 **入射角 θ**。
- **漫反射**不会朝一个方向反射，而是**沿着法线方向在半球面内均匀反射**。
- **入射角越小（光越垂直照射表面）→ 表面越亮。**

在 Three.js 中，MeshLambertMaterial 模拟的正是**漫反射**：

```typescript
const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })
```

所以，**物体表面朝向光线越正，亮度越高；越偏离光源方向，越暗。**

### 🔄 镜面反射（图右）Specular Reflection

- 典型于镜面、金属表面。
- 反射角 = 入射角，能看到明确的高光。
- 在 Three.js 中由 MeshPhongMaterial 模拟。



## **✅ 总结对应关系**



| **光源类型** | **模拟场景** | **会衰减** | **会投影** | **常配合材质**     |
| ------------ | ------------ | ---------- | ---------- | ------------------ |
| AmbientLight | 环境反弹光   | ❌          | ❌          | 所有光照材质       |
| PointLight   | 灯泡/手电    | ✅          | ✅          | MeshLambert, Phong |
| Directional  | 阳光         | ❌          | ✅          | MeshLambert, Phong |







# 动画循环渲染

requestAnimationFrame() 是浏览器提供的一个 **动画刷新函数**，它的作用是告诉浏览器：“请你在**下次重绘之前**调用我提供的这个函数”。

不断地刷新画面（例如更新模型、摄像机视角、动画等），达到 **流畅实时渲染** 的效果。

在你代码中的这句：

```js
function render() {
  requestAnimationFrame(render);   // 递归地请求下一帧
  renderer.render(scene, camera);  // 执行一帧的渲染
}
```

表示每当浏览器准备好要渲染下一帧的时候，就会自动再次调用 render()，形成一个**循环动画帧渲染机制**。

### **✅ 相比** setInterval的优势

| **特性** | requestAnimationFrame()            | setInterval()            |
| -------- | ---------------------------------- | ------------------------ |
| 帧率控制 | 自动同步浏览器刷新率（通常 60fps） | 固定时间，不与浏览器同步 |
| 节能性   | 页面不在前台时会暂停，省电省资源   | 页面在后台也继续运行     |
| 平滑动画 | 是浏览器原生的动画渲染推荐方式     | 容易卡顿/撕裂            |

你可以把 requestAnimationFrame(render) 想象成：

> “浏览器啊，我想在每一帧都自动执行这个 render() 函数，来渲染场景动画，直到你说停。”

它是 Three.js 中动画循环、交互实时更新、摄像机控制等功能的**基础机制**。几乎所有 Three.js 的项目都会用它来驱动主渲染循环。

```js
// 创建一个时钟对象
const clock = new THREE.Clock()
function render() {
  // 获取时间间隔,使用毫秒作为单位
  const spt = clock.getDelta() * 1000
  // 获取时间间隔
  console.log('spt', spt);
  // 获取帧率
  console.log('渲染帧率', 1000 / spt);


  requestAnimationFrame(render)
  // 周期性旋转，每次旋转0.01个弧度
  mesh.rotateY(0.01)
  // 周期性执行渲染功能，更新canvas画布上的内容
  renderer.render(scene, camera)
}
render()
```

## canvas画布宽高动态变化

canvas画布宽高动态变化，需要动态更新相机和渲染的参数，否则无法重新渲染。

```js
// onresize事件会在窗口被调整大小时发生
window.onresize = function () {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏状况下:设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 渲染器执行render方法的时候，会读取相机对象的投影矩阵属性
  // 但是不会每渲染一帧就通过相机的属性计算投影矩阵(节约计算资源)
  // 如果相机的一些属性发生了变化，需要执行updateprojectionmatrix方法更新投影矩阵
  camera.updateProjectionMatrix()
}
```

这段代码是为了处理 **浏览器窗口大小发生变化时的响应更新逻辑**，也就是让你的 Three.js 场景在全屏、自适应窗口时仍然保持正确的比例和尺寸，不会变形或拉伸。

```js
  renderer.setSize(window.innerWidth, window.innerHeight)
```

- 重新设置 Three.js 渲染器（底层的 canvas）的尺寸，适配当前窗口的新宽度和高度。
- renderer.setSize() 会调整 canvas 元素的尺寸，从而确保图像不会拉伸或模糊。

```js
  camera.aspect = window.innerWidth / window.innerHeight
```

- 修改相机的 aspect（宽高比），它是透视投影中很重要的参数。
- 如果你不更新这个值，相机会继续以旧的宽高比进行渲染，导致画面变形（比如拉长或压扁）。

```js
  camera.updateProjectionMatrix()
```

- 这一句是关键！
- 虽然你更改了 camera.aspect，**但 Three.js 不会立刻帮你重新计算投影矩阵**（为了优化性能）。
- 所以你要手动调用 .updateProjectionMatrix()，告诉 Three.js 现在相机属性变了，需要刷新它的投影矩阵。



### **🎯 总结一行话**



> 这段代码是为了**在窗口尺寸变化时，保持 canvas 和相机投影比例同步**，从而保证渲染内容不变形，是 Three.js 自适应窗口的标准写法。



## Stats的使用

```js
// 创建Stats对象
const stats = new Stats()
// stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement)
// 渲染函数
function render() {
  // requestAnimationframe循环调用的函数中调用update()来刷新时间
  stats.update()
  // 执行渲染操作
  renderer.render(scene, camera)
  // 请求再次执行渲染函数render，渲染下一帧
  requestAnimationFrame(render)
}
render()
```

这段代码的作用是：**在网页上实时显示当前的渲染性能（如帧率 FPS）并不断刷新场景画面**，它使用了 stats.js 性能监视器配合 requestAnimationFrame() 实现动画循环渲染。

### **🔧 核心功能概述**

- 使用 Stats 创建一个性能监控器实例，它会在页面上显示一个小面板（通常位于左上角），展示当前帧率（FPS）、渲染时间等信息。

- 把 stats.domElement（其实是一个 <div> 元素）添加到网页上，这样就能看到性能面板。

- 定义一个 render() 函数，这就是主渲染循环：

  

  - 每一帧调用 stats.update() 来刷新性能数据；
  - 然后用 renderer.render(scene, camera) 把当前的 3D 场景画到 canvas 上；
  - 最后用 requestAnimationFrame(render) 注册下一帧的执行，从而形成**无限循环**，大概每秒执行 60 次（与浏览器刷新率同步）。

### **✅ 总结一句话**

这段代码实现了一个 **实时动画循环 + 性能监控** 的渲染系统，它每一帧都会：

> 更新性能面板 → 渲染场景 → 请求下一帧 → 周而复始。

这是开发 Three.js 应用时非常常见的一种结构，便于调试性能和持续更新画面。













