// 休眠
export const delay = (timeout = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}
