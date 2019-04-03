<template>
  <div class="vipcardBox">
    <p>为账户 <strong>dome</strong> 购买会员</p>
    <div class="vipPower">
      <p class="vipPower">
        <span>会员特权</span>
        <router-link :to="{name:'vipDescription'}">
          <span>会员说明 </span>
          <i class="iconfont">&#xe634</i>
        </router-link>
      </p>
      <p>

      </p>
      <p></p>
    </div>
    <compute-time></compute-time>
  </div>
</template>

<script>
import ComputeTime from "../../components/common/computeTime";
// 会员卡办理页
export default {
  name: "vipcard",
  components: {ComputeTime}
}
</script>

<style scoped>

</style>
