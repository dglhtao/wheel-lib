import Vue from 'vue'
import { debounce } from '../utils/utils'

const func = debounce
const funcName = 'debounce'
const events = ['click', 'change']

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
// <button v-debounce-click:1000="clickEvent">防抖点击</button>
// <input v-debounce-change:500="changeEvent" :value="value">防抖输入</input>
