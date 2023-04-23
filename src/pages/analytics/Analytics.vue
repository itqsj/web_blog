<template>
  <div>
    <div class="page">
      <!-- <PicEcharts></PicEcharts> -->
      <div class="page_region t-background t-boxshadow">
        <div class="page_region_table">
          <div class="page_region_table_head t-color">
            <div class="diamonds"></div>
            <span>Users by China</span>
          </div>
          <div class="page_region_table_body">
            <RegionTable></RegionTable>
          </div>
        </div>
        <div class="page_region_echarts">
          <RegionEcharts></RegionEcharts>
        </div>
      </div>
      <div class="page_views">
        <ViewPanel>
          <LineEcharts echartsid="line"></LineEcharts>
        </ViewPanel>
        <ViewPanel>
          <LineEcharts echartsid="line1"></LineEcharts>
        </ViewPanel>
        <ViewPanel>
          <LineEcharts echartsid="line2"></LineEcharts>
        </ViewPanel>
      </div>
      <div class="page_group">
        <PicCard
          v-for="(card, index) in cardList"
          :key="index"
          :data="card"
        ></PicCard>
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
import RegionTable from './RegionTable.vue';
import ViewPanel from './ViewPanel.vue';
import LineEcharts from './LineEcharts.vue';

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
  &_views {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 48px;
  }
  &_region {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    height: 50rem;
    margin-top: 2.5rem;
    border-radius: 0.5rem;
    padding: 1.25rem;
    box-sizing: border-box;
    &_table {
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 100%;
      &_head {
        display: flex;
        gap: 1.5rem;
        .diamonds {
          position: relative;
          top: -1.25rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 4rem;
          height: 4rem;
          margin-top: -1.25rem;
          background: linear-gradient(
            195deg,
            rgb(102, 187, 106),
            rgb(67, 160, 71)
          );
          color: rgb(255, 255, 255);
          border-radius: 0.75rem;
          box-shadow: rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem,
            rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem;
        }
        span {
          font-size: 1rem;
          line-height: 1.625;
          font-family: Roboto, Helvetica, Arial, sans-serif;
          font-weight: 700;
          letter-spacing: 0.0075em;
        }
      }
      &_body {
        overflow: hidden;
        flex: 1;
      }
    }
    &_echarts {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
