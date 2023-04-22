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

<style lang="less" scoped></style>
