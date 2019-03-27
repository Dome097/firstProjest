<template>
  <section>
    <input type="text" placeholder="请输入兑换码" class="form-control" v-model="exchange_code">
    <input type="text" placeholder="验证码" class="form-control authCode" v-model="captcha_code">
    <span class="authCodeBox form-control">
      <img :src="src" alt="">
      <span>
        <p>看不清</p>
        <p @click="gainAuthCode">换一张</p>
      </span>
    </span>
    <button @click="reqExchange" class="btn btn-primary btn-lg btn-block ">兑换</button>

  </section>
</template>

<script>
import { MessageBox } from 'mint-ui';
// 兑换红包
export default {
  name: "exchange",
  data () {
    return {
      src: '',
      id: 24444,
      exchange_code:'',
      captcha_code:''
    }
  },
  methods: {
    // 兑换
    reqExchange () {
      this.$http({
        method: 'post',
        url: `https://elm.cangdu.org/v1/users/${this.id}/hongbao/exchange`,
        //https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials
        //用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
        data: {
          exchange_code:this.exchange_code-0,
          captcha_code:this.captcha_code-0
        },
        withCredentials: true, // 默认false
      }).then((res) => {
        console.log('tap', res);
        this.src = res.data.code
        MessageBox.alert(res.data.message);
        this.gainAuthCode ()
      })
    },
    // 换一张
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
    }
  },
  mounted () {
    // 验证码请求
    this.$http({
      method: 'post',
      url: 'https://elm.cangdu.org/v1/captchas',
      withCredentials: true, // 默认false
    }).then((res) => {
      console.log('tap', res);
      this.src = res.data.code
    })
  }
}
</script>

<style scoped>
.authCode {
  width: 65%;
  float: left;
}
.authCodeBox {
  float: right;
  width:32%;
  height: 100%;
  margin-top: 0.1rem;
  background-color: white;
}
.form-control {
  height: 0.5rem;
}
input {
  margin-top: 0.1rem;
}
img {
  width: 0.5rem;
  float: left;
  margin-top: 0.07rem;
}
  p {
    margin: 0;
    font-size: 0.12rem;
  }
p:nth-child(2) {
  color: #90B4FC;
}
button {
  width:96%;
  margin: 0.8rem auto 0;
}
</style>
