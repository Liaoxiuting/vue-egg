<template>
  <div
    class="module hkyIm-module"
    @mouseover="mobile_after"
    @mouseout="mobile_leave"
  >
    <el-form
      ref="hkyim"
      :model="hkyImParams"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item
        :label="contentTitle"
        label-width="250px"
      ></el-form-item>
      <el-row style="border-bottom: 1px solid #f0f0f0;padding: 10px;">
        <Delete
          v-bind="$attrs"
          :hkyImParams="hkyImParams"
          v-on="$listeners"
        />
        <Move
          v-show="mobileOperating"
          v-bind="$attrs"
          :contentId="$attrs.item.hkyImParams.content_id"
          :move-up-show="moveUp_show"
          :move-down-show="moveDown_show"
          @newGroup="newGroup"
        />
        <el-input
          class="serial"
          size="small"
          readonly
          :value="$attrs.int"
          placeholder="序号"
        ></el-input>
        <el-input
          v-model="hkyImParams.content_title"
          class="serial-title"
          size="small"
          placeholder="请输入直播名称，最多30个汉字"
          maxlength="30"
          :readonly="disabled"
        ></el-input>
        <el-form-item
          size="small"
          class="add-lecturer before"
          label="添加讲师："
        >
          <el-select
            v-model="hkyImParams.teacher_uid"
            placeholder="请选择讲师"
            :readonly="disabled"
          >
            <el-option
              v-for="(item, index) in $attrs.lecturerList"
              :key="index"
              :disabled="disabled"
              :value="item.uid"
              :label="item.realname ? item.realname : item.nickname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          size="small"
          class="add-lecturer before"
          label="添加助教："
        >
          <el-select
            v-model="hkyImParams.assistant_uid"
            placeholder="请选择助教"
            multiple
            :multiple-limit="3"
            :disabled="disabled"
            @change="selectClassTeacher"
          >
            <el-option
              v-for="(item, index) in $attrs.assistantList"
              :key="index"
              :disabled="disabled"
              :value="item.uid"
              :label="item.realname ? item.realname : item.nickname"
            ></el-option>
          </el-select>
          <p style="color: #909399; font-size: 12px; margin-bottom: 0">同一用户不能即做助教也做班主任哦~</p>
        </el-form-item>
        <el-form-item
          size="small"
          class="add-lecturer before"
          label="添加班主任："
        >
          <el-select
            v-model="hkyImParams.class_teacher_uid"
            multiple
            :multiple-limit="3"
            placeholder="请选择班主任"
            :disabled="disabled"
          >
            <el-option
              v-for="(item, index) in classTeacherList"
              :key="index"
              :disabled="disabled"
              :value="item.uid"
              :label="item.realname ? item.realname : item.nickname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          size="small"
          class="add-lecturer before interactive-time"
          label="开课时间："
          :readonly="disabled"
        >
          <el-date-picker 
            v-model="time" 
            type="datetimerange" 
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOption"
            size="small"
            :readonly="disabled"
            @change="selectData()"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          size="small"
          class="add-lecturer before interactive-time"
          label="直播模式："
          :readonly="disabled"
        >
          <el-radio-group v-model="hkyImParams.type" :disabled="!!hkyImParams.content_id || disabled">
            <el-radio :label="0">常规直播</el-radio>
            <!-- <el-radio :label="1">极速直播</el-radio> -->
            <el-radio :label="2">交互式直播</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          size="small"
          class="add-lecturer before interactive-time"
          label="聊天室类型："
          :readonly="disabled"
        >
          <el-radio-group v-model="hkyImParams.im_limit" :disabled="!!hkyImParams.content_id || disabled">
            <el-radio :label="0">有限人数</el-radio>
            <!-- <el-radio :label="1">极速直播</el-radio> -->
            <el-radio :label="2">无限人数</el-radio>
          </el-radio-group>
          <p v-show="hkyImParams.im_limit===1" style="color: #909399; font-size: 12px; margin-bottom: 0">注：有限人数聊天室支持同时在线人数最大6000人~</p>
          <p v-show="hkyImParams.im_limit===2" style="color: #909399; font-size: 12px; margin-bottom: 0">注：无限人数聊天室不支持保存聊天记录~</p>
        </el-form-item>
        <div class="el-form-item__error">
          {{ prompt }}
        </div>
        <div v-if="hkyImParams.content_id" v-show="showFn(PERMISSION_TYPE.CHECK_DETAILS)" class="add-warp">
          <router-link target="_blank" :to="{ path: `/dake/details/${hkyImParams.content_id}/1` }">绑定题目</router-link>
          <router-link target="_blank" :to="{ path: `/dake/details/${hkyImParams.content_id}/2` }">添加口令红包</router-link>
          <router-link target="_blank" :to="{ path: `/dake/details/${hkyImParams.content_id}/3` }">添加群发红包</router-link>
          <router-link target="_blank" :to="{ path: `/dake/details/${hkyImParams.content_id}/4` }">添加直播货架</router-link>
          <router-link target="_blank" :to="{ path: `/dake/details/${hkyImParams.content_id}/6` }">详情</router-link>
        </div>
        <Save
          v-bind="$attrs"
          :content_id="hkyImParams.content_id"
          :hkyImParams="hkyImParams"
          v-on="$listeners"
          @success="success"
          @returnPrompt="returnPrompt"
          @contentId="contentId"
          @inspire="inspire"
        />
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Delete from './delete'
import Save from './save';
import Move from './move';
import { PERMISSION_TYPE, permissionFlag } from '@/utils/permission'
import { getApiHttp } from '@/utils/env'
import { CONTENT } from '@/utils/kkb'
import _ from 'lodash'
export default {
  name: 'Hkyim',
  components: {
    Save,
    Delete,
    Move
  },
  data() {
    return {
      hkyImParams: this.$attrs.item.hkyImParams,
      contentType: this.$attrs.item.hkyImParams.content_type,
      mobileOperating: false,
      disabled: false,
      moveUp_show: false,
      moveDown_show: false,
      time: [],
      prompt: '',
      pickerOption: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      assistantNumList:[{name:''}],
      classTeacherList: [],
      PERMISSION_TYPE: PERMISSION_TYPE,
      http: getApiHttp(),
      contentTitle: '',
    }
  },
  created(){
    this.getTeacherList()
    this.disabled = this.hkyImParams.content_id !== null ? true : false
    this.hkyImParams.start_time && this.time.push(this.hkyImParams.start_time, this.hkyImParams.end_time)
    this.contentTitle = CONTENT[Number(this.contentType)]
    console.log(this.hkyImParams,'hkyImParams')
  },
  mounted() {
    let liveAssistantArr = this.$attrs.item.hkyImParams.liveAssistant &&
      this.$attrs.item.hkyImParams.liveAssistant.map(item => {
        let obj = {};
        obj.name = item;
        return obj
      });
    this.assistantNumList = liveAssistantArr ? liveAssistantArr : [{name:''}];
    if (this.hkyImParams.content_id !== null) {
      this.disabled = true;
      this.passwordSuccess = true;
    }
  },
  methods: {
    showFn(id) {
      return permissionFlag(id)
    },
    getTeacherList() {
      this.classTeacherList = this.$attrs.assistantList.concat()
      this.hkyImParams.assistant_uid.forEach(assistant => {
        this.classTeacherList.forEach((teacher, i) => {
          if(assistant === teacher.uid) {
            this.classTeacherList.splice(i, 1)
          }
        })
      });
    },
    //选择时间
    selectData(){
      if(this.time){
        this.hkyImParams.start_time = this.time[0];
        this.hkyImParams.end_time = this.time[1];
      }else{
        this.hkyImParams.start_time = '';
        this.hkyImParams.end_time = '';
      }
    },
    // 讲师绑定班主任
    selectClassTeacher() {
      this.hkyImParams.class_teacher_uid = []
      this.getTeacherList()
    },
    mobile_after() {
      if (this.hkyImParams.content_id !== null) {
        if (this.disabled !== false) {
          this.mobileOperating = true
        }
        if (this.$attrs.int === 1) {
          this.moveUp_show = false
        } else {
          this.moveUp_show = true
        }
        if (this.$attrs.int === this.$attrs.group.length - 1) {
          this.moveDown_show = false
        } else {
          this.moveDown_show = true
        }
      }
    },
    mobile_leave() {
      this.mobileOperating = false
    },
    // 助教数量校验
    handleAssistantFn(idx) {
      if (idx === 0) {
        if(this.assistantNumList.length > 2){
          this.$message.error('最多只能选择三个助教喔');
          return false
        } else {
          this.assistantNumList.push({name:''})
        }
      } else {
        this.assistantNumList.splice(idx,1);
      }
    },
    // 添加助教
    taAssistant(){
      this.hkyImParams.assistantNumList = this.assistantNumList.map(item=> item.name);
    },
    newGroup(arr) {
      this.$emit('newGroup', arr);
    },
    // 保存相关
    success(bol) {
      console.log(this.hkyImParams,'this.hkyImParams',bol)
      return 
      this.passwordSuccess = bol;
      if(!_.isArray(this.hkyImParams.assistant_uid)){
        this.hkyImParams.assistant_uid = JSON.parse(this.hkyImParams.assistant_uid)
      }
      if(!_.isArray(this.hkyImParams.class_teacher_uid)) {
        this.hkyImParams.class_teacher_uid = JSON.parse(this.hkyImParams.class_teacher_uid)
      }
    },
    returnPrompt(str) {
      this.prompt = str;
    },
    contentId(id) {
      this.hkyImParams.content_id = id;
    },
    inspire(str) {
      this.disabled = str;
    },
    // goPath() {
    //   const { href } = this.$router.resolve({
    //     name: `/dake/details/${this.hkyImParams.content_id}`,
    //   });
    //   window.open(href, '_blank');
    // }
  }
}

</script>
<style lang="less" scoped>
.hkyIm-module .el-icon-circle-plus-outline{
  font-size: 20px;
  color: #409EFF;
  cursor: pointer;
  margin-left: 10px;
}
.hkyIm-module .el-icon-circle-close{
  font-size: 20px;
  color: #F56C6C;
  margin-left: 10px;
}
.add-warp {
  padding-left: 120px;
  margin-left: 11.5%;
  a {
    margin: 0 10px;
  }
}
</style>
