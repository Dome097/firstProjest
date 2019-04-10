<template>
  <div id="domeShoppingCartComponent">
    <!--遮罩淡入淡出动画-->
    <transition name="dome3">
      <div class="dome-shade" v-if="draw" @click.self="cartArr[0]?draw=!draw:null"></div>
    </transition>
    <div id="domeBuyCart">
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
          <div></div>
          <!--当前商品容器-->
          <div>
            <div class="dome-commodity-box" v-for="(item, index) in cartArr" :key="index">
              <!--商品名-->
              <div class="dome-commodity">
                <span>{{item.name}}</span>
              </div>
              <!--单价-->
              <div class="dome-univalence">
                <span>¥{{item.price}}</span>
              </div>
              <!--添加删除容器-->
              <div class="dome-plus-minus">
                <!--减少一件-->
                <i class="iconfont" @click="domeDelete(item)">&#xe605;</i>
                <!--当前数量-->
                <span>{{item.dome}}</span>
                <!--添加一件-->
                <i class="iconfont" @click="domeAdd(item)">&#xe635;</i>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!--底部容器-->
      <div class="dome-foot" @click.self="cartArr[0]?draw=!draw:null">
        <!--购物车容器-->
        <!--<transition  name="dome">-->
          <div class="dome-cart left" :class="{domeBackgroundColor:cartArr[0],suofang:addZ1}"@click="cartArr[0]?draw=!draw:null">
          <!--购物车总数量-->
          <span class="classifyCount" v-if="cartArr[0]">{{cartAmount}}</span>
          <!--购物车i标签-->
          <i class="iconfont dome-cart-i" >&#xe64f;</i>
        </div>
        <!--</transition>-->
        <!--价格与配送费容器-->
        <div class="dome-price-freight" @click="cartArr[0]?draw=!draw:null">
          <!--当前金额-->
          <p class="dome-price">¥ {{totalPrices?totalPrices:'00'}}.00</p>
          <!--配送费-->
          <p class="dome-freight">配送费¥{{domeCarriage}}</p>
        </div>
        <!--结算容器-->
        <span class="dome-affirm" :class="{domeBackgroundColorRight:cartArr[0]}" @click="goPayment">{{cartArr[0]?`去结算`:`还差¥${'20'}元起送`}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "buyCart",
  data () {
    return {
      // 控制上拉下拉
      draw:false,
      totalPrices:0,
      foodsArr:[],
      cartAmount:0,
      addZ1:'',
      // 购物车中的数据
      cartArr:[],
      // 配送费
      domeCarriage:0
    }
  },
  computed: {
    arr () {
      // 整体大对象
      return this.$store.state.dome.allCartSingleFood
    },
    addZ () {
      return this.$store.state.dome.addZ
    }
  },
  watch:{
    addZ: {
      handler() {
        this.addZ1 = this.$store.state.dome.addZ
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
    },
    arr: {
      handler() {
        let arr = []
        for (let obj of this.$store.state.dome.allCartSingleFood) {
          for (let obj1 of obj.foods) {
            for (let obj2 of obj1.specfoods) {
              if (obj2.dome !== 0){
                arr.push(obj2)
              }
            }
          }
        }
        this.cartArr = arr
        console.log('this.cartArr',this.cartArr)
        this.domeCarriage = this.$store.state.dome.singleStore.float_delivery_fee
        this.cartAmount = 0
        this.totalPrices = 0
        for (let prices of this.cartArr) {
          this.cartAmount += prices.dome
          this.totalPrices += prices.price * prices.dome
        }
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
    }
  },
  methods: {
    // 清空购物车
    domeEmpty () {
      this.draw = false
      this.$store.commit({type:'emptySingleFood'})
      this.totalPrices = '00'
    },
    // 向购物车添加一件
    domeAdd (i) {
      console.log('向购物车添加的加号传来的参数i',i)
      // i.dome++
      this.$store.commit({type:'cartAddSingleFood',data:i})
      // console.log('singleStore',this.$store.state.dome.singleStore)
    },
    // 向购物车删除一件
    domeDelete (i) {
      // i.dome--
      this.$store.commit({type:'cartDeleteSingleFood',data:i})
      console.log('this.cartArr[0]',this.cartArr)
      if (this.cartArr.length === 1 && this.cartArr[0].dome === 0) {
        console.log('没了没了')
        this.draw = false
        this.totalPrices = '00'
      }
    },
    // 去订单结算
    goPayment () {
      let id = this.$store.state.dome.singleStore.id
      let geohash = this.$store.state.dome.singleStore.location
      console.log('id',typeof id)
      // console.log(this.$store.state.dome.)
      if (this.cartArr[0]) {
        // 循环加入购物车
        let arr = []
        for (let obj of this.$store.state.dome.cartSingleFood){
          let objCart = {attrs:[], extra:{}, id:obj.entities.id, name:obj.entities.name, packing_fee:obj.entities.packing_fee, price:obj.entities.price, quantity:obj.quantity, sku_id:obj.entities.sku_id, specs:obj.entities.specs, stock:obj.entities.stock}
          arr.push(objCart)
        }
        console.log('arr1111111111111',arr)
        this.$http({
          method:"POST",
          url:'https://elm.cangdu.org/v1/carts/checkout',
          withCredentials: true, // 默认的
          data:{
            restaurant_id:id,
            geohash: geohash[0]+','+geohash[1],
            entities: [{id:5234}]
          }
        }).then(res => {
          console.log('加入购物车请求返回值',res)
        })
        this.$router.push({name:'confirmOrder'})
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
  /*background-color: black;*/
  /*z-index: 55;*/
}
/*底部容器*/
.dome-foot {
  width: 100%;
  height: 0.50rem;
  color: white;
  display: flex;
  position: fixed;
  bottom: 0;
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
.domeBackgroundColor {
  background-color: #008de1;
}
.domeBackgroundColorRight {
  background-color: #18ff21 !important;
}
/*当前价格*/
.dome-price {
  font-size: 0.2rem;
  /*letter-spacing:0.1rem;*/
  margin: 0;
  line-height: 0.25rem;
}
/*当前配送费*/
.dome-freight {
  font-size: 0.12rem;
  margin: 0;
  line-height: 0.25rem;
}
/*购物车i标签*/
.dome-cart-i {
  font-size: 0.3rem;
  line-height: 0.4rem;
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
  width: 102%;
  max-height: 4.5rem;
  background-color: white;
  position: fixed;
  bottom: 0.5rem;
  overflow-y: scroll;
  /*z-index: 3;*/
}
/*购物车容器*/
.dome-cart-box {
  position: fixed;
  width:100%;
  height: 0.5rem;
  background-color: #ddd;
  line-height: 0.5rem;
  z-index: 66;
}
/*填充体*/
.dome-cart-box+div {
  width:100%;
  height: 0.5rem;
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
  /*position: relative;*/
  /*top: 0.5rem;*/
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  /*z-index: 4;*/
}
/*商品名*/
.dome-commodity {
  position: absolute;
  left: 0rem;
  width: 1rem;
  text-align: center;
  color: black;
  overflow: hidden;
  text-overflow:ellipsis
}
.dome-commodity>span {
  display: inline-block;
  height: 0.5rem;
  width: 1rem;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用*/
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
  width: 0.7rem;
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
/*购物车总数量*/
.classifyCount {
  /*display: inline-block;*/
  background-color: red;
  position: absolute;
  right: -0.05rem;
  color: white;
  top: -0.05rem;
  height: 0.16rem;
  line-height: 0.16rem;
  text-align: center;
  font-size: 0.12rem;
  padding:0 10%;
  border-radius: 50%;
  z-index: 11;
}
/*下拉上拉动画*/
.dome2-enter-active, .dome2-leave-active {
  transition: bottom 1s;
}
.dome2-enter, .dome2-leave-to/* .fade-leave-active below version 2.1.8 */ {
  bottom: -5rem;
}
/*!*遮罩淡入淡出动画*!*/
.dome3-enter-active, .dome3-leave-active {
  transition: background-color 0.5s;
}
.dome3-enter, .dome3-leave-to {
  background-color:  rgba(33,33,33,0);
}
  /*缩放动画*/
.suofang {
  animation: dome 1s;
}
@keyframes dome {
  0%{
    transform:scale(1,1);
  }
  50%{
    transform: scale(1.5,1.5);
  }
  100%{
    transform: scale(1,1);
  }
}
</style>
