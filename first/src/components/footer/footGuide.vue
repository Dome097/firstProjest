<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-bottom">
      <div class="container-fluid nav_icons">
        <router-link :to="{}">
          <i class="iconfont">&#xe722;</i>
          <p>外卖</p>
        </router-link>
        <router-link :to="{}">
          <i class="iconfont">&#xe718;</i>
          <p>搜索</p>
      </router-link>
        <router-link :to="{}">
          <i class="iconfont">&#xe75f;</i>
          <p>订单</p>
        </router-link>
        <router-link :to="{}">
          <i class="iconfont">&#xe60b;</i>
          <p>我的</p>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
// 底部公共组件
export default {
  name: "footGuide"
}
</script>

<style scoped>
  .nav_icons{
    display: flex;
    justify-content: space-between;
  }
  .nav_icons>a{
    text-align: center;
    /*line-height: 0.16px;*/
    display: inline-block;
    text-decoration: none;
  }
  .nav_icons>a>i{
    color: #000;
  }
  .nav_icons p{
    color: #000;
  }
</style>
