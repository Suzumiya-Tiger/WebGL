# Three.js 中的组对象（`THREE.Group`）详解

下面基于你的示例代码，逐步讲解如何使用 `THREE.Group` 来组织多个网格，并演示如何通过对组进行统一变换来影响所有子对象。

---

## 示例代码回顾

```js
import * as THREE from 'three'

// 1. 创建一个立方体几何体和漫反射材质
const geometry = new THREE.BoxGeometry(20, 20, 20)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
})

// 2. 用同一份几何与材质实例化两个 Mesh 对象
const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)
//    将第二个立方体沿 X 轴平移 50 单位
mesh2.translateX(50)

// 3. 创建一个组对象（Group），并把两个 Mesh 添加到该组里
const group = new THREE.Group()
group.add(mesh1)
group.add(mesh2)

// 4. 对组进行统一变换：平移、缩放、旋转
//    这些变换会作用到组下所有子对象（即 mesh1、mesh2）
group.position.set(50, 50, 50)
group.scale.set(2, 2, 2)
group.rotation.set(Math.PI/4, Math.PI/4, Math.PI/4)

console.log('group.children', group.children)

export default group
```

## 一、什么是 `THREE.Group`？

1. **定义与作用**
   - **`THREE.Group` 是 Three.js 里一个专门用来组织、管理子对象的容器。**
   - 它继承自 `THREE.Object3D`，可当成一个“虚拟”节点，把若干个 `Mesh`、`Camera`、`Light` 或者其他 `Object3D` 对象挂到它下面。
2. **为什么需要 Group？**
   - **统一控制**：对组做平移、缩放、旋转等变换时，所有子对象会自动跟随，无须每个子对象都单独设置。
   - **逻辑分组**：将场景按功能或层次划分为多个子集，便于管理、切换可见性、执行批量操作。
   - **层次结构**：Three.js 的渲染与变换都基于“**场景图**”（Scene Graph），Group 正是构建场景图的重要构件。

------

## 二、示例中 Group 的使用

### 1. 实例化两个立方体网格

```typescript
const geometry = new THREE.BoxGeometry(20, 20, 20)
const material = new THREE.MeshLambertMaterial({ color: 0x00ffff })

const mesh1 = new THREE.Mesh(geometry, material)
const mesh2 = new THREE.Mesh(geometry, material)

// 把第二个立方体沿 X 轴移动 50 单位
mesh2.translateX(50)

```

`mesh1` 和 `mesh2` 都共享同一个几何体（`geometry`）和同一个材质（`material`）。

一开始，两个立方体都是在 `(0,0,0)` 位置上，调用 `mesh2.translateX(50)` 后，`mesh2` 的本地坐标就变为 `(50, 0, 0)`，而 `mesh1` 仍在 `(0,0,0)`。

### 2. 创建组对象并添加子对象

```js
// 创建一个空的 Group
const group = new THREE.Group()

// 把两个立方体添加到 group 下
group.add(mesh1)
group.add(mesh2)

```

当我们把 **Group** 平移到 `(50,50,50)`，**mesh1** 和 **mesh2** 的世界坐标就会同时被整体平移：

- `mesh1` 原先世界坐标 `(0,0,0)` → 现在变为 `(50,50,50)`
- `mesh2` 原先世界坐标 `(50,0,0)` → 现在变为 `(50,50,50) + (50,0,0) = (100,50,50)`

**缩放 2 倍**：

- `mesh1` 原先相对于 group 的本地坐标是 `(0,0,0)` → 缩放不影响原点。
- `mesh2` 原先本地坐标 `(50,0,0)` → 缩放后变成 `(100,0,0)`，因为父级缩放系数 ×2。
- 叠加平移后：`mesh2` 世界坐标 → `(50,50,50) + (100,0,0) = (150,50,50)`

**旋转**：

- 旋转操作会围绕**Group 的本地原点**进行。
- 比如 `mesh2` 在 group 本地坐标 `(100,0,0)`（经过前面那两步变换后仍是本地坐标计算顺序），绕 X、Y、Z 每个轴旋转 45°，最终得到新的方向。
- 由于旋转比较复杂，这里不做具体数值展开，但可理解为：**Group 的旋转会同时影响到它所有的子 Mesh**。



## 三、Group 对象的常见用法与注意事项

### 1. 逻辑分组

- 如果场景里有多个“小车”，每个小车又由车身、车轮、车灯等多个 Mesh 组成，可以用一个 `Group` 把它们包起来：

  ```js
  const carGroup = new THREE.Group();
  carGroup.add(carBody, wheelFL, wheelFR, wheelBL, wheelBR, headlightL, headlightR);
  scene.add(carGroup);
  ```

- 这样，移动 `carGroup.position.set(x,y,z)`、旋转或缩放，都能一次性作用到整辆“车”的所有部件上。

### 2. 嵌套 Group

- `Group` 也是 `Object3D`，可以嵌套使用。

- 例如，一个“机器人”由“身体组”和“手臂组”构成，`手臂组` 下又有“上臂”、“下臂”、“手掌”等子节点。

- 嵌套结构示意：

  ```text
  RobotGroup
  ├── BodyMesh
  ├── ArmGroup_Left
  │     ├── UpperArmMesh
  │     ├── ForearmMesh
  │     └── HandMesh
  └── ArmGroup_Right
        ├── UpperArmMesh
        ├── ForearmMesh
        └── HandMesh
  ```

- 这时，你可以分别对左右手臂组做旋转来模拟挥手动作，而整体机器人依旧可以全局移动/旋转/缩放。

