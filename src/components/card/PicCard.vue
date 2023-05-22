<template>
  <div class="card t-boxshadow t-background">
    <div class="card_img">
      <!-- <img :src="data.img" alt="" /> -->
      <div
        v-if="!imgList.length"
        class="card_img_empty t-background"
        @click="uploadShow = true"
      >
        <el-icon :size="48" class="el-icon--upload t-color"
          ><upload-filled
        /></el-icon>
        <span class="t-color">点击上传图片</span>
      </div>
      <v-carousel v-else height="auto" hide-delimiter-background>
        <v-carousel-item v-for="(item, index) in imgList" :key="index">
          <CommonImg cover :src="item"></CommonImg>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="card_body">
      <div class="card_body_operat">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Upload"
          placement="bottom"
        >
          <v-btn icon="mdi-cloud-upload" @click="uploadShow = true"></v-btn>
        </el-tooltip>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="del"
          placement="bottom"
        >
          <v-btn v-show="imgList.length" class="v-btn--icon">
            <el-icon :size="18"><DeleteFilled /></el-icon>
          </v-btn>
        </el-tooltip>
      </div>
      <h4 class="font-20">Upload Photo</h4>
      <p class="font-16">Support for uploading image types:.png, .jpg, .jpeg</p>
      <div class="line mtop-16 mbouttom-16"></div>
    </div>
    <CommonDialog
      v-model="uploadShow"
      class="t-color"
      style="max-width: 800px; min-width: 340px"
      draggable
      title="上传图片"
    >
      <CommonUpload @success="uoloadSuccess"></CommonUpload>
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
import CommonImg from '@/components/img/CommonImg.vue';
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const { getThemStyle } = toRefs(themeStore);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});
const { data } = toRefs(props);
const uploadShow = ref(false);
const imgList = ref<Array<string>>([]);

const uoloadSuccess = (url: string) => {
  uploadShow.value = false;
  imgList.value.push(url);
};

defineExpose({
  imgList,
});
</script>

<style lang="less" scoped>
.card {
  border-radius: 8px;

  &:hover {
    .card_img {
      transform: translate(0, -3.4375rem);
    }
  }
  &_img {
    z-index: 20;
    position: relative;
    top: -20px;
    width: 95%;
    aspect-ratio: 1.5/1;
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
    &_empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
      height: 100%;
      // background: #ffffff;
      border: 1px dashed rgba(0, 0, 0, 0.4);
      cursor: pointer;
      span {
        font-size: 14px;
        // color: rgba(0, 0, 0, 0.7);
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
      top: -4.375rem;
      display: flex;
      justify-content: center;
      gap: 2.5rem;
      width: 100%;
      font-size: 1.125rem;
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
