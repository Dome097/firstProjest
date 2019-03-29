<template>
  <section class="container-fluid addDetail">
    <div class="searchArea">
      <el-input
        v-model="input"
        @focus="showIcon"
        placeholder="请输入小区/写字楼/学校等"
      ></el-input>
      <el-button type="primary">确认</el-button>
    </div>
  </section>
</template>

<script>
// 搜索地址
export default {
  name: "addDetail"
}
</script>

<style scoped>
  .addDetail{
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .searchArea{
    display: inline-block;
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: white;
    padding: 0 0.1rem;
  }
  .el-input{
    width: 2.7rem;
    float: left;
  }
  .el-row{
    width: 0.8rem;
  }
  .el-button--primary{
    width: 0.8rem;
    float: right;
    margin-top: 0.1rem;
  }
</style>
