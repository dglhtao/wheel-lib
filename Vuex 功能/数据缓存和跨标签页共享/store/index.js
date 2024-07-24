import Vue from 'vue'
import Vuex from 'vuex'
import cachePlugin from './cachePlugin'
import test from './modules/test'
// import common from './modules/common'
// import account from './modules/account'
// import buyMarket from './modules/buyMarket'
// import sellMarket from './modules/sellMarket'
// import newSecu from './modules/newSecu'
// import plan from './modules/plan'
// import planConfig from './modules/planConfig'
// import planDetail from './modules/planDetail'
// import repurchase from './modules/repurchase'
// import entrust from './modules/entrust'
// import receipts from './modules/receipts'
// import banks from './modules/banks'
// import planAdv from './modules/plan/adv'
// import planEnt from './modules/plan/entrust'
// import loginData from './modules/loginData'
// import usecache from './modules/usecache'
// import baseInfo from './modules/baseInfo'
// import tabSlide from './modules/tabSlide'
// import tabSlideSecond from './modules/tabSlideSecond'
// import slideBack from './modules/slideBack'
// import strategy from './modules/strategy'
// import { credit } from '@/credit/store/index.js'

Vue.use(Vuex)

// const lm = ['loginData', 'account', 'creditAccount']
const lm = ['test']

export default new Vuex.Store({
  modules: {
    test
    // common,
    // account,
    // buyMarket,
    // sellMarket,
    // newSecu,
    // plan,
    // planConfig,
    // planDetail,
    // repurchase,
    // entrust,
    // receipts,
    // banks,
    // planAdv,
    // planEnt,
    // loginData,
    // usecache,
    // baseInfo,
    // tabSlide,
    // tabSlideSecond,
    // slideBack,
    // strategy,
    // ...credit
  },
  // vuex的store接收plugins数组，数组每一项为插件方法，且方法传参为store
  // https://vuex.vuejs.org/zh/guide/plugins.html
  plugins: [cachePlugin({ lm })]
})
