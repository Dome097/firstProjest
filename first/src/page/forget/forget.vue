<template>
  <section>
      <input type="text" placeholder="账号" v-model="mindUsername">
      <input type="text" placeholder="旧密码" v-model="oldPassword">
      <input type="text" placeholder="请输入新密码" v-model="newPassword">
      <input type="text" placeholder="请确认密码" v-model="verifyNewPassword">
      <input type="text" placeholder="验证码" v-model="mindCaptcha_code">
      <img class="verificationCode" :src="src" alt="">
      <a href="###" class="retubing" @click="gainAuthCode">换一张</a>
      <button @click="affirmAmend" class="btn btn-success">确认修改</button>
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
      src: '',
      mindUsername: '',
      oldPassword: '',
      newPassword: '',
      verifyNewPassword: '',
      mindCaptcha_code: ''
    }
  },
  methods: {
    // 换一张验证码
    gainAuthCode () {
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
    },
    // 确认修改密码
    affirmAmend () {
        this.$http({
          method: 'post',
          url: 'https://elm.cangdu.org/v2/changepassword',
          data: {
            username: this.mindUsername,
            oldpassWord: this.oldPassword,
            newpassword: this.newPassword,
            confirmpassword: this.verifyNewPassword,
            captcha_code: this.mindCaptcha_code
          },
          //https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
          //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
          withCredentials: true, // 默认false
        }).then((res) => {
          console.log('tap', res);
          this.src = res.data.code
          if (res.data.success === '密码修改成功') {
            alert('密码修改成功')
          }else {
            alert(res.data.message)
            this.gainAuthCode ()
          }
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
  input {
    width: 100%;
    outline: medium;
    height: .33rem;
    border-bottom: #b2b2b2 solid .01rem;
    border-top: #b2b2b2 solid .01rem;
  }
  .verificationCode {
    position: absolute;
    top: 1.85rem;
    right: .5rem;
    width: .4rem;
    height: .2rem;
  }
  .retubing {
    position: absolute;
    top: 1.85rem;
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
