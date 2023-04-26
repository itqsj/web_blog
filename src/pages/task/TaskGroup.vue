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
        v-model="data.tasks"
        class="list-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        item-key="_id"
        @start="drag = true"
        @end="drag = false"
        @change="change"
      >
        <template #item="{ element }">
          <TaskItem
            :type="data.type"
            :data="element"
            @del="handleDel"
          ></TaskItem>
        </template>
      </draggable>
    </div>
    <Overlay v-model="loading"> </Overlay>
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
import Overlay from '@/components/mask/Overlay.vue';

import type {
  PanelInt,
  DragChange,
  TaskInt,
  MoveTaskParams,
} from '@/types/task';
import { taskMove } from '@/api/api_task';

const props = defineProps({
  data: {
    type: Object as () => PanelInt,
    default: null,
  },
});
const emit = defineEmits(['move', 'refresh', 'cloneList']);
const { data } = toRefs(props);
const drag = ref(false);
const loading = ref(false);

const dragOptions = computed(() => ({
  animation: 200,
  group: 'taskItem',
  disabled: false,
  ghostClass: 'ghost',
}));

const change = (evt: DragChange<TaskInt>) => {
  if (evt.moved) {
    const params: MoveTaskParams = {
      team_id: evt.moved.element.team_id,
      type: 1,
      data: JSON.stringify({
        _id: evt.moved.element._id,
        sort: evt.moved.newIndex,
        panel_id: evt.moved.element.panel_id,
      }),
    };
    handleMove(params);
  } else {
    emit('move', { tar: data.value, evt });
  }
};

const handleDel = (id: string) => {
  data.value.tasks = data.value.tasks.filter((item) => item._id !== id);
  emit('cloneList');
};

const handleMove = async (params: MoveTaskParams) => {
  loading.value = true;
  const { code } = await taskMove(params);

  if (code === 200) {
    emit('cloneList');
  } else {
    emit('refresh');
  }

  loading.value = false;
};
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
