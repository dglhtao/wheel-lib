// immediate 标明首次调用是否立即执行
export const throttle = (func, wait, immediate = true) => {
  let timeout = null
  return function () {
    if (!timeout) {
      if (immediate) {
        func.apply(this, arguments)
      }
      timeout = setTimeout(() => {
        if (!immediate) {
          func.apply(this, arguments)
        }
        timeout = null
      }, wait)
    }
  }
}
