<template>
  <section>
    <h2>这是红包页</h2>
    <div class="box">
      <span class="hB"  :class="" @click="isIf = true">红包</span>
      <span class="chit" @click="isIf = false">商家代金券</span>
    </div>
    <div v-if="isIf">
      <router-link :to="{name: 'hbDescription'}">红包说明</router-link>
      <router-link :to="{name: 'hbHistory'}">查看历史红包></router-link>
      <router-view></router-view>
      <div class="box navbar-fixed-bottom">
        <button class="btnExchange btn btn-default" @click="goExchange">兑换红包</button>
        <button class="btnCommend btn btn-default" @click="goCommend">推荐有奖</button>
      </div>
    </div>
    <div v-if="!isIf">
      <router-link :to="{name: 'coupon'}"><span class="pCircle">?</span>商家代金券说明</router-link>
      <p>无法使用代金券</p>
      <br>
      <p>非客户端或客户端版本过低</p>
      <button class="btn btn-success">下载或升级客户端</button>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
// 红包页
export default {
  name: "benefit",
  data () {
    return {
      isIf: true
    }
  },
  methods: {
    goExchange () {

    },
    goCommend () {

    }
  }
}
</script>

<style scoped>
  .box {
    width: 100%;
    /*background-color: #579022;*/
    display: flex;
  }
  .btnExchange {
    width: 50%;
  }
  .btnCommend {
    width: 50%;
  }
  .hB {
    width: 50%;
    text-align: center;
  }
  .spanColor {
    color: #90B4FC;
  }
  .router-link-active {
    color: #e8290c;
  }
  .chit {
    width: 50%;
    text-align: center;
  }
  .pCircle {
    color: white;
    display: inline-block;
    width: .16rem;
    height: .16rem;
    border-radius: 50%;
    font-size: .16rem;
    background-color: #90B4FC;
    text-align: center;
    line-height: .16rem;
  }
</style>
