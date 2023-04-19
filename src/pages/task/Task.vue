<template>
  <div>
    <div class="page">
      <h3 class="font-18 t-color mtop-15">Tasks Panel</h3>

      <draggable
        v-model="list"
        class="list-group mtop-20"
        :component-data="{
          tag: 'ul',
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
          <TaskGroup :data="element" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskPage',
};
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue';

import draggable from 'vuedraggable';
import TaskGroup from './TaskGroup.vue';

import { DragInt } from '@/types/task';

const drag = ref(false);
const list = ref<DragInt[]>([
  { name: 'Backlog', id: 1 },
  { name: 'In progress', id: 2 },
  { name: 'In review', id: 3 },
  { name: 'Done', id: 4 },
]);

const dragOptions = computed(() => ({
  animation: 200,
  group: 'tasks',
  disabled: false,
  ghostClass: 'ghost',
}));
const change = (evt: DragInt[]) => {
  console.log(evt);
};
</script>

<style lang="less" scoped>
.page {
  h3 {
    margin-bottom: 1.5625rem;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0;
    background: transparent;
  }
  .list-group {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3.75rem;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
}
</style>
