import Vue from 'vue'
import {
  Picker,
  DatetimePicker
} from 'vant'

import store from './store'
import router from './router'
import App from './App.vue'

import DatePicker from '@/components/DatePicker'
import Calendar from '@/components/Calendar'
import TimePicker from '@/components/TimePicker'

Vue.use(Picker)
Vue.use(DatetimePicker)

Vue.component(Calendar.name, Calendar)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimePicker.name, TimePicker)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
