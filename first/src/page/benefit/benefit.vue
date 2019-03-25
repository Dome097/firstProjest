<template>
  <section>
    <h2>这是红包页</h2>
    <router-link :to="{name: 'coupon'}">代金券说明</router-link>
    <router-link :to="{name: 'hbDescription'}">红包说明</router-link>
    <router-link :to="{name: 'hbHistory'}">历史红包</router-link>
    <button class="btnExchange navbar-fixed-bottom btn btn-default" @click="goExchange">兑换红包</button>
    <button class="btnCommend navbar-fixed-bottom btn btn-default" @click="goCommend">推荐有奖</button>
    <router-view></router-view>
  </section>
</template>

<script>
// 红包页
export default {
  name: "benefit",
  data () {
    return {
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
  .btnExchange {

  }
  .btnCommend {

  }
</style>
