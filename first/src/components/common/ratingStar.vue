<template>
  <div>
    <div class="rateAll">
      <div class="leftPage">
        <p class="leftScore">{{rateData.overall_score | number}}</p>
        <p class="secondScore">综合评价</p>
        <p class="endScore">高于周边商家{{over}}</p>
      </div>
      <div class="rightPage">
        <p>
          <span class="firstService">服务态度</span>
          <span class="firstStar">
            <el-rate
              v-model="value"
              disabled
              allow-half
              show-score
              color="#F7BA2A"
            >
            </el-rate>
          </span>
        </p>
        <p>
          <span class="secondFood">菜品评价</span>
          <span class="secondStar">
            <el-rate
              v-model="val"
              disabled
              allow-half
              show-score
              color="#F7BA2A"
            >
            </el-rate>
          </span>
        </p>
        <p>
          <span class="threeTime">送达时间</span>
          <span>{{rateData.deliver_time}}分钟</span>
        </p>
      </div>
    </div>
    <div class="rateCateAll" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="rateCate">
        <span v-for="(item,index) in rateCateData" :class="{unsatisfied :item.name==='不满意',satisfied:item.name!=='不满意',style:pStyle===index}" @click="pStyle=index">{{item.name}}({{item.count}})</span>
      </div>
      <hr>
      <div class="buttomStar" v-for="(item, index) in buttomData">
        <div class="leftBS">
          <img :src="item.avatar===''?'//elm.cangdu.org/img/default.jpg':http+item.avatar+'.jpeg'">
        </div>
        <div class="middleBS" >
          <p>{{item.username}}</p>
          <div class="starDiv">
            <span class="smallStar">
              <el-rate
                v-model="value1"
                disabled
                allow-half
                show-score
                color="#F7BA2A"
              >
              </el-rate>
            </span>
            <span class="onTime">{{item.time_spent_desc}}</span>
          </div>
          <div v-for="(i,n) in item.item_ratings" class="imgDiv">
            <span class="imgF">
              <img v-if="i.image_hash" :src="i.image_hash.slice(-4).endsWith('png')===true?http+i.image_hash+'.png':http+i.image_hash+'.jpeg'
">
            </span>
          </div>
          <div v-for="(m,f) in item.item_ratings" class="imgD">
             <div class="imgDes">
              <span>{{m.food_name}}</span>
            </div>
          </div>
        </div>
        <div class="rightBS pull-right">
          <span>{{item.rated_at}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
// 评论的五颗星组件
export default {
  name: "ratingStar",
  data() {
    return {
      value: '',
      val: '',
      rateData:'',
      over:'',
      rateCateData:[],
      buttomData:[],
      http: 'https://fuss10.elemecdn.com/',
      value1:5,
      pStyle:'',
      loading:false,
      offset:0,
      domeFoot:false
    }
  },
  created() {
    this.$store.commit({
      type:"amendDataLoad"
    })
    Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/1/ratings/scores", null).then((res) => {
      this.$store.commit({
        type:"amendDataLoad"
      })
      this.rateData = res.data;
      console.log("星级评价",res.data.compare_rating);
      this.value = res.data.service_score.toFixed(1)-0;
      this.val = res.data.food_score.toFixed(1)-0;
      this.over = ((res.data.compare_rating)*100).toFixed(1)+'%';
    //  console.log('val',this.val)
    //  console.log('value',this.value)
   //   console.log(this.over)
    });
    Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/1/ratings/tags",null).then((res)=>{
     // console.log(res.data)
      this.rateCateData = res.data;
    });
    Vue.axios.get("https://elm.cangdu.org/ugc/v2/restaurants/1/ratings?offset=0&limit=10",null).then((res)=>{
      console.log(res.data);
      this.buttomData = res.data;
    })
  },
  filters:{
    number(data){
    //  console.log("过滤器",data.toFixed(1))
      return data.toFixed(1)
    }
  },
  methods:{
    loadMore(){
      if (!this.domeFoot) {
        this.loading = true;
        setTimeout(() => {
          this.$store.commit({
            type:"amendDataLoad"
          })
          Vue.axios.get(`https://elm.cangdu.org/ugc/v2/restaurants/1/ratings?offset=${this.offset}&limit=10`,null).then((res) => {
            this.$store.commit({
              type:"amendDataLoad"
            })
           // console.log("res.data",res.data)
            for (let arr of res.data) {
            this.buttomData.push(arr)
        //    console.log("this.buttomData.push(arr)",this.buttomData)
            }
            // res.data.map((n)=>{
            //   this.value.push(n.rating);
            //    console.log("this.value",this.value.push(n.rating));
            // })
            this.offset += 10
            this.loading = false;
            // 没有数据的时候
            if (!res.data[9]){
            //  console.log(12345678909876543213465879876543)
              this.domeFoot = true
            }
          });
        //  console.log("this.offset",this.offset)
        }, 2500);
      }
   }
  },
  computed:{
    watchDataList(){
        return this.dataList
    }
  }
}
</script>

