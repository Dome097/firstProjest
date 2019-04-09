<template>
  <div class="vipcardBox">
    <p class="buyVip">为账户 <strong>{{nowUserName}}</strong> 购买会员</p>
    <div class="vipPower">
      <p class="vipPowerHead">
        <span>会员特权</span>
        <router-link :to="{name:'vipDescription'}" class="vipDesR pull-right">
          <span>会员说明 </span>
          <i class="iconfont">&#xe634</i>
        </router-link>
      </p>
      <div class="vipPowerFirst">
        <img src="../../images/sheng.jpeg" class="pull-left">
        <div class="vipPowerFirstR">
          <p class="vipPowerFirstRF">减免配送费</p>
          <p class="vipcardp2">每月减免30单,每日可减免3单,每单最高减4元</p>
          <p class="vipcardp2">蜂鸟专送专享</p>
        </div>
      </div>
      <div class="vipPowerLast">
        <img src="../../images/jifen.jpeg" class="pull-left">
        <div class="vipPowerFirstS">
          <p>减免配送费</p>
          <p class="vipcardp2">每月减免30单,每日可减免3单,每单最高减4元</p>
          <p class="vipcardp2">蜂鸟专送专享</p>
        </div>
      </div>
    </div>
    <div class="openVip">
      <p class="openVipHead">开通会员</p>
      <p>
        <span>1个月</span>
        <span class="openVipPrice">¥20</span>
        <span class="openVipBuy pull-right" @click="toComputeTime">购买</span>
      </p>
    </div>
    <div class="exchangeVip">
      <span>兑换会员</span>
      <router-link :to="{name:'useCart'}" class="exchangeVipR pull-right">
        <span class="s1">使用卡号卡密</span>
        <i class="iconfont ">&#xe634</i>
      </router-link>
    </div>
    <div class="purchaseRecords">
      <span>购买记录</span>
      <router-link :to="{name:'invoiceRecord'}" class="exchangeVipR pull-right">
        <span class="s1">开发票</span>
        <i class="iconfont">&#xe634</i>
      </router-link>
    </div>
  </div>
</template>

<script>
// 会员卡办理页
export default {
  name: "vipcard",
  data(){
    return {
      nowUserName:''
    }
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
  methods:{
    toComputeTime(){
      this.$router.push({name:'computeTime'})
    }
  }
}
</script>

<style scoped>
  .vipcardBox{
    width: 100%;
  }
  .vipcardBox a{
    text-decoration: none;
  }
  .buyVip{
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.2rem;
    padding-left: 0.1rem;
  }
  .vipPower{
    background-color: white;
    width: 100%;
    height: 2.7rem;
    padding: 0.1rem;
  }
  .vipPowerHead{
    width: 100%;
    border-bottom:0.01rem solid #E3E3E3;
    padding-bottom:0.1rem ;
  }
  .vipDesR{
    color: gray;
    font-size: 0.14rem;
  }
  .vipPowerFirst{
    border-bottom:0.01rem solid #E3E3E3;
    padding-bottom:0.1rem ;
    height:1rem ;
  }
  .vipPowerFirstR,.vipPowerFirstS{
    margin-left: 0.7rem;
  }
  .vipPowerFirst>img,.vipPowerLast>img{
    width: 0.5rem;
    height: 0.5rem;
  }
  .vipcardp2{
    font-size: 0.12rem;
    color: gray;
  }
  .vipPowerLast{
    padding-bottom:0.1rem ;
    padding-top:0.1rem;
    height:1rem ;
  }
  .openVip{
    width: 100%;
    height: 0.9rem;
    background-color: white;
    margin-top: 0.1rem;
    padding: 0.1rem;
  }
  .openVipHead{
    border-bottom:0.01rem solid #E3E3E3;
    padding-bottom:0.1rem ;
  }
  .openVipPrice{
    color: orange;
    font-weight: bolder;
  }
  .openVipBuy{
    border: 0.01rem solid orange;
    color: orange;
    padding: 0.02rem 0.1rem;
    border-radius: 0.04rem;
  }
  .exchangeVip,.purchaseRecords{
    width: 100%;
    height: 0.4rem;
    background-color: white;
    margin-top: 0.1rem;
    padding: 0.1rem;
  }
 .exchangeVipR{
   color: gray;
   font-size: 0.14rem;
 }

</style>
