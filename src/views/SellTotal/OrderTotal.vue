<template>
  <div>
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>订单统计</span>
      </div>
      <div class="echarts">
        <!-- 设置盒子 -->
        <div id="myChart" style="width: 1000px;height:600px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted() {
    this.drawLine(); // 在dom上挂载
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("myChart")); // 还有操作dom这种操作？？？？
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["利润", "支出", "收入"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true
              }
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>