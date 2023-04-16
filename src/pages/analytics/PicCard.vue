<template>
  <div class="card">
    <div class="card_img">
      <img :src="data.img" alt="" />
    </div>
    <div class="card_body">
      <div class="card_body_operat">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Refresh"
          placement="bottom"
        >
          <el-icon style="color: #e82567"><RefreshRight /></el-icon>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Edit"
          placement="bottom"
        >
          <el-icon style="color: #1a73e8"><EditPen /></el-icon>
        </el-tooltip>
      </div>
      <h4 class="font-20">Cozy 5 Stars Apartment</h4>
      <p class="font-16">
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
        and near to "Naviglio" where you can enjoy the main night life in
        Barcelona.
      </p>
      <div class="line mtop-16 mbouttom-16"></div>
    </div>
    <div class="card_footer font-16">
      <div>$899/night</div>
      <div class="flex_center">
        <el-icon class="mright-5"><LocationFilled /></el-icon>Barcelona, Spain
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PicCard',
};
</script>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const { data } = toRefs(props);
</script>

<style lang="less" scoped>
.card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 10px 10px 20px #d3d3d3, -10px -10px 20px #ededed;

  &:hover {
    .card_img {
      top: -68px;
    }
  }
  &_img {
    z-index: 20;
    position: relative;
    top: -20px;
    padding: 0 16px;
    transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1) 0s;
    img {
      width: 100%;
      aspect-ratio: 1.5/1;
      object-fit: contain;
      border-radius: 8px;
    }
  }
  &_body {
    position: relative;
    color: rgb(52, 71, 103);
    &_operat {
      position: absolute;
      top: -50px;
      display: flex;
      justify-content: center;
      gap: 50px;
      width: 100%;
      font-size: 18px;
    }
    h4 {
      color: rgb(123, 128, 154);
      text-align: center;
      font-weight: 500;
    }
    p {
      color: rgb(123, 128, 154);
      padding: 12px 24px 8px 24px;
      text-align: center;
      font-weight: 300;
    }
  }
  &_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(123, 128, 154);
    padding: 4px 24px 24px;
    box-sizing: border-box;
  }
}
</style>
