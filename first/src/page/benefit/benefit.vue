<template>
  <section>
    <div class="box" v-if="isIf === '红包'|| isIf === '商家代金券'">
      <span class="domeHb" v-if="isIf === '红包'"></span>
      <span class="domeVoucher" v-if="isIf === '商家代金券'"></span>
      <span class="hB" :class="{pitchOn:isIf === '红包'}" @click="isIf = '红包'">红包</span>
      <span class="chit" :class="{pitchOn:isIf === '商家代金券'}" @click="isIf = '商家代金券'">商家代金</span>
    </div>
    <div v-if="isIf === '红包'">
      <div class="hbDiv">
        <span @click="isIf = hbDes">
          <router-link :to="{name: 'hbDescription', query:{move:hbDes}}" class="right"><i class="iconfont">&#xe63e;</i>{{hbDes}}</router-link>
        </span>
        <p>有<dome>{{hBarr.length}}</dome>个红包即将到期</p>
      </div>
      <div v-for="(item, index) in hBarr" class="hbBox" :key="index" :class="{hbBoxEnd:index === hBarr.length-1}">
        <div class="hbLeft ">
          <p><dome>¥</dome>{{item.amount%1===0?item.amount:item.amount-item.amount%1}}<dome>{{item.amount%1===0?'.0':'.'+item.amount%1*10}}</dome></p>
          <p>{{item.description_map.sum_condition}}</p>
        </div>
        <div class="hbRight">
          <p class="right">{{item.description_map.validity_delta}}</p>
          <p>{{item.name}}</p>
          <p>{{item.end_date}}</p>
          <p>{{item.description_map.phone}}</p>
        </div>
      </div>
      <div class="hbButton"><p>限品类:快餐便当、特色菜系、小吃夜宵、甜品饮品、异国料理</p></div>
      <div class="lastHb">
        <span @click="isIf = hbDes">
          <router-link :to="{name: 'hbHistory', query: {move:hbHis}}">查看历史红包></router-link>
        </span>
      </div>
      <div class="box navbar-fixed-bottom">
        <button class="btnExchange btn btn-default" @click="goExchange">兑换红包</button>
        <button class="btnCommend btn btn-default" @click="goCommend">推荐有奖</button>
      </div>
    </div>
    <router-view></router-view>
    <div v-if="isIf === '商家代金券'" class="chitInterface">
      <span @click="isIf = false">
        <router-link :to="{name: 'coupon'}" class="right">商家代金券说明</router-link>
      </span>
      <img src="../../images/description.png" class="imgQuestionMark right">
      <div class="chitContent">
        <img src="../../images/voucher.png" class="voucher" alt="">
        <p>无法使用代金券</p>
        <p>非客户端或客户端版本过低</p>
        <button class="btn btn-success" @click="goDownLoad">下载或升级客户端</button>
      </div>
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
// 红包页
export default {
  name: "benefit",
  data () {
    return {
      isIf: '红包',
      id: false,
      hBarr:[],
      hbDes: '红包说明',
      hbHis: '历史红包',
      hbExchange: '兑换红包',
      hbCommend: '推荐有奖'
    }
  },
  methods: {
    // 切换到下载组件
    goDownLoad () {
      this.$router.push({name:'download',params:{move:'下载'}})
    },
    // 跳转兑换红包
    goExchange () {
      this.isIf = '兑换红包'
      this.$router.push({name:'exchange',params:{move:'兑换红包'}})
    },
    // 跳转推荐有奖
    goCommend () {
      this.isIf = '推荐有奖'
      this.$router.push({name:'commend',params:{move:'推荐有奖'}})
    }
  },
  computed: {
    getID () {
      return this.$store.state.ghc.userInfo
    }
  },
  watch: {
    $route(now,lod){
      console.log('now是',now)
      console.log('lod是',lod)
      if (now.name === 'benefit') {
        this.isIf = '红包'
        console.log(this.isIf)
      }
    },
    getID: {
      //回调函数,会在计算属性发生变化时触发
      handler(){
        this.id = this.$store.state.ghc.userInfo.id
        console.log('走了改行')
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
}
  },
  beforeRouteEnter (to, from, next) {
    console.log('from',to)
    if (to.query.id) {
      next()
    }
  },
  mounted () {
    // 进入时请求红包
    console.log('获取到的id',this.id);
    //懒加载
    this.$store.commit({
      type:'amendDataLoad'
    });
    this.$http({
      method: 'get',
      url: `https://elm.cangdu.org/promotion/v2/users/${this.id}/hongbaos`,
      // withCredentials: true, // 默认false
      params:{
        limit:20,
        offset:0
      }
    }).then((res) => {
      this.$store.commit({
        type:'amendDataLoad'
      });
      console.log('tap', res);
      this.hBarr = res.data
    });
  }
}
</script>

<style scoped>
  section {
    background-color: #f5f5f5;
  }
  .box {
    width: 100%;
    background-color: white;
    height: 0.5rem;
    display: flex;
    /*line-height: 0.4rem;*/
  }
  .btnExchange {
    width: 50%;
  }
  .btnCommend {
    width: 50%;
  }
  .hB {
    width: 50%;
    text-align: center;
    line-height: 0.6rem;
  }
  .spanColor {
    color: #90B4FC;
  }
  .router-link-active {
    color: #e8290c;
  }
  .chit {
    width: 50%;
    text-align: center;
    line-height: 0.6rem;
  }
  .imgQuestionMark {
    width: .16rem;
    margin-top: 0.02rem;
  }
  .chitInterface {
    margin-top: 0.2rem;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .chitContent {
    text-align: center;
    margin-top: 1.5rem;
  }
  .voucher {
    width: 1rem;
    margin-bottom: 0.1rem;
  }
  .hbBox {
    display: flex;
    width: 96%;
    background-color: white;
    border-radius: 5%;
    margin: 0.1rem auto 0;
    height: 1rem;
  }
  .hbDiv {
    margin: 0.1rem;
  }
  .hbLeft {
    width: 30%;
    box-sizing: border-box;
    margin: 5% 0;
    border-right: #a4a4a4 0.01rem dotted;
    /*line-height: 0.5rem;*/
    text-align: center;
  }
  .hbLeft>p:nth-child(1) {
    color: red;
    font-size: 0.3rem;
  }
  .hbLeft>p {
    color: #a4a4a4;
    font-size: 0.12rem;
  }
  .hbRight {
    width: 70%
  }
  .hbRight>p {
    text-indent: 0.30rem;
  }
  .hbRight>p:nth-child(1) {
    margin: 0.2rem 0.2rem 0 0 ;
    color: red;
    font-size: 0.16rem;
  }
  .hbRight>p:nth-child(2) {
    font-size: 0.16rem;
    margin-top: 0.2rem;
    color: black;
  }
  .hbRight>p {
    font-size: 0.12rem;
    color: #a4a4a4;
  }
  .hbButton {
    margin: 0 auto 0 ;
    width: 96%;
    background-color: #fafafa;
    color: #a4a4a4;
    font-size: 0.12rem;
    text-indent: 0.10rem;
    border-radius: 0 0 40% 40%;
  }
  .hbBoxEnd {
    border-radius: 5% 5% 0 0;
  }
  p {
    margin: 0;
  }
  .lastHb {
    width: 100%;
    margin: 0.2rem auto 0;
    text-align: center;
  }
  .lastHb a {
    color: #bbbbbb;
  }
  .pitchOn {
    color: #008de1;
  }
  .domeHb {
    position: absolute;
    display: inline-block;
    top: 0.85rem;
    height: 0.03rem;
    left: 0.79rem;
    width: 0.3rem;
    background-color: #008de1;
  }
  .domeVoucher {
    display: inline-block;
    width: 0.57rem;
    position: absolute;
    top: 0.85rem;
    left: 2.53rem;
    height: 0.03rem;
    background-color: #008de1;
  }
  dome {
    font-size: 0.16rem;
    color: red;
  }
</style>
