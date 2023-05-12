<template>
  <div v-if="data" class="info">
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">ID</div>
      <div class="info_cell_body">{{ data._id }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">title</div>
      <div class="info_cell_body">{{ data.name }}</div>
    </div>
    <div v-if="data.usageTime.length" class="line"></div>
    <div v-if="data.usageTime.length" class="info_cell">
      <div class="info_cell_title">startTime</div>
      <div class="info_cell_body">{{ formatDate(data.usageTime[0][0]) }}</div>
    </div>
    <div v-if="data.completeTime" class="line"></div>
    <div v-if="data.completeTime" class="info_cell">
      <div class="info_cell_title">completeTime</div>
      <div class="info_cell_body">{{ formatDate(data.completeTime) }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">needTime</div>
      <div class="info_cell_body">
        {{ data.needTime / 1000 / 24 / 60 / 60 }}天
      </div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">creator_at</div>
      <div class="info_cell_body">{{ formatDate(data.creator_at) }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">sort</div>
      <div class="info_cell_body">{{ data.sort }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">priority</div>
      <div class="info_cell_body">{{ filterPriority }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">creator</div>
      <div class="info_cell_body">{{ data.user?.username }}</div>
    </div>
    <div class="line"></div>
    <div class="info_cell">
      <div class="info_cell_title">team</div>
      <div class="info_cell_body">{{ data.team?.name }}</div>
    </div>
    <div class="line"></div>

    <!-- <div class="info_cell">
      <div class="info_cell_title">panel</div>
      <div class="info_cell_body">panel_name</div>
    </div>
    <div class="line"></div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskBasicInfo',
};
</script>
<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import type { TaskInt } from '@/types/task';
import formatDate from '@/util/formatDate';

const props = defineProps({
  data: {
    type: Object as () => TaskInt,
    default: () => null,
  },
});
const { data } = toRefs(props);

const filterPriority = computed(() => {
  //1高，2较高，3低
  switch (data.value?.priority) {
    case 1:
      return '高';
    case 2:
      return '较高';
    case 3:
      return '低';

    default:
      return '低';
  }
});
</script>

<style lang="less" scoped>
.info {
  padding: 0 24px 12px;
  box-sizing: border-box;
  &_cell {
    display: flex;
    font-size: 14px;
    line-height: 1.57;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

    padding: 16px 24px;
    box-sizing: border-box;
    &_title {
      flex: 1;
      min-width: 150px;
      font-weight: 500;
    }
    &_body {
      overflow: hidden;
      flex: 7;
      font-weight: 400;
      color: rgb(108, 115, 127);
    }
  }
}
.line {
  margin: 0;
}
</style>
