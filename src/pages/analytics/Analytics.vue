<template>
  <div>
    <div class="page">
      <!-- <PicEcharts></PicEcharts> -->
      <div class="page_region">
        <RegionEcharts></RegionEcharts>
      </div>
      <div class="page_group">
        <PicCard
          v-for="(card, index) in cardList"
          :key="index"
          :data="card"
        ></PicCard>
        <div style="height: 100vh"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AnalyticsPage',
};
</script>

<script lang="ts" setup>
import PicCard from '@/components/card/PicCard.vue';
import RegionEcharts from './RegionEcharts.vue';
import PicEcharts from './PicEcharts.vue';

import pic1 from '@/assets/img/pic1.jpg';
import pic2 from '@/assets/img/pic2.jpg';
import pic3 from '@/assets/img/pic3.jpg';

const cardList = [
  {
    img: pic1,
    title: 'Cozy 5 Stars Apartment',
    content:
      'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
  },
  {
    img: pic2,
    title: 'Office Studio',
    content:
      'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
  },
  {
    img: pic3,
    title: 'Beautiful Castle',
    content:
      'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
  },
];
</script>

<style lang="less" scoped>
.page {
  &_group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 48px;
  }
  &_region {
    margin-top: 2.5rem;
  }
}
</style>
