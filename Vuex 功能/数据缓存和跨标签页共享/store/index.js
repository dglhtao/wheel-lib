import Vue from 'vue'
import Vuex from 'vuex'
import cachePlugin from './cachePlugin'
import test from './modules/test'
// import common from './modules/common'

Vue.use(Vuex)

const lm = ['test']

export default new Vuex.Store({
  modules: {
    test
    // common
  },
  // vuex的store接收plugins数组，数组每一项为插件方法，且方法传参为store
  // https://vuex.vuejs.org/zh/guide/plugins.html
  plugins: [cachePlugin({ lm })]
})
