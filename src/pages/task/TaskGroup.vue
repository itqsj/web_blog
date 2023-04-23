<template>
  <div>
    <div class="panel">
      <div class="panel_head">
        <h3 class="t-color">{{ data.name }}</h3>
        <div>
          <el-icon><Plus /></el-icon>
        </div>
      </div>
      <draggable
        v-model="list"
        class="list-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        item-key="id"
        @start="drag = true"
        @end="drag = false"
        @change="change"
      >
        <template #item="{ element }">
          <TaskItem :data="element"></TaskItem>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskGroup',
};
</script>
<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';

import draggable from 'vuedraggable';
import TaskItem from './TaskItem.vue';

import { DragInt } from '@/types/task';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const list = ref([
  {
    name: 'vue.draggable',
    id: 7,
    show_img: false,
  },
  {
    name: 'draggable',
    id: 8,
    show_img: false,
  },
  {
    name: 'component',
    id: 9,
    show_img: true,
  },
  {
    name: 'for',
    id: 10,
    show_img: false,
  },
  {
    name: 'vue.js 2.0',
    id: 11,
    show_img: false,
  },
  {
    name: 'based',
    id: 12,
    show_img: false,
  },
  {
    name: 'Sortablejs',
    id: 13,
    show_img: false,
  },
]);
const drag = ref(false);

const dragOptions = computed(() => ({
  animation: 200,
  group: 'taskItem',
  disabled: false,
  ghostClass: 'ghost',
}));
const change = (evt: DragInt) => {
  console.log(evt);
};

const { data } = toRefs(props);
</script>

<style lang="less" scoped>
.panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
  &_head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5625rem;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5625rem;
      background-color: rgb(255, 255, 255);
      color: rgb(0, 0, 0);
      font-size: 0.75rem;
      aspect-ratio: 1/1;
      border-radius: 0.5rem;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0;
  }
  .list-group {
    flex: 1;
    margin-top: 1.25rem;
  }
  .list-group-item {
    // color: rgb(123, 128, 154);
    margin-bottom: 1.25rem;
    padding: 1rem;
    // background: rgb(255, 255, 255);
    border-radius: 0.75rem;
    font-size: 1rem;
    cursor: move;
    &::marker {
      display: none;
    }
  }
}
</style>
