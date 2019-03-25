// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import axiox from 'axios'
import Vueaxios from 'vue-axios'
=======
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'//引入store

Vue.use(VueAxios, axios)
>>>>>>> 2bcb7d0116b225dd90966788c46b207855a53c74
Vue.config.productionTip = false
Vue.use(Vueaxios,axiox)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
