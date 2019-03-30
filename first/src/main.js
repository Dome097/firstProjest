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


Vue.use(VueAxios, axios)
Vue.use(VueX)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.config.productionTip = false

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
    // msite向food传值
    foodTitle: '',
    // 请求到的数组
    dataList: [],
    // 请求到的评星
    value1: [],
    // 纬度
    latitude: '31.22967',
    // 经度
    longitude: '121.4762',
    // 请求数据的数量，默认20
    limit: 0,
    // 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
    order_by: 0,
    // 配送方式id
    delivery_mode: [],
    // 餐馆支持特权的id
    support_ids: [],
    // 餐馆分类id
    restaurant_category_ids: []
  },
  mutations: {
    // 给food的title赋值
    goMsite (state, title) {
      state.foodTitle = title.name
    },
    // 请求商铺
    getShop (state, payload) {
      state.restaurant_category_ids = payload.restaurant_category_ids
      Vue.axios.get(`https://elm.cangdu.org/shopping/restaurants?latitude=${state.latitude}&longitude=${state.longitude}&limit=${state.limit?state.limit:''}&order_by=${state.order_by?state.order_by:''}&delivery_mode[]=${state.delivery_mode}&support_ids[]=${state.support_ids}&restaurant_category_ids[]=${state.restaurant_category_ids}`,null).then((res) => {
        state.dataList = res.data;
        res.data.map((n)=>{
          state.value1.push(n.rating);
        })
      });
    }
  },
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
