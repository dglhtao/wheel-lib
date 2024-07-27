// immediate 标明首次调用是否立即执行
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
