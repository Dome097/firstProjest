<template>
  <div id="domeBuyCart">
    <!--上拉下拉动画-->
    <transition name="dome2">
      <!--购物车,商品容器-->
      <div class="dome-box">
        <!--购物车容器-->
        <div class="dome-empty">
          <!--购物车-->
          <span>购物车</span>
          <!--清空-->
          <span><i></i>清空</span>
        </div>
        <!--当前商品容器-->
        <div>
          <!--商品名-->
          <span></span>
          <!--单价-->
          <span></span>
          <!--添加删除容器-->
          <span>
          <!--减少一件-->
          <i></i>
            <!--当前数量-->
          <span>{{1}}</span>
            <!--添加一件-->
          <i></i>
        </span>
        </div>
      </div>
    </transition>
    <!--购物车容器-->
    <div class="dome-cart left">
      <!--购物车i标签-->
      <i class="iconfont dome-cart-i">&#xe64f;</i>
    </div>
    <!--价格与配送费容器-->
    <div class="dome-price-freight">
      <!--当前金额-->
      <p class="dome-price">¥ {{"0.00"}}</p>
      <!--配送费-->
      <p class="dome-freight">配送费¥{{5}}</p>
    </div>
    <!--结算容器-->
    <span class="dome-affirm">{{a?`去结算`:`还差¥${'20'}元起送`}}</span>
  </div>
</template>

<script>

export default {
  name: "buyCart",
  data () {
    return {
      arr:[]
    }
  }
}
</script>

<style scoped>
/*根标签*/
#domeBuyCart {
  color: white;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.50rem;
  background-color: black;
}
/*购物车容器*/
.dome-cart {
  position: absolute;
  top: -0.2rem;
  margin-left: 0.2rem;
  background-color: black;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  border: #1e1e1e 0.05rem solid;
  text-align: center;
}
/*购物车有商品时*/
.dome-background-color {
  background-color: #008de1;
}
/*当前价格*/
.dome-price {
  font-size: 0.2rem;
  /*letter-spacing:0.1rem;*/
  margin: 0;
}
/*当前配送费*/
.dome-freight {
  font-size: 0.12rem;
  margin: 0;
}
/*购物车i标签*/
.dome-cart-i {
  font-size: 0.3rem;
}
/*价格与配送费容器*/
.dome-price-freight {
  position: absolute;
  left: 1rem;
}
/*确认订单*/
.dome-affirm {
  position: absolute;
  right: 0;
  width: 1.3rem;
  height: 0.5rem;
  background-color: #a4a4a4;
  text-align: center;
  font-size: 0.16rem;
  line-height: 0.5rem;
}
/*购物车,商品容器*/
.dome-box {
  width: 100%;
  max-height: 5rem;
  background-color: chartreuse;
  position: fixed;
  bottom: 0.5rem;
}
</style>
