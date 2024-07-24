import Vue from 'vue'
import throttle from './throttle'

Vue.directive('throttle', {
  bind (el, binding) {
    const { arg, value } = binding
    let executeFunction = null
    executeFunction = throttle(value, arg)
    el.addEventListener('click', executeFunction)
  }
})

// 设置后，可以对组件设置 v-throttle:1000="clickEvent" ，实现以节流的形式监听调用click
