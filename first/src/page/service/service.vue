<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-xs-6 left">
        <router-link :to="{}">
          <i class="iconfont">&#xe65a;</i>
          <p>在线客服</p>
        </router-link>
      </div>
      <div class="col-xs-6 right">
        <a>
          <i class="iconfont">&#xe615;</i>
          <p>在线客服</p>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
// 服务中心
export default {
  name: "service"
}
</script>

<style scoped>

</style>
