<template>
  <section class="container-fluid">
    <nav class="nv navbar navbar-fixed-top">
      <a href="###" class="pull-left">ele.me</a>
      <div class="pull-right">
        <span><a href="###">登录</a></span>
        <span>|</span>
        <span><a href="###">注册</a></span>
      </div>
    </nav>
  </section>
</template>

<script>
// 头部公共组件
export default {
  name: "header"
}
</script>

<style scoped>
  .nv>a{
    color: #fff;
    text-decoration: none;
  }
  .pull-right>span>a{
    color: #fff;
    text-decoration: none;
  }
  .nv{
    padding: 0.12rem;
    color: white;
    width: 100%;
    height: 0.2rem;
    background-color: blue;
  }
</style>
