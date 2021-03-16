## canvas动画循环注意事项：
- 对于需要不断改变的变量，一般在动画循环之前先定义；
- 对于需要不断改变的变量，一般在动画循环中图形绘制之后才递增或递减

## 对于canvas多物体运动一般按如下三个步骤处理：
- 定义一个数组来存放多个物体；
- 使用for循环生成单个物体，然后添加到数组中；
- 在动画循环中，使用forEach()方法遍历数组，从而处理单个物体。

## 碰撞检测比较常用的两种方法：
- 外接矩形判定法
- 外接圆判定法

## canvas中想要拖曳一个物体，需要三个步骤

- 捕获物体：在鼠标按下（mousedown）时，判断鼠标坐标是否落在物体上面，如果落在，就添加两个事件：mousemove 和 mouseup。
- 移动物体：在鼠标移动（mousemove）中，更新物体坐标为鼠标坐标。
- 松开物体：在鼠标松开（mouseup）时，移除mouseup事件（自身事件也得移除）和 mousemove事件

## 在canvas中，想要实现缓动动画，一般需要5个步骤

- 定义一个0~1之间的缓动系数easing
- 计算出物体与终点之间的距离
- 计算出当前速度，其中当前速度 = 距离 * 缓动系数
- 计算新的位置，其中新的位置 = 当前位置 + 当前速度
- 重复执行第2~4步，直到物体达到目标

```语法：```
```js
let targetX = 任意位置;
let targetY = 任意位置;
// 动画循环
let vx = (targetX - object.x) * easing;
let vy = (targetY - object.y) * easing;
```

## 缓动动画应用

### 缓动动画的实现思路，一般就两个步骤
- 当前速度 = (最终值 - 当前值) * 缓动系数
- 新的值 = 当前值 + 当前速度

### 缓动动画和弹性动画
  #### 共同点
  - 需要设置一个终点
  - 需要确定物体到达终点的距离
  - 运动和距离是成正比的
  #### 不同点
  - 在缓动动画中，跟距离成正比的是“速度”。
  - 在弹性动画中，跟距离成正比的是“加速度”。

```语法```
```js
ax = (targetX - object.x) * spring;
ay = (targetY - object.y) * spring;
vx += ax;
vy += ay;
vx *= friction;
vy *= friction;
object.x += vx;
object.y += vy;
```

# Canvas游戏开发

## 引擎

- Box2DWeb
  - 一般用于物理场景
- Cocos2d-JS (原生JS)
  - 可发布到web平台,ios,Android,Windows Phone8,Mac,Windows等平台
  - 易于使用、高效、灵活、免费、社区支持
- Egret (TypeScript)
  - 遵循HTML5标准的2D、3D引擎，解决了HTML5性能问题及碎片化问题
  - 极强的跨平台运行能力
  - 具有多平台渠道功能一键接入、极高的项目开发效率、完整的游戏开发工作流程以及极强的跨平台支持

- LayaAir
  - 性能最佳，号称“H5游戏引擎性能之王”，裸跑性能堪比APP
  - 支持2D、3D、VR开发，支持多语言（JavaScript、ActionScript、TypeScript）

- Lufylegend
  - 使用简单，采用仿ActionScript语法，性能优秀、中文API齐全