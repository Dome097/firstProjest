<template>
  <section class="container-fluid ads">
    <router-link :to="{name:'add'}"><span>新增地址</span><i class="iconfont">&#xe634;</i></router-link>
  </section>
</template>

<script>
// 地址
export default {
  name: "myaddress"
}
</script>

<style scoped>
.ads{
  width: 100%;
  height: 100%;
  padding: 0;
}
.ads>a{
  height: 0.4rem;
  width: 100%;
  line-height: 0.4rem;
  background-color: white;
  border-top: 0.01rem solid #e4e4e4;
  border-bottom: 0.01rem solid #e4e4e4;
  padding: 0 0.1rem;
  margin-top: 0.2rem;
  text-decoration: none;
  display: inline-block;
}
.ads>a>span{
  float: left;
  color: #000;
}
.ads>a>i{
  float: right;
  color: #a4a4a4;
}
</style>
