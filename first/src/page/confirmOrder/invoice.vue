<template>
    <section class="container-fluid invoice">
      <div class="middle" @click="isChecked">
        <span>不需要开发票</span>
        <i class="iconfont" :class="{select:selectThis}">&#xe663;</i>
      </div>
      <button @click="sure">确定</button>
    </section>
</template>

<script>
// 选择发票页
export default {
  name: "invoice",
  data(){
    return{
      selectThis:false
    }
  },
  methods:{
    isChecked(){
      this.selectThis = !this.selectThis
    },
    sure(){
      this.$router.push({name:'confirmOrder'})
    }
  }
}
</script>

<style scoped>
.invoice{
  width: 100%;
  height: 100%;
  padding: 0;
  background-color: #f5f5f5;
}
.middle{
  padding: 0 0.2rem;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  display: inline-block;
  background-color: white;
  margin-top: 0.2rem;
}
.middle>span{
  float: left;
  font-size: 0.16rem;
}
.middle>i{
  display: inline-block;
  float: right;
  font-size: 0.2rem;
  color: darkgray;

}
.invoice>button{
  width: 90%;
  height: 0.4rem;
  margin: 0.1rem 5%;
  background-color: limegreen;
  color: #ffffff;
  border: none;
  border-radius: 0.04rem;
  text-align: center;
}
.middle>.select{
    color: limegreen;
  }
</style>
