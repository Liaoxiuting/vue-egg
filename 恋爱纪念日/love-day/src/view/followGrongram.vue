<template>
  <!--  -->
  <div class="FollwProgram">
    <div class="Md">
      <mavon-editor 
        v-model="content" 
        :style="{width:htmlCodeFlag?'100%':'100%',height:'300px'}"/>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  components:{
    mavonEditor
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

<style scoped>
.FollwProgram{
  width: 100%;
  height: 100%;
}
.FollwProgram>.Md{
  width: 600px;
  height: 600px;
}
</style>