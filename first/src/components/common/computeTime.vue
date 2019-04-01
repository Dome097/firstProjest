<template>
  <div id="#Time">
    <span>支付剩余时间</span>
    <span>{{compute}}</span>
  </div>
</template>

<script>
import Vue from 'vue'
import { MessageBox } from 'mint-ui';
// 倒计时组件
export default {
  name: "computeTime",
  computed:{
    compute:{
      get () {
        return `00:${this.$store.state.dome.minute/10<1?'0'+this.$store.state.dome.minute:this.$store.state.dome.minute}:${this.$store.state.dome.second/10<1?'0'+this.$store.state.dome.second:this.$store.state.dome.second}`
      },
      set () {
        this.$store.commit({type:'getComputeTime'})
      }
    }
  },
  watch: {
    compute: {
      handler () {
        if (this.$store.state.dome.minute===0&&this.$store.state.dome.second===0)
        MessageBox.alert('支付超时');
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      //深度监听
      deep:true
    }
  },
  methods: {

  },
  mounted () {
      this.$store.commit({type:'getComputeTime'})
  }
}
</script>

<style scoped>

</style>
