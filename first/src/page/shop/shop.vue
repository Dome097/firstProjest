<template>
  <div id="shop">
    <div class="wrap">
      <div @click="getFoodList" class="productBtn" :class="{pStyle:true}">商品</div>
      <div @click="getRateList" class="rateBtn">评价</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// 商品筛选页
export default {
  name: "shop",
  data(){
    return {
    }
  },
  methods:{
    getFoodList(){

    },
    getRateList(){
      this.$router.push({name:'ratingStar'})
    }
  }
}
</script>

<style scoped>
  .wrap{
    width: 100%;
    background-color: white;
    height: 0.5rem;
    border-bottom: 0.01rem solid #E4E4E4;
    margin-top: 0.9rem;
    line-height: 0.5rem;
  }
  .productBtn, .rateBtn{
    width: 50%;
    text-align: center;
    float: left;
    font-size: 0.26rem;
  }
  .productBtn>a, .rateBtn>a{
    color:gray;
  }

</style>
