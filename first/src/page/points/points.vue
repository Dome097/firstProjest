<template>
  <!--用transition 把切换组件页面的容器包含-->
  <transition name="slide-fade">
    <router-view></router-view>
  </transition>
</template>

<script>
// 积分页
export default {
  name: "points"
}
</script>

<style scoped>
  .slide-fade{
    position: absolute;
    left: 0;
    right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
    left:0;
    right:0;
    transform: translateX(2rem);
    opacity: 0;
  }


</style>
