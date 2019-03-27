<template>
    <div class="wrap">
      <div @click="getFoodList" class="productBtn">商品</div>
      <div @click="getRateList" class="rateBtn">评价</div>
    </div>
</template>
<script>
// 单个商铺信息页
export default {
  name: "shopDetail",
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
    color:gray;
    float: left;
    font-size: 0.26rem;

  }
  .rateBtn{

  }
</style>
