<template>
  <div  class="shopDetailBox" >
   <!--左侧部分,左列表点击调用-->
    <aside ref="l_list" class="l_list">
      <ul>
        <li ref="l_item" :class="{'act':index === actli}"
            @click="change(index)" v-for="(item,index) in shopGoodsArr">
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
    </aside>
    <!--右侧部分-->
    <section class="r_list " ref="r_list">
      <div>
        <!--在需要跳转到的区块上添加ref属性用于标识-->
        <div v-for="(it,index) in shopGoodsArr" :key="index" ref="good">
          <p class="title">
            <span class="title_name">{{it.name}}</span>
            <span>{{it.description}}</span>
            <span class="pull-right">...</span>
          </p>
          <ul>
            <li class="list" v-for="(item,index) in it.foods" :key="index" @click="getDetails(item)">
              <div class="list_name flex">
                <p ><img :src="http+item.image_path"  alt=""></p>
                <div>
                  <p class="name">{{item.name}}</p>
                  <p class="nameDes">{{item.description}}</p>
                  <p class="sale">月售{{item.month_sales}}份   好评率{{item.satisfy_rate}}%</p>
                  <span class="mark">{{item.activity?item.activity.image_text:''}}</span>
                  
                  <p class="price">
                    <span class="priceP">¥{{item.specfoods[0].price}}</span>
                    <span>起</span>
                  </p>
                  <div class="add pull-right" v-if="item.specfoods[0].specs[0]">规格</div>
                  <div class="add" v-else>+</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Better from 'better-scroll'
  import Vue from 'vue'
// 单个商铺信息页
export default {
  name: "shopDetail",
  data(){
    return {
      actli:0,
      scrollY: 0,
      arr: [0],
      flag:true,
      obj:null,
      show:false,
      shopGoods:'',
      shopGoodsArr:[],
      http:'//elm.cangdu.org/img/'
    }
  },
  computed:{
   goods () {
       return this.$store.state.dome.singleStore
    }
  },
  watch:{
    goods: {
      handler(){
        this.shopGoods = this.$store.state.dome.singleStore.id;
      //  console.log(this.shopGoods)
      },
      //是否在页面刷新时调用回调函数,默认值是false
      immediate:true,
      deep:true
    }
  },
  methods:{
    change(index){
      this.flag = false
      this.actli = index
      this.rgt.scrollToElement(this.$refs.good[index],100,0,0)
      setTimeout(()=>{
        this.flag = true
      },100)
    },
    getDetails(it){
      this.show = !this.show
      this.obj = it
    }
  },
  created(){
    Vue.axios.get(`https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${this.shopGoods}`, null).then((res) => {
     // console.log(res.data)
      this.shopGoodsArr = res.data
      console.log(this.shopGoodsArr[0].foods[0].specfoods[0].specs[0].name)
    });
    setTimeout(() => {
         this.left = new Better(this.$refs.l_list, {
              click: true //开启点击事件
         })
          this.rgt = new Better(this.$refs.r_list, {
             click: true,
             probeType: 3 // scroll事件实时分发
           })
           this.$refs.good.forEach((el, index) => {//计算每个列表相对于顶部的距离，存到数组arr中
              this.arr.push(el.offsetHeight + this.arr[index])
             })
           this.rgt.on('scroll', (res) => { //监听滚动事件
            if (this.flag) {
                 console.log(res)
                 this.scrollY = Math.abs(res.y)
                 for (let i = 0; i < this.arr.length; i++) {
                   if (this.scrollY > this.arr[i] && this.scrollY < this.arr[i + 1]) {
                     this.actli = i
                     if (i === this.$refs.l_item.length - 2) { //当滚动到倒数第2个位置时左侧列表向上滚动一个距离
                     this.left.scrollToElement(this.$refs.l_item[1], 100, 0, 0)
                         }
                      if (i === 2) { //当滚动到倒数第3个位置时左侧列表向上下滚动一个距离
                      this.left.scrollToElement(this.$refs.l_item[0], 100, 0, 0)
                           }
                       }
                   }
               }
          })
      })
  }
}
</script>

