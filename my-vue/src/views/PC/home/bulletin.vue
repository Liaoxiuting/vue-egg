<template>
  <div class="bulletin">
    <!-- <div id="XSDFXPage" class="XSDFXPage"></div> -->
    <div id="container" style="width:100%;height:100%;" @click="clickFnMap()"></div>
  </div>
</template>
<script>
// import BMap from 'BMap'
import { TMap } from "../../TMap.js";
export default {
  name: "",
  data() {
    return {
      Maps: null
    };
  },
  mounted() {
    TMap("RO2BZ-LZOH3-IGO3I-3OFZD-CN6UQ-Y5BDL").then(qq => {
      var map = new qq.maps.Map(document.getElementById("container"), {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(39.916527, 116.397128),
        zoom: 8
      });

      //给地图添加事件，可以click、mouseover、mouseout等，这样的事件也可添加到marker、polyline上，即map的位置换了即可
      // qq.maps.event.addListener(map, "click", function(res) {
      //   //res即点击后的位置信息
      //   console.log(res, "res");
      // });

      //添加标记
      // var marker = new qq.maps.Marker({
      //   position, //标记点的位置，也可以是通过IP获取到的坐标

      //   map, //标记在哪个地图上

      //   animation, //标记显示时的动画效果

      //   title, //鼠标悬浮到标记上时的标题

      //   draggable //是否可拖拽，为true时也可获取到拖拽后的位置信息，即通过给marker添加position_changed事件（和给地图添加事件差不多，只是把click换成position_changed）
      // });
    });
  },
  methods: {},
  created() {
    // TMap.LatLng(lat:Number, lng:Number)
    console.log(window, "Tmap");
    // TMap.LatLng(222, 222)
  }
};
</script>
<style scoped lang="less">
html,
body,
.bulletin {
  width: 100%;
  height: 100%;
  background: #fff;
  .XSDFXPage {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
  }
}
</style>

