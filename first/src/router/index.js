import Vue from 'vue'
import Router from 'vue-router'
import MyHome from '../components/MyHome'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/home',component:MyHome}
  ]
})
