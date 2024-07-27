// immediate 标明首次调用是否立即执行
export const throttle = function (func, wait, immediate = true) {
  let timeStamp = 0
  let timer = null
  const throttleFunc = function () {
    if (new Date().getTime() - timeStamp < wait) { return }
    timeStamp = new Date().getTime()
    if (immediate) {
      func.apply(this, arguments)
    } else {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
  throttleFunc.cancel = function () {
    clearTimeout(timer)
    timer = null
    timeStamp = 0
  }
  return throttleFunc
}
