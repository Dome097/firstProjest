<template>
  <section>
    <div class="top">
      <div>
        <span>{{this.$store.state.dome.cate[0][this.$store.state.dome.cate[2]][this.$store.state.dome.cate[1]].title}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <div>
        <span>{{'排序'}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <div>
        <span>{{'筛选'}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
    <shoplist></shoplist>
  </section>
</template>

<script>
// 食品筛选排序页
import Shoplist from "../../components/common/shoplist";
export default {
  name: "food",
  data () {
    return {
      // one: this
    }
  },
  components: {Shoplist},
  methods: {},
  computed:{
  },
  mounted () {
    console.log(this.$store.state.dome.cate)
    console.log(this.$store.state.dome.cate[0][0][this.$store.state.dome.cate[1]].title)
  }
}
</script>

<style scoped>
.top {
  display: flex;
  width: 100%;
  margin-top: 0.2rem;
  border-bottom: #e4e4e4 solid 0.01rem;
}
.top>div {
  width:30%;
  text-align: center;
  margin: 0 auto 0.1rem ;
}
.top>div:nth-child(-n+2) {
  border-right: #e4e4e4 solid 0.01rem;
}
</style>
