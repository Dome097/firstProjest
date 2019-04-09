<template>
  <div  class="shopDetailBox" >
   <!--左侧部分,左列表点击调用-->
    <aside ref="l_list" class="l_list">
      <ul>
        <li ref="l_item" :class="{act:index === actli}"
            @click="change(index, item)" v-for="(item,index) in shopGoodsArr" :key="index">
          <!--分类选中数量-->
          <span v-if="classifyPitch[index] !== 0" class="classifyCount">{{classifyPitch[index]}}</span>
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
    </aside>
    <!--右侧部分-->
    <section class="r_list " ref="r_list">
      <div>
        <!--在需要跳转到的区块上添加ref属性用于标识-->
        <div v-for="(it,i) in shopGoodsArr" :key="i"  ref="productArr">
          <p class="title">
            <span class="title_name">{{it.name}}</span>
            <span>{{it.description}}</span>
            <span class="pull-right " @click="pStyle=!pStyle" :class="{style:pStyle}">...</span>
            <span v-if="pStyle" class="right-hide">
              <span class="trigon"></span>
              <span class="title_name">{{it.name}}</span>
              <span>{{it.description}}</span>
            </span>
          </p>
          <ul>
            <li class="list" v-for="(item,index) in it.foods" :key="index" @click="toSingleFoodDetail(item)">
                <div class="flex">
                  <div class="newP" v-if="item.attributes[0]">新品</div>
                <p ><img :src="http+item.image_path"  alt=""></p>
                <div>
                  <p class="name">{{item.name}}</p>
                  <p class="nameDes">{{item.description}}</p>
                  <p class="sale">月售{{item.month_sales}}份   好评率{{item.satisfy_rate}}%</p>
                  <span class="mark" v-if="item.activity">{{item.activity.image_text}}</span>
                  <p class="price">
                    <span class="priceP">¥{{item.specfoods[0].price}}</span>
                    <span>起</span>
                  </p>
                  <div class="addVesse2" v-if="item.specfoods[0].specs[0]">
                    <p class="domeP" v-if="domeP">请在购物车内删除</p>
                    <div class="add" @click.stop="domeSpecification(item)">规格</div>
                    <span>
                    <i class="iconfont" @click.stop="guigeClick" v-if="item.dome">&#xe605;</i>
                      <!--给对象添加一个属性-->
                    <span>{{item.dome?item.dome:null}}</span>
                  </span>
                  </div>
                  <!--添加容器-->
                  <div v-else class="addVessel">
                      <i class="iconfont add1" :class="{addZ: addZ}" @click.stop="toShopCart(item,index, $event)">&#xe635;</i>
                    <span>
                      <transition name="dome">
                                            <i class="iconfont minus1" v-if="item.dome" @click.stop="deleteShopCart(item,index)" >&#xe605;</i>
                      </transition>
                      <!--给对象添加一个属性-->
                    <span class="domeSpanCount ">{{item.dome?item.dome:null}}</span>
                  </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!--规格容器-->
    <div class="specification" v-if="guige">
      <!--标题容器-->
      <div class="domeTitle">
        <span class="domeTitleText">{{title}}
          <!--点击隐藏事件-->
          <span class="iconfont right" @click="guige = false;pitchOn=0">&#xe676;</span>
        </span>
      </div>
      <!--属性容器-->
      <div class="domeProperty">
        <p>{{'规格'}}</p>
        <span @click="pitchOn = index" v-for="(item, index) in guigeObj.specfoods" v-if="item.specs_name" :class="{domePitchOn:index === pitchOn}">{{item.specs_name}}</span>
      </div>
      <!--价钱和加入购物车容器-->
      <div class="priceAndCart">
        <!--价格-->
        <span class="left domePrice"><span>¥</span> {{guigeObj.specfoods[pitchOn].price}}</span>
        <!--加入购物车-->
        <span @click="joinCart" class="right domeCart">{{'加入购物车'}}</span>
      </div>
    </div>
    <div id="ball">
      <i class="iconfont add1">&#xe635;</i>
    </div>
    <div class="domeStick">
      <i class="iconfont" @click="domeStick">&#xe64e;</i>
    </div>
  </div>
