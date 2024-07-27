// 防抖
export const debounce = function (func, wait = 1000, immediate = false) {
  let timer = null
  const debounceFunc = function () {
    if (immediate) {
      if (!timer) {
        func.apply(this, arguments)
      } else {
        clearTimeout(timer)
      }
      timer = setTimeout(() => { timer = null }, wait)
    } else {
      if (timer) { clearTimeout(timer) }
      timer = setTimeout(() => {
        func.apply(this, arguments)
        timer = null
      }, wait)
    }
  }
  debounceFunc.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounceFunc
}

// 节流
export const throttle = function (func, wait = 1000, immediate = true) {
  let timer = null
  const throttleFunc = function () {
    if (timer) { return }
    if (immediate) {
      func.apply(this, arguments)
    }
    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(this, arguments)
      }
      timer = null
    }, wait)
  }
  throttleFunc.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return throttle
}
