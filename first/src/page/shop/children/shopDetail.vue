<template>
  <div  class="shopDetailBox" >
   <!--左侧部分,左列表点击调用-->
    <aside ref="l_list" class="l_list">
      <ul>
        <li ref="l_item" :class="{'act':index === actli}"
            @click="change(index)" v-for="(item,index) in shopGoodsArr" :key="index">
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
        <div v-for="(it,index) in shopGoodsArr" :key="index"  ref="productArr">
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
                  <div class="add" v-if="item.specfoods[0].specs[0]">规格</div>
                  <div class="add1" v-else @click.stop="toShopCart(item)">
                    <i class="iconfont" >&#xe7f4</i>
                  </div>
                  <span >
                    <i class="iconfont" @click="deleteShopCart(item)" >&#xe605</i>
                    <span>1</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Better from 'better-scroll'
  import Vue from 'vue'
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
      pStyle:false
    }
  },
  computed:{
   goods () {
       return this.$store.state.dome.singleStore
    }
  },
  watch:{
    goods: {
      handler(){
        this.shopGoods = this.$store.state.dome.singleStore.id;
      //  console.log(this.shopGoods)
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      deep:true
    }
  },
  mounted() {
    this.$store.commit({
      type:"amendDataLoad"
    })
    Vue.axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopGoods}`, null).then((res) => {
      this.$store.commit({
        type:"amendDataLoad"
      })
      // console.log("shopDetail接收到的信息",res.data)
      this.shopGoodsArr = res.data
      console.log(this.shopGoodsArr[0].foods[0].specfoods[0].specs[0].name)
    });
   this.$nextTick(() => {
     // 左侧滚动栏的better-scroll对象要开启点击事件
         this.left = new Better(this.$refs.l_list, {
              click: true //开启点击事件
         })
      // 右联左
      this.rgt = new Better(this.$refs.r_list, {
             click: true,
             probeType: 3 // scroll事件实时分发
           })
          console.log("this.$refs.productArr",this.$refs.productArr)
           this.$refs.productArr.forEach((el, index) => {//计算每个列表相对于顶部的距离，存到数组arr中
              this.arr.push(el.offsetHeight + this.arr[index])
             })
           this.rgt.on('scroll', (res) => { //监听滚动事件
            if (this.flag) {
                 console.log(res)
                 this.scrollY = Math.abs(res.y)
                 for (let i = 0; i < this.arr.length; i++) {
                   if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
                     this.actli = i
                     if (i === this.$refs.l_item.length - 2) { //当滚动到倒数第2个位置时左侧列表向上滚动一个距离
                     this.left.scrollToElement(this.$refs.l_item[1], 100, 0, 0)
                         }
                      if (i === 2) { //当滚动到倒数第3个位置时左侧列表向上下滚动一个距离
                      this.left.scrollToElement(this.$refs.l_item[0], 100, 0, 0)
                           }
                       }
                   }
               }
          })
     })
  },
  methods:{
    change(index){
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
    //  console.log("选中的当前食物",n)
    },
    // 购物车,点击+
    toShopCart(m){
       this.$store.commit({type:'addSingleFood',data:m})
    },
    // 购物车,点击-
    deleteShopCart(f){
     this.$store.commit({type:'deleteSingleFood',data:f})
    }
  }
}
</script>

<style scoped>
  .shopDetailBox{
    width: 100%;
    position: relative;
    height: 100%;

  }
  .l_list{
    width: 20%;
  }
  .r_list{
    width: 80%;
    position: absolute;
    top: 0;
    right:0;
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
  }
  .l_list>ul>li{
    height: 0.5rem;
    width: 100%;
    display: table;
    background-color: #E3E3E3;
    padding:0.02rem ;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.4rem;
    text-overflow: ellipsis;
    word-break: break-word;
    overflow: hidden;
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
  }
  .title_name{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .list{
    padding: 0.1rem 0.1rem 0 0.1rem;
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
  .add{
    position: absolute;
    right: 0;
    bottom:0.2rem;
    color:white;
    background-color: blue;
    border:0.01rem solid blue;
    border-radius: 0.1rem;
    padding: 0.03em;
  }
  .add1{
    position: absolute;
    right: 0;
    bottom:0.2rem;
    color:white;
    background-color: blue;
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
</style>
