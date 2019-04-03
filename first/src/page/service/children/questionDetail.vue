<template>
  <section class="container-fluid questionDetail">
    <div class="content">
      <p v-html="title[1]"></p>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
// 问题详情
export default {
  name: "questionDetail",
  data(){
    return{
      content:'',
      title:[]
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      //进入路由之前拿到父级传过来的数据
      vm.title = vm.$route.params.quesTitle
    })
  }
}
</script>

<style scoped>
.questionDetail{
  width: 100%;
  padding: 0;
}
  .content{
    padding: 0.4rem 0.16rem;
    font-size: 0.16rem;
  }
</style>
