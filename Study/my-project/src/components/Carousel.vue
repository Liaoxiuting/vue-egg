<template>
  <!--  -->
  <div class="Carousel" :style="{ width: Width + 'px', height: Height + 'px' }">
    <div class="Carousel_left">
      <div class="Carousel_left_top">
        <p>说明</p>
        <mavon-editor
          v-model="content"
          ref="md"
          @change="change"
          style="min-height: 300px"
        />
      </div>
      <div class="Carousel_left_bottom">
        <p>提示</p>
        <mavon-editor
          v-model="content"
          ref="md"
          @change="change"
          style="min-height: 300px"
        />
      </div>
    </div>
    <div class="Carousel_right">
       <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio-group v-model="disabledValue">
          <el-radio label="启用"></el-radio>
          <el-radio label="禁用"></el-radio>
        </el-radio-group>
        <div class="Carousel_right_tab">
          <div class="Carousel_right_tab_nav">

          </div>
          <div class="Carousel_right_tab_input">
            <textarea name="text" :disabled="disabledValue==='禁用'?true:false"></textarea>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
export default {
  components: {
    mavonEditor,
  },
  props: {
    item: {
      type: Object,
      defautl: () => {},
    },
    Width: {
      type: Number,
      default: 0,
    },
    Height: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      content: "", // 输入的markdown
      html: "", // 及时转的html
       options: [{
          value: '1',
          label: 'C'
        }, {
          value: '2',
          label: 'C++'
        }],
        value: '1',
        disabledValue:'启用'
    };
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
  },
};
</script>
<style scoped lang="less">
.Carousel {
  width: 100%;
  height: 100%;
  background: darkseagreen;
  .Carousel_left{
    width: 50%;
    float: left;
    .Carousel_left_top{
      width: 100%;
      height: auto;
    }
    .Carousel_left_bottom{
      width: 100%;
      height: auto;
    }
  }
  .Carousel_right{
    width: 50%;
    height: auto;
    float: left;
    .Carousel_right_tab{
      width: 100%;
      height: 300px;
      border: 1px solid #ccc;
      .Carousel_right_tab_nav{
        width: 100%;
        height: 50px;
      }
      .Carousel_right_tab_input{
        width: 100%;
        height: 80%;
        textarea{
          width: 100%;
          height: 80%;
        }
      }
    }
  }
}
</style>