<template>
  <section>
    <!--下拉整体容器-->
    <div class="dome-food">
      <!--头部-->
      <div class="dome-top">
        <!--头左部-->
        <div @click="clickSpinner(1)">
          <span :class="{domeFocusColor:controlIf===1}">{{classifyOne}}</span>
          <i class="el-icon-caret-bottom" :class="{domeDropDownArrow:controlIf===1, domeFocusColor:controlIf===1}"></i>
        </div>
        <!--头中部-->
        <div @click="clickSpinner(2)">
          <span :class="{domeFocusColor:controlIf===2}">{{'排序'}}</span>
          <i class="el-icon-caret-bottom" :class="{domeDropDownArrow:controlIf===2, domeFocusColor:controlIf===2}"></i>
        </div>
        <!--头右部-->
        <div @click="clickSpinner(3)">
          <span :class="{domeFocusColor:controlIf===3}">{{'筛选'}}</span>
          <i class="el-icon-caret-bottom" :class="{domeDropDownArrow:controlIf===3, domeFocusColor:controlIf===3}"></i>
        </div>
      </div>
    </div>
    <!--下拉内容-->
    <div class="dome-spinner">
      <!--遮罩淡入淡出动画-->
      <transition name="dome0">
        <div class="dome-shade" v-if="controlIf"></div>
      </transition>
      <!--分类上,下拉动画-->
      <transition name="dome1">
        <!--分类排序-->
        <div class="dome-classify" v-if="controlIf === 1">
          <!--分类左-->
          <div class="dome-classifyLeft">
            <!--循环每行-->
            <div v-for="(item, index) in classify" class="dome-classifyLeft-line" :class="{domeClassifyFocus:focus===index}" @click="focus = index">
              <!--分类图片-->
              <img class="dome-classifyLeft-img" :src="item.image_url.slice(-4).endsWith('png')===true?http+item.image_url+'.png':http+item.image_url+'.jpeg'" alt="">
              <!--商家图标-->
              <i class="iconfont dome-merchant" v-if="index === 7">&#xe69e;</i>
              <!--名称-->
              <span>{{item.name}}</span>
              <!--箭头-->
              <i class="dome-arrows iconfont right">&#xe634;</i>
              <!--数量包-->
              <div class="dome-classifyLeft-quantity-bag right">
                <!--数量-->
                <span class="dome-classifyLeft-quantity">
                  {{item.count}}
                </span>
              </div>
            </div>
          </div>
          <!--分类右-->
          <div class="dome-classify-right">
            <!--右侧循环每行-->
            <div class="dome-classify-right-line right" v-for="(item, index) in downClassifyArr[focus]" v-if="index">
              <!--左侧容器-->
              <span class="dome-classify-right-line-span left">{{item.name}}</span>
              <!--右侧容器-->
              <span class="dome-classify-right-line-span right">{{item.count}}</span>
            </div>
          </div>
        </div>
      </transition>
      <!--排序方式上,下拉动画-->
      <transition name="dome2">
        <!--排序方式-->
        <div class="dome-sort"  v-if="controlIf === 2">
          <!--循环每行-->
          <div class="dome-sort-line" v-for="(item, index) in iconArr">
            <!--字体图标容器-->
            <div class="dome-sort-icon-bag">
              <!--字体图标-->
              <i class="iconfont" :class="{domeIcon1: index === 0, domeIcon2: index === 1, domeIcon3: index === 2, domeIcon4: index === 3, domeIcon5: index === 4, domeIcon6: index === 5}" v-html="item[0]"></i>
            </div>
            <!--方式容器-->
            <div class="dome-sort-way" @click="goSort(index+1)">
              <!--方式-->
              <span>{{item[1]}}</span>
            </div>
          </div>
        </div>
      </transition>
      <!--筛选上,下拉动画-->
      <transition name="dome3">
        <!--筛选-->
        <div class="dome-screen" v-if="controlIf === 3">
          <!--筛选上部容器-->
          <div class="dome-screen-top">
            <!--配送方式-->
            <div class="dome-screen-distribution">
              <p>配送方式</p>
              <p>
                <!--蜂鸟字体图标-->
                <i class="iconfont dome-screen-icon">&#xe631;</i>
                蜂鸟配送
              </p>
            </div>
            <!--商家属性-->
            <div class="dome-screen-property">
              <p>商家属性 (可以多选)</p>
              <!--p容器-->
              <div class="dome-screen-property-p">
                <p>
                  <!--品牌商家字体图标-->
                  <span class="dome-imitate dome-imitate-color1">品</span>
                  品牌商家
                </p>
                <!--外卖保字体图标-->
                <p>
                  <span class="dome-imitate dome-imitate-color2">保</span>
                  外卖保
                </p>
                <!--准时达字体图标-->
                <p>
                  <span class="dome-imitate dome-imitate-color3">准</span>
                  准时达
                </p>
                <!--新店字体图标-->
                <p>
                  <span class="dome-imitate dome-imitate-color4">新</span>
                  新店
                </p>
                <!--在线支付字体图标-->
                <p>
                  <span class="dome-imitate dome-imitate-color5">付</span>
                  在线支付
                </p>
                <!--开发票字体图标-->
                <p>
                  <span class="dome-imitate dome-imitate-color6">票</span>
                  开发票
                </p>
              </div>
            </div>
          </div>
          <!--筛选下部按钮容器-->
          <div class="dome-screen-below">
            <!--按钮容器左-->
            <div class="dome-screen-but-left">
              <button class="btn btn-default">清空</button>
            </div>
            <!--按钮容器右-->
            <div class="dome-screen-but-right">
              <button class="btn btn-success">确定</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <shoplist></shoplist>
  </section>
