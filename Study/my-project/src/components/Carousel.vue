<template>
  <!--  -->
  <div class="Carousel" :style="{width:Width+'px',height:Height+'px'}">
    {{item.explain.content}}

         <mavon-editor 
            v-model="content" 
            ref="md" 
            @change="change" 
            style="min-height: 600px"
        />
  </div>
</template>
<script>

import { mavonEditor } from 'mavon-editor'
export default {
    components: {
        mavonEditor,
    },
  props:{
    item:{
      type:Object,
      defautl:()=>{}
    },
    Width:{
      type:Number,
      default:0
    },
    Height:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
            content:'', // 输入的markdown
            html:'',    // 及时转的html
    }
  },
  methods: {
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
        },
    
  }
}
</script>
<style scoped lang="less">
.Carousel{
  width: 100%;
  height: 100%;
  background: darkseagreen;
}
</style>