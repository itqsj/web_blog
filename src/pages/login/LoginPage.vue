<template>
  <div>
    {{ userStore.name }}
    <button @click="handleUpdata">123</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const handleUpdata = () => {
  userStore.updateName('李四');
};
</script>

<style scoped></style>
