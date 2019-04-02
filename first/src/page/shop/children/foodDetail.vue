<template>
  <!--商家详情整个页面-->
  <div class="foodDetailWrap">
    <!--活动与属性页面-->
    <div class="foodDetailHead">
      <p>活动与属性</p>
      <ul class="activity">
        <li>
          <span class="spanAF">减</span>
          <span>满30减5(APP专享)</span>
        </li>
        <li>
          <span class="spanAS">保</span>
          <span>满30减5(APP专享)</span>
        </li>
        <li>
          <span class="spanAT">准</span>
          <span>满30减5(APP专享)</span>
        </li>
        <li>
          <span class="spanAL">票</span>
          <span>满30减5(APP专享)</span>
        </li>
      </ul>
    </div>
    <!--食品监督安全公示页面-->
    <div class="foodDetailSafe">
      <p class="foodDetailSafeF">
        <span class="safePage">食品监督安全公示</span>
        <span @click="toShopSafe" class="goSafePage"><i class="iconfont pull-right ">企业认证详情 &#xe634 </i></span>
      </p>
      <div>
        <div></div>
        <span>监督检查结果:</span>
        <span>差</span>
        <p>检查结果</p>
      </div>
    </div>
    <!--商家信息部分-->
    <div class="businessInfo">
      <p>商家信息</p>
      <ul>
        <li>你大爷</li>
        <li>地址:</li>
        <li>营业时间:</li>
        <li>
          <span>营业执照</span>
          <i class="iconfont pull-right "> &#xe634 </i>
        </li>
        <li>
          <span>餐饮服务许可证</span>
          <i class="iconfont pull-right "> &#xe634 </i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 商铺信息页
export default {
  name: "foodDetail",
  data(){
    return{
      // 当前选中的商家
      nowStoreDetail:'',
      http:'//elm.cangdu.org/img/',
    }
  },
  computed:{
    // 存储当前选中的食商家数据
    nowStore(){
      return this.$store.state.dome.singleStore
    }
  },
  watch:{
    nowStore:{
      handler() {
        console.log(this.nowStoreDetail)
        this.nowStoreDetail = this.$store.state.dome.singleStore
      },
      immediate:true,
      deep:true
    }
  },
  methods:{
    toShopSafe(){
      this.$router.push({name:'shopSafe'})
    }
  }
}
</script>

<style scoped>
  /*商家详情整个页面*/
  .foodDetailWrap{
    width: 100%;
    margin-top: 0.2rem;
  }
  /*活动与属性页面*/
  .foodDetailHead{
    background-color: white;
    height: 2rem;
    width: 100%;
    padding: 0.15rem;
  }
  .foodDetailHead>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .activity>li>span+span{
    color:gray;
  }
  .activity>li{
    margin-bottom: 0.08rem;
  }
  .spanAF{
    color:white;
    background-color: red;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  .spanAS,.spanAL{
    color:white;
    background-color: gray;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  .spanAT{
    color:white;
    background-color: blue;
    padding: 0.02rem;
    border-radius: 10%;
    margin-right: 0.1rem;
  }
  /*食品监督安全公示页面*/
  .foodDetailSafe{
    background-color: white;
    margin-top: 0.1rem;
    height: 1.5rem;
    width: 100%;
    padding: 0.15rem;
  }
  .foodDetailSafeF{
    border-bottom:0.01rem solid #E3E3E3;
    height: 0.4rem;
  }
  .safePage{
    font-size:0.2rem;
  }
  .goSafePage{
    font-size:0.18rem;
    color: lightgray;
    width: 50%;
    height:0.4rem;
  }
  /*商家信息部分*/
  .businessInfo{
    background-color: white;
    margin-top: 0.1rem;
    height: 3rem;
    width: 100%;
    padding: 0.15rem;
  }
  .businessInfo>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .businessInfo>ul>li{
    margin-bottom: 0.08rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .businessInfo>ul>li+li{
    border-top:0.01rem solid #E3E3E3;
  }
</style>
