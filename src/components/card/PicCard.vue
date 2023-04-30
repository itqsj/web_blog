<template>
  <div class="card t-boxshadow t-background">
    <div class="card_img">
      <!-- <img :src="data.img" alt="" /> -->
      <v-carousel height="auto">
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
    <div class="card_body">
      <div v-show="!isBtn" class="card_body_operat">
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
      <div v-show="isBtn" class="card_body_operat" @click="uploadShow = true">
        123132
      </div>
      <h4 class="font-20">Cozy 5 Stars Apartment</h4>
      <p class="font-16">
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
        and near to "Naviglio" where you can enjoy the main night life in
        Barcelona.
      </p>
      <div v-show="showFooter" class="line mtop-16 mbouttom-16"></div>
    </div>
    <div v-show="showFooter" class="card_footer font-16">
      <div>$899/night</div>
      <div class="flex_center">
        <el-icon class="mright-5"><LocationFilled /></el-icon>Barcelona, Spain
      </div>
    </div>
    <CommonDialog v-model="uploadShow" draggable title="上传图片">
      <CommonUpload></CommonUpload>
    </CommonDialog>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PicCard',
};
</script>

<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import CommonDialog from '@/components/dialog/CommonDialog.vue';
import CommonUpload from '@/components/upload/uploadImg.vue';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  isBtn: {
    type: Boolean,
    default: false,
  },
});

const { data } = toRefs(props);
const uploadShow = ref(false);
</script>

<style lang="less" scoped>
.card {
  border-radius: 8px;

  &:hover {
    .card_img {
      transform: translate(0, -35px);
    }
  }
  &_img {
    z-index: 20;
    position: relative;
    top: -20px;
    width: 95%;
    margin: auto;
    transition: all 300ms cubic-bezier(0.34, 1.61, 0.7, 1) 0s;
    .v-carousel {
      overflow: hidden;
      width: 100%;
      aspect-ratio: 1.5/1;
      :deep(.v-responsive) {
        overflow: hidden;
        width: 100%;
        aspect-ratio: 1.5/1;
      }
    }
    img {
      width: 100%;
      aspect-ratio: 1.5/1;
      object-fit: contain;
      border-radius: 8px;
    }
  }
  &_body {
    position: relative;
    &_operat {
      position: absolute;
      top: -40px;
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
