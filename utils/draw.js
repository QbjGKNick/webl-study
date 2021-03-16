/**
 * 绘制正多边形
 * @param {*} cxt canvas上下文
 * @param {*} n n边形
 * @param {*} dx 表示n边形中心横坐标
 * @param {*} dy 表示n边形中心纵坐标
 * @param {*} size 表示n边形的大小
 */
function createPolygon(cxt, n, dx, dy, size) {
  cxt.beginPath()
  const degree = (2 * Math.PI) / n
  for (let i = 0; i < n; ++i) {
    const x = Math.cos(i * degree)
    const y = Math.sin(i * degree)
    cxt.lineTo(x * size + dx, y * size + dy)
  }
  cxt.closePath()
}
/**
 * 绘制五角星
 * @param {*} cxt
 */
function createFivePointedStar(cxt) {
  cxt.beginPath()
  for (let i = 0; i < 5; i++) {
    cxt.lineTo(
      Math.cos(((18 + i * 72) * Math.PI) / 180) * 50 + 100,
      -Math.sin(((18 + i * 72) * Math.PI) / 180) * 50 + 100
    )
    cxt.lineTo(
      Math.cos(((54 + i * 72) * Math.PI) / 180) * 25 + 100,
      -Math.sin(((54 + i * 72) * Math.PI) / 180) * 25 + 100
    )
  }
  cxt.closePath()
}

/**
 * 绘制调色板
 * @param {*} cxt
 * @param {*} type 方格调色板（checkerboard）| 渐变调色板 gradient
 */
function drawPalette(cxt, type) {
  if (type) type = 'checkerboard'
  // 方格调色板
  if (type === 'checkerboard') {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        cxt.fillStyle = `${Math.floor(255 - 42.5 * i)}, ${Math.floor(
          255 - 42.5 * j
        )}, 0`
        cxt.fillRect(j * 25, i * 25, 25, 25)
      }
    }
  } else {
    // 渐变调色板
    let r = 255,
      g = 0,
      b = 0
    for (let i = 0; i < 150; i++) {
      if (i < 25) {
        g += 10
      } else if (i >= 25 && i < 50) {
        r -= 10
      } else if (i >= 50 && i < 75) {
        g -= 10
        b += 10
      } else if (i >= 75 && i < 100) {
        r += 10
      } else {
        b -= 10
      }
      cxt.fillStyle = `rgb(${r}, ${g}, ${b})`
      cxt.fillRect(3 * i, 0, 3, canvas.height)
    }
  }
}

// 画圆
function drawCircle(cxt) {
  cxt.beginPath()
  // cxt.arc(x, y, 半径, 开始角度, 结束角度, true逆时针绘制|false顺时针绘制)
  cxt.arc(100, 100, 50, 0, 2 * Math.PI, false)
  cxt.closePath()

  // 描边
  cxt.strokeStyle = 'HotPink'
  cxt.stroke()
  // 填充
  cxt.fillStyle = '#99667F'
  cxt.fill()
}

// 绘制弧线 (arc | arcTo) 绘制
function drawArc(cxt) {
  cxt.beginPath()
  cxt.arc(100, 100, 50, 0, (-180 * Math.PI) / 180, true)
  cxt.stroke()
}

function drawArcTo(cxt) {
  // cxt.arcTo(cx, cy, x2, y2, radius) cx,cy 表示控制点的坐标 x2,y2表示结束点的坐标 radius表示圆弧的半径
  // arcTo()方法利用“开始点”“控制点”和“结束点”这三个点所形成的的夹角，然后绘制一段与夹角的两边相切并且半径为radius的圆弧
  // cxt.moveTo(20, 20)
  cxt.moveTo(70, 20)
  cxt.arcTo(120, 20, 120, 70, 50)
  cxt.lineTo(120, 120)
  cxt.stroke()
}

/**
 * 绘制圆角矩形
 * @param {*} cxt
 * @param {*} width 矩形长
 * @param {*} height 矩形宽
 * @param {*} r 圆角半径
 * @param {*} offsetX 矩形左上角顶点横坐标
 * @param {*} offsetY 矩形左上角顶点纵坐标
 */
