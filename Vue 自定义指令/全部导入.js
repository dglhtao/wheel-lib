import Vue from 'vue'
// 额外导入
import './v-lazy（图片懒加载）'
// 通用导入
import { debounce, throttle } from './utils/utils'

const funcs = { debounce, throttle }
const funcsEventsMap = {
  debounce: ['click', 'change'],
  throttle: ['click', 'scroll']
}
const allEvents = ['click', 'change', 'scroll']

const funcsEvents = new Proxy(funcsEventsMap, {
  get (target, property, receiver) {
    if (property in target) { return target[property] }
    return allEvents
  }
})

for (const funcName in funcs) {
  const func = funcs[funcName]
  const events = funcsEvents[funcName]
  events.forEach(event => {
    const eventKey = `${funcName}_${event}_event`.replace(/_(.)/g, (match, group1) => group1.toUpperCase())
    Vue.directive(`${funcName}-${event}`, {
      bind (el, binding) {
        const { value, arg } = binding
        el[eventKey] = func(value, arg)
        el.addEventListener(event, el[eventKey])
      },
      unbind (el, binding) {
        el.removeEventListener(event, el[eventKey])
        delete el[eventKey]
      }
    })
  })
}

// 使用：
// <img v-lazy data-src="@/assets/images/buy.png" />
// <button v-debounce-click:1000="clickEvent">防抖点击</button>
// <input v-debounce-change:500="changeEvent" :value="value">防抖输入</input>
// <button v-throttle-click:1000="clickEvent">节流点击</button>
// <div v-throttle-scroll:100="scrollEvent">节流滚动</div>
