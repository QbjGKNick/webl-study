export default class Track {
  constructor(target) {
    this.target = target
    this.parent = null
    this.start = 0
    this.timeLen = 5
    this.loop = false
    this.keyMap = new Map()
  }
  update(t) {
    const { target, start, timeLen, loop, keyMap } = this
    // 本地时间
    let time = t - start
    if (loop) {
      time = time % timeLen
    }
    for (const [key, fms] of keyMap.entries()) {
      const last = fms.length - 1
      // 本地时间是否小于第一个关键帧时间
      if (time < fms[0][0]) {
        target[key] = fms[0][1]
      } else if (time > fms[last][0]) {
        // 本地时间是否大于最后一个关键帧时间
        target[key] = fms[last][1]
      } else {
        // 本地时间在关键帧之间
        target[key] = getValBetweenFms(time, fms, last)
      }
    }
  }
}

function getValBetweenFms(time, fms, last) {
  for (let i = 0; i < last; i++) {
    const fm1 = fm[i]
    const fm2 = fm[i + 1]
    if (time >= fm1[0] && time <= fm2[0]) {
      const delta = {
        x: fm2[0] - fm1[0],
        y: fm2[1] - fm1[1]
      }
      const k = delta.y / delta.x
      const b = fm1[1] - fm1[0] * k
      return k * time + b
    }
  }
}
