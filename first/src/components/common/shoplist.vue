<template>
  <div class="wrap" v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10" >
    <div class="box" v-for="(item,index) in dataList" @click="toShop(item)">
      <div class="leftImg pull-left">
        <img :src="'https://elm.cangdu.org/img/'+item.image_path" alt="">
      </div>
      <div class="rightContent pull-right">
        <p class="firstLine">
          <span class="mark">品牌</span>
          <span class="effect">{{item.name}}</span>
          <span class="bao">
            <span v-for="i in item.supports" class=" part">{{i.icon_name}}</span>
          </span>
        </p>
        <div class="secondLine">
          <div class="star">
            <el-rate
              v-model="value[index]"
              disabled
              allow-half
              show-score
              color="#F7BA2A"
              score-template="{value}"
            >
            </el-rate>
          </div>
          <span class="secondContent">月售{{item.recent_order_num}}单</span>
          <span class="secondRight">
            <span class="send">蜂鸟专送</span>
            <span class="go">准时达</span>
          </span>
        </div>
        <p class="threeLine">
          <span>
            <span>¥ {{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}} </span>
          </span>
          <span class="threeRight">
            <span> {{item.distance}}/ </span>
            <span class="times">{{item.order_lead_time}}</span>
          </span>
        </p>
      </div>
    </div>
    <p v-if="domeFoot" class="domeP">没有更多了</p>
  </div>
</template>

<script>
import Vue from 'vue'
// msite和shop页面的餐馆列表公共组件
export default {
  name: "shoplist",
  data(){
    return {
      dataList:[],
      value:[],
      loading:false,
      // 跳过多少条数据
      offset:0,
      domeFoot:false
    }
  },
  mounted(){
    this.$store.commit({
      type:"amendDataLoad"
    })
    Vue.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762',null).then((res) => {
      this.$store.commit({
        type:"amendDataLoad"
      })
      this.dataList = res.data;
      res.data.map((n)=>{
        this.value.push(n.rating);
      })
      this.offset += 20
      console.log(this.offset)
    });
  },
  computed:{
    shopListSort(){
      console.log(this.$store.state.jym.res)
      return this.$store.state.jym.res
    }
  },
  watch:{
    shopListSort:{
      //回调函数,会在shopListSort发生变化时触发
      handler(){
        let is_new_shop = []
        if (this.$store.state.dome.is_new || this.$store.state.dome.is_premium) {
          let value = []
          console.log('即将筛选新店和是否支持线上支付')
          this.$store.state.jym.res.map((n) =>{
            console.log('this是',this)
            if (n.is_new === this.$store.state.dome.is_new && n.is_premium === this.$store.state.dome.is_premium) {
              is_new_shop.push(n)
            }
          })
          this.dataList = is_new_shop
          console.log('筛选成功后的数据',this.dataList)
          is_new_shop.map((n)=>{
            value.push(n.rating);
          })
          this.value = value
          console.log('this.$store.state.jym.res:', this.$store.state.jym.res)
        }else {
          let value = []
          this.dataList = this.$store.state.jym.res
          //  console.log(this.dataList);
          this.$store.state.jym.res.map((n)=>{
            value.push(n.rating);
            //  console.log(this.value);
          })
          this.value = value
        }
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      deep:true
    },
  },
  methods:{
    toShop(item){
      this.$store.commit({type:'getSingleStore',data:item})
      this.$router.push({name:'shop'})
      console.log('item', item)
    },
    loadMore() {
      if (!this.domeFoot) {
        this.loading = true;
        setTimeout(() => {
          this.$store.commit({
            type:"amendDataLoad"
          })
          Vue.axios.get(`https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762&offset=${this.offset}`,null).then((res) => {
            this.$store.commit({
              type:"amendDataLoad"
            })
            console.log(res.data)
            for (let arr of res.data) {
              this.dataList.push(arr)
            }
            // this.dataList.push()
            //   console.log(this.dataList);
            res.data.map((n)=>{
              this.value.push(n.rating);
              //  console.log(this.value);
            })
            this.offset += 20
            this.loading = false;
            // 没有数据的时候
            if (!res.data[19]){
              this.domeFoot = true
            }
          });
          console.log(this.offset)
        }, 2500);
      }
    }
  }
}
</script>

<style scoped>
  .wrap{
    width: 100%;
    padding: 0.1rem;
  }
  .box{
    margin-bottom: 0.2rem;
    border-bottom: 0.01rem solid #E4E4E4;
    height: 1.3rem;
  }
  .leftImg{
    width: 20%;
  }
  .leftImg>img{
    width: 0.6rem;
    height: 0.7rem;
  }
  .rightContent{
    width: 80%;

  }
  .mark{
    font-size: 0.12rem;
    background-color: orange;
    border-radius: 10%;
    font-weight:bold;
  }
  .effect{
    font-size: 0.18rem;
    font-weight: bolder;
  }
  .firstLine,.secondLine,.threeLine{
    position: relative;
  }
  .firstLine{
    margin-bottom: 0.15rem ;
  }
  .secondLine{
    width: 98%;
    height: 0.3rem;
    font-size: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .secondContent{
    position:absolute;
    top: 0.05rem;
    left:0.8rem;
  }
  .secondRight{
    position:absolute;
    right: 0;
    top:0.05rem;
  }
  .threeLine{
    width: 98%;
    height: 0.3rem;
    font-size: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bao{
    position:absolute;
    right: 0rem;
  }
  .threeRight{
    position:absolute;
    right: 0;
  }
  .three
  .part{
    font-size: 0.08rem;
    border: 0.01rem solid #E4E4E4;
    margin-right: 0.02rem;
  }
  .send{
    color:white;
    background-color: #008de1;
    border-radius: 10%;
    padding: 0.03rem;
    height: 0.2rem;
  }
  .go{
    color:#008de1;
    border-radius: 10%;
    border: 0.01rem solid #008de1;
    padding: 0.03rem;
    height: 0.2rem;
  }
  .times{
    color:#008de1;
  }
  .domeP {
    width: 100%;
    text-align: center;
  }
</style>
<style>
  .el-rate__icon, .el-icon-star-on{
    font-size: 0.02rem !important;
    width: 0.07rem ;
  }
  .el-rate__item{
    width: 0.12rem !important;
  }
</style>
