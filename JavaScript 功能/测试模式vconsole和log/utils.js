// 在localStorage设置相关变量为dev则切换为开发模式
const __DEV__ = localStorage.getItem('__jzenv__') === 'dev'

// 仅开发模式console测试数据
export const log = (...args) => {
  if (__DEV__) {
    console.log(...args)
  }
}