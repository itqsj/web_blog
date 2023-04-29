<template>
  <div class="form t-background t-boxshadow t-color">
    <h4>Filters</h4>
    <v-text-field
      label="Prepend inner"
      class="form_search"
      prepend-inner-icon="mdi-map-marker"
      variant="solo"
    ></v-text-field>
    <p class="form_text">Issue date</p>
    <el-date-picker
      v-model="form.startTime"
      class="form_picker"
      type="date"
      placeholder="Pick a day"
      size="large"
    />

    <el-date-picker
      v-model="form.endTime"
      class="form_picker mtop-20"
      type="date"
      placeholder="Pick a day"
      size="large"
    />
    <p class="form_text mtop-10">From customer</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FiltersForm',
};
</script>
<script lang="ts" setup>
import { reactive } from 'vue';

const form = {
  startTime: '',
  endTime: '',
};
</script>

<style scoped lang="less">
.form {
  width: 20rem;
  height: 80vh;
  margin-right: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  h4 {
    font-size: 1.4583rem;
  }
  &_search {
    margin-top: 26px;
  }
  &_text {
    font-size: 14px;
    font-weight: 500;
    color: rgb(108, 115, 127);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    margin-bottom: 16px;
  }
  :deep(.form_picker) {
    width: 100%;
  }
}
</style>
