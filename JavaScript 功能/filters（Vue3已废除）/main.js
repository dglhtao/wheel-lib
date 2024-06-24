import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'

import { integerSign, getFlag, getPrefixMark, toFixed, percentage, toChNum, num8toDate, second2Time, numFontSize, numChLen } from '@/utils/filters'

Vue.filter('integerSign', integerSign)
Vue.filter('getFlag', getFlag)
Vue.filter('getPrefixMark', getPrefixMark)
Vue.filter('toFixed', toFixed)
Vue.filter('percentage', percentage)
Vue.filter('toChNum', toChNum)
Vue.filter('num8toDate', num8toDate)
Vue.filter('second2Time', second2Time)
Vue.filter('numFontSize', numFontSize)
Vue.filter('numChLen', numChLen)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