function createRoundedRect(cxt, width, height, r, offsetX, offsetY) {
  cxt.beginPath()
  cxt.moveTo(offsetX + r, offsetY)
  cxt.lineTo(offsetX + width - r, offsetY)
  cxt.arcTo(offsetX + width, offsetY, offsetX + width, offsetY + r, r)
  cxt.lineTo(offsetX + width, offsetY + height - r)
  cxt.arcTo(
    offsetX + width,
    offsetY + height,
    offsetX + width - r,
    offsetY + height,
    r
  )
  cxt.lineTo(offsetX + r, offsetY + height)
  cxt.arcTo(offsetX, offsetY + height, offsetX, offsetY + height - r, r)
  cxt.lineTo(offsetX, offsetY + r)
  cxt.arcTo(offsetX, offsetY, offsetX + r, offsetY, r)
  cxt.closePath()
}

/**
 * 绘制二次贝塞尔曲线 cx,cy表示控制点坐标 x1,y1表示开始点坐标 x2,y2表示结束点坐标
 * @param {*} cxt
 * @param {*} cx
 * @param {*} cy
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
function drawQuadraticCurve(cxt, cx, cy, x1, y1, x2, y2) {
  cxt.moveTo(x1, y1)
  // cxt.quadraticCurveTo(cx, cy, x2, y2) cx,cy表示控制点坐标 x2,y2表示结束点坐标
  cxt.quadraticCurveTo(cx, cy, x2, y2)
}

// 绘制三次贝塞尔曲线 cx1,cy1表示控制点1坐标 cx2,cy2表示控制点2坐标 startX,startY表示开始坐标 endX,endY表示结束点坐标
function drawBezierCurve(cxt, cx1, cy1, cx2, cy2, startX, startY, endX, endY) {
  cxt.moveTo(startX, startY)
  cxt.bezierCurveTo(cx1, cy1, cx2, cy2, endX, endY)
  cxt.stroke()
}

/**
 * 用于绘制N叶草
 * @param {*} cxt
 * @param {*} n n片
 * @param {*} dx 叶子中心点横坐标
 * @param {*} dy 叶子中心点纵坐标
 * @param {*} size 控制叶子的大小
 * @param {*} length 控制叶子的长度
 */
function createLeaf(cxt, n, dx, dy, size, length) {
  cxt.beginPath()
  cxt.moveTo(dx, dy + size)
  const degree = (2 * Math.PI) / n
  for (let i = 0; i < n + 1; i++) {
    // 计算控制点的坐标
    const cx1 = Math.sin((i - 1) * degree) * length + dx
    const cy1 = Math.cos((i - 1) * degree) * length + dy
    const cx2 = Math.sin(i * degree) * length + dx
    const cy2 = Math.cos(i * degree) * length + dy
    // 计算结束点坐标
    const x = Math.sin(i * degree) * size + dx
    const y = Math.cos(i * degree) * size + dy
    cxt.bezierCurveTo(cx1, cy1, cx2, cy2, x, y)
  }
  cxt.closePath()
}

// 中心坐标（x,y）半径r 开始角度angle1 结束角度angle2
function createSector(cxt, x, y, r, angle1, angle2) {
  cxt.beginPath()
  cxt.moveTo(x, y)
  cxt.arc(x, y, r, (angle1 * Math.PI) / 180, (angle2 * Math.PI) / 180, false)
  cxt.closePath()
}

// cxt.transform(a, b, c, d, e, f)
/**
 * a: 水平缩放绘图
 * b: 水平倾斜绘图
 * c: 垂直倾斜绘图
 * d: 垂直缩放绘图
 * e: 水平移动绘图
 * f: 垂直移动绘图
 *
 * transform(a, b, c, d, e, f) 各变量对应矩阵中相应位置
 *  a c e
 *  b d f
 *  0 0 1
 */
