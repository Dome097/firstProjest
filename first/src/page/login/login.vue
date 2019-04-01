<template>
  <section class="container-fluid login">
      <input type="text" placeholder="账号" v-model="mindUsername"/>
      <input :type="pwdType" placeholder="密码" v-model="mindPassword"/>
      <div @click="changeType" :class="{div1:da,div01:!da}">
        <div :class="{div2:da,div02:!da}"></div>
      </div>
      <input type="text" placeholder="验证码" v-model="mindCaptcha_code"/>
      <img :src="src" alt="">
      <a href="###" @click="gainAuthCode" class="a1">换一张</a>
      <p>温馨提示: 未注册过的账号,登录时将会自动注册</p>
      <p>注册过的用户可凭账号密码登录</p>
      <button @click="goLogin" class="btn btn-success">登录</button>
      <router-link :to="{name:'forget'}" class="pull-right">重置密码?</router-link>
  </section>
</template>

<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
// 登录注册页
export default {
  name: "login",
  data () {
    return {
      // 存储密码可见状态
      da:false,
      //
      src: '',
      mindUsername: '',
      mindPassword: '',
      mindCaptcha_code: '',
      pwdType:''
    }
  },
  methods: {
    // 输入密码是否可见
    changeType(){
      this.da = !this.da;
      this.pwdType = this.pwdType === 'password'?'text':'password'
    },
    // 重置密码
    changePassword () {

    },
    // 登录
    goLogin () {
      this.$http({
        method: 'post',
        url: 'https://elm.cangdu.org/v2/login',
        withCredentials: true, // 默认的
        data: {
          captcha_code: this.mindCaptcha_code,
          password: this.mindPassword,
          username: this.mindUsername
        },
      }).then(res => {
        console.log('---', res);
        if (res.data.message) {
          MessageBox.alert(res.data.message);
          this.gainAuthCode();
          this.$store.commit({type:'getLoggingStatus',loggingStatus:false});
          return
        }
        // 账户信息匹配正确,跳转到登录状态,并把用户名传到新页面
        this.$router.push({name: "profile",query:{name:this.mindUsername}});
        // 给vuex保存用户信息
        this.$store.commit({type:'getLoggingStatus',loggingStatus:true})
        this.$store.state.ghc.accountData = res.data
        console.log('ghc',this.$store)
      });
      // Vue.axios.post('https://elm.cangdu.org/v2/login',{username: this.mindUsername,Password: this.mindPassword,captcha_code: this.mindCaptcha_code},{withCredentials:true}).then((res)=>{
      //   console.log('登录的返回值',res)
      //   console.log(this.mindCaptcha_code)
      //   // this.src = res.data.code
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    // 换一张验证码
    gainAuthCode () {
      this.$http({
        method: 'post',
        url: 'https://elm.cangdu.org/v1/captchas',
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
        withCredentials: true, // 默认false
      }).then((res) => {
        console.log('tap', res);
        this.src = res.data.code
      })
    }
  },
  mounted () {
      this.$http({
        method: 'post',
        url: 'https://elm.cangdu.org/v1/captchas',
        //https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
        withCredentials: true, // 默认false
      }).then((res) => {
        console.log('tap', res);
        this.src = res.data.code
      })
    }
}
</script>

<style scoped>
  .login{
    width: 100%;
    padding: 0;
    margin-top: 0.16rem;
  }
  input {
    width: 100%;
    outline: medium;
    height: .4rem;
    border-bottom: #b2b2b2 solid .01rem;
    padding-left: 0.1rem;
  }
  p {
    margin: .1rem;
    color: darkred;
    font-size: .12rem;
  }
  a {
    margin: 0.1rem;
  }
  img {
    position: absolute;
    top: 1.47rem;
    right: .5rem;
    width: .4rem;
    height: .2rem;
  }
  .a1 {
    position: absolute;
    top: 1.4rem;
    right: 0;
    width: .4rem;
    height: .2rem;
    font-size: .12rem;
  }
  button {
    margin: 2%;
    width: 95%;
    background-color: limegreen;
  }
  .div1 {
    position: absolute;
    top: 1.1rem;
    right: .1rem;
    width: .4rem;
    height: .2rem;
    background-color: silver;
    border-radius: .1rem;
    transition: all .5s initial;
  }
  .div01 {
    position: absolute;
    top: 1.1rem;
    right: .1rem;
    width: .4rem;
    height: .2rem;
    background-color: #579022;
    border-radius: .1rem;
    transition: all .5s;
  }
  .div02 {
    position: absolute;
    width: .2rem;
    height: .2rem;
    right: 0;
    top: 0;
    border-radius: 100%;
    background-color: beige;
    transition: all .5s;
  }
  .div2 {
    position: absolute;
    width: .2rem;
    height: .2rem;
    top: 0;
    right: .2rem;
    border-radius: 100%;
    background-color: beige;
    transition: all .5s;
  }
</style>
