<template>
  <div>
    <el-card>
      <!-- 标题 -->
      <div slot="header" class="clearfix login-header">
        <span>首页</span>
      </div>
      <div class="echarts">
        <!-- 设置盒子 -->
        <div id="myChart" style="width: 600px;height:400px;"></div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
 mounted(){
    this.drawLine(); // 在dom上挂载
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart')) // 还有操作dom这种操作？？？？
        // 绘制图表
        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>