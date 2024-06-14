import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'

import Tabs from '@/components/Tabs'
import Loading from '@/components/Loading'
import MyIframe from '@/components/MyIframe'
import Switch from '@/components/Switch'
import Table from '@/components/Table/index'
import Table2 from '@/components/Table/src/table'
import BsTable from '@/components/BsTable/src/table'
import InputNumber from '@/components/InputNumber'
import InputNumber1 from '@/components/InputNumber1'
import Empty from '@/components/Empty'
import CSvg from '@/components/CSvg'

Vue.use(Loading)
Vue.use(MyIframe)

Vue.component(Tabs.name, Tabs)
Vue.component(Table.name, Table)
Vue.component(Table2.name, Table2)
Vue.component(BsTable.name, BsTable)
Vue.component(Switch.name, Switch)
Vue.component(InputNumber.name, InputNumber)
Vue.component(InputNumber1.name, InputNumber1)
Vue.component(Empty.name, Empty)
Vue.component(CSvg.name, CSvg)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app
