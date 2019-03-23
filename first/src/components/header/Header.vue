<template>
  <section class="container-fluid" >
    <nav class="nv navbar navbar-fixed-top">
      <router-link class="pull-left" :to="{}">ele.me</router-link>
      <div class="pull-right">
        <span><router-link :to="{}">登录</router-link></span>
        <span>|</span>
        <span><router-link :to="{}">注册123</router-link></span>
      </div>
    </nav>
  </section >
  <!--<section class="container-fluid" v-if="isdrag">-->
    <!--<nav class="nv navbar navbar-fixed-top">-->
      <!--<router-link class="pull-left" :to="{}"> < </router-link>-->
      <!--<router-link class="pull-center" :to="{}">郑州</router-link>-->
      <!--<router-link class="pull-right" :to="{}">切换城市</router-link>-->
    <!--</nav>-->
  <!--</section>-->
</template>

<script>
// 头部公共组件
export default {
  name: "Header",
  // data(){
  //   return {
  //     flag:false
  //   }
  // }
}
</script>

<style scoped>
  .nv a{
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
