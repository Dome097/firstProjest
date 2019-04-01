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
    currentCity:{}
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
    restaurant_category_ids: [],
    // 是否为新店
    is_new:false,
    // 是否支持线上支付
    is_premium:false,
    // 单个商铺信息对象
    singleStore: {}
  },
  mutations: {

    // 单个商铺信息对象赋值
    getSingleStore (state, payload) {
      state.singleStore = payload.data
    },
    // 给food的title赋值
    goMsite (state, title) {
      state.foodTitle = title.name
    },
    // 请求商铺
    getShop (state, payload) {
       // 新店吗
        state.is_new = payload.is_new
        console.log('是新店')
      // 支持线上支付吗
        state.is_premium = payload.is_premium
        console.log('支持线上支付')
      // 纬度
      if (payload.latitude) {
        state.latitude = payload.latitude
        console.log('传来了纬度')
      }
      // 经度
      if (payload.longitude) {
        state.longitude = payload.longitude
        console.log('传来了经度')
      }
      // 请求数据的数量，默认20
      if (payload.limit) {
        state.limit = payload.limit
        console.log('传来了请求数据的数量')
      }
      // 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
      if (payload.order_by) {
        state.order_by = payload.order_by
        console.log('传来了排序方式id')
        console.log(state.support_ids, '111')
      }
      // 配送方式id
      if (payload.delivery_mode) {
        state.delivery_mode = payload.delivery_mode
        console.log('传来了配送方式id')
      }
      // 餐馆支持特权的id
      if (payload.support_ids[0]||payload.support_ids[1]||payload.support_ids[2]) {
        state.support_ids = payload.support_ids
        console.log('传来了餐馆支持特权的id',state.support_ids)
      }
       // 餐馆分类id
      if (payload.restaurant_category_ids) {
        state.restaurant_category_ids = payload.restaurant_category_ids
        console.log('产来了餐馆分类的id')
      }
      Vue.axios.get(`https://elm.cangdu.org/shopping/restaurants?latitude=${state.latitude}&longitude=${state.longitude}&limit=${state.limit?state.limit:''}&order_by=${state.order_by?state.order_by:''}&delivery_mode[]=${state.delivery_mode}${state.support_ids[0]?'&support_ids[]='+state.support_ids[0]:''}${state.support_ids[1]?'&support_ids[]='+state.support_ids[1]:''}${state.support_ids[2]?'&support_ids[]='+state.support_ids[2]:''}&restaurant_category_ids[]=${state.restaurant_category_ids}`,null).then((res) => {
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
