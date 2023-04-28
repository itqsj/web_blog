<template>
  <div>
    <!-- <commonSkeleton :loading="skeletonLoad">
    <template #template>
      <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
    </template> -->
    <div class="page">
      <h3 class="font-18 t-color mtop-15 mbottom-15">Tasks Panel</h3>
      <v-btn class="page_add" @click="addTask">ADD TASK</v-btn>
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
          <TaskGroup
            :data="element"
            @clone-list="cloneList"
            @move="TaskMove"
            @refresh="resetList"
          />
        </template>
      </draggable>
    </div>
    <!-- </commonSkeleton> -->
    <el-dialog
      v-model="dialogVis"
      style="border-radius: 8px"
      title="Task Time"
      width="650"
    >
      <taskTime
        ref="taskTimeRef"
        @close="closeTimeDialog"
        @submit="submitTask"
      ></taskTime>
    </el-dialog>
    <Overlay v-model="loading"> </Overlay>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskPage',
};
</script>
<script lang="ts" setup>
import { ref, computed, onBeforeMount, toRefs, nextTick, Component } from 'vue';
import { useRouter } from 'vue-router';

import draggable from 'vuedraggable';
import TaskGroup from './TaskGroup.vue';
import commonSkeleton from '@/components/skeleton/commonSkeleton.vue';
import Overlay from '@/components/mask/Overlay.vue';
import taskTime from './taskTime.vue';

import { useUserStore } from '@/store/user';
import { panelList, panelMove, taskMove } from '@/api/api_task';
import {
  PanelInt,
  MovePanelParams,
  DragChange,
  TaskInt,
  TaskTimeInt,
  MoveTaskParams,
} from '@/types/task';
import cloneDeep from 'lodash/cloneDeep';

interface MoveInt {
  tar: PanelInt;
  evt: DragChange<TaskInt>;
}

interface TaskParamsInt {
  added: Pick<TaskInt, '_id' | 'sort' | 'panel_id'> & Pick<PanelInt, 'type'>;
  removed: Pick<TaskInt, '_id' | 'sort' | 'panel_id'>;
}

const router = useRouter();
const { getUserInfo } = toRefs(useUserStore());
const taskTimeRef = ref();
let oldList: PanelInt[] = [];
const list = ref<PanelInt[]>([]);
const drag = ref(false);
const loading = ref(false);
const skeletonLoad = ref(true);
const dialogVis = ref(false);
const taskParams: TaskParamsInt = {
  added: {},
  removed: {},
} as unknown as TaskParamsInt;

const dragOptions = computed(() => ({
  animation: 200,
  group: 'tasks',
  disabled: false,
  ghostClass: 'ghost',
}));

onBeforeMount(() => {
  getPanels();
});

const submitTask = (data: TaskTimeInt) => {
  console.log(data);
  handleTaskMove(data);
};

const TaskMove = ({ tar, evt }: MoveInt) => {
  if (evt.added) {
    taskParams.added = {
      _id: evt.added.element._id,
      sort: evt.added.newIndex,
      panel_id: tar._id,
      type: tar.type,
    };
  } else {
    taskParams.removed = {
      _id: evt.removed.element._id,
      sort: evt.removed.oldIndex,
      panel_id: tar._id,
    };

    // if (taskParams.added.type === 2) {
    //   dialogVis.value = true;
    //   return;
    // }
    handleTaskMove();
  }
};

const handleTaskMove = async (data?: TaskTimeInt) => {
  loading.value = true;
  const params: MoveTaskParams = {
    team_id: getUserInfo.value.team._id,
    type: 2,
    data: JSON.stringify(taskParams),
  };
  // if (data) {
  //   params.needTime = data.needTime;
  // }

  const { code } = await taskMove(params);
  if (code === 200) {
    //获取原来面板和新加入的面板
    const index = list.value.findIndex(
      (item) => item._id === taskParams.added.panel_id,
    );
    const removeIndex = list.value.findIndex(
      (item) => item._id === taskParams.removed.panel_id,
    );

    list.value[index].tasks.forEach((element) => {
      if (element._id === taskParams.added._id) {
        element.panel_id = list.value[index]._id;
        if (list.value[index].type === 2) {
          // 当新加入的面板是进行中，计入开始时间
          element.usageTime.push([Date.now()]);
        } else if (list.value[index].type === 3) {
          // 当新加入的面板是已完成，更新完成时间
          element.completeTime = Date.now();
        }
      }
      if (
        list.value[removeIndex].type === 2 &&
        element._id === taskParams.removed._id
      ) {
        // 当原来的面板是进行中，更新使用时间
        const index = (element.usageTime.length || 1) - 1;
        if (element.usageTime[index]) {
          element.usageTime[index].push(Date.now());
        }
      }
    });

    cloneList();
  }
  nextTick(() => {
    loading.value = false;
    if (data) {
      taskTimeRef.value.submitLoad = false;
      closeTimeDialog();
    }
  });
};

const getPanels = async () => {
  loading.value = true;
  const { code, data } = await panelList();
  if (code === 200) {
    list.value = data.list;
    cloneList();
    nextTick(() => {
      skeletonLoad.value = false;
      loading.value = false;
    });
  }
};

const handleMove = async (tar: PanelInt) => {
  loading.value = true;
  const params: MovePanelParams = {
    name: tar.name,
    _id: tar._id,
    team_id: getUserInfo.value.team._id,
    sort: tar.sort,
  };
  const { code } = await panelMove(params);

  if (code === 200) {
    cloneList();
  } else {
    resetList();
  }

  loading.value = false;
};

const resetList = () => {
  list.value = cloneDeep(oldList);
};

const cloneList = () => {
  oldList = cloneDeep(list.value);
};

const change = (evt: DragChange<PanelInt>) => {
  const tar: PanelInt = {
    ...evt.moved.element,
    sort: evt.moved.newIndex,
  };
  handleMove(tar);
};

const closeTimeDialog = () => {
  resetList();
  dialogVis.value = false;
};

const addTask = () => {
  router.push('/addTask');
};
</script>

<style lang="less" scoped>
.page {
  &_add {
    padding: 0.5625rem 1rem;
    background-image: linear-gradient(
      195deg,
      rgb(73, 163, 241),
      rgb(26, 115, 232)
    );
    background-position-y: initial;
    background-repeat: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: initial;
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    box-shadow: rgb(26 115 232 / 15%) 0rem 0.1875rem 0.1875rem 0rem,
      rgb(26 115 232 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem,
      rgb(26 115 232 / 15%) 0rem 0.0625rem 0.3125rem 0rem;
    background-size: 150% !important;
    background-position-x: 25% !important;
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
