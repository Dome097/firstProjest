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
      <p>
        <span class="safePage">食品监督安全公示</span>
        <i class="iconfont pull-right goSafePage">企业认证详情 &#xe634 </i>
      </p>
      <div>
        <img src="" alt="">
        <span>监督检查结果:</span>
        <span>差</span>
        <p>检查结果</p>
      </div>
    </div>
    <div class="businessInfo">
      <h3>商家信息</h3>
      <ul>
        <li>你大爷</li>
        <li>地址:</li>
        <li>营业时间:</li>
        <li>营业执照</li>
        <li>餐饮服务许可证</li>
      </ul>
    </div>
  </div>
</template>

<script>
// 商铺信息页
export default {
  name: "foodDetail"
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
    height: 1.7rem;
    width: 100%;
    padding: 0.15rem;
  }
  .foodDetailHead>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
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
    height: 1rem;
    width: 100%;
    padding: 0.15rem;
  }
  .goSafePage{

  }
</style>
