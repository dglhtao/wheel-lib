import MyIframe from './index.vue'

let instance = null
export default {
  install (Vue) {
    if (!instance) {
      const MyIframe = Vue.extend(MyIframe)
      instance = new MyIframe({}).$mount()
      document.body.appendChild(instance.$el)
    }

    Vue.prototype.$MyIframe = {
      show ({ url, mark }) {
        instance.show = true
        instance.url = url
      },
      hide () {
        instance.show = false
        instance.url = ''
      }
    }
  }
}