</template>

<script>
import Vue from 'vue'
// 食品筛选排序页
import Shoplist from "../../components/common/shoplist";
export default {
  name: "food",
  data () {
    return {
      // 分类数据
      classify: [],
      // 再次分类
      downClassifyArr:[],
      // 图片处理
      http:'https://fuss10.elemecdn.com/',
      // 选中处理
      focus: '',
      // 控制分类右侧显示
      downClassify:'',
      // 控制下拉显隐
      controlIf:'',
      // 排序字体图标
      iconArr:[['&#xe66d;', '智能排序'], ['&#xe611;', '距离最近'], ['&#xe614;', '销量最高'], ['&#xe621;', '起送价最低'], ['&#xe62e;', '配送速度最快'], ['&#xe630;', '评分最高']],
      // 分类
      classifyOne: '',

      dataList:[],

      value:[]
    }
  },
  components: {Shoplist},
  methods: {
    // 控制下拉框显隐
    clickSpinner (i) {
      // 以显示的情况
      if (this.controlIf) {
        let contol = this.controlIf
        this.controlIf = !this.controlIf
        this.classifyOne = '分类'
        // 本次点击时,以是下拉状态
        if (contol === i) {
          this.classifyOne = this.$store.state.dome.cate[0][this.$store.state.dome.cate[2]][this.$store.state.dome.cate[1]].title
          return
        }
        if (i === 1) {
          this.classifyOne = '分类'
          this.controlIf = i
          return
        }
        this.classifyOne = this.$store.state.dome.cate[0][this.$store.state.dome.cate[2]][this.$store.state.dome.cate[1]].title
        this.controlIf = i
        return
      }
      // 未显示的情况
      this.controlIf = i
      // 是否改为分类
      if (this.controlIf === 1) {
        this.classifyOne = '分类'
      }
    },
    goSort (i) {
      this.$http({
        url:'https://elm.cangdu.org/shopping/restaurants',
        type: 'get',
        params: {
          latitude: '31.22967',
          longitude: '121.4762',
          order_by: i
        }
      }).then(res => {
<<<<<<< HEAD
        this.$store.state.jym.res = res.data
        // console.log(res)
        this.dataList = res.data;
        res.data.map((n)=>{
          this.value.push(n.rating);
           // console.log(this.value);
        })
      })
      Vue.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762',null).then((res) => {
        this.dataList = res.data;
        //  console.log(this.dataList);
        res.data.map((n)=>{
          this.value.push(n.rating);
          //  console.log(this.value);
=======
        this.$store.commit('getRes',res.data)
       // console.log(res)
        this.dataList = res.data;
        res.data.map((n)=>{
          this.value.push(n.rating);
          // console.log(this.value);
>>>>>>> 9e2adcf3265dedcf6cac58db5459a517de851371
        })
        console.log(this.$store.state.jym.res)
      })
      // Vue.axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=31.22967&longitude=121.4762',null).then((res) => {
      //   this.dataList = res.data;
      //   //  console.log(this.dataList);
      //   res.data.map((n)=>{
      //     this.value.push(n.rating);
      //     //  console.log(this.value);
      //   })
      // })
    }
  },
  computed:{
  },
  mounted () {
    // console.log(this.$store.state.dome.cate)
    // console.log(this.$store.state.dome.cate[0][0][this.$store.state.dome.cate[1]].title)
  },
  created () {
    // 请求所有商铺分类列表
    this.$http({
      method: 'get',
      url:'https://elm.cangdu.org/shopping/v2/restaurant/category'
    }).then((res)=> {
      this.classify = res.data
      for (let i of res.data) {
        this.downClassifyArr.push(i.sub_categories)
      }
      console.log('this.downClassifyArr',this.downClassifyArr)
      console.log('this.$store.state.dome',this.$store.state.dome)
      this.downClassify = 2
      this.classifyOne = this.$store.state.dome.cate[0][this.$store.state.dome.cate[2]][this.$store.state.dome.cate[1]].title
      console.log('this.classifyOne',this.classifyOne)
    })
  }
}
</script>

