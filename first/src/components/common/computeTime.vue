<template>
  <div class="computerTimeBox">
    <div id="Time">
      <p class="paymentTime">支付剩余时间</p>
      <p class="timeLimit">{{compute}}</p>
    </div>
    <div v-if="popupVisible1" :modal = false class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>支付超时</p>
        <button @click="sureSet">确认</button>
      </div>
    </div>
    <p class="paymentMode">选择支付方式</p>
    <div class="paymentModeC">
        <p class="paymentZ">
          <img src="../../images/zhifubao.png" alt="">
          <span>支付宝</span>
          <i class="iconfont pull-right confirm1" @click="pStyle=!pStyle" :class="{style:pStyle}">&#xe604;</i>
        </p>
        <p class="paymentW">
          <img src="../../images/weixin.png" alt="">
          <span>微信</span>
          <i class="iconfont pull-right confirm1" @click="pStyle=!pStyle" :class="{style:!pStyle}">&#xe604;</i>
        </p>
      </div>
      <div class="confirmPayment">确认支付</div>
    </div>

</template>

<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
// 倒计时组件
export default {
  name: "computeTime",
  data(){
    return {
      pStyle:true,
      popupVisible1:false
    }
  },
  computed:{
    compute:{
      get () {
        return `00:${this.$store.state.dome.minute/10<1?'0'+this.$store.state.dome.minute:this.$store.state.dome.minute}:${this.$store.state.dome.second/10<1?'0'+this.$store.state.dome.second:this.$store.state.dome.second}`
      },
      set () {
        this.$store.commit({type:'getComputeTime'})
      }
    }
  },
  watch: {
    compute: {
      handler () {
        if (this.$store.state.dome.minute===0&&this.$store.state.dome.second===0)
          this.popupVisible1 = true;
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
    }
  },
  methods: {
    sureSet(){
      this.popupVisible1 = false
    }
  },
  mounted () {
      this.$store.commit({type:'getComputeTime'})
  }
}
</script>

<style scoped>
  .computerTimeBox{
    width: 100%;
    height: 100%;
  }
  #Time{
    width: 100%;
    height: 1.5rem;
    background-color: white;
    text-align: center;
  }
  .paymentTime{
    padding-top: 0.3rem;
  }
  .timeLimit{
    font-size:0.4rem;
    font-weight: bolder;
  }
  .paymentMode{
    width: 100%;
    height: 0.3rem;
    padding: 0.05rem 0 0.05rem 0.1rem;
  }
  .paymentModeC{
    width: 100%;
    height: 1.3rem;
    background-color: white;
    padding: 0.1rem;
  }
  .paymentZ{
    width: 100%;
    border-bottom: 0.01rem solid #E3E3E3;
    padding-bottom: 0.1rem;
  }
  .paymentZ>img,.paymentW>img{
    width: 0.45rem;
    height: 0.45rem;
  }
  .confirmPayment{
    width: 80%;
    height: 0.3rem;
    margin: 0.1rem auto;
    text-align: center;
    background-color: #4cd964;
    line-height: 0.3rem;
    color: white;
    font-weight: bolder;
    border-radius: 0.05rem;
  }
  .confirm1{
    color:white;
    width: 0.25rem;
    height: 0.25rem;
    background-color: gray;
    padding: 0.04rem;
    border-radius: 50%;
  }
  .style{
    background-color: #4cd964;
  }
  .alertBox1{
    position: fixed;
    left: 15%;
    top: 20%;
    width: 70%;
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