### 3. 坐标变换的累积顺序

- **变换顺序** 对最终结果很重要：

  ```js
  group.position.set(px, py, pz)
  group.scale.set(sx, sy, sz)
  group.rotation.set(rx, ry, rz)
  ```

  Three.js 的内部顺序是：**先缩放，再旋转，最后平移**。

- 如果先旋转再缩放，可能得到与期望不同的效果，尤其在非各向同性缩放（不同轴缩放不同系数）时更需注意。

### 4. Billboards 与透明度

- 有时你想让某个平面始终面向相机（比如 HUD 元素或贴图标语牌），可在 `Group` 下管理它们，并在渲染循环中动态对其旋转。
- `Group` 也常用于统一管理透明对象的渲染顺序（例如先对一个组设置 `renderOrder` 再添加子节点）。

------

## 四、小结

- **`THREE.Group`** 是一个没有几何显示本身、仅用于承载子对象的容器。
- 通过 `group.add(child)` 将任意 `Object3D`（如 `Mesh`、`Light`、`Camera` 均可）添加到组下。
- **统一变换**：对组做 `position/scale/rotation`，会同时影响到它所有的子节点，把多个对象当成一个整体来操作非常方便。
- **层次场景图**：Three.js 基于“场景图”概念，合理利用 `Group` 构建层次，可简化复杂场景的管理与交互逻辑。

掌握了 Group 的用法之后，你就可以更灵活地组织 Three.js 场景层次，实现复杂的分组动画与交互控制。





# 局部坐标和世界坐标

```js
import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(50,50,50)


const material=new THREE.MeshLambertMaterial({
  color:0x00ffff,
})
const mesh=new THREE.Mesh(geometry,material)
geometry.translate(50/2,0,0)
 mesh.rotateY(Math.PI/4)
export default mesh 
```

### 1. 核心概念：两种坐标系

- 世界坐标系 (World Coordinates)：这是整个 3D 场景的“全局”坐标系。它只有一个，是所有物体、摄像机、光源的最终参考标准。你可以把它想象成你房间的地板和墙角，所有家具的最终位置都是根据这个房间来描述的。

- 局部坐标系 (Local Coordinates)：场景中的每一个物体（比如你的 mesh）都有自己独立的坐标系。这个坐标系的原点 (0,0,0) 通常就是物体的几何中心。你可以把它想象成一个盒子，它有自己的中心点，无论你怎么移动或旋转这个盒子，它内部的东西相对于它自己中心点的位置是不变的。

### 2. 代码分步解析

我们一步步来看你的代码里发生了什么：

```js
const geometry = new THREE.BoxGeometry(50, 50, 50);
```

发生了什么: 这行代码创建了一个 50x50x50 的立方体几何数据。在它自己的局部坐标系里，它的中心点在 (0,0,0)，顶点坐标范围从 (-25, -25, -25) 到 (25, 25, 25)。

```typescript
// 2. 创建网格（物体）
const mesh = new THREE.Mesh(geometry, material);
```

发生了什么: 这行代码创建了一个Mesh（网格）对象。可以把 Mesh 理解为一个“容器”或者“骨架”，它把 geometry（形状）和 material（皮肤）结合起来，变成一个可以被放置到场景里的真实物体。

此时，mesh 的局部坐标系原点和 geometry 的局部坐标系原点是重合的。mesh 的旋转、缩放、位移等操作，都会以这个点为轴心。现在，这个轴心在立方体的正中心。

```typescript
// 3. 平移几何体
geometry.translate(50 / 2, 0, 0); // 或者 geometry.translate(25, 0, 0)
```

- 这是关键的一步！

- 发生了什么: **geometry.translate() 修改的是几何体顶点数据本身。它将所有顶点在几何体自己的局部坐标系里进行了移动。**

- 你把所有顶点沿 X 轴正方向移动了 25 个单位。原来在 (-25, ...) 的顶点现在跑到了 (0, ...)，原来在 (25, ...) 的顶点跑到了 (50, ...)。

- 重要效果: mesh 的轴心（它的局部坐标系原点）没有动，但 geometry（立方体的“肉”）相对于这个轴心移动了。现在，mesh 的轴心位于立方体的一个侧面（原来-X方向的那个面）的中心。

```js
// 4. 旋转网格
mesh.rotateY(Math.PI / 4);
```

- 发生了什么: mesh.rotateY() 是对 Mesh 对象进行的操作。它让 mesh 绕着它自己的Y轴进行旋转。

- 因为上一步的操作，mesh 的旋转轴心已经不在立方体的几何中心了，而是在它的侧面上。所以，你看到的旋转效果是，这个立方体绕着它的一条边（更准确地说是侧面中心）在“甩动”或“公转”。

### 总结与对比

- geometry.translate(): 改变“肉”相对于“骨架”的位置。操作的是几何体顶点数据，改变的是几何体在自己局部坐标系里的位置。这会直接影响物体的旋转轴心。

- mesh.position.set(): 改变“骨架”在世界中的位置。操作的是Mesh对象，改变的是物体局部坐标系在世界坐标系（或父对象坐标系）里的位置。如果用 mesh.position.x = 25 来代替 geometry.translate(25, 0, 0)，那么物体的轴心依然在几何中心，整个物体会被平移到世界坐标的 (25, 0, 0) 位置，然后绕着自己的中心旋转。

简单来说，你的代码实现了一个“先移动几何体，再以原点为轴心旋转”的效果，这就造成了物体绕着自己的侧面旋转的现象。这在需要自定义物体旋转轴的场景中非常有用。
