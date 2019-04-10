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
        <!--商品-->
      <router-view></router-view>
      <!--<shop-detail></shop-detail>-->
      </div>
      <div class="rightScroll" v-if="!pStyle">
        <!--评价-->
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
  }
}
</script>

<style scoped>
  #shop{
    width: 100%;
  }
  .wrap{
    width: 100%;
    background-color: white;
    height: 0.6rem;
    border-bottom: 0.01rem solid #E4E4E4;
    margin-top: 1rem;
    line-height: 0.5rem;
  }
  .productBtn,.rateBtn{
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
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .content::-webkit-scrollbar{
    display: none;
  }
.leftScroll{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightScroll{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
  .smallBorder{
    width: 0.5rem;
    height: 0.03rem;
    background-color: blue;
    margin: 0 auto;
  }
</style>
