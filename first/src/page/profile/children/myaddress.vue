<template>
  <section class="container-fluid ads">
    <div class="addressList" v-for="(item,key) in addressList" v-if="deleteAddress">
      <div>
        <p>{{item.address}}</p>
        <p>{{item.phone}}</p>
      </div>
      <p @click="deleteThis(item)" v-if="showIcon">x</p>
    </div>
    <router-link :to="{name:'add'}"><span>新增地址</span><i class="iconfont">&#xe634;</i></router-link>
  </section>
</template>

<script>
  import Vue from 'vue'
// 地址
export default {
  name: "myaddress",
  data(){
    return{
      // 获取用户信息
      userInfo:{},
      // 获取地址列表
      addressList:[],
      // 控制要删除的地址信息
      deleteAddress:true,
      // 展示或者隐藏删除图标
      showIcon:''
    }
  },
  methods:{
    deleteThis(i){
      //发起请求删除地址信息
      Vue.axios.delete(`https://elm.cangdu.org/v1/users/${this.userInfo.user_id}/addresses/${i.id}`,null).then(res=>{
        console.log(res.data);
      }).catch(error=>{
        console.log(error)
      });
      this.deleteAddress = false;
    }
  },
  mounted(){
    // 请求地址列表
    Vue.axios.get(`https://elm.cangdu.org/v1/users/${this.userInfo.user_id}/addresses`,null).then(res=>{
      console.log(res.data);
      this.addressList = res.data
    }).catch(error=>{
      console.log(error)
    })
  },
  created(){
    // 获取vuex里的用户信息
    this.userInfo = this.$store.state.ghc.userInfo;
  },
  // 计算属性是内容发生变化即刻触发
  computed:{
    showI(){
      return this.$store.state.ghc.showIcon
    }
  },
  watch:{
    // 监听头部状态变化
    showI:{
      handler(){
        this.showIcon = !this.showIcon
      },
      deep:true,
      immediate:true
    }
  }
}
</script>

<style scoped>
.ads{
  width: 100%;
  height: 100%;
  padding: 0;
}
.ads>div:first-child{
  background-color: palegoldenrod;
}
.ads>a{
  height: 0.4rem;
  width: 100%;
  line-height: 0.4rem;
  background-color: white;
  border-top: 0.01rem solid #e4e4e4;
  border-bottom: 0.01rem solid #e4e4e4;
  padding: 0 0.1rem;
  /*margin-top: 0.1rem;*/
  text-decoration: none;
  display: inline-block;
}
.ads>a>span{
  float: left;
  color: #000;
}
.ads>a>i{
  float: right;
  color: #a4a4a4;
}
.addressList{
  width: 100%;
  background-color: white;
  height: 0.6rem;
  padding: 0.1rem;
  border-bottom: 0.01rem solid #e4e4e4;
  display: inline-block;
}
.addressList p{
  margin-bottom: 0;
}
.addressList>div{
  float: left;
}
.addressList>p{
  float: right;
}

</style>
