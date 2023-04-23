<template>
  <div class="echarts">
    <div id="pic" style="width: 100%; height: 800px"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegionEcharts',
};
</script>

<script lang="ts" setup>
import { onMounted } from 'vue';

const initEchart = () => {
  var myChart = (window as any).echarts.init(document.getElementById('pic'));

  var option = {
    backgroundColor: new (window as any).echarts.graphic.LinearGradient(
      0,
      0,
      1,
      0,
      [
        {
          offset: 0.1,
          color: 'rgb(73, 163, 241)', // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgb(26, 115, 232)', // 100% 处的颜色
        },
      ],
      false,
    ),
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' },
        ],
      },
    ],
  };
  myChart.setOption(option);
};

onMounted(() => {
  initEchart();
});
</script>

<style lang="less" scoped>
.echarts {
  overflow: hidden;
  // background-color: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))';
  border-radius: 0.5rem;
}
</style>
