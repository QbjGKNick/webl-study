function Ball(x, y, radius, color) {
  // 小球中心的x坐标，默认值为0
  this.x = x || 0
  // 小球中心的y坐标，默认值为0
  this.y = y || 0
  // 小球半径，默认值为12
  this.radius = radius || 12
  // 小球颜色，默认值为“#6699FF”
  this.color = color || '#6699FF'

  this.scaleX = 1
  this.scaleY = 1
  this.rotation = 0
}
Ball.prototype = {
  // 绘制“描边”小球
  stroke: function (cxt) {
    cxt.save()
    cxt.scale(this.scaleX, this.scaleY)
    cxt.strokeStyle = this.color
    cxt.beginPath()
    cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false)
    cxt.closePath()
    cxt.stroke()
    cxt.restore()
  },
  // 绘制填充小球
  fill: function (cxt) {
    cxt.save()
    cxt.translate(this.x, this.y)
    cxt.rotate(this.rotation)
    cxt.scale(this.scaleX, this.scaleY)
    cxt.fillStyle = this.color
    cxt.beginPath()
    cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false)
    cxt.closePath()
    cxt.fill()
    cxt.restore()
  },
  // 获取小球的外接矩形
  getRect: function () {
    var rect = {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    }
    return rect
  },
  // 检测是否捕获到小球
  checkMouse: function (mouse) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < this.radius) return true
    return false
  }
}
