<template>
  <div id="shop">
    <div class="wrap">
      <div @click="pStyle=true" class="productBtn" :class="{style:pStyle}">
        商品
        <div v-if="pStyle" class="smallBorder"></div>
      </div>
      <div @click="pStyle=false" class="rateBtn" :class="{style:!pStyle}">
        评价
        <div v-if="!pStyle" class="smallBorder"></div>
      </div>
    </div>
    <div class="content">
      <div class="leftScroll" v-if="pStyle">
        <shop-detail></shop-detail>
      </div>
      <div class="rightScroll" v-if="!pStyle">
        <rating-star></rating-star>
      </div>
    </div>
    <buy-cart></buy-cart>
  </div>
</template>

<script>
// 商品筛选页
import RatingStar from "../../components/common/ratingStar";
import ShopDetail from "./children/shopDetail";
import BuyCart from "../../components/common/buyCart";

export default {
  name: "shop",
  components: {BuyCart, ShopDetail, RatingStar},
  data(){
    return {
      pStyle:true
    }
  },
  methods:{

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
  .style{
    color:blue;
  }
  .smallBorder{
    width: 0.5rem;
    height: 0.02rem;
    background-color: blue;
    margin: 0 auto;
  }
</style>
