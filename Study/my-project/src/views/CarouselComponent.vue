<template>
  <div class="CarouselComponent">
    <div class="CarouselComponent_son">
      <div class="CarouselComponent_son_box">
        <Carousel :Width="Width" :Height="Height" v-for="(item,index) in CarouselList" :item="item" :key="index"/>
      </div>
    </div>
    <div class="CarouselComponent_foot">
      <el-button type="primary" @click="addList">添加步骤</el-button>
      <div class="CarouselComponent_foot_button">
        <!--   -->
        <button v-for="(item,index) in CarouselList" 
        :class=" toIndex === index ? 'active' : ''"
        :key="index+1" 
        @click="CarouselListIndex(item,index)">
        {{index+1}}
        </button>
      </div>
      <el-button type="primary">预览</el-button>
    </div>
  </div>
</template>
<script>
let arr=[{
  explain:{//说明
    content:'说明内容'
  },
  tips:{//提示
    content:'提示内容',
    type:0,//0: 无限制 1:倒计时显示
    time:'20'
  },
  presetCode:{// 预置代码
    type:'C',// 编程语言类型  C || C++
    files:[
      {
        fileNmae:'',// 预置代码 文件名
        content:''// 预置代码 内容
      }
    ]
  }
},{
  explain:{//说明
    content:'说明内容1'
  },
  tips:{//提示
    content:'提示内容',
    type:0,//0: 无限制 1:倒计时显示
    time:'20'
  },
  presetCode:{// 预置代码
    type:'C',// 编程语言类型  C || C++
    files:[
      {
        fileNmae:'',// 预置代码 文件名
        content:''// 预置代码 内容
      }
    ]
  }
},{
  explain:{//说明
    content:'说明内容2'
  },
  tips:{//提示
    content:'提示内容',
    type:0,//0: 无限制 1:倒计时显示
    time:'20'
  },
  presetCode:{// 预置代码
    type:'C',// 编程语言类型  C || C++
    files:[
      {
        fileNmae:'',// 预置代码 文件名
        content:''// 预置代码 内容
      }
    ]
  }
}]
import Carousel from '@/components/Carousel.vue'
export default {
  data(){
    return {
      CarouselList:arr,
      Width:'100%',
      Height:'100%',
      toIndex:0,
      left:0,
    }
  },
  components:{
    Carousel
  },
  created(){

  },
  mounted(){
    this.WidthHeight()
    let _this=this
    window.addEventListener('resize',()=>{
      let CarouselComponentSonPx=document.querySelectorAll('.CarouselComponent_son')
      // 获取宽度
      _this.Width=CarouselComponentSonPx[0].offsetWidth
      // 获取高度
      _this.Height=CarouselComponentSonPx[0].offsetHeight
    });
  },
  methods: {
    WidthHeight(){
      let CarouselComponentSonPx=document.querySelectorAll('.CarouselComponent_son')
      // 获取宽度
      this.Width=CarouselComponentSonPx[0].offsetWidth
      // 获取高度
      this.Height=CarouselComponentSonPx[0].offsetHeight
    },
    addList(){
      // this.CarouselList.push(arr)
    },
    CarouselListIndex(item,index){
      this.toIndex=index
      let CarouselComponent_son_box=document.querySelectorAll('.CarouselComponent_son_box')
      console.log(CarouselComponent_son_box[0].style.left,'CarouselComponent_son_box')
      CarouselComponent_son_box[0].style.left=(-this.Width*index)+'px'
    }
  }
}
</script>
<style scoped lang="less">
.active{
  background: deepskyblue;
  color: #fff;
}
.CarouselComponent{
  width: 100%;
  height: 100%;
  background: #ccc;
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .CarouselComponent_son{
    width: 95vw;
    height: 90vh;
    background: #fff;
    // overflow-x: auto;
    overflow: hidden;
    position: relative;
    .CarouselComponent_son_box{
      position: absolute;
      top: 0;
      left: 0;
      width: auto;
      height: 90vh;
      display: flex;
      transition: left 1s linear;
    }
  }
  .CarouselComponent_foot{
      width: 95vw;
      height: 5vh;
      background: darkgrey;
      display: flex;
      justify-content: space-around;
      align-items: center;
    .CarouselComponent_foot_button{
      button{
        width: 5vh;
        height: 5vh;
        border: 0px; outline: none;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>