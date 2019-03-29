<template>
  <section class="container-fluid AccountInfo">
    <div class="content">
      <router-link :to="{}"><span>头像</span><span>{{'头像'}}<i class="iconfont">&#xe634;</i></span></router-link>
      <router-link :to="{name:'setusername'}"><span>用户名</span><span>{{'name'}}<i class="iconfont">&#xe634;</i></span></router-link>
      <router-link :to="{}"><span>收货地址</span><i class="iconfont">&#xe634;</i></router-link>
      <p>账号绑定</p>
      <router-link :to="{}"><span><i class="iconfont">&#xe633;</i></span>手机<i class="iconfont">&#xe634;</i></router-link>
      <p>安全设置</p>
      <router-link :to="{}"><span>登录密码</span><span>修改<i class="iconfont">&#xe634;</i></span></router-link>
    </div>
    <div class="foot">
      <el-button class="btn">退出登录</el-button>
    </div>

  </section>
</template>

<script>
// 账户信息
export default {
  name: "info"
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
</style>
