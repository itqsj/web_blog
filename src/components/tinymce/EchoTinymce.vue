<template>
  <div ref="bodyRef" class="t-color body">
    <MdEditor
      v-model="data"
      preview-only
      class="t-color"
      :theme="mdEditorTheme"
    />
    <!-- <div class="t-color" v-html="data"></div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'EchoTinymce',
};
</script>
<script lang="ts" setup>
import { toRefs, ref, watchEffect, nextTick } from 'vue';
import hljs from 'highlight.js';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { isDark } from '@/composables';

const props = defineProps({
  data: {
    type: String,
    default: '',
  },
});
const bodyRef = ref();
const mdEditorTheme = ref('dark');
const { data } = toRefs(props);

watchEffect(() => {
  mdEditorTheme.value = isDark.value ? 'dark' : 'linght';
});
watchEffect(() => {
  data.value; //收集依赖
  setTimeout(() => {
    nextTick(() => {
      // hljs.highlightAll();
      const codeArr: HTMLElement[] = bodyRef.value.querySelectorAll('code');

      codeArr.forEach((el) => {
        const pre = el.parentNode as HTMLElement;

        if (pre.classList.contains('language-markup')) {
          pre.classList.replace('language-markup', 'language-html');
        }
        hljs.highlightElement(el);
      });
    });
  }, 200);
});
</script>

<style scoped lang="less">
.body {
  text-align: justify;
  :deep(img) {
    max-width: 100%;
    height: auto;
  }
  :deep(.md-editor) {
    background-color: transparent;
  }
}
</style>
