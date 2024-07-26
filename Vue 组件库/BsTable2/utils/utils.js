export const debounce = function (func, wait, immediate = false) {
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
      clearTimeout(timer)
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
