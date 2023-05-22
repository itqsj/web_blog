<template>
  <div class="toolbar t-background t-color">
    <div v-for="(item, index) in toolbarItemList" :key="index">
      <v-btn
        v-if="!item.separate"
        variant="text"
        class="v-btn--icon"
        @click="onControl(item)"
      >
        <el-icon :size="20">
          <component :is="item.icon"></component>
        </el-icon>
      </v-btn>
      <div v-else class="toolbar_line"></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="FlowChartToolbar">
import type { Component } from 'vue';
import { unref } from 'vue';
import {
  ZoomOut,
  ZoomIn,
  FullScreen,
  RefreshRight,
  RefreshLeft,
  Download,
  View,
} from '@element-plus/icons-vue';
import { ToolbarTypeEnum } from './enum';
import { useFlowChartContext } from './useFlowContext';
export interface ToolbarConfig {
  type?: string | ToolbarTypeEnum;
  tooltip?: string | boolean;
  icon?: Component;
  disabled?: boolean;
  separate?: boolean;
}

import { ref } from 'vue';

const emit = defineEmits(['view-data']);
const toolbarItemList = ref<ToolbarConfig[]>([
  {
    type: ToolbarTypeEnum.ZOOM_IN,
    icon: ZoomOut,
    tooltip: '缩小',
  },
  {
    type: ToolbarTypeEnum.ZOOM_OUT,
    icon: ZoomIn,
    tooltip: '放大',
  },
  {
    type: ToolbarTypeEnum.RESET_ZOOM,
    icon: FullScreen,
    tooltip: '重置比例',
  },
  { separate: true },
  {
    type: ToolbarTypeEnum.UNDO,
    icon: RefreshRight,
    tooltip: '后退',
    disabled: true,
  },
  {
    type: ToolbarTypeEnum.REDO,
    icon: RefreshLeft,
    tooltip: '前进',
    disabled: true,
  },
  { separate: true },
  {
    type: ToolbarTypeEnum.SNAPSHOT,
    icon: Download,
    tooltip: '下载',
  },
  {
    type: ToolbarTypeEnum.VIEW_DATA,
    icon: View,
    tooltip: '查看数据',
  },
]);
const { logicFlow } = useFlowChartContext();

const onControl = (item: ToolbarConfig) => {
  const lf = unref(logicFlow);
  if (!lf) {
    return;
  }
  switch (item.type) {
    case ToolbarTypeEnum.ZOOM_IN:
      lf.zoom();
      break;
    case ToolbarTypeEnum.ZOOM_OUT:
      lf.zoom(true);
      break;
    case ToolbarTypeEnum.RESET_ZOOM:
      lf.resetZoom();
      break;
    case ToolbarTypeEnum.UNDO:
      lf.undo();
      break;
    case ToolbarTypeEnum.REDO:
      lf.redo();
      break;
    case ToolbarTypeEnum.SNAPSHOT:
      lf.getSnapshot();
      break;
    case ToolbarTypeEnum.VIEW_DATA:
      emit('view-data');
      break;
  }
};
</script>

<style scoped lang="less">
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 3.5rem;
  padding: 0 1rem;
  box-sizing: border-box;

  &_line {
    width: 1px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
