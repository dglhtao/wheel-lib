import Vue from 'vue'
import throttle from './throttle'

Vue.directive('throttle', {
  bind (el, binding) {
    const { arg, value } = binding
    el.handler = throttle(value, arg)
    el.addEventListener('click', el.handler)
  },
  unbind (el, binding) {
    el.removeEventListener('click', el.handler)
  }
})

// 设置后，可以对组件设置 v-throttle:1000="clickEvent" ，实现以节流的形式监听调用click
