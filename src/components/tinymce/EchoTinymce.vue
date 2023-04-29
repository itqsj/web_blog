<template>
  <div ref="bodyRef" class="body t-color" v-html="data"></div>
</template>

<script lang="ts">
export default {
  name: 'EchoTinymce',
};
</script>
<script lang="ts" setup>
import { toRefs, ref, watchEffect, nextTick } from 'vue';
import hljs from 'highlight.js';

const props = defineProps({
  data: {
    type: String,
    default: '',
  },
});
const bodyRef = ref();
const { data } = toRefs(props);

watchEffect(() => {
  data.value; //收集依赖
  nextTick(() => {
    const codeArr: HTMLElement[] = bodyRef.value.querySelectorAll('code');
    codeArr.forEach((el) => {
      el.classList.add('mtop-10', 't-boxshadow', 'font-14');
      hljs.highlightElement(el);
    });
  });
});
</script>

<style scoped lang="less">
.body {
  text-align: justify;
  :deep(img) {
    max-width: 100%;
    height: auto;
  }
}
</style>
