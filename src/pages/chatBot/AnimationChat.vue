<script setup lang="ts">
import { toRefs } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
const props = defineProps({
  size: {
    type: Number,
    default: 400,
  },
  link: {
    type: String,
    default: 'https://assets5.lottiefiles.com/packages/lf20_eYXADRNJPy.json',
  },
});

const { size, link } = toRefs(props);
</script>

<template>
  <Vue3Lottie :animation-link="link" :height="size" :width="size" />
</template>

<style scoped lang="scss"></style>
