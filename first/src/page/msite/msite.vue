<template>
  <section>
    <mt-swipe class="box" :auto="0">
        <mt-swipe-item  v-for="(item, pardon) in dataArr" :key="item.id" class="wrap">
          <div v-for="(i ,index) in item " class="lunbotu" @click="toFood(i)">
            <img :src="'https://fuss10.elemecdn.com'+i.image_url" alt="">
            <p>{{i.title}}</p>
          </div>
        </mt-swipe-item>
    </mt-swipe>
    <div class="shopHead">
      <i class="iconfont">&#xe647</i>
      <span>附近商家</span>
      <shoplist></shoplist>
    </div>
  </section>
</template>

<script>
  import {Swipe, SwipeItem} from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import Vue from 'vue'
  import Shoplist from "../../components/common/shoplist";
  // msite和shop页面的餐馆列表公共组件
  export default {
    name: "msite",
    methods:{
      toFood(i){
        console.log('i',i)
        this.$store.commit({type: 'goMsite',name: i.title})
        this.$router.push({name:'food'})
      }
    },
    components: {
      Shoplist,
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    },
    data(){
      return {
        dataArr:[],
        arr1:[],
        arr2:[],
        titleData:[],
        defaultIndex:0
      }
    },
    mounted(){
      //懒加载
      this.$store.commit({
        type:'amendDataLoad'
      });
      var this1 = this;
      Vue.axios.get("https://elm.cangdu.org/v2/index_entry", null).then((res) => {
        //懒加载
        this.$store.commit({
          type:'amendDataLoad'
        });
       // console.log(res.data)
        for (let i = 0; i < res.data.length/2; i++) {
          this1.arr1.push(res.data[i])
       //   console.log(this1);
        }
        for ( let j = 8; j < res.data.length; j++){
          this1.arr2.push(res.data[j])
        }
        this1.dataArr = [this1.arr1,this1.arr2];
      });
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 2.5rem;
    padding: 2%;
    background-color: white;
  }
  .wrap{
    width: 98%;
  }
  .lunbotu{
    width: 25%;
    height: 1rem;
    float: left;
  }
  .wrap img{
    width: 100%;
    height: 0.8rem;
  }
  .wrap p {
    width: 100%;
    height: 0.1rem;
    text-align: center
  }
  .shopHead{
    width: 100%;
    padding: 0.1rem;
    background-color: white;
    margin-top: 0.1rem;
  }
</style>