</template>
<script>
  import Better from 'better-scroll'
  import Vue from 'vue'
  import { MessageBox } from 'mint-ui';
  // 单个商铺信息页
export default {
  name: "shopDetail",
  data(){
    return {
      actli:0,
      scrollY: 0,
      // 初始化一个数组用于存储小列表距离顶部的距离：
      arr: [0],
      flag:true,
      show:false,
      shopGoods:'',
      shopGoodsArr:[],
      http:'//elm.cangdu.org/img/',
      rgt:'',
      left:'',
      pStyle:false,
      // 控制规格显隐
      guige:false,
      // 规格title
      title: '',
      // 规格对象
      guigeObj: {},
      // 选中规格
      pitchOn: 0,
      // 单个分类选中数量
      classifyPitch:[],
      // 控制加号层级
      addZ:false,
      // 控制删减提示p标签
      domeP:false,
      // 阻止连续点击
      continuous:1
    }
  },
  computed:{
   goods () {
       return this.$store.state.dome.singleStore
    },
    // 所有对象
    allShopGoodsArr () {
      return this.$store.state.dome.allCartSingleFood
    }
    // 提取购物车中的数量
    // domeQuantity (vue1,m,a) {
    //   console.log('计算属性的vue1',vue1)
    //   console.log('计算属性的m',m)
    //   console.log('计算属性的a',a)
    //       Vue.set(m,'dome',this.$store.state.dome.cartSingleFood[a].quantity)
    //   console.log('加上了吗?',m.dome)
    //  return this.$store.state.dome.cartSingleFood
    // }
  },
  watch:{
      allShopGoodsArr: {
      handler(){
        this.shopGoodsArr = this.$store.state.dome.allCartSingleFood
        console.log('this.shopGoodsArr是',this.shopGoodsArr)
        let domeArr = []
        for (let obj of this.$store.state.dome.allCartSingleFood) {
          let count = 0
          for (let foodsObj of obj.foods) {
            count += foodsObj.dome
          }
          domeArr.push(count)
        }
        this.classifyPitch = domeArr
        console.log('this.classifyPitch是',this.classifyPitch)
        // console.log('this.shopGoodsArr是这个东西,从vuex来的:',this.shopGoodsArr)
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      deep:true
    },
    goods: {
      handler(){
        this.shopGoods = this.$store.state.dome.singleStore.id;
      //  console.log(this.shopGoods)
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      deep:true
    },
    show () {
      if (this.show) {
        setTimeout(() => {
          new Better(this.$refs.detail,{
            click:true
          })
        })
      }
    }
    // domeQuantity: {
    //   handler(m,a){
    //     console.log('监听',m)
    //     Vue.set(m,'dome',this.$store.state.dome.cartSingleFood[a].quantity)
    //   },
    //   //是否在页面刷新时调用回调函数,默认值是false
    //   immediate:true,
    //   deep:true
    // }
  },
  beforeDestroy(){
    console.log('我要去死了')
    this.storage.set(this.shopGoods,this.shopGoodsArr)
  },
  mounted() {
    // 是否持久化储存
    console.log('this.storage.get(this.$store.state.dome.singleStore.id)',this.storage.get(this.$store.state.dome.singleStore.id))
    if (this.storage.get(this.$store.state.dome.singleStore.id) === null) {
      console.log('没储存 发起请求')
      // 没储存 发起请求
      this.$store.commit({
        type:"amendDataLoad"
      })
      Vue.axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopGoods}`, null).then((res) => {
        this.$store.commit({
          type:"amendDataLoad"
        })
        // console.log("shopDetail接收到的信息",res.data)
        for (let foods of res.data) {
          for (let specfoods of foods.foods) {
            Vue.set(specfoods, 'dome', 0)
            for (let specfood of specfoods.specfoods){
              Vue.set(specfood, 'dome', 0)
            }
          }
        }
        console.log('res.data',res.data)
        this.$store.commit({type:'allFood',data:res.data})
      });
    }else {
      // 以储存,直接提取,存到vuex中
      this.$store.commit({type:'allFood',data:this.storage.get(this.$store.state.dome.singleStore.id)})
    }
    // if (this.$store.state.dome.allCartSingleFood[0] === this) {

    // }

    // new Better(wrpper)
    // new Better(this.$refs.list)
   // this.$nextTick(() => {
    setTimeout(() => {
      // 左侧滚动栏的better-scroll对象要开启点击事件
      this.left = new Better(this.$refs.l_list, {
        click: true //开启点击事件
      })
      // 右联左
      this.rgt = new Better(this.$refs.r_list, {
        click: true,
        probeType: 3 // scroll事件实时分发
      })
      this.$refs.productArr.forEach((el, index) => {//计算每个列表相对于顶部的距离，存到数组arr中
        this.arr.push(el.offsetHeight + this.arr[index])
      })
      this.rgt.on('scroll', (res) => { //监听滚动事件
        if (this.flag) {
          this.scrollY = Math.abs(res.y)
          for (let i = 0; i < this.arr.length; i++) {
            if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
              this.actli = i
              console.log('i是',i)
              // console.log('this.$refs.l_item.length',this.$refs.l_item.length - 2)
              // console.log('this.left',this.left)
              // console.log('this.$refs.l_list',this.$refs.l_item[1])
              if (i >= 8 ){
                  this.left.scrollToElement(this.$refs.l_item[i-6], 100, 0, 0)
              }
              if (i <=1 ) {
                this.left.scrollToElement(this.$refs.l_item[0], 100, 0, 0)
              }
              // if (i === this.$refs.l_item.length - 2) { //当滚动到倒数第2个位置时左侧列表向上滚动一个距离
              //   this.left.scrollToElement(this.$refs.l_item[1], 100, 0, 0)
              // }
              // if (i === 2) { //当滚动到倒数第3个位置时左侧列表向上下滚动一个距离
              //   this.left.scrollToElement(this.$refs.l_item[0], 100, 0, 0)
              // }
            }
          }
        }
      },20)
    })


          // console.log("this.$refs.productArr",this.$refs.productArr)


     // })
  },
  methods:{
    // 置顶
    domeStick () {
      this.flag = false
      this.actli = 0
      this.rgt.scrollToElement(this.$refs.productArr[0],100,0,0)
      setTimeout(()=>{
        this.flag = true
      },100)
    },
    // 选择规格
    domeSpecification (i) {
      console.log('item是',i)
      // 标题赋值
      this.title = i.name
      // 内容赋值
      this.guigeObj = i
      // 控制显隐
      this.guige = true
    },
    change(index, item){
      console.log('左侧item',item)
      this.flag = false
      this.actli = index
      this.rgt.scrollToElement(this.$refs.productArr[index],100,0,0)
      setTimeout(()=>{
        this.flag = true
      },100)
    },
    toSingleFoodDetail(n){
      // 点击单个食品信息,出现食品信息页
      this.$store.commit({type:'getSingleFood',data:n})
      this.$router.push({name:'singleFoodDetail'})
    },
    // 规格内的加入购物车
    joinCart() {
      this.$store.commit({type:'addSingleFood',data:this.guigeObj, index:this.pitchOn})
    },
    // 规格减号
    guigeClick () {
      this.domeP = true
      setTimeout(()=>{
        this.domeP = false
      },500)
    },
    // 购物车,点击+
    toShopCart(m,index,evt){
      if (this.continuous !== 1){
        return
      }
      setTimeout(()=>{
        this.continuous--
      },0)
      setTimeout(()=>{
        this.$store.commit({type:'goAddZ',is_new:true})
        this.continuous = 1
      },900)
      setTimeout(()=>{
        this.$store.commit({type:'goAddZ',is_new:false})
      },1800)
      let $ball = document.getElementById('ball');
        console.log(evt.pageX,evt.pageY)
        $ball.style.top = evt.pageY+'px';
        $ball.style.left = evt.pageX+'px';
        $ball.style.transition = 'left 0s, top 0s';
        setTimeout(()=>{
          $ball.style.top = window.innerHeight-40+'px';
          $ball.style.left = '30px';
          $ball.style.transition = 'left 1s linear, top 1s ease-in';
        }, 20)
      console.log('这是点击单个加号的数据',m)
      let shopID = this.$store.state.dome.singleStore.id
      console.log('shopID',this.$store.state.dome.singleStore)
       this.$store.commit({type:'addSingleFood',data:m, index:0, id:shopID})
      // console.log('this.$store.state.cartSingleFood',this.$store.state.dome.cartSingleFood)
    },
    // 购物车,点击-
    deleteShopCart(f,index){
     this.$store.commit({type:'deleteSingleFood',data:f,index:0})
    }
  }
}
</script>

<style scoped>
  .shopDetailBox{
    width: 100%;
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .l_list{
    position: relative;
    left: 0;
    top: 0;
    width: 20%;
    height: 5rem;
    /*overflow: hidden;*/
  }
  .r_list{
    width: 80%;
    position: absolute;
    top: 0.03rem;
    right:0;
    height: 100%;
    /*overflow: hidden;*/
  }
  .l_list>ul{
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    overflow: hidden;
  }
  .list {
    width: 100%;
  }
  .l_list>ul>li{
    height: 0.5rem;
    width: 100%;
    display: table;
    /*background-color: #E3E3E3;*/
    padding:0.02rem ;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.4rem;
    text-overflow: ellipsis;
    word-break: break-word;
    /*overflow: hidden;*/
  }
  .l_list>ul>li>p{
    display: table-cell;
    vertical-align: middle;
    border-bottom: 0.01rem solid rgba(7,17,27,.1);
  }
  .r_list ul{
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
    background-color: white;
  }
  .title{
    height: 0.45rem;
    width: 100%;
    padding: 0.03rem;
    background-color: #E3E3E3;
    line-height: 0.45rem;
    position: relative;
    margin: 0;
  }
  .title_name{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .list{
    overflow: hidden;
    padding: 0.1rem 0.1rem 0 0.1rem;
    height: 1.7rem;
  }
  .flex>p>img{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.02rem;
    margin-top: -0.8rem;
  }
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
    padding-bottom: 0.1rem;
    position: relative;
    transform-style: preserve-3d;
    height: 1.7rem;
  }
  .flex>div{
    margin-left: 0.2rem;
  }
  .name{
    font-weight: bold;
    font-size: 0.16rem;
  }
  .nameDes{
    font-size: 0.12rem;
    color: gray;
  }
  .sale{
    margin-bottom: 0;
  }
  .mark{
    background-color: white;
    color: rgb(241, 136, 79);
    font-size: 0.08rem;
    border:0.01rem solid rgb(240, 115, 115);
    -webkit-border-radius: 0.2rem;
  }
  .priceP{
    color:red;
    font-weight: bolder;
    font-size: 0.2rem;
  }
  /*选择规格*/
  .add{
    position: absolute;
    right: 0;
    /*bottom:0.2rem;*/
    color:white;
    background-color: blue;
    border:0.01rem solid blue;
    border-radius: 0.05rem;
    padding: 0.03em;
  }
  /*加号添加*/
  .add1 {
    position: absolute;
    right: 0;
    color:blue;
  }
  /*减号删减*/
  .minus1 {
    position: absolute;
    right: 0.6rem;
  }
  /*span数量*/
  .domeSpanCount {
    position: absolute;
    top: 0;
    right: 0.3rem;
  }
  /*添加容器*/
  .addVessel{
    position: absolute;
    display: flex;
    width: 0.6rem;
    right: 0;
    height: 0.3rem;
    bottom:0.2rem;
    color:black;
    font-size: 0.16rem;
    /*background-color: blue;*/
    border-radius: 50%;
  }
  .right-hide{
    width: 70%;
    height: 0.4rem;
    background-color: black;
    opacity: 0.7;
    position:absolute;
    right: 0.05rem;
    top:0.4rem;
    color:white;
    line-height: 0.4rem;
    padding-left: 0.1rem;
    z-index: 2;
    border-radius: 0.05rem;
  }
  .trigon{
    width: 0;
    height: 0;
    border-width: 0 0.1rem 0.1rem;
    border-style: solid;
    border-color: transparent transparent black;
    position: absolute;
    top:-0.1rem;
    right: 0.1rem;
  }
  .newP{
    width: 0.5rem;
    height: 0.3rem;
    font-size: 0.08rem;
    background-color: forestgreen;
    position: absolute;
    top: -0.2rem;
    left: -0.5rem;
    transform: rotate(-45deg);
    color: white;
    text-align: center;
    line-height: 0.4rem;
  }
  /*左侧点击变白*/
  .act {
    border-left: blue solid 0.02rem;
    background-color: white;
  }
  /*规格容器*/
  .specification {
    position: fixed;
    top: 30%;
    left: 10%;
    width: 80%;
    height: 2.5rem;
    background-color: white;
    z-index: 111;
  }
  /*title容器*/
  .domeTitle {
    width: 100%;
    height: 0.5rem;
    line-height: 100%;
  }
  /*title的span*/
  .domeTitleText {
    width: 100%;
    height: 0.5rem;
    line-height:0.5rem;
    display: inline-block;
    text-align: center;
  }
  /*X*/
  .domeTitleText>span {
    font-size: 0.40rem;
  }
  /*属性容器*/
  .domeProperty {
    width: 100%;
    height: 1.5rem;
  }
  /*属性容器p标签*/
  .domeProperty>p {
    padding: 0.1rem 0.1rem 0 0.1rem;
    margin: 0;
  }
  /*属性容器span标签*/
  .domeProperty>span {
    display: inline-block;
    border: #dddddd 0.01rem solid;
    margin: 0.1rem;
    border-radius: 0.06rem;
    height: 0.3rem;
    padding: 0.05rem 0.1rem;
    line-height: 0.2rem;
    text-align: center;
  }
  /*价格和加入购物车*/
  .priceAndCart {
    height: 0.5rem;
    background-color: #f0f0f0;
    line-height: 0.5rem;
  }
  /*价格*/
  .domePrice {
    height: 0.5rem;
    width: 1rem;
    font-size: .16rem;
    margin-left: 0.1rem;
    color: red;
  }
  .domePrice>span {
    font-size: .12rem;
  }
  /*选中时*/
  .domePitchOn {
    color: #5e5bdd;
    border: #5e5bdd 0.01rem solid;
  }
  /*加入购物车*/
  .domeCart {
    height: 0.3rem;
    width: 1rem;
    font-size: .16rem;
    margin: 0.1rem;
    background-color: #5464ff;
    color: white;
    text-align: center;
    border-radius: 0.06rem;
    line-height: 0.3rem;
  }
  /*规格容器样式*/
  .addVesse2 {
    position: absolute;
    display: flex;
    width: 0.6rem;
    right: 0;
    height: 0.3rem;
    bottom:0.2rem;
    color:black;
    font-size: 0.16rem;
    /*background-color: blue;*/
    border-radius: 50%;
  }
  /*规格中的数量*/
  .addVesse2>span>span {
    position: absolute;
    top: 0;
    right: 0.4rem !important;
  }
  .addVesse2>span>i {
    position: absolute;
    right: 0.7rem;
  }
  /*删减p标签*/
  .domeP {
    position: absolute;
    top: 0.25rem;
    left: -0.5rem;
    font-size: 0.12rem;
    width: 1.2rem;
    text-align: center;
  }
  /*分类选中数量*/
  .classifyCount {
    /*display: inline-block;*/
    background-color: red;
    position: absolute;
    right: 0;
    color: white;
    height: 0.16rem;
    line-height: 0.16rem;
    text-align: center;
    font-size: 0.12rem;
    padding:0 5%;
    border-radius: 50%;
  }
  /*置顶箭头*/
  .domeStick {
    position: fixed;
    top: 75%;
    left: 80%;
  }
  .domeStick>i {
    font-size: 0.5rem;
  }
  #ball {
    position: fixed;
    transition: left 1s linear, top 1s ease-in;
  }
  .addZ {
    z-index: -999;
  }
  .dome-enter-active, .dome-leave-active {
    transition: opacity .5s;
  }
  .dome-enter, .dome-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
