<template>
  <div class="container">
    <ReactCodeSandbox :isdark="isDark"></ReactCodeSandbox>
  </div>
</template>

<script setup lang="ts" name="CodeSandBox">
import { applyPureReactInVue } from 'veaury';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CodeSandbox from '~/codeSandbox/CodeSandbox.tsx';
import { isDark } from '@/composables';

const ReactCodeSandbox = applyPureReactInVue(CodeSandbox);
</script>

<style scoped lang="less"></style>
