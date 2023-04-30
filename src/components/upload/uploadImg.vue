<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      :show-file-list="false"
      accept=".png, .jpg, .jpeg"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">jpg/png/jpeg files</div>
      </template>
    </el-upload>
    <cropper
      class="upload_cropper mtop-15"
      :src="cropperImg"
      :stencil-props="{
        aspectRatio: 1.5 / 1,
      }"
      @change="cropperChange"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UploadImg',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import { UploadProgressEvent, UploadRawFile } from 'element-plus';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const cropperImg = ref('');

const beforeUpload = (rawFile: UploadRawFile) => {
  cropperImg.value = window.URL.createObjectURL(rawFile);
  console.log(cropperImg.value);

  return false;
};
const onProgress = (evt: UploadProgressEvent) => {
  console.log(evt);
};
const cropperChange = (data) => {
  console.log(data);
};
</script>

<style lang="less" scoped>
.upload {
  &_cropper {
    overflow: hidden;
    width: 100%;
    max-height: 600px;
    background: #ddd;
  }
}
</style>
