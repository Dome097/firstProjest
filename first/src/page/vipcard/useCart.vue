<template>
  <div class="exchangeBox">
    <p class="exchangeHead">成功兑换后将关联到当前账号: <strong>{{nowUserName}}</strong></p>
    <input type="text" placeholder="请输入10位卡号" oninput="if(value.length > 10)value = value.slice(0, 10)" v-model="input1" class="input1">
    <input type="text" placeholder="请输入6位卡密" oninput="if(value.length > 6)value = value.slice(0, 6)" v-model="input2" class="input2" >
    <button  @click="exchangeVip" :disabled="input1.length == 10 && input2.length == 6 ? false : true"  :class="{sb:input1.length == 10 && input2.length == 6 ? true : false}">兑换</button>
    <div class="hint">
      <p class="hintR">----温馨提示----</p>
      <div class="hintContent">
        <p>新兑换的会员服务,权益以「会员说明」为准。</p>
        <P>月卡: 30次减免配送费。</P>
        <P>季卡: 90次减免配送费。</P>
        <P>年卡: 360次减免配送费。</P>
        <P>*仅限蜂鸟专送订单,每日最多减免3单,每单最高减免4元(一个月按31天计算)</P>
      </div>
    </div>
    <div v-if="!show" :modal = false class="animated heartBeat alertBox1">
      <div class="remindSet">
        <i class="iconfont">&#xe632;</i>
        <p>无效的卡号</p>
        <button @click="sureSet" class="btn">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
// 使用卡号购买
export default {
  name: "useCart",
  data(){
    return {
      input1:'',
      input2:'',
      show:true,
      nowUserName:''
    }
  },
  methods:{
    exchangeVip(){
      this.show = false
    },
    sureSet(){
      this.show = true
    },
  },
  computed:{
    nowUser(){
      // console.log("dome",this.$store.state.ghc.userInfo)
      return this.$store.state.ghc.userInfo
    }
  },
  watch:{
    nowStore:{
      handler() {
        // console.log("dome",this.$store.state.ghc.userInfo.username)
        this.nowUserName = this.$store.state.ghc.userInfo.username
      },
      immediate:true,
      deep:true
    }
  },
}
</script>

<style scoped>
  .exchangeBox{
    width: 100%;
    height: 100%;
  }
  .exchangeHead{
    width: 100%;
    height: 0.3rem;
    padding: 0.1rem;
  }
  .input1{
    width: 100%;
    height: 0.4rem;
    padding-left: 0.15rem;
    background-color: white;
    border-bottom: 0.01rem solid #E3E3E3;
  }
  .input2{
    width: 100%;
    height: 0.4rem;
    padding-left: 0.15rem;
    background-color: white;
  }
  button{
    width: 90%;
    height: 0.3rem;
    background-color: gray;
    border-radius: 0.08rem;
    color: white;
    margin: 0.1rem auto;
    display: table;
  }
  .hintR{
    text-align: center;
    font-size: 0.16rem;
  }
  .hintContent{
    width: 100%;
    padding:0.05rem 0.1rem 0 0.4rem ;
  }
  .hintContent>p{
    font-size: 0.12rem;
  }
  .sb{
    background-color: limegreen;
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
