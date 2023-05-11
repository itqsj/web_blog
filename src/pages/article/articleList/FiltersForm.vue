<template>
  <div class="form t-background t-boxshadow t-color">
    <v-btn
      class="form_close"
      icon="$close"
      size="30"
      variant="text"
      @click="emit('close')"
    ></v-btn>
    <h4>Filters</h4>
    <!-- <v-text-field
      label="Prepend inner"
      class="form_search"
      prepend-inner-icon="mdi-map-marker"
      variant="solo"
    ></v-text-field> -->
    <BorInput
      v-model="form.keyWord"
      class="mtop-20 mbottom-20"
      placeholder="keyWord"
      :prefix-icon="Search"
    />
    <p class="form_text">Issue date</p>
    <el-date-picker
      v-model="form.startTime"
      class="form_picker"
      type="date"
      placeholder="Pick start_time"
      size="large"
      @change="startTimeChange"
    />

    <el-date-picker
      v-model="form.endTime"
      class="form_picker mtop-20"
      type="date"
      placeholder="Pick end_time"
      size="large"
      @change="endTimeChange"
    />
    <p class="form_text mtop-20">From customer</p>
    <div class="form_category">
      <v-checkbox
        v-for="item in cates"
        :key="item._id"
        v-model="form.cateIds"
        :label="item.name"
        :value="item._id"
        color="red-darken-3"
        hide-details
      ></v-checkbox>
    </div>
    <v-btn
      :disabled="loading"
      :loading="loading"
      block
      class="text-none mb-4 mt-4"
      color="indigo-darken-3"
      size="large"
      variant="flat"
      @click="handleFilter"
    >
      FILTER
    </v-btn>
  </div>
</template>

<script lang="ts">
export default {
  name: 'FiltersForm',
};
</script>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs } from 'vue';

import { Search } from '@element-plus/icons-vue';
import BorInput from '@/components/input/BorInput.vue';

import type { ArticleFilterInt } from '@/types/article';
import { cateList } from '@/api/api_cate';
import type { CateInt } from '@/types/cate';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
const { loading } = toRefs(props);
const emit = defineEmits(['change', 'close']);
const form = reactive<ArticleFilterInt>({
  startTime: new Date(),
  endTime: new Date(),
  keyWord: '',
  timeRang: [0, 0],
  cateIds: [],
});
const cates = ref<CateInt[]>([]);
let catePage = 1;

onMounted(() => {
  getCateList();
});

const handleFilter = () => {
  emit('change', form);
};

const getCateList = async () => {
  const params = {
    page: catePage,
    pageSize: 10,
  };

  const { code, data } = await cateList(params);
  if (code === 200) {
    cates.value = data.list;
  }
};

const startTimeChange = () => {
  if (form.startTime) {
    form.timeRang[0] = form.startTime.getTime();
  } else {
    form.timeRang[0] = 0;
  }
};

const endTimeChange = () => {
  if (form.endTime) {
    form.timeRang[1] = form.endTime.getTime() + 60 * 60 * 24 * 1000 - 1000;
  } else {
    form.timeRang[1] = 0;
  }
};
</script>

<style scoped lang="less">
.form {
  position: relative;
  max-width: 20rem;
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
  &_category {
    overflow: auto;
    max-height: 15.625rem;
  }
  &_close {
    display: none;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}

@media screen and (max-width: 900px) {
  .form_close {
    display: block;
  }
}
</style>
