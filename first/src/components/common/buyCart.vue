<template>
  <div id="domeShoppingCartComponent">
    <!--遮罩淡入淡出动画-->
    <transition name="dome3">
      <div class="dome-shade" v-if="false"></div>
    </transition>
    <div id="domeBuyCart" @click="arr[0]?draw=!draw:null">
      <!--上拉下拉动画-->
      <transition name="dome2">
        <!--购物车,商品容器-->
        <div class="dome-box" v-if="draw" >
          <!--购物车容器-->
          <div class="dome-cart-box">
            <!--购物车-->
            <span class="dome-cart-text left">购物车</span>
            <!--清空-->
            <span class="dome-empty right" @click="domeEmpty"><i class="iconfont">&#xe626;</i> 清空</span>
          </div>
          <!--当前商品容器-->
          <div class="dome-commodity-box" v-for="(item, index) in arr" :key="index">
            <!--商品名-->
            <div class="dome-commodity">
              <span>{{item.name}}</span>
            </div>
            <!--单价-->
            <div class="dome-univalence">
              <span>¥{{item.univalence}}</span>
            </div>
            <!--添加删除容器-->
            <div class="dome-plus-minus">
            <!--减少一件-->
              <i class="iconfont" @click="domeDelete(item)">&#xe605;</i>
              <!--当前数量-->
              <span>{{1}}</span>
              <!--添加一件-->
              <i class="iconfont" @click="domeAdd(item)">&#xe635;</i>
            </div>
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
      <span class="dome-affirm" @click="goPayment">{{a?`去结算`:`还差¥${'20'}元起送`}}</span>
    </div>
  </div>

</template>

<script>

export default {
  name: "buyCart",
  data () {
    return {
      // 控制上拉下拉
      draw:false
    }
  },
  computed: {
    arr () {
      return this.$store.state.dome.cartSingleFood
    }
  },
  methods: {
    // 清空购物车
    domeEmpty () {
      this.$store.commit({type:'emptySingleFood'})
    },
    // 向购物车添加一件
    domeAdd (i) {
      this.$store.commit({type:'addSingleFood',data:i})
    },
    // 向购物车删除一件
    domeDelete (i) {
      this.$store.commit({type:'addSingleFood',data:i})
    },
    // 去订单结算
    goPayment () {
      if (this.arr[0]) {
        this.$router.push({name:'payment'})
      } 
    }
  }
}
</script>

<style scoped>
/*根标签*/
#domeShoppingCartComponent {
  width: 100%;
  height: 100%;
}
/*购物车组件容器*/
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
  max-height: 4.5rem;
  background-color: white;
  position: fixed;
  bottom: 0.5rem;
  overflow-y: scroll;
}
/*购物车容器*/
.dome-cart-box {
  position: fixed;
  width:100%;
  height: 0.5rem;
  background-color: #ddd;
  line-height: 0.5rem;
  z-index: 3;
}
/*仅仅是购物车三个字*/
.dome-cart-text {
  width: 1rem;
  text-align: center;
  height: 0.5rem;
  color: black;
}
/*清空*/
.dome-empty {
  color: black;
  width: 1rem;
  line-height: 0.5rem;
}
/*当前商品容器*/
.dome-commodity-box {
  position: relative;
  top: 0.5rem;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
}
/*商品名*/
.dome-commodity {
  position: absolute;
  left: 0rem;
  width: 1rem;
  text-align: center;
  color: black;
}
/*单价*/
.dome-univalence {
  position: absolute;
  right: 0.5rem;
  width: 1rem;
  text-align: center;
  color: red;
}
/*添加或删除*/
.dome-plus-minus {
  position: absolute;
  right: 0.1rem;
  width: 0.5rem;
  text-align: center;
  color: black;
}
/*添加或删除中的i*/
.dome-plus-minus>i {
  color: blue;
}
/*遮罩*/
.dome-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba(33,33,33,0.5);
}
/*!*遮罩淡入淡出动画*!*/
/*.dome3-enter-active, .dome3-leave-active {*/
  /*transition: background-color 1s;*/
/*}*/
/*.dome3-enter, .dome3-leave-to {*/
  /*background-color:  rgba(33,33,33,0);*/
/*}*/
</style>
