<template>
  <section class="container-fluid profile">
    <div class="header">
      <div @click="changeRoute" class="row">
        <div class="photo col-xs-3">
          <i class="iconfont">&#xe677;</i>
        </div>
        <div class="col-xs-6 login">
          <span v-if="hasUser">{{userName?userName:'登录/注册'}}</span>
          <span v-if="noUser">登录</span>
          <span v-if="noUser">/</span>
          <span v-if="noUser">注册</span><br>
          <i class="iconfont">&#xe633;</i>
          <span class="number">暂无绑定手机号</span>
        </div>
        <i class="iconfont col-xs-1">&#xe634;</i>
      </div>
    </div>
    <div class="content">
      <div class="col-xs-4 left">
        <router-link :to="{name:'balance'}">
          <p><span>0.00</span>元</p>
          <p>我的余额</p>
        </router-link>
      </div>
      <div class="col-xs-4 middle">
        <router-link :to="{name:'benefit',query:{id:$store.state.dome.loggingStatus}}">
          <p><span>{{gift_amount}}</span>个</p>
          <p>我的优惠</p>
        </router-link>
      </div>
      <div class="col-xs-4 right">
        <router-link :to="{name:'points'}">
          <p><span>0</span>分</p>
          <p>我的积分</p>
        </router-link>
      </div>
    </div>
    <div class="detail">
      <div class="lists">
        <router-link :to="{name:'order'}">
          <i class="iconfont">&#xe75f;</i>
          <p>我的订单</p>
          <i class="iconfont">&#xe634;</i>
        </router-link>
      </div>
      <div class="lists">
        <router-link :to="{name:'points'}">
          <i class="iconfont">&#xe62d;</i>
          <p>积分商城</p>
          <i class="iconfont">&#xe634;</i>
        </router-link>
      </div>
      <div class="lists">
        <router-link :to="{name:'vipcard'}">
          <i class="iconfont">&#xe73a;</i>
          <p>饿了么会员卡</p>
          <i class="iconfont">&#xe634;</i>
        </router-link>
      </div>
      <div class="lists">
        <router-link :to="{name:'service'}">
          <i></i>
          <p>服务中心</p>
          <i class="iconfont">&#xe634;</i>
        </router-link>
      </div>
      <div class="lists">
        <router-link :to="{name:'download'}">
          <img src="../../../../src/assets/appLogo.jpg" alt="">
          <p>下载饿了么APP</p>
          <i class="iconfont">&#xe634;</i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
  // 个人中心
  export default {
    name: "mind",
    data(){
      return{
        // 未登录显示状态
        noUser:'',
        // 登录成功状态显示
        hasUser:'',
        // 获取本地存储的用户名
        userName:'',
        // 获取优惠数量
        gift_amount:0
      }
    },
    methods:{
      changeRoute(){
        // 判断是否已登录
        if(this.$store.state.dome.loggingStatus){
          // 已登录过,跳转到我的信息
          this.$router.push({name:'info'})
        }else{
          // 未登录,跳转到登录页
          this.$router.push({name:'login'})
        }
      },
    },
    created(){
      // 获取本地用户名
      this.userName = this.storage.get('username');
      // 获取优惠数量
      this.gift_amount = this.$store.state.ghc.userInfo.gift_amount;
      console.log(this.gift_amount,'111111111111')
    },
    // 采用路由守卫在进入之前
    beforeRouteEnter(to,from,next){
      next((vm)=>{
          if(vm.$store.state.dome.loggingStatus){
            // 已登录过,跳转到我的信息
            vm.hasUser = true;
            vm.noUser = false;
          }else {
            vm.hasUser = false;
            vm.noUser = true
          }
      })
    }
  }
</script>

<style scoped>
  .profile{
    width: 100%;
    padding: 0;
    background-color: #e4e4e4;
  }
  .content{
    border-top:0.01rem solid transparent;
  }
  .header{
    width: 100%;
    height: 1rem;
    background-color: #008de1;
  }
  .header>div{
    margin: 0 auto;
    padding: 0.1rem;
    color: #fff;
  }
  .header>div>div+div{
    padding-top: 0.06rem;
  }
  .header>div>i{
    padding-top: 0.2rem;
    padding-right: 0.22rem;
    float: right;
  }
  .photo{
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    background-color: white;
    border-radius: 0.6rem;
    text-align: center;
    overflow:hidden;
    margin-left: 0.15rem;
  }
  .photo>i{
    /*padding-left: -0.1rem;*/
    font-size: 0.5rem;
    color: #e5e5e5;
    position: absolute;
    left: 0.05rem;
    top: 0;
  }
  .header>a>i:nth-child(3){
    color: #fff;
    top: 0.1rem;
    right: -0.6rem;
    position: relative;
  }
  .login>span{
    font-size: 0.18rem;
  }
  .login>.number{
    font-size: 0.14rem;
  }
  .left,.middle,.right{
    background-color: white;
    height: 1rem;
    text-align: center;
    line-height: 0.26rem;
    display: inline-block;
    padding: 0.2rem 0;
    border-bottom: 0.01rem solid #e4e4e4;
  }
  .left span,.middle span,.right span{
    font-size: x-large;
  }
  .left span{
    color: orange;
  }
  .middle span{
    color: red;
  }
  .right span{
    color: limegreen;
  }
  .left,.middle{
    border-right: 0.01rem solid #e4e4e4;
  }
  .left>a,.right>a,.middle>a{
    text-decoration: none;
    color: black;
  }
  .lists{
    background-color: white;
  }
  .lists>a>i:nth-child(1){
    float: left;
    margin-right: 0.04rem;
    border-bottom: none;
  }
  .lists p{
    margin: 0;
  }
  .lists>a{
    height: 0.4rem;
    line-height: 0.4rem;
    text-decoration: none;
    color: dimgrey;
    display: block;
    clear: both;
    padding:0 0.16rem ;
    border-bottom: 0.01rem solid #e4e4e4;
  }
  .lists>a>p,i{
    display: inline-block;
  }
  .lists>a>p{
    float: left;
  }
  .lists>a>i:nth-child(3){
    float: right;
    color: #b2b2b2;
  }
  .detail>.lists:nth-child(1)>a>i:nth-child(1){
    color: #008de1;
  }
  .detail>.lists:nth-child(2)>a>i:nth-child(1){
    font-size: 0.18rem;
    color: orange;
  }
  .detail>.lists:nth-child(3)>a>i:nth-child(1){
    color: gold;
  }
  .detail>.lists:nth-child(4)>a>i:nth-child(1){
    width: 0.18rem;
    height: 0.18rem;
    background-color: #008de1;
    margin-top: 0.1rem;
  }
  .detail>.lists:nth-child(5)>a>img{
    width: 0.18rem;
    height: 0.18rem;
    border-radius: 0.03rem;
    float: left;
    margin-top: 0.1rem;
    margin-right: 0.03rem;
  }
  .lists:nth-of-type(4){
    margin-top: 0.1rem;
  }
  .lists:nth-of-type(1){
    margin-top: 0.1rem;
  }
</style>

