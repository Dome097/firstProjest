<template>
  <div class="invoiceBox">
    <img src="../../images/no-log.png" alt="">
    <p>没有购买记录</p>
  </div>
</template>

<script>
// 购买记录
export default {
  name: "invoiceRecord"
}
</script>

<style scoped>
  .invoiceBox{
    width: 100%;
    height: 100%;
  }
  img{
    margin-top: 1.6rem;
    margin-left: 0.3rem;
  }
  p{
    margin-top: 0.15rem;
    margin-left: 1.2rem;
    color: gray;
  }
</style>
