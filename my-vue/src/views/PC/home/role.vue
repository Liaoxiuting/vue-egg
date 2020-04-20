<template>
  <div class="role">
    <div id="myCharts" ref="myCharts" style="width: 100%;height:100%;"></div>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    // 以下三步即可完成echarts的初始化使用,代码注释的详解别忘了看看
    //    1.
    let myCharts = this.$echarts.init(this.$refs.myCharts);
    //    2.
    let options = {
      title: {
        text: "未来一周气温变化", //图表顶部的标题
        subtext: "纯属虚构" //副标题
      },
      tooltip: {
        //鼠标悬浮框的提示文字
        trigger: "axis"
      },
      legend: {
        data: ["早上气温", "中午气温","晚上气温"]
      },
      grid: {
        //样式修改
        height: "80%"
      },
      xAxis: [
        {
          //x轴坐标数据
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          //y轴坐标数据
          type: "value",
          axisLabel: {
            formatter: "{value} °C"
          },
          splitLine: {
            //设置 y轴 多条细线
            show: false //显示  隐藏
          }
        }
      ],
      series: [
        //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        {
          name: "早上气温",
          type: "line", //pie->饼状图  line->折线图  bar->柱状图
          data: [1, 8, 5, 3, 1, 6, 10]
        },
        {
          name: "中午气温",
          type: "line", //pie->饼状图  line->折线图  bar->柱状图
          data: [11, 11, 15, 13, 12, 13, 10]
        },
        {
          name: "晚上气温",
          type: "line", //pie->饼状图  line->折线图  bar->柱状图
          data: [1, -5, -2, -5, -3, -2, 0]
        }
      ]
    };

    // 3.
    myCharts.setOption(options);
  }
};
</script>
<style scoped lang="less">
.role {
  width: 100%;
  height: 100%;
  background: #ccc;
  #myCharts {
    background: #fff;
  }
}
</style>