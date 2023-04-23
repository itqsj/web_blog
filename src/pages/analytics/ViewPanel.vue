<template>
  <div class="panel t-boxshadow t-background">
    <div class="panel_echarts">
      <!-- <img
        src="https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      /> -->
      <slot></slot>
    </div>
    <div class="panel_body">
      <h4 class="font-16">Website Views</h4>
      <p class="font-14">(+15%) increase in today sales.</p>
      <div v-show="showFooter" class="line mtop-16 mbouttom-16"></div>
    </div>
    <div v-show="showFooter" class="panel_footer font-14">
      sc campaign sent 2 days ago
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ViewPanel',
};
</script>

<script lang="ts" setup>
const props = defineProps({
  showFooter: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="less" scoped>
.panel {
  border-radius: 8px;

  &_echarts {
    z-index: 20;
    position: relative;
    top: -20px;
    padding: 0 16px;
    box-sizing: border-box;
    transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1) 0s;
    img {
      width: 100%;
      object-fit: contain;
      border-radius: 0.5rem;
    }
  }
  &_body {
    position: relative;
    h4 {
      line-height: 1.625;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      font-weight: 700;
      letter-spacing: 0.0075em;
      text-transform: capitalize;
      color: rgb(52, 71, 103);
      padding-left: 1.5rem;
    }
    p {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      color: rgb(123, 128, 154);
      font-weight: 300;
      padding-left: 1.5rem;
      line-height: 1.5;
      letter-spacing: 0.02857em;
    }
  }
  &_footer {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    letter-spacing: 0.02857em;
    color: rgb(123, 128, 154);
    font-weight: 300;
    padding: 0 1.5rem 1.5rem;
    box-sizing: border-box;
  }
}
</style>
