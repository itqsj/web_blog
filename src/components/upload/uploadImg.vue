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
    <div class="upload_footer">
      <v-btn class="upload_footer_add mtop-15 mright-20" @click="submit"
        >SUBMIT</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UploadImg',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import {
  UploadProgressEvent,
  UploadRawFile,
  ElNotification,
} from 'element-plus';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { uploadFile } from '@/api/api_upload';

interface CropperChangeInt {
  canvas: HTMLCanvasElement;
}

const emit = defineEmits(['success']);
const cropperImg = ref('');
let corImg = '';

const beforeUpload = (rawFile: UploadRawFile) => {
  cropperImg.value = window.URL.createObjectURL(rawFile);

  return false;
};

const onProgress = (evt: UploadProgressEvent) => {
  console.log(evt);
};

const cropperChange = ({ canvas }: CropperChangeInt) => {
  corImg = canvas.toDataURL('image/png');
};

const submit = () => {
  if (!corImg) {
    ElNotification({
      title: '提示',
      message: '请选择图片',
    });
    return;
  }
  const formD = new FormData();
  const blob = dataURLtoBlob(corImg);
  const file = blobToFile(blob, guid());
  formD.append('file', file);

  uploadFile(formD).then((res) => {
    if (res.code === 200) {
      ElNotification({
        title: '提示',
        message: '上传成功',
      });
      emit('success', res.data.url);
    }
  });
};

const guid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

//将base64转换为blob
const dataURLtoBlob = (dataurl: string): Blob => {
  const arr: string[] = dataurl.split(',');
  const mime: string | null = arr[0].match(/:(.*?);/)![1];
  const bstr: string = atob(arr[1]);
  let n: number = bstr.length;
  const u8arr: Uint8Array = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

//将blob转换为file
const blobToFile = (theBlob: Blob, fileName: string): File => {
  (theBlob as any).lastModifiedDate = new Date();
  return new File([theBlob], fileName);
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
  &_footer {
    text-align: right;
    &_add {
      padding: 0.5625rem 1rem;
      background-image: linear-gradient(
        195deg,
        rgb(73, 163, 241),
        rgb(26, 115, 232)
      );
      background-position-y: initial;
      background-repeat: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      background-color: initial;
      color: rgb(255, 255, 255);
      box-sizing: border-box;
      box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
        rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
        rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
      background-size: 150% !important;
      background-position-x: 25% !important;
    }
  }
}
</style>
