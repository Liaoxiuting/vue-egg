<template>
  <div class="hello">
    <div class="floor">
      <scroll class="left" ref="scroll">
        <ul>
          <li v-for="(item,index) in Floor" :key="index" :class="{active: currentIndex === index}" @click="currentFloor(index,$event)">{{item}}</li>
        </ul>
      </scroll>
      <scroll class="right" ref="scroll" :probe-type="3" @scroll="scroll">
        <ul>
          <li v-for="(item,index) in Floor" :key="index" ref="current-li">{{item}}</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
export default {
    name: 'floor',
    data () {
        return {
            Floor: ["one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"],
            rightListHeight: [], //用于保存右侧每个li的高度
            scrollY: 0, //用于保存滚动高度
        }
    },
    created () {
        //由于页面渲染数据时可能会出现延迟现象，所以，设置一个延时器，延迟获取所有右侧楼层的高或使用this.$nextTick
        setTimeout( () => {
            this.rightItemHeight()
        }, 500)
        
       this.$nextTick(() => {
        	this.rightItemHeight()
        })
    },
    methods: {
        //点击左侧楼层，改变右侧楼层高度
        currentFloor (index) {
            //参数为左侧里的下标
            //获取右侧所有的li
            let currentLi = this.$refs['current-li']
            //该事件为scroll组件内的事件
            this.$refs.scroll.scrollToElement(currentLi[index],600)
        },
        rightItemHeight () {
            //初始化右侧li第一个高度
            let Height = 0
            //将右侧的第一个li的高度添加进数组中
            this.rightListHeight.push(Height)
            //获取右侧所有li的长度
            let currentLi = this.$refs['current-li']
            //将所有的li的高度都添加进数组
            currentLi.forEach( item => {
                Height += item.clientHeight
                this.rightListHeight.push(Height)
            })
        },
        //设置滚动事件,该事件由scoll组件发送过来的
        scroll (position) {
            //保存滚动高度，该值是一个绝对值
            this.scrollY = Math.round(Math.abs(position.y))
        }
    },
    computed: {
        //设置一个currentIndex 用于返回右侧li滑动时的当前下标
        currentIndex () {
            for(let i=0; i<this.rightListHeight.length; i++){
                let currentHeight = this.rightListHeight[i]
                let nextHeight = this.rightListHeight[i+1]
                if(this.scrollY >= currentHeight && this.scrollY< nextHeight || !nextHeight){
                    return i
                }
            }
            return 0
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    padding: 0;margin: 0;
}
ul{
    list-style:none;
}
.hello{
  width: 100%;
  height: 100%;
}
.floor{
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-direction: row;
    box-sizing: border-box;
    padding:20vw 0;
    background-color: #f2f2f2;
}
.left{
    flex:1;
    background: skyblue;
    overflow:hidden;
}
.right{
    flex:4;
    background-color: #ccc;
    overflow:hidden;
}
.left ul li{
    width: 100%;
    height:12vw;
    background-color: #fff;
    margin-top:2vw;
    text-align:center;
    line-height:12vw;
    font-size:15px;
}
.left ul li.active{
    color:green;
    font-weight:700;
    background-color: #f0f0f0;
}
.right ul li{
    height:40vw;
    background-color:#f5f5f5;
    margin-top:2vw;
    text-align:center;
    line-height:40vw;
    font-size:36px;
}

</style>
