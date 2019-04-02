<template>
    <div class="singleFoodDetailBox">
      <img :src="http+nowFoodDetail.image_path" class="singleFoodDetailImg">
      <div>
        <p>{{nowFoodDetail.description}}</p>
        <p class="title-name">{{nowFoodDetail.name}}</p>
        <p class="singleFoodDetailRating">
          <span>评分</span>
          <span class="starRating">
            <el-rate
              v-model="value"
              disabled
              allow-half
              show-score
              color="#F7BA2A"
              score-template="{value}"
              class="star"
            >
          </el-rate>
          </span>
        </p>
        <p>
          <span>月售 {{nowFoodDetail.month_sales}}单</span>
          <span>售价 ¥{{specfoodsArr[0].price}} 起</span>
        </p>
        <p>
          评论数{{nowFoodDetail.rating_count}}  好评率{{nowFoodDetail.satisfy_rate}}%
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "singleFoodDetail",
        data(){
          return{
            // 当前选中的食物
            nowFoodDetail:'',
            http:'//elm.cangdu.org/img/',
            value:'',
            specfoodsArr:[]
          }
        },
        computed:{
          // 存储当前选中的食物数据
          nowFood(){
           // console.log("接收到的当前的单个食物信息",this.$store.state.dome.singleFood)
             return this.$store.state.dome.singleFood
          }
        },
      watch:{
        nowFood:{
          handler() {
          //  console.log("接收到的当前的单个食物信息", this.$store.state.dome.singleFood)
            this.nowFoodDetail = this.$store.state.dome.singleFood
            this.value = this.$store.state.dome.singleFood.rating
            this.specfoodsArr = this.$store.state.dome.singleFood.specfoods
            },
          immediate:true,
          deep:true
        }
      }
    }
</script>

<style scoped>
  .singleFoodDetailBox{
    width: 100%;
    height: 100%;
  }
  .singleFoodDetailImg{
    width: 100%;
  }
  .title-name{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .singleFoodDetailRating{
    position: relative;
  }
  .starRating{
    position: absolute;
    top:0;

  }
</style>

