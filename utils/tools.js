// 将tools定义为window对象的属性，该属性的值是一个对象
window.tools = {}
window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60)
  }
// 获取鼠标位置
window.tools.getMouse = function (element) {
  // 定义一个mouse对象
  var mouse = { x: 0, y: 0 }
  // 为传入的元素添加mousemove事件
  addEvent(element, 'mousemove', function (e) {
    var x, y
    // 在IE中，event对象是作为window对象的一个属性存在
    var e = e || window.event
    // 获取鼠标当前位置，并作兼容处理
    // 兼容Firefox、Chrome、IE9及以上
    if (e.pageX || e.pageY) {
      x = e.pageX
      y = e.pageY
    } else {
      // 兼容IE8及以下，以及混杂模式下的Chrome和Safari
      x =
        e.clientX + document.body.scrollLeft ||
        document.documentElement.scrollLeft
      y =
        e.clientY + document.body.scrollTop ||
        document.documentElement.scrollTop
    }
    // 将当前的坐标值减去canvas元素的偏移位置，则x、y为鼠标在canvas中的相对坐标
    x -= element.offsetLeft
    y -= element.offsetTop

    mouse.x = x
    mouse.y = y
  })
  // 返回值为mouse对象
  return mouse
}

window.tools.getKey = function () {
  var key = {}
  window.addEventListener(
    'keydown',
    function (e) {
      if (e.keyCode === 38 || e.keyCode === 87) {
        key.direction = 'up'
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        key.direction = 'right'
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        key.direction = 'down'
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        key.direction = 'left'
      } else {
        key.direction = ''
      }
    },
    false
  )
  return key
}

// 设置随机color
window.tools.getRandomColor = function () {
  return (
    '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
        color.length === 6
        ? color
        : arguments.callee(color)
    })('')
  )
}

// 两个矩形碰撞检测：两个矩形左上角的坐标所处的范围
window.tools.checkRect = function (rectA, rectB) {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  )
}

// 两个圆碰撞检测：两个圆心之间的距离
window.tools.checkCircle = function (circleB, circleA) {
  const dx = circleB.x - circleA.x
  const dy = circleB.y - circleA.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  if (distance < circleA.radius + circleB.radius) {
    return true
  }
  return false
}

function addEvent(to, type, fn) {
  if (document.addEventListener) {
    to.addEventListener(type, fn, false)
  } else if (document.attachEvent) {
    to.attachEvent('on' + type, fn)
  } else {
    to['on' + type] = fn
  }
}
