<template>
  <section>
      <input type="text" placeholder="账号"/>
      <input type="text" placeholder="密码"/>
      <div @click="da = !da" :class="{div1:da,div01:!da}">
        <div :class="{div2:da,div02:!da}"></div>
      </div>
      <input type="text" placeholder="验证码"/>
      <img :src="src" alt="">
      <a href="###" @click="re" class="a1">换一张</a>
      <p>温馨提示: 未注册过的账号,登录时将会自动注册</p>
      <p>注册过的用户可凭账号密码登录</p>
      <button class="btn btn-success">登录</button>
      <router-link :to="{name:'forget'}" class="pull-right">重置密码?</router-link>
  </section>
</template>

<script>
import Vue from 'vue'
// 登录注册页
export default {
  name: "login",
  data () {
    return {
      da: true,
      src: ''
    }
  },
  methods: {
    // 重置密码
    changePassword () {

    },
    // 换一张验证码
    re () {
      Vue.axios.post('https://elm.cangdu.org/v1/captchas',null).then((res)=>{
        console.log(res.data)
        this.src = res.data.code
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    Vue.axios.post('https://elm.cangdu.org/v1/captchas',null).then((res)=>{
      console.log(res.data)
      this.src = res.data.code
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  input {
    width: 100%;
    outline: medium;
    height: .33rem;
    border-bottom: #b2b2b2 solid .01rem;
    border-top: #b2b2b2 solid .01rem;
  }
  p {
    margin: .05rem;
    color: darkred;
    font-size: .12rem;
  }
  a {
    margin: 0.05rem;
  }
  img {
    position: absolute;
    top: 1.05rem;
    right: .5rem;
    width: .4rem;
    height: .2rem;
  }
  .a1 {
    position: absolute;
    top: 1.0rem;
    right: 0;
    width: .4rem;
    height: .2rem;
    font-size: .12rem;
  }
  button {
    margin: 2%;
    width: 95%;
  }
  .div1 {
    position: absolute;
    top: 0.75rem;
    right: .1rem;
    width: .4rem;
    height: .2rem;
    background-color: silver;
    border-radius: .1rem;
    transition: all .5s initial;
  }
  .div01 {
    position: absolute;
    top: 0.75rem;
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
