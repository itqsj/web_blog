<template>
  <div class="echarts">
    <div id="main" style="height: 800px"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegionEcharts',
};
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// import * as echarts from 'echarts';
import chinaJson from '@/util/region/china.json';

interface RegionInt {
  name: string;
  ename?: string;
  value?: number;
}

interface TooltipInt {
  seriesName: string;
  name: string;
  value: string;
}
interface EchartsInt {
  resize: () => void;
}

const regionList = ref<RegionInt[]>([
  { name: '南海诸岛' },
  { ename: 'beijing', name: '北京' },
  { ename: 'tianjin', name: '天津' },
  { ename: 'shanghai', name: '上海' },
  { ename: 'chongqing', name: '重庆' },
  { ename: 'hebei', name: '河北' },
  { ename: 'henan', name: '河南' },
  { ename: 'yunnan', name: '云南' },
  { ename: 'liaoning', name: '辽宁' },
  { ename: 'heilongjiang', name: '黑龙江' },
  { ename: 'hunan', name: '湖南' },
  { ename: 'anhui', name: '安徽' },
  { ename: 'shandong', name: '山东' },
  { ename: 'xinjiang', name: '新疆' },
  { ename: 'jiangsu', name: '江苏' },
  { ename: 'zhejiang', name: '浙江' },
  { ename: 'jiangxi', name: '江西' },
  { ename: 'hubei', name: '湖北' },
  { ename: 'guangxi', name: '广西' },
  { ename: 'gansu', name: '甘肃' },
  { ename: 'shanxi', name: '山西' },
  { ename: 'neimenggu', name: '内蒙古' },
  { ename: 'shanxi1', name: '陕西' },
  { ename: 'jilin', name: '吉林' },
  { ename: 'fujian', name: '福建' },
  { ename: 'guizhou', name: '贵州' },
  { ename: 'guangdong', name: '广东' },
  { ename: 'qinghai', name: '青海' },
  { ename: 'xizang', name: '西藏' },
  { ename: 'sichuan', name: '四川' },
  { ename: 'ningxia', name: '宁夏' },
  { ename: 'hainan', name: '海南' },
  { name: '台湾' },
  { ename: 'xianggang', name: '香港' },
  { ename: 'aomen', name: '澳门' },
]);
const Chart = ref<EchartsInt>(null as unknown as EchartsInt);

const initEchart = () => {
  let dataList = regionList.value;
  for (let i = 0; i < dataList.length; i++) {
    dataList[i].value = Math.ceil(Math.random() * 1000 - 1);
  }

  const myChart = (window as any).echarts.init(document.getElementById('main'));
  (window as any).echarts.registerMap('china', chinaJson);
  const option = {
    tooltip: {
      //数据格式化
      formatter: function (params: TooltipInt, callback: () => void) {
        return params.seriesName + '<br />' + params.name + '：' + params.value;
      },
    },
    visualMap: {
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], //取值范围的文字
      inRange: {
        color: ['#e0ffff', 'blue'], //取值范围的颜色
      },
      show: true, //图注
    },
    geo: {
      map: 'china', //引入地图数据
      roam: false, //不开启缩放和平移
      zoom: 1, //视角缩放比例
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
        },
        emphasis: {
          //高亮的显示设置
          areaColor: 'skyblue', //鼠标选择区域颜色
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    // 鼠标悬浮提示框
    series: [
      {
        name: '省份',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  };
  myChart.setOption(option);
  Chart.value = myChart;
  myChart.on('click', function (params: { data: RegionInt; name: string }) {
    if (!params.data.ename) {
      alert('暂无' + params.name + '地图数据');
      return;
    }
  });
};

const resize = () => {
  Chart.value.resize();
};
onMounted(() => {
  initEchart();
  window.addEventListener('resize', resize);
});
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
}
</style>
