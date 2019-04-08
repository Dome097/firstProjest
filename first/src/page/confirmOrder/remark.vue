<template>
  <section class="container-fluid remark">
    <div class="fastRemark">
      <p>快速备注</p>
      <button @click="noSpicy" :class="{selectStyle:select5}" id="noSpicy">不要辣</button>
      <button @click="smallSpicy" :class="{selectStyle:select6}" id="smallSpicy">少点辣</button>
      <button @click="moreSpicy" :class="{selectStyle:select7}" id="moreSpicy">多点辣</button>
      <button @click="coriander" :class="{selectStyle:select1}">不要香菜</button>
      <br>
      <button @click="onion" :class="{selectStyle:select2}">不要洋葱</button>
      <button @click="vinegar" :class="{selectStyle:select3}">多点醋</button>
      <button @click="shallot" :class="{selectStyle:select4}">多点葱</button>
      <br>
      <button @click="noIce" :class="{selectStyle:select8}">去冰</button>
      <button @click="smallIce" :class="{selectStyle:select9}">少冰</button>
    </div>
    <div class="otherRemark">
      <p>其他备注</p>
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入备注内容(可不填)"></textarea>
    </div>
    <button @click="sure">确定</button>
  </section>
</template>

<script>
// 订单备注页
export default {
  name: "remark",
  data(){
    return{
      select1:false,
      select2:false,
      select3:false,
      select4:false,
      select5:false,
      select6:false,
      select7:false,
      select8:false,
      select9:false
    }
  },
  methods:{
    // 要不要辣椒
    noSpicy(){
      this.select5 = !this.select5;
      this.select6 = false;
      this.select7 = false
    },
    smallSpicy(){
      this.select6 = !this.select6;
      this.select5 = false;
      this.select7 = false
    },
    moreSpicy(){
      this.select7 = !this.select7;
      this.select5 = false;
      this.select6 = false
    },
    // 要不要香菜
    coriander(){
      this.select1 = !this.select1
    },
    // 要不要洋葱
    onion(){
      this.select2 = !this.select2
    },
    // 要不要醋
    vinegar(){
      this.select3 = !this.select3
    },
    // 要不要葱
    shallot(){
      this.select4 = !this.select4
    },
    // 去不去冰
    noIce(){
      this.select8 = !this.select8;
      this.select9 = false
    },
    smallIce(){
      this.select9 = !this.select9;
      this.select8 = false
    },
    sure(){
      this.$router.push({name:'confirmOrder'})
    }
  }
}
</script>

<style scoped>
  .remark{
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #f5f5f5;
  }
  .fastRemark,.otherRemark{
    margin-top: 0.14rem;
    background-color: #ffffff;
    padding: 0.1rem ;
  }
  .fastRemark>button{
    outline-style: none;
    border: 0.01rem solid #008de1;
    border-radius: 0.04rem;
    background-color: #fff;
    width: 0.8rem;
    height: 0.26rem;
    margin: 0.04rem 0;
  }
  .fastRemark>.selectStyle{
    color: white;
    background-color: #008de1;
  }
  .fastRemark>button:nth-child(4){
    margin-left: 0.2rem;
  }
#noSpicy,#smallSpicy,#moreSpicy{
  margin: 0.04rem 0;
}
  .otherRemark>textarea{
    outline-style: none;
    border: 0.01rem solid #e4e4e4;
    background-color: #f5f5f5;
    border-radius: 0.04rem;
    width: 100%;
    height: 1rem;
    padding: 0.1rem;
  }
  .remark>button{
    width: 90%;
    height: 0.4rem;
    margin: 0.1rem 5%;
    background-color: limegreen;
    color: #ffffff;
    border: none;
    border-radius: 0.04rem;
    text-align: center;
  }
</style>
