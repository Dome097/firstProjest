<template>
  <section>
      <input type="text" placeholder="账号">
      <input type="text" placeholder="旧密码">
      <input type="text" placeholder="请输入新密码">
      <input type="text" placeholder="请确认密码">
      <input type="text" placeholder="验证码">
      <img class="verificationCode" :src="src" alt="">
      <a href="###" class="retubing" @click="re">换一张</a>
      <button class="btn btn-success">登录</button>
  </section>
</template>

<script>
import Vue from 'vue'
// 忘记密码,修改密码页
export default {
  name: "forget",
  data () {
    return {
      da: true,
      src: ''
    }
  },
  methods: {
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
  .verificationCode {
    position: absolute;
    top: 1.70rem;
    right: .5rem;
    width: .4rem;
    height: .2rem;
  }
  .retubing {
    position: absolute;
    top: 1.75rem;
    right: 0;
    width: .4rem;
    height: .2rem;
    font-size: .12rem;
  }
  button {
    margin: 2%;
    width: 95%;
  }
</style>
