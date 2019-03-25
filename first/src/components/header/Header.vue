<template>
  <section class="container-fluid" >
    <!--<nav class="nv navbar navbar-fixed-top">-->
      <!--<router-link class="pull-left" :to="{}">ele.me</router-link>-->
      <!--<div class="pull-right">-->
        <!--<span><router-link :to="{name:'login'}">登录</router-link></span>-->
        <!--<span>|</span>-->
        <!--<span><router-link :to="{name:'login'}">注册</router-link></span>-->
      <!--</div>-->
    <!--</nav>-->
    <!--<nav class="nv navbar navbar-fixed-top" v-if="isdrag">-->
      <!--<router-link class="pull-left" :to="{}"> < </router-link>-->
      <!--<router-link class="pull-center" :to="{}">郑州</router-link>-->
      <!--<router-link class="pull-right" :to="{}">切换城市</router-link>-->
    <!--</nav>-->
    <!--<nav class="nv navbar navbar-fixed-top" v-if="isshow">-->
    <!--<span class="glyphicon glyphicon-search"></span>-->
    <!--<router-link class="pull-center" :to="{}">千山区</router-link>-->
    <!--<div class="pull-right">-->
    <!--<span><router-link :to="{name:'login'}">登录</router-link></span>-->
    <!--<span>|</span>-->
    <!--<span><router-link :to="{name:'login'}">注册</router-link></span>-->
    <!--</div>-->
    <!--</nav>-->
    <nav class="nv navbar navbar-fixed-top" style="height: 1.5rem">
      <img src="../../assets/logo.png" alt="" class="pull-left" style="width: 0.8rem; height: 1rem">
      <div >
        <p>效果演示</p>
        <p>
          <span>商家配送</span>
          <span>/</span>
          <span>分钟送达</span>
          <span>/</span>
          <span>配送费¥5</span>
        </p>
        <span class="pull-right" > > </span>
        <p>公告:欢迎光临,用餐高峰请提前下单,谢谢</p>
        <span class="pull-left leftSmallImg">
          <img src="../../assets/logo.png" alt="" style="width: 0.3rem">
          <span>满30减5,满60减8 (APP专享) </span>
        </span>
        <span class="pull-right">1个活动 > </span>
      </div>


    </nav>
  </section >
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
  .leftSmallImg{
    position: absolute;
    left:0;
    bottom:0.05rem;
  }
</style>
