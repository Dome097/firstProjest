<template>
  <section class="container-fluid resetPassword">
      <input type="text" placeholder="账号" v-model="mindUsername">
      <input type="text" placeholder="旧密码" v-model="oldPassword">
      <input type="text" placeholder="请输入新密码" v-model="newPassword">
      <input type="text" placeholder="请确认密码" v-model="verifyNewPassword">
      <input type="text" placeholder="验证码" v-model="mindCaptcha_code">
      <img class="verificationCode" :src="src" alt="">
      <a href="###" class="retubing" @click="gainAuthCode">换一张</a>
      <button @click="affirmAmend" class="btn">确认修改</button>
    <!--提示在APP上设置,模态框-->
    <div
      v-if="popupVisible1"
      :modal = false class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>{{isAnswer}}</p>
        <button @click="sureSet1">确认</button>
      </div>
    </div>
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
      mindCaptcha_code: '',
      // 修改失败提示框
      popupVisible1:false,
      // 未完善情况反馈
      isAnswer:''
    }
  },
  methods: {
    // 换一张验证码
    gainAuthCode () {
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
      this.$http({
        method: 'post',
        url: 'https://elm.cangdu.org/v1/captchas',
        //https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
        withCredentials: true, // 默认false
      }).then((res) => {
        //懒加载
        this.$store.commit({
          type:'amendDataLoad'
        });
        console.log('tap', res);
        this.src = res.data.code
      })
    },
    // 确认修改密码
    affirmAmend () {
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
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
          //懒加载
          this.$store.commit({
            type:'amendDataLoad'
          });
          console.log('tap', res);
          this.src = res.data.code;
          if (res.data.success === '密码修改成功') {
            alert('密码修改成功')
          }else {
            // alert(res.data.message);
            this.isAnswer = res.data.message;
            this.popupVisible1 = true;
            this.gainAuthCode ()
          }
        })
    },
    sureSet1(){
      this.popupVisible1 = false
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
  .resetPassword{
    width: 100%;
    padding: 0;
  }
  .resetPassword>input {
    width: 100%;
    outline: medium;
    height: .4rem;
    border-bottom: #e4e4e4 solid .01rem;
    padding:0 0.14rem;
  }
  .resetPassword>input:nth-child(1){
    margin-top: 0.2rem;
  }
  .verificationCode {
    position: absolute;
    top: 2.3rem;
    right: .5rem;
    width: .4rem;
    height: .2rem;
  }
  .retubing {
    position: absolute;
    top: 2.3rem;
    right: 0.04rem;
    width: .4rem;
    height: .2rem;
    font-size: .12rem;
  }
  button {
    margin: 2%;
    width: 95%;
    background-color: limegreen;
    color: #fff;
  }
  .alertBox1{
    position: fixed;
    left: 10%;
    top: 25%;
    width: 80%;
    height: 2rem;
    border-radius: 0.1rem;
    background-color: white;
  }
  .remindSet{
    text-align: center;
    position: relative;
    height: 2rem;
  }
  .remindSet>i{
    font-size: 0.8rem;
    color: orange;
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
</style>
