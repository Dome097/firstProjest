// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/reset.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
import VueX from 'vuex'
import storage from './config/storage'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'


Vue.use(VueAxios, axios)
Vue.use(VueX)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(animate)
Vue.use(storage)
const moduleG = {
  state:{
// 当前所选城市信息
    currentCity:[]
  },
  mutations: {
    // 接收
    "CITY": function(state, currentCity) {
      state.currentCity = currentCity
    }
  },
  actions: {}
}
const moduleJ = {
  state:{
    res:[]
  },
  mutations: {
    getRes(state, res){
      state.res = res;
    }
  },
  actions: {}
}
const moduleD = {
  state:{
    a:'准时达',
    cate:''
  },
  mutations: {},
  actions: {}
}
const store = new VueX.Store({
  modules: {
    ghc: moduleG,
    jym: moduleJ,
    dome: moduleD
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
