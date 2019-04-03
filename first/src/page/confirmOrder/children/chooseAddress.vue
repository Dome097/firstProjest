<template>
  <section class="container-fluid chooseAddres">
    <div class="deliveryAddres">
      <router-link :to="{}">
        <div class="addressLeft">
          <i class="iconfont">&#xe663;</i>
          <div>
            <span>{{'姓名'}}</span>
            <span>{{'sex'}}</span>
            <span>{{'telephonenumber'}}</span><br>
            <span>{{'company'}}</span>
            <span>{{'adds'}}</span>
          </div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script>
// 选择地址页
export default {
  name: "chooseAddress"
}
</script>

<style scoped>
  .chooseAddres>div{
    padding: 0 0.16rem;
    width: 100%;
  }
  .deliveryAddres{
    display: inline-block;
    width: 100%;
    height: 1rem;
    border-bottom: 0.02rem dashed orange;
    padding: 0 0.1rem;
  }
  .deliveryAddres>a{
    text-decoration: none;
    color: #000;
  }
  .addressLeft{
    float: left;
    padding: 0.2rem 0;
  }
  .addressLeft>i{
    display: inline-block;
    color: #008de1;
    font-size: x-large;
  }
  .addressLeft>div{
    display: inline-block;
  }
  .addressLeft>div>span{
    margin: 0 0.02rem;
  }
  .addressLeft>div>span:nth-child(1){
    font-size: 0.16rem;
    font-weight: bolder;
  }
  .addressLeft>div>span:nth-child(5){
    width: 0.6rem;
    height: 0.2rem;
    background-color: limegreen;
    border-radius: 0.04rem;
    color: white;
    font-size: 0.12rem;
  }
  .addressLeft>div>span:nth-child(6){
    color: darkgrey;
    font-size: 0.14rem;
  }

</style>
