<template>
    <div class="rateAll">
      <div class="leftPage">
        <p>4.7</p>
        <p>综合评价</p>
        <p>高于周边商家76.9%</p>
      </div>
      <div class="rightPage">
        <p>
          <span>服务态度</span>
          <el-rate
            v-model="value"
            disabled
            allow-half
            show-score
            color="#F7BA2A"
            score-template="{value}"
          >
          </el-rate>
        </p>
        <p>
          <span>菜品评价</span>
          <el-rate
            v-model="coures"
            disabled
            allow-half
            show-score
            color="#F7BA2A"
            score-template="{coures}"
          >
          </el-rate>
        </p>
        <p></p>
      </div>
    </div>
</template>

<script>
// 评论的五颗星组件
export default {
  name: "ratingStar",
  data(){
    return {
      value:[],
      coures:[]
    }
  }
}
</script>

<style scoped>

</style>
