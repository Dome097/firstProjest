<template>
  <section class="container-fluid AccountInfo">
    <div class="content">
      <router-link :to="{}"><span>头像</span><span>{{'头像'}}<i class="iconfont">&#xe634;</i></span></router-link>
      <router-link :to="{name:'setusername'}"><span>用户名</span><span>{{'name'}}<i class="iconfont">&#xe634;</i></span></router-link>
      <router-link :to="{name:'myaddress'}"><span>收货地址</span><i class="iconfont">&#xe634;</i></router-link>
      <p>账号绑定</p>
      <router-link :to="{}" @click.native="remindSet"><span><i class="iconfont">&#xe633;</i></span>手机<i class="iconfont">&#xe634;</i></router-link>
      <p>安全设置</p>
      <router-link :to="{name:'forget'}"><span>登录密码</span><span>修改<i class="iconfont">&#xe634;</i></span></router-link>
    </div>
    <div class="foot">
      <el-button class="btn" @click="remindClose">退出登录</el-button>
    </div>
    <!--提示在APP上设置-->
    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade" :modal = false>
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>请在手机APP中设置</p>
        <button @click="sureSet">确认</button>
      </div>
    </mt-popup>
    <!--确认是否退出登录-->
    <mt-popup
      v-model="popupVisible2"
      popup-transition="popup-fade" :modal = false>
      <div class="remindClose">
        <i class="iconfont">&#xe632;</i>
        <p>请在手机APP中设置</p>
        <button @click="waiting">再等等</button>
        <button @click="closeIt">退出登录</button>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import Vue from 'vue'
  // 引入弹出框插件
  import { Popup } from 'mint-ui';
  Vue.component(Popup.name, Popup);
// 账户信息
export default {
  name: "info",
  data(){
    return{
      popupVisible1:false,
      popupVisible2:false
    }
  },
  methods:{
    remindSet(){
      this.popupVisible1 = true
    },
    remindClose(){
      this.popupVisible2 = true
    },
    sureSet(){
      this.popupVisible1 = false
    },
    waiting(){
      this.popupVisible2 = false
    },
    closeIt(){
      this.popupVisible2 = false
      // 退出登录,并回到个人中心
    }
  }
}
</script>

<style scoped>
.AccountInfo{
  width: 100%;
  height: 100%;
  padding: 0;
}
.content>a,p{
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-decoration: none;
  background-color: white;
  border-top: 0.01rem solid #e4e4e4;
  padding: 0 0.1rem;
  clear: both;
  display: inline-block;
  color: #000;
}
.content>p{
  height: 0.3rem;
  line-height: 0.3rem;
  background-color: #f5f5f5;
  margin-bottom: 0;
  font-size: 0.12rem;
  color: dimgrey;
}
.content>a>span+span{
  float: right;
}
.content>a:nth-child(3)>i{
  float: right;
}
.content>a:nth-child(5)>i{
  float: right;
}
.content>a:nth-child(5)>span{
  width: 0.4rem;
  height: 0.4rem;
  color: #fff;
  background-color: #008de1;
  border-radius: 0.04rem;
  margin-right: 0.1rem;
}
.content>a:nth-child(1){
  margin-top: 0.1rem;
  height: 0.8rem;
  line-height: 0.8rem;
}
.content>a:nth-child(4){
  background-color: #f5f5f5;
}
.content>a:nth-child(6){
  background-color: #f5f5f5;
}
.content>a:last-child{
  border-bottom: 0.01rem solid #e4e4e4;
}
.foot{
  text-align: center;
}
.btn{
  width: 3.6rem;
  margin: 0.4rem auto;
  text-align: center;
  height: 0.4rem;
  color: white;
  background-color: red;
  border-radius: 0.04rem;
}
.mint-popup{
  width: 80%;
  height: 2rem;
  border-radius: 0.1rem;
}
.remindSet{
  text-align: center;
  position: relative;
  height: 2rem;
  overflow: hidden;
}
  .remindSet>i{
    font-size: 0.8rem;
    color: gold;
  }
.remindSet>p{
  border: 0;
}
.remindSet>button{
  width: 100%;
  height: 0.4rem;
  border: 0;
  margin-bottom: 0;
  padding: 0;
  background-color: limegreen;
  color: white;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius:0 0 0.1rem 0.1rem ;

}
  .remindClose{

  }
</style>
