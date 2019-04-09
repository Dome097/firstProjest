<template>
  <section class="container-fluid payment">
    <div class="timer">
      <p>支付剩余时间</p>
      <p>{{compute}}</p>
    </div>
    <p>选择支付方式</p>
    <div class="alipay" @click="payStyleAli">
      <i class="iconfont">&#xe65f;</i>
      <span>支付宝</span>
      <i class="iconfont" :class="{select:alipay}" >&#xe663;</i>
    </div>
    <div class="wechat" @click="payStyleWe">
      <p><i class="iconfont">&#xe650;</i></p>
      <span>微信</span>
      <i class="iconfont" :class="{select:wechat}" >&#xe663;</i>
    </div>
    <div class="pay">
      <button @click="convert">确认支付</button>
    </div>
    <!--提示在APP上设置,模态框-->
    <div
      v-if="popupVisible1"
      :modal = false class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>暂不开放支付功能</p>
        <button @click="sureSet1">确认</button>
      </div>
    </div>
    <!--确认付款时提示-->
    <div
      v-if="popupVisible2"
      :modal = false class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>当前环境无法支付,请打开官方APP进行付款</p>
        <button @click="sureSet2">确认</button>
      </div>
    </div>
  </section>
</template>

<script>
// 付款页
import ComputeTime from "../../components/common/computeTime";
export default {
  name: "payment",
  components: {ComputeTime},
  data(){
    return{
      alipay:false,
      wechat:false,
      popupVisible1:false,
      popupVisible2:false
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
        if (this.$store.state.dome.minute===0&&this.$store.state.dome.second===0){
          this.$router.push({name:'order'})
        }
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
    }
  },
  methods:{
    payStyleAli(){
      this.alipay = !this.alipay;
      this.wechat = false
    },
    payStyleWe(){
      this.wechat = !this.wechat;
      this.alipay = false
    },
    convert(){
      this.popupVisible2 = true
    },
    sureSet1(){
      this.popupVisible1 = false
    },
    sureSet2(){
      this.popupVisible2 = false;
      this.$router.push({name:'order'})
    }
  },
  mounted(){
    this.popupVisible1 = true;
  }
}
</script>

<style scoped>
.payment{
  width: 100%;
  padding: 0;
  background-color: #f5f5f5;
}
  .timer{
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    text-align: center;
    padding: 0.3rem 0;
  }
.timer>p{
  line-height: 0.4rem;
  margin-bottom: 0;
}
.timer>p+p{
  color: #000;
  font-size: 0.26rem;
}
  .payment>p{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    background-color: #f5f5f5;
    padding:0 0.16rem;
    font-size: 0.16rem;
    color: dimgray;
    margin-bottom: 0;
  }
  .alipay, .wechat{
    line-height: 0.8rem;
    padding:0 0.16rem;
    width: 100%;
    height: 0.8rem;
    background-color: white;
    border-bottom: 0.01rem solid #e4e4e4;
    display: inline-block;
    position: relative;
  }
.wechat{
  border-bottom: none;
}
.alipay>i:nth-child(1){
  font-size: 0.5rem;
  color: #008de1;
}
.alipay>span,.wechat>span{
  position: absolute;
  left: 0.8rem;
}
.alipay>i:nth-child(3),.wechat>i{
  float: right;
  font-size: 0.24rem;
  color: darkgray;
}
  .wechat>p{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.5rem;
    background: limegreen;
    margin: 0.1rem 0;
  }
.wechat>p>i{
  color: #fff;
  font-size: 0.4rem;
  display: inline-block;
  line-height: 0.6rem;
  padding: 0 0.04rem;
}
.wechat>.select{
  color: limegreen;
}
.payment>.alipay>.select{
  color: limegreen;
}
.pay>button{
  width: 90%;
  height: 0.4rem;
  margin: 0.1rem 5%;
  background-color: limegreen;
  color: #ffffff;
  border: none;
  border-radius: 0.04rem;
  text-align: center;
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
.timeLimit{
  font-size:0.4rem;
  font-weight: bolder;
}
</style>
