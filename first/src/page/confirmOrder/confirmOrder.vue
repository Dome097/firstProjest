<template>
  <section class="container-fluid confirmOrder">
    <div class="deliveryAddres">
      <router-link :to="{}">
        <div class="addressLeft">
          <i class="iconfont">&#xe636;</i>
          <p>
            <span>{{'name'}}</span>
            <span>{{'sex'}}</span>
            <span>{{'telephonenumber'}}</span>
          </p>
          <p>
            <span>{{'company'}}</span>
            <span>{{'adds'}}</span>
          </p>
        </div>
        <div class="addressRight">
          <i class="iconfont">&#xe634;</i>
        </div>
      </router-link>
    </div>
    <div class="arriveTime">
      <p>送达时间</p>
      <div>
        <span>尽快送达</span>
        <span>|</span>
        <span>预计21:10</span>
        <p>蜂鸟专送</p>
      </div>
    </div>
    <div>
      <div>
        <span>支付方式</span>
        <span>{{'在线支付'}} <i class="iconfont">&#xe634;</i> </span>
      </div>
      <div><span>红包</span><span>暂时只在饿了么APP中支持</span></div>
    </div>
    <div>
      <div><img src="" alt=""><span>效果展示</span></div>
      <ul>
        <li><span>{{"kkk"}}</span><span>x{{'6'}}</span><span>¥{{'20'}}</span></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div></div>
  </section>
</template>

<script>
// 确认订单页
export default {
  name: "confirmOrder"
}
</script>

<style scoped>
.confirmOrder{
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: #e4e4e4;
  list-style: none;
}
</style>
