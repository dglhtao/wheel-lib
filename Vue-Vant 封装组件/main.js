import Vue from 'vue'
import {
  Picker,
  DatetimePicker
} from 'vant'

import store from './store'
import router from './router'
import App from './App.vue'

import DatePicker from '@/components/DatePicker'
import TimePicker from '@/components/TimePicker'
import Picker from '@/components/Picker'

Vue.use(Picker)
Vue.use(DatetimePicker)

Vue.component(DatePicker.name, DatePicker)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Picker.name, Picker)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
