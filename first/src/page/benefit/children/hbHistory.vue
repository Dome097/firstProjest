<template>
  <section>
    <div class="heelBlock"></div>
    <div v-for="(item, index) in hBarr" class="hbBox" :key="index" :class="{hbBoxEnd:index === hBarr.length-1}">
      <div class="hbTop">
        <div class="hbLeft ">
          <p><miyu>¥</miyu>{{item.amount%1===0?item.amount:item.amount-item.amount%1}}<miyu>{{item.amount%1===0?'.0':'.'+item.amount%1*10}}</miyu></p>
          <p>{{item.description_map.sum_condition}}</p>
        </div>
        <div class="hbRight">
          <p class="right"><i class="iconfont">&#xe67d;</i></p>
          <p>{{item.name}}</p>
          <p>{{item.end_date}}</p>
          <p>{{item.description_map.phone}}</p>
        </div>
      </div>
      <div class="hbButton" v-if="item.limit_map"><p>{{item.limit_map ? item.limit_map.restaurant_flavor_ids : '' }}</p></div>
    </div>
  </section>
</template>

<script>
// 历史红包
export default {
  name: "hbHistory",
  data () {
    return {
      id: 24444,
      hBarr: []
    }
  },
  mounted () {
    this.$http({
      method: 'get',
      url: `https://elm.cangdu.org/promotion/v2/users/${this.id}/expired_hongbaos`,
      // withCredentials: true, // 默认false
      params:{
        limit:20,
        offset:0
      }
    }).then((res) => {
      console.log('tap', res);
      this.hBarr = res.data
    });
  }
}
</script>

<style scoped>
  .heelBlock {
    width: 100%;
    height: 0.3rem;
  }
  .hbBox {
    display: flex;
    width: 96%;
    background-color: white;
    margin: 0 auto 0.2rem;
    /*height: 1rem;*/
    border-radius: 0.1rem;
    flex-wrap: wrap;
  }
  .hbTop {
    display: flex;
    width: 100%;
    margin: 0.1rem auto 0.1rem;
  }
  .hbLeft {
    width: 30%;
    border-right: #a4a4a4 0.01rem dotted;
    text-align: center;
  }
  .hbLeft>p:nth-child(1) {
    color: #a4a4a4;
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
    text-indent: 0.20rem;
  }
  .hbRight>p:nth-child(1) {
    /*margin-top: 0.2rem;*/
    color: #a4a4a4;
    /*font-size: 0.16rem;*/
  }
  .hbRight>p:nth-child(2) {
    font-size: 0.16rem;
    /*margin-top: 0.2rem;*/
    color: black;
  }
  .hbRight>p {
    font-size: 0.12rem;
    color: #a4a4a4;
  }
  .hbButton {
    margin: 0 auto 0 ;
    width: 100%;
    background-color: #fafafa;
    color: #a4a4a4;
    border-radius: 0 0 0.1rem 0.1rem;
  }
  .hbButton>p {
    width: 100%;
    font-size: 0.12rem;
    margin: 0.05rem 0 0.05rem 0.1rem;
  }
  i {
    font-size: 0.5rem;
  }
  p {
    margin: 0;
  }
  miyu {
    font-size: 0.16rem;
    color: #a4a4a4;
  }
  /*.hbCon {*/
    /*width: 100%;*/
  /*}*/
</style>
