<template>
  <div>
    <div v-loading="loading" class="page">
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
        item-key="_id"
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
import { ref, computed, onBeforeMount, toRefs } from 'vue';

import draggable from 'vuedraggable';
import TaskGroup from './TaskGroup.vue';

import { useUserStore } from '@/store/user';
import { panelList, panelMove } from '@/api/api_task';
import { PanelInt } from '@/types/task';
import { ResInt, DataInt } from '@/types/index';
import { ElNotification } from 'element-plus';
import { h } from 'vue';

interface DragChange<T> {
  moved: {
    newIndex: number;
    oldIndex: number;
    element: T;
  };
}

const { getToken, getUserInfo } = toRefs(useUserStore());
const drag = ref(false);
const loading = ref(false);
const list = ref<PanelInt[]>([]);

const dragOptions = computed(() => ({
  animation: 200,
  group: 'tasks',
  disabled: false,
  ghostClass: 'ghost',
}));

onBeforeMount(() => {
  getPanels();
});

const getPanels = async () => {
  const { code, data } = (await panelList()) as ResInt<DataInt<PanelInt[]>>;
  if (code === 200) {
    list.value = data.list;
  }
};
const handleMove = async (tar: PanelInt) => {
  loading.value = true;
  const params: PanelInt = {
    name: tar.name,
    _id: tar._id,
    team_id: getUserInfo.value.team._id,
    sort: tar.sort,
  };
  const { code } = (await panelMove(params)) as ResInt<string>;
  if (code === 200) {
    // ElNotification({
    //   title: '提示',
    //   message: h('i', { style: 'color: teal' }, '操作成功'),
    // });
  } else {
    getPanels();
  }

  loading.value = false;
};
const change = (evt: DragChange<PanelInt>) => {
  console.log(evt.moved.element);
  const tar: PanelInt = {
    ...evt.moved.element,
    sort: evt.moved.newIndex,
  };
  handleMove(tar);
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
