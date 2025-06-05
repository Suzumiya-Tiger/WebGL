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