<style scoped>
  .shopDetailBox{
    width: 100%;
    position: relative;
    height: 100%;
  }
  .l_list{
    width: 20%;
  }
  .r_list{
    width: 80%;
    position: absolute;
    top: 0;
    right:0;
  }
  .l_list>ul{
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
  }
  .l_list>ul>li{
    height: 0.5rem;
    width: 100%;
    display: table;
    background-color: #E3E3E3;
    padding:0.02rem ;
    font-size: 0.16rem;
    text-align: center;
    line-height: 0.4rem;
    text-overflow: ellipsis;
    word-break: break-word;
    overflow: hidden;
  }
  .l_list>ul>li>p{
    display: table-cell;
    vertical-align: middle;
    border-bottom: 0.01rem solid rgba(7,17,27,.1);
  }
  .r_list ul{
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
    background-color: white;
  }
  .title{
    height: 0.45rem;
    width: 100%;
    padding: 0.03rem;
    background-color: #E3E3E3;
    line-height: 0.45rem;
  }
  .title_name{
    font-size: 0.2rem;
    font-weight: bold;
  }
  .list{
    padding: 0.1rem 0.1rem 0 0.1rem;
  }
  .flex>p>img{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.02rem;
    margin-top: -0.8rem;
  }
  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
    padding-bottom: 0.1rem;
    position: relative;
  }
  .flex>div{
    margin-left: 0.2rem;
  }
  .name{
    font-weight: bold;
    font-size: 0.16rem;
  }
  .nameDes{
    font-size: 0.12rem;
    color: gray;
  }
  .sale{
    margin-bottom: 0;
  }
  .mark{
    background-color: white;
    color: rgb(241, 136, 79);
    font-size: 0.08rem;
    border:0.01rem solid rgb(240, 115, 115);
    -webkit-border-radius: 0.2rem;
  }
  .priceP{
    color:red;
    font-weight: bolder;
    font-size: 0.2rem;
  }
  .add{
    position: absolute;
    right: 0;
    bottom:0.2rem;
    color:white;
    background-color: blue;
    border:0.01rem solid blue;
    -webkit-border-radius: 40%;
    padding: 0.02rem;
  }

  /*
 88      .last{
 89        border-bottom: none;
 90      }
 91    }
 92  }
 93  .detail{
 94    background-color: white;
 95    position: fixed;
 96    z-index: 299;
 97    left: 0;
 98    right: 0;
 99    top:0;
100    bottom: 1.04rem;
101    overflow: hidden;
102    .bg{
103      img{
104        height: 7.5rem;
105      }
106    }
107    .tit{
108      &>div{
109        &:nth-of-type(1){
110          padding: 0.36rem;
111          p{
112            &:nth-of-type(1){
113              font: 700 0.28rem/0.28rem '';
114              margin-bottom: 0.16rem;
115            }
116            &:nth-of-type(2){
117              font: 0.2rem '';
118              color: rgb(147,153,159);
119              margin-bottom: 0.36rem;
120            }
121            &:nth-of-type(3){
122              font:700 0.28rem/0.48rem '';
123              color: rgb(240,20,20);
124            }
125          }
126        }
127        &:nth-of-type(2){
128          float: right;
129          margin-right: 0.36rem;
130          margin-top: -0.9rem;
131          font: 0.2rem/0.48rem '';
132          color: white;
133          background-color: rgb(0,160,220);
134          border-radius: 0.24rem;
135          width: 1.48rem;
136          height: 0.48rem;
137          text-align: center;
138        }
139      }
140    }
141    .b_line{
142      height: 0.36rem;
143      background-color: #f3f5f7;
144      border-bottom: 1px solid rgba(0,0,0,0.1);
145      border-top: 1px solid rgba(0,0,0,0.1);
146    }
147    .intr{
148      padding: 0.36rem;
149      p{
150        &:nth-of-type(1){
151          font: 0.28rem '';
152          margin-bottom: 0.12rem;
153        }
154        &:nth-of-type(2){
155          font:200 0.24rem/0.48rem '';
156          color: rgba(77,85,93);
157          min-height: 1rem;
158        }
159      }
160    }
161    .flex{
162      display: flex;
163      justify-content: flex-start;
164      align-items: center;
165    }
166    .esit{
167      &>div{
168        &:nth-of-type(1){
169          padding: 0.36rem 0.36rem 0 0.36rem;
170          &>p{
171            font: 0.28rem '';
172            &:nth-of-type(1){
173              margin-bottom: 0.36rem;
174            }
175          }
176          .count {
177            padding:0 0 0.36rem 0;
178            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
179            p {
180              text-align: center;
181              font: 0.24rem/0.48rem '';
182              padding: 0.12rem;
183              border-radius: 0.02rem;
184              margin-right: 0.12rem;
185              &:nth-of-type(1) {
186                background-color: #00A0DC;
187              }
188              &:nth-of-type(2) {
189                background-color: #CCECF8;
190              }
191              &:nth-of-type(3) {
192                background-color: #E9EBEC;
193              }
194            }
195            .choosen{
196              transform: scale(1.1);
197            }
198          }
199        }
200        &:nth-of-type(2){
201          font-size: 0;
202          padding: 0.24rem 0.36rem;
203          border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
204          i{
205            color: rgb(147,153,159);
206            font-size: 0.48rem;
207            margin-right: 0.08rem;
208          }
209          span{
210            font: 0.24rem '';
211            color: rgb(147,153,159);
212          }
213        }
214      }
215      &>ul{
216        li{
217          padding: 0 0.36rem;
218          &>div{
219            padding: 0.32rem 0;
220            border-bottom:1px solid rgba(7, 17, 27, 0.1) ;
221            &>div{
222              span{
223                font: 0.2rem/0.24rem '';
224                color: rgb(147,153,159);
225                &:nth-of-type(2){
226                  margin-left: 55%;
227                  margin-right: 0.12rem;
228                }
229              }
230              em{
231                font-size: 0;
232                img {
233                  width: 0.48rem;
234                  border-radius: 50%;
235                }
236              }
237            }
238            p{
239              &:nth-of-type(1){
240                font: 0.24rem/0.32rem '';
241              }
242            }
243          }
244        }
245      }
246    }
247  }
*/
</style>
