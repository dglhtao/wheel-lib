import Loading from './index.vue'

let instance = null
export default {
  install (Vue) {
    if (!instance) {
      const Loading = Vue.extend(Loading)
      instance = new Loading({}).$mount()
      document.body.appendChild(instance.$el)
    }

    Vue.prototype.$Loading = {
      show () {
        instance.show = true
      },
      hide () {
        instance.show = false
      }
    }
  }
}
