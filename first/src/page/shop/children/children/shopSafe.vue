<template>
  <div class="shopSafeBox">
    <!--食品监督安全公示-->
    <div class="shopSafeBoxHead">
      <p class="foodDetailSafeF">
        <span class="safePage">食品监督安全公示</span>
      </p>
      <div>
        <div></div>
        <span>监督检查结果:</span>
        <span>差</span>
        <p>检查结果</p>
      </div>
    </div>
    <div class="shopSafeBoxMiddle">
      <p>工商登记信息</p>
      <ul>
        <li>企业名称</li>
        <li>工商执照注册号</li>
        <li>注册资本</li>
        <li>注册地址</li>
        <li>属地监管所</li>
        <li>法定代表人</li>
        <li>经营范围</li>
      </ul>
    </div>
    <div class="shopSafeBoxPermit">
      <p>餐饮许可证</p>
      <ul>
        <li>营业范围</li>
        <li>许可证有效期</li>
        <li>许可证号</li>
        <li>发证时间</li>
        <li>发证机关</li>
      </ul>
    </div>
    <div class="shopSafeBoxBottom">
      <p>许可证书</p>
      <div class="imgLayout">
        <img src="//elm.cangdu.org/img/default.jpg" alt="">
        <img src="//elm.cangdu.org/img/default.jpg" alt="">
      </div>
    </div>
  </div>

</template>

<script>
// 商铺认证信息页
export default {
  name: "shopSafe"
}
</script>

<style scoped>
  .shopSafeBox{
    width: 100%;
  }
  .shopSafeBoxHead{
    background-color: white;
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
  .shopSafeBoxMiddle{
    background-color: white;
    margin-top: 0.1rem;
    height: 2.8rem;
    width: 100%;
    padding: 0.15rem;
  }
  .shopSafeBoxMiddle>p,.shopSafeBoxPermit>p{
    border-bottom:0.01rem solid #E3E3E3;
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .shopSafeBoxMiddle>ul>li,.shopSafeBoxPermit>ul>li{
    margin-bottom: 0.08rem;
    height: 0.2rem;
    line-height: 0.2rem;
  }
  .shopSafeBoxPermit{
    background-color: white;
    margin-top: 0.1rem;
    height: 2.1rem;
    width: 100%;
    padding: 0.15rem;
  }
  .shopSafeBoxBottom{
    background-color: white;
    margin-top: 0.1rem;
    height: 2rem;
    width: 100%;
    padding: 0.2rem;
  }
  .shopSafeBoxBottom>p{
    font-size: 0.24rem;
    height: 0.4rem;
  }
  .imgLayout{
    width: 3.3rem;
    height: 1.8rem;
    background-color: #E3E3E3;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .imgLayout>img{
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
