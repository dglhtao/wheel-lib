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
        // if (process.env.VUE_APP_ENV === 'prod') {
        //   const origin = window.location.origin
        //   instance.url = `${origin}/yc_fund.html?file=${url}&mark=${mark}`
        // } else {
        //   instance.url = `https://static.jingzhuan.cn/static/test/yc_fund2.html?file=${url.replace('http://', 'https://')}&mark=${mark}`
        // }
      },
      hide () {
        instance.show = false
        instance.url = ''
      }
    }
  }
}
