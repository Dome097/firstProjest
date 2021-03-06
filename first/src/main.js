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
import { InfiniteScroll } from 'mint-ui';

Vue.use(VueAxios, axios)
Vue.use(VueX)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(animate)
Vue.use(storage)
Vue.use(InfiniteScroll);
const moduleG = {
  state:{
// 当前所选城市信息
    currentCity:{},
    // 搜索商家历史记录
    historyRecord:[],
    // 是否显示footer
    showOrHidden:false,
    // 保存用户信息
    userInfo:{},
    // 保存商家定位信息
    localInfo:{},
    // 选定使用的地址
    useThisAds:{},
    // 展示或隐藏删除图标
    showIcon:'',
  },
  mutations: {
    // 接收所选城市信息
    "CITY": function(state, currentCity) {
      state.currentCity = currentCity
    },
    // 接收所选商家的历史记录
    "HISTORYRECORD"(state,historyRecord){
      state.historyRecord.push(historyRecord)
    },
    // 调用函数使footer,根据hidThat的值决定显隐
    showOrHidden(state,hidThat){
      state.showOrHidden = hidThat
    },
    // 保存用户信息
    accountData(state,userInfo){
      state.userInfo = userInfo
    },
    // 保存商家定位信息
    location(state,localInfo){
      state.localInfo = localInfo
    },
    // 选定使用的地址
    selectAdrs(state,useThisAds){
      state.useThisAds = useThisAds
    },
    // 展示删除图标
    deleteIcon(state,showIcon){
      state.showIcon = showIcon
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
    // 单个食物详情
    singleFood:{},
    // 购物车中的食物
    // {attrs:[],extra:{},id:食品id,name:食品名称,packing_fee:打包费,price:价格,quantity:数量,sku_id:规格id,specs:规格,stock:存量,}
    allCartSingleFood:[],
    cartSingleFood:[
      // {
      //   quantity:1,
      //   entities:{
      //     id: 5894,
      //     name: '123',
      //     packing_fee: 0,
      //     price: 20,
      //     sku_id: 5894,
      //     specs:[],
      //     stock: 1000
      //   }
      // }
      ],
    // 返回到购物车的数组
    domeChe: [],
    // 数据加载成功
    endOfDataLoad:false,
    // 倒计时分
    minute:15,
    // 倒计时秒
    second:0,
    // msite向food传值
    foodTitle: '',
    // 请求到的数组
    dataList: [],
    // 登录状态
    loggingStatus: '',
    // 请求到的评星
    value1: [],
    // 纬度
    latitude: '',
    // 经度
    longitude: '',
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
    singleStore: {},
    // 选中区域
    region:{},
    // 点击会员卡时传递会员中心过去
    sendvipCenterInfo:'',
    // 控制加入购物车动画
    addZ:false
  },
  getters: {
    // 操作购物车
  },
  mutations: {
    // 选定的具体地址经纬度
    userLatitude(state,latitude){
      state.latitude = latitude
    },
    userLongitude(state,longitude){
      state.longitude = longitude
    },
    // 全部填加到购物车
    allFood (state, pyload) {
      state.allCartSingleFood = pyload.data
    },
    // 向购物车添加食物
    addSingleFood (state, pyload) {
      pyload.data.dome++
      pyload.data.specfoods[pyload.index].dome++
    },
    // 在购物车添加食物
    cartAddSingleFood (state, pyload) {
      for (let foods of state.allCartSingleFood) {
        for (let specfoods of foods.foods) {
          for (let specfood of specfoods.specfoods){
            if (specfood.food_id === pyload.data.food_id) {
              specfoods.dome++
              specfood.dome++
            }
          }
        }
      }
    },
    // 删除一个食物
    deleteSingleFood (state, pyload) {
      pyload.data.dome--
      pyload.data.specfoods[pyload.index].dome--
    },
    // 在购物车删除食物
    cartDeleteSingleFood (state, pyload) {
      for (let foods of state.allCartSingleFood) {
        for (let specfoods of foods.foods) {
          for (let specfood of specfoods.specfoods){
            if (specfood.food_id === pyload.data.food_id) {
              specfoods.dome--
              specfood.dome--
            }
          }
        }
      }
    },
    // 清空购物车
    emptySingleFood  (state, pyload) {
      state.cartSingleFood = []
      for (let foods of state.allCartSingleFood) {
        for (let specfoods of foods.foods) {
          specfoods.dome = 0
          for (let specfood of specfoods.specfoods) {
            specfood.dome = 0
          }
        }
      }
    },
    // 修改单个食物详情
    getSingleFood (state, pyload) {
      state.singleFood = pyload.data
      state.foodTitle = pyload.data.name
    },
    // 加载动画
    amendDataLoad (state, pyload) {
      state.endOfDataLoad = !state.endOfDataLoad
    },
    // 倒计时
    getComputeTime (state, payload) {
      console.log('倒计时')
      if (state.minute === 15 && state.second === 0){
        console.log('倒计时开始')
        var myTimer = setInterval(function () {
          if (state.second === 0) {
            state.minute--
            state.second = 59
          }else {
            state.second--
          }
          if (state.minute === 0 && state.second === 0) {
            clearInterval(myTimer)
          }
        },1000)
      }

      // 倒计时分
      //   minute:15,
        // 倒计时秒
        // second:60,
    },
    // 检查选中区域
    getRegion (state, payload) {
      state.region = payload.region.address
    },
    // 检查登录状态
    getLoggingStatus (state, payload) {
        state.loggingStatus = payload.loggingStatus
    },
    // 单个商铺信息对象赋值
    getSingleStore (state, payload) {
      state.singleStore = payload.data
      console.log("state.singleStore是", state.singleStore)
    },
    // 给food的title赋值
    goMsite (state, title) {
      state.foodTitle = title.name
    },
    // 控制动画
    goAddZ (state, payload) {
      state.addZ = payload.is_new
    },
    // 请求商铺
    getShop (state, payload) {
       // 新店吗
        state.is_new = payload.is_new
        console.log('是新店')
      // 头部是
      if (payload.classifyOne) {
        state.foodTitle = payload.classifyOne
        console.log('修改头部')
      }
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
      // 开始请求 动画进行
      state.endOfDataLoad = true
      Vue.axios.get(`https://elm.cangdu.org/shopping/restaurants?latitude=${state.latitude}&longitude=${state.longitude}&limit=${state.limit?state.limit:''}&order_by=${state.order_by?state.order_by:''}&delivery_mode[]=${state.delivery_mode}${state.support_ids[0]?'&support_ids[]='+state.support_ids[0]:''}${state.support_ids[1]?'&support_ids[]='+state.support_ids[1]:''}${state.support_ids[2]?'&support_ids[]='+state.support_ids[2]:''}&restaurant_category_ids[]=${state.restaurant_category_ids}`,null).then((res) => {
        state.dataList = res.data;
        // 请求结束 动画结束
        state.endOfDataLoad = false
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