<style scoped>
  .rateBox{
    width: 100%;
  }
  .rateAll{
    width: 100%;
    height: 1.4rem;
    color:gray;
    position: relative;
    background-color: white;
  }
  .leftPage{
    width: 40%;
    text-align: center;
    float: left;
  }
  .leftScore{
    padding: 0.1rem;
    color:orange;
    font-size: 0.3rem;
  }
  .secondScore{
    font-size: 0.2rem;
  }
  .endScore{
    font-size: 0.1rem;
  }
  .rightPage{
    width: 60%;
    padding: 0.2rem;
    float: right;
    position: relative;
  }
  .rightPage>p{
    position: relative;
  }
  .firstService,.secondFood,.threeTime{
    font-size: 0.2rem;
  }
  .firstStar,.secondStar{
    position: absolute;
    top:0.05rem;
    right:0.2rem;
  }
  .rateCateAll{
    width: 100%;
    margin-top: 0.2rem;
    background-color: white;
  }
  .rateCate{
    width: 100%;
    padding: 0.08rem;
    height: 1.5rem;
    line-height: 0.33rem;
  }
  .rateCate span{
    font-size: 0.17rem;
    margin: 0.05rem;
    padding: 0.04rem;
    border-radius: 10%;
  }
  .satisfied{
    background-color: aliceblue;
  }
  .unsatisfied{
    background-color: #dddddd;
  }
  .style{
    background-color:blue;
  }
  .buttomStar{
    width: 100%;
    height: 2.2rem;
    padding: 0.1rem;
    border-bottom: 0.01rem solid gray;
  }
  .leftBS>img{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
  }
  .leftBS{
    width: 10%;
    float: left;
  }
  .middleBS{
    width: 65%;
    float: left;
    margin-left: 0.2rem;
  }
  .rightBS{
    width: 18%;
    font-size: 0.12rem;
  }
  .middleBS img{
    width: 0.8rem;
    height: 0.8rem;
  }
  .starDiv{
    position: relative;
    height: 0.17rem;
    overflow: hidden;
    margin-bottom: 0.1rem;
  }
  .smallStar{
    display:inline-block;
    width: 0.6rem;
    height: 0.17rem;
  }
  .onTime{
    position: absolute;
    top:0;
  }
  .imgDiv{
    width: 1.6rem;
  }
  .imgF{
    float: left;
    width: 0.8rem;
  }
  .imgD{
    width: 1rem;
    height: 0.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  .imgDes{
    border: 0.01rem solid gray;
    width: 0.5rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;*/
    margin-right: 0.2rem;
    border-radius: 10%;
    /*float: left;*/

  }
</style>
<style>
  .el-rate__icon, .el-icon-star-on{
    font-size: 0.02rem;
  }
  .el-rate__item{
    width: 0.12rem;
  }
  .el-rate__text{
    color:orange;
  }
  .buttomStar{
    width: 100%;
  }
  .leftBS{
    width: 10%;
  }
  .middleBS{
    width: 80%;
  }
  .rightBS{
    width: 10%;
  }
</style>
