<template>
  <div ref="tinymceBox" class="tinymce t-background">
    <textarea :id="'editor-div' + timeStamp" class="t-background" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'TinymcePage',
};
</script>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

import type { Editor, EditorManager } from '../../../public/tinymce/tinymce';

import { isDark } from '@/composables';

interface WindowTinymce extends Window {
  tinymce: EditorManager;
}

const emit = defineEmits(['update:modelValue']);
const timeStamp = ref<number>();
let elementId = '';
let skin = isDark.value ? 'oxide-dark' : 'oxide'; //oxide-dark
let content_css = isDark.value ? 'dark' : ''; //  dark
const tinymceElement = ref<Editor>(null as unknown as Editor);

const init = () => {
  elementId = '#editor-div' + timeStamp.value;

  (window as unknown as WindowTinymce).tinymce
    .init({
      font_family_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;' +
        '苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;' +
        '宋体=simsun,serif;' +
        'Android 思源黑提=Source Han Sans;',
      language: 'zh_CN',
      content_style:
        'p {line-height: 2;font-size: 12pt;font-family: PingFang SC}',
      selector: elementId,
      relative_urls: true,
      remove_script_host: false,
      // inline: true,
      width: '100%',
      height: 450,
      branding: false,
      menubar: true,
      skin,
      content_css, //dark
      body_class: 't-background',
      plugins: [
        'image',
        'fullscreen',
        'code',
        'emoticons',
        'preview',
        'table',
        'media',
        'quickbars',
        'codesample',
      ],
      toolbar:
        'undo redo | styles | codesample bold italic  | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | image | preview media fullpage | ' +
        'forecolor backcolor emoticons',
      codesample_languages: [
        { text: 'HTML/XML', value: 'markup' },
        { text: 'JavaScript', value: 'javascript' },
        { text: 'CSS', value: 'css' },
        { text: 'PHP', value: 'php' },
        { text: 'Ruby', value: 'ruby' },
        { text: 'Python', value: 'python' },
        { text: 'Java', value: 'java' },
        { text: 'C', value: 'c' },
        { text: 'C#', value: 'csharp' },
        { text: 'C++', value: 'cpp' },
      ],
    })
    .then((tinymce: Editor[]) => {
      tinymceElement.value = tinymce[0];
      setInterval(() => {
        let content = tinymce[0].getContent();
        if (content) {
          // emit('emitContent', content);
          emit('update:modelValue', content);
        }
      }, 500);
    });
};

const setContent = (content: string) => {
  if (tinymceElement.value) {
    tinymceElement.value.setContent(content);
  } else {
    requestAnimationFrame(() => {
      setContent(content);
    });
  }
};

const reset = () => {
  tinymceElement.value.remove(); //销毁

  timeStamp.value = new Date().getTime() + Math.ceil(Math.random() * 10000);
  nextTick(() => {
    init();
  });
};

watch(
  () => isDark.value,
  () => {
    skin = isDark.value ? 'oxide-dark' : 'oxide'; //oxide-dark
    content_css = isDark.value ? 'dark' : ''; //  dark
    reset();
  },
);

onMounted(() => {
  timeStamp.value = new Date().getTime() + Math.ceil(Math.random() * 10000);

  nextTick(() => {
    init();
  });
});
onUnmounted(() => {
  setTimeout(() => {
    tinymceElement.value.remove(); //销毁
  }, 1000);
});

defineExpose({
  setContent,
});
</script>

<style lang="less" scoped>
.tinymce {
  width: 100%;
}
</style>