<style scoped>
/*向上的箭头*/
.domeDropDownArrow {
  transform: rotate(180deg);
  transition: transform 1s;
}
/*点击时的颜色*/
.domeFocusColor {
  color: blue;
}
/*箭头默认*/
.el-icon-caret-bottom {
  transition: transform 1s;
}
/*下拉整体容器*/
.dome-food {
  position: fixed;
  width: 100%;
  z-index: 222;
}
/*头部容器*/
.dome-top {
  display: flex;
  width: 100%;
  padding-top: 0.2rem;
  background-color: white;
  border-bottom: #e4e4e4 solid 0.01rem;
  background-color: white;
  z-index: 333;
}
.dome-top>div {
  width:30%;
  text-align: center;
  margin: 0 auto 0.1rem ;
  background-color: white;
  z-index: 444;
}
.dome-top>div:nth-child(-n+2) {
  border-right: #e4e4e4 solid 0.01rem;
}
/*下拉列表*/
.dome-spinner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0.9rem;
  z-index: 3;
  /*background-color: rgba(22,22,22,0.1)*/
}
/*分类容器*/
.dome-classify {
  position: absolute;
  width: 100%;
  /*height: 100%;*/
  height: 4.5rem;
  display: flex;
  z-index: 4;
  top: 0;
  /*background-color: rgba(22,22,22,0.1);*/
}
/*分类左侧*/
.dome-classifyLeft {
  width: 50%;
  background-color: #eeeeee;
  height: 100%;
}
/*循环每行*/
.dome-classifyLeft-line {
  line-height: 0.5rem;
  text-indent: 0.2rem;
}
/*箭头*/
.dome-arrows {
  text-indent: 0.05rem
}
/*后台缺失的*/
.dome-merchant {
  font-size: 0.16rem;
  color: #90B4FC;
}
/*左侧图片*/
.dome-classifyLeft-img {
  width: 0.16rem;
}
/*分类总数外部容器*/
.dome-classifyLeft-quantity-bag {
  height: 0.5rem;
  text-align: center;
}
/*分类总数*/
.dome-classifyLeft-quantity {
  background-color: #d9d9d9;
  border-radius: 0.16rem;
  line-height: 0.16rem;
  text-indent: 0;
}
/*分类右侧*/
.dome-classify-right {
  width: 50%;
  background-color: white;
  height: 100%;
  overflow: scroll;
}
/*清除滚动条*/
.dome-classify-right::-webkit-scrollbar{
  display: none;
}
/*分类右侧每行*/
.dome-classify-right-line {
  width:95%;
  height: 0.5rem;
  border-bottom: #f5f5f5 solid 0.01rem;
}
/*分类右侧每行span*/
.dome-classify-right-line-span {
  height: 0.5rem;
  line-height: 0.5rem;
  margin-right: 0.1rem;
}
/*分类选中效果*/
.domeClassifyFocus {
  background-color: white;
}
/*排序容器*/
.dome-sort {
  position: absolute;
  width: 100%;
  height: 3rem;
  background-color: white;
  z-index: 4;
  top:0;
}
/*排序循环每行*/
.dome-sort-line {
  height: 0.5rem;
  width: 100%;
  line-height: 0.5rem;
  display: flex;
}
/*字体图标容器*/
.dome-sort-icon-bag {
  width: 10%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
}
/*排序方式容器*/
.dome-sort-way {
  width: 90%;
  height: 0.5rem;
  line-height: 0.5rem;
  border-bottom: #a4a4a4 solid 0.01rem;
  top:0
}
/*字体图标颜色*/
.domeIcon1 {
  color: blue;
}
.domeIcon2 {
  color: #90B4FC;
}
.domeIcon3 {
  color: red;
}
.domeIcon4 {
  color: #ffed45;
}
.domeIcon5 {
  color: #42ff9a;
}
.domeIcon6 {
  color: #fcc934;
}
/*筛选容器*/
.dome-screen {
  position: absolute;
  width: 100%;
  height: 2.5rem;
  background-color: #a4a4a4;
  z-index: 4;
  top: 0;
}
/*筛选上部容器*/
.dome-screen-top {
  width: 100%;
  height: 2rem;
  background-color: white;
}
/*配送方式*/
.dome-screen-distribution {
  height: 0.8rem;
  width: 90%;
  margin: 0 auto 0;
  line-height: 0.3rem;
}
/*配送方式的p*/
.dome-screen-distribution>p+p {
  height: 0.3rem;
  line-height: 0.3rem;
  width: 30%;
  border: #a4a4a4 solid 0.01rem;
  border-radius: 0.05rem;
  text-indent: 0.1rem;
}
/*商铺属性*/
.dome-screen-property {
  height: 1.2rem;
  width: 90%;
  margin: 0 auto 0;
  /*line-height: 0.3rem;*/
}
/*商铺属性P容器*/
.dome-screen-property-p {
  height: 0.7rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
/*商铺属性的p*/
.dome-screen-property-p p {
  margin: 0 auto 0 0;
  height: 0.3rem;
  line-height: 0.3rem;
  width: 30%;
  border: #a4a4a4 solid 0.01rem;
  border-radius: 0.05rem;
  text-indent: 0.1rem;
}
/*筛选i标签*/
.dome-screen-top i {
  font-size: 0.2rem;
  color: #008de1;
}
/*仿i标签*/
.dome-imitate {
  font-size: 0.14rem;
  border-radius: 0.03rem;
  padding: 0.02rem;
}
/*仿i标签1*/
.dome-imitate-color1 {
  border: #2fd5cf solid 0.01rem;
  color: #2fd5cf;
}
/*仿i标签2*/
.dome-imitate-color2 {
  border: #a4a4a4 solid 0.01rem;
  color: #a4a4a4;
}
/*仿i标签3*/
.dome-imitate-color3 {
  border: #3966d5 solid 0.01rem;
  color: #3966d5;
}
/*仿i标签4*/
.dome-imitate-color4 {
  border: #efa93d solid 0.01rem;
  color: #efa93d;
}
/*仿i标签5*/
.dome-imitate-color5 {
  border: #ef7839 solid 0.01rem;
  color: #ef7839;
}
/*仿i标签6*/
.dome-imitate-color6 {
  border: #a4a4a4 solid 0.01rem;
  color: #a4a4a4;
}
/*筛选下部按钮容器*/
.dome-screen-below {
  width: 100%;
  height: 0.5rem;
  background-color: #98fcdf;
  display: flex;
}
/*按钮容器左*/
.dome-screen-but-left{
  width: 50%;
  height: 0.5rem;
  background-color: #f5f5f5;
  line-height: 0.5rem;
  text-align: center;
}
/*按钮容器右*/
.dome-screen-but-right {
  width: 50%;
  height: 0.5rem;
  background-color: #f5f5f5;
  line-height: 0.5rem;
  text-align: center;
}
/*按钮*/
.dome-screen-below button {
  width: 90%;
}
/*下部遮罩*/
.dome-shade {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
  background-color: rgba(33,33,33,0.5);
}
/*下拉上拉动画*/
.dome1-enter-active, .dome1-leave-active, .dome2-enter-active, .dome2-leave-active, .dome3-enter-active, .dome3-leave-active {
  transition: top 1s;
}
.dome1-enter, .dome1-leave-to,.dome2-enter, .dome2-leave-to,.dome3-enter, .dome3-leave-to/* .fade-leave-active below version 2.1.8 */ {
  top: -5rem;
}
/*遮罩淡入淡出动画*/
.dome0-enter-active, .dome0-leave-active {
  transition: background-color 1s;

}
.dome0-enter, .dome0-leave-to {
  background-color:  rgba(33,33,33,0);
}
.wrap {
  position: absolute;
  top: 1rem;
}
</style>
