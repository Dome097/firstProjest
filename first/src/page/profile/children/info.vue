<template>
  <section class="container-fluid AccountInfo">
    <div class="content">
      <div><span>头像</span><i class="iconfont">&#xe634;</i><img src="../../../assets/logo.png" alt="图片无法显示!">
        <input type="file"/>
      </div>
      <router-link :to="{name:'setusername'}"><span>用户名</span><span>{{getName}}<i class="iconfont">&#xe634;</i></span></router-link>
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
    <div
      v-if="popupVisible1"
      class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>请在手机APP中设置</p>
        <button @click="sureSet">确认</button>
      </div>
    </div>
    <!--确认是否退出登录-->
    <div
      v-if="popupVisible2"
      class="animated heartBeat alertBox2" >
      <div class="remindClose">
        <i class="iconfont">&#xe632;</i>
        <p>是否退出登录</p>
        <button @click="waiting">再等等</button>
        <button @click="closeIt">退出登录</button>
      </div>
    </div>
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
      popupVisible2:false,
      // 接收修改后的用户名
      getName:this.$route.query.name,
      // 动态图片地址
      pics:'../../../assets/logo.png',

    }
  },
  methods:{
    remindSet(){
      // 点击提醒绑定手机时,使弹框显示
      this.popupVisible1 = true
    },
    remindClose(){
      // 点击退出登录按钮时,使弹框显示
      this.popupVisible2 = true
    },
    sureSet(){
      // 点击弹框上的确认按钮,使该弹框消失
      this.popupVisible1 = false
    },
    waiting(){
      // 点击弹框上的等等按钮,使该弹框消失
      this.popupVisible2 = false
    },
    closeIt(){
      // 点击弹框上的退出按钮,使该弹框消失
      this.popupVisible2 = false;
      // 退出登录,并回到个人中心
      this.$router.push({name:'mind'});
      // 退出登录,发起请求
      Vue.axios.get('https://elm.cangdu.org/v2/signout',null).then(res => {
        console.log(res.data);
      }).catch((error) => {
        console.log(error)
      })
    },
  },
 }
</script>

<style scoped>
  .AccountInfo{
  width: 100%;
  height: 100%;
  padding: 0;
  position: relative;
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
.content>div{
  display: inline-block;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: white;
  border-top: 0.01rem solid #e4e4e4;
  padding: 0 0.1rem;
  clear: both;
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
.content>div:nth-child(1){
  position: relative;
}
.content>div:nth-child(1)>i{
  float: right;
}
.content>div:nth-child(1)>input{
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1000;
  margin: 0;
  left: 0;
  top: 0;
}
.content>div:nth-child(1)>img{
  float: right;
  width: 0.6rem;
  margin: 0.1rem;
  border-radius: 0.6rem;
  background-color: #008de1;
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
.alertBox1,.alertBox2{
  position: fixed;
  left: 15%;
  top: 20%;
  width: 70%;
  height: 2rem;
  border-radius: 0.1rem;
  background-color: white;
}
.alertBox2{
  height: 2.4rem;
  text-align: center;
}
.remindSet, .remindClose{
  text-align: center;
  position: relative;
  height: 2rem;
}
  .remindSet>i{
    font-size: 0.8rem;
    color: orange;
  }
  .remindClose>i{
    font-size: 1rem;
    color: orange;
  }
.remindSet>p{
  border: 0;
}
.remindClose>p{
  border: 0;
  font-size: 0.2rem;
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
  .remindClose>button{
    width: 30%;
    height: 0.4rem;
    border: none;
    padding: 0;
    background-color: silver;
    color: white;
    border-radius: 0.06rem;
    margin:0 0.1rem ;
  }
.remindClose>button+button{
  background-color: red;
}
</style>
