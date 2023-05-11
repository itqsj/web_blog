<template>
  <div class="echarts">
    <div :id="echartsid" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LineEcharts',
};
</script>

<script lang="ts" setup>
import { onMounted, nextTick, toRefs, onBeforeUnmount, ref } from 'vue';

import { EchartsInt } from '@/types/analytics';
import * as echarts from 'echarts';

const props = defineProps({
  echartsid: {
    type: String,
    default: 'line',
  },
});

const { echartsid } = toRefs(props);
const Chart = ref<EchartsInt>(null as unknown as EchartsInt);

const initEchart = () => {
  const myChart = echarts.init(document.getElementById(echartsid.value) as HTMLElement);

  const option = {
    backgroundColor: new echarts.graphic.LinearGradient(
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
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: {
        show: false,
        lineStyle: {
          color: '#f8fcf8',
        },
      },
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#f8fcf8',
        },
      },
    },
    grid: {
      left: '45px',
      right: '20px',
      top: '20px',
      bottom: '30px',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        lineStyle: {
          width: 5,
          color: '#f8fcf8',
        },
        itemStyle: {
          color: '#f8fcf8',
          borderJoin: 'bevel',
        },
        symbolSize: 12,
        symbol: 'circle',
      },
    ],
  };
  myChart.setOption(option);
  Chart.value = myChart;
};

const resize = () => {
  Chart.value.resize();
};

onMounted(() => {
  nextTick(() => {
    initEchart();
    window.addEventListener('resize', resize);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="less" scoped>
.echarts {
  overflow: hidden;
  height: 100%;
  // background-color: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))';
  border-radius: 0.5rem;

  :deep(div) {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
