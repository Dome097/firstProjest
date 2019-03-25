<template>
  <section>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in dataArr">
          <!--<img :src="" alt="">-->
          <!--<span></span>-->
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script>
  import * as Swiper from 'swiper';
  import Vue from 'vue';
  // msite和shop页面的餐馆列表公共组件
  export default {
    name: "msite",
    mounted(){
      new Swiper["default"]('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },
    data(){
      return {
        dataArr:[]
      }
    },
    mounted(){
      Vue.axios.get("https://elm.cangdu.org/v2/index_entry", null).then((res) => {
        let msiteData = res.data
      });
    }
  }
</script>

<style scoped>
  @import "../../../node_modules/swiper/dist/css/swiper.css";
  .swiper-container {
    width: 600px;
    height: 300px;
    margin:0 auto;
  }
</style>

