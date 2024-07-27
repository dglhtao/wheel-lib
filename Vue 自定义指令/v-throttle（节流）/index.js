import Vue from 'vue'
import { throttle } from '../utils/utils'

const func = throttle
const funcName = 'throttle'
const events = ['click', 'scroll']

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


// 使用：
// <button v-throttle-click:1000="clickEvent">节流点击</button>
// <div v-throttle-scroll:100="scrollEvent">节流滚动</div>
