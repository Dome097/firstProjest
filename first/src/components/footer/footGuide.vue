<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-bottom">
      <div class="container-fluid nav_icons">
        <router-link :to="{name:'msite'}">
          <i class="iconfont" :class="{fonc:isChoose1}" @click="changeColor1">&#xe722;</i>
          <p>外卖</p>
        </router-link>
        <router-link :to="{name:'search'}" class="router-link-active">
          <i class="iconfont" :class="{fonc:isChoose2}"  @click="changeColor2">&#xe718;</i>
          <p>搜索</p>
      </router-link>
        <router-link :to="{name:'order'}" class="router-link-active">
          <i class="iconfont" :class="{fonc:isChoose3}" @click="changeColor3">&#xe75f;</i>
          <p>订单</p>
        </router-link>
        <router-link :to="{name:'profile'}" class="router-link-active">
          <i class="iconfont" :class="{fonc:isChoose4}" @click="changeColor4">&#xe60b;</i>
          <p>我的</p>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
// 底部公共组件
export default {
  name: "footGuide",
  data(){
    return{
      isChoose1:false,
      isChoose2:false,
      isChoose3:false,
      isChoose4:false
    }
  },
  methods:{
    changeColor1(){
      this.isChoose1 = true;
      console.log(this.isChoose1)

      this.isChoose2 = false;
      this.isChoose3 = false;
      this.isChoose4 = false;
    },
    changeColor2(){
      console.log(222)
      this.isChoose1 = false;
      this.isChoose2 = true;
      this.isChoose3 = false;
      this.isChoose4 = false;
    },
    changeColor3(){
      this.isChoose1 = false;
      this.isChoose2 = false;
      this.isChoose3 = true;
      this.isChoose4 = false;
    },
    changeColor4(){
      this.isChoose1 = false;
      this.isChoose2 = false;
      this.isChoose3 = false;
      this.isChoose4 = true;
    }
  }
}
</script>

<style scoped>
  .fonc{
    color: #008de1 !important;
  }
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
