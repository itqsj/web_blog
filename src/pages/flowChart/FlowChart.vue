<template>
  <div class="container">
    <FlowChartToolbar @view-data="handlePreview"></FlowChartToolbar>
    <div ref="lfElRef" class="container_lf"></div>
    <CommonDialog
      v-model="showJson"
      style="max-width: 800px; min-width: 340px"
      draggable
      title="流程数据"
    >
      <JsonPreview :data="graphData"></JsonPreview>
    </CommonDialog>
  </div>
</template>

<script setup lang="ts" name="FlowChart">
import type { Ref, PropType } from 'vue';
import type { Definition } from '@logicflow/core';
import { ref, unref, nextTick, computed, onMounted } from 'vue';
import LogicFlow from '@logicflow/core';
import FlowChartToolbar from './FlowChartToolbar.vue';
import CommonDialog from '@/components/dialog/CommonDialog.vue';
import JsonPreview from '@/components/codeEditor/json-preview/JsonPreview.vue';
import {
  Snapshot,
  BpmnElement,
  Menu,
  DndPanel,
  SelectionSelect,
} from '@logicflow/extension';
import { isDark } from '@/composables';
import { configDefaultDndPanel } from './config';
import { toLogicFlowData } from './adpterForTurbo';
import { createFlowChartContext } from './useFlowContext';
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

const lfElRef = ref(null);
const lfInstance = ref(null) as Ref<LogicFlow | null>;
const props = defineProps({
  data: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  flowOptions: {
    type: Object as PropType<Definition>,
    default: () => ({}),
  },
  patternItems: {
    type: Array,
    default: null,
  },
});
const showJson = ref(false);
const graphData = ref({});
createFlowChartContext({
  logicFlow: lfInstance as unknown as LogicFlow,
});

const getFlowOptions = computed(() => {
  const { flowOptions } = props;

  const defaultOptions: Partial<Definition> = {
    grid: true,
    background: {
      color: isDark.value ? '#151515' : '#f7f9ff',
    },
    keyboard: {
      enabled: true,
    },
    ...flowOptions,
  };
  return defaultOptions as Definition;
});

onMounted(() => {
  init();
});

function handlePreview() {
  const lf = unref(lfInstance);
  if (!lf) {
    return;
  }
  console.log(unref(lf).getGraphData());

  graphData.value = unref(lf).getGraphData();

  showJson.value = true;
}

// init logicFlow
async function init() {
  await nextTick();

  const lfEl = unref(lfElRef);

  if (!lfEl) {
    return;
  }
  LogicFlow.use(DndPanel);

  // Canvas configuration
  LogicFlow.use(Snapshot);
  // Use the bpmn plug-in to introduce bpmn elements, which can be used after conversion in turbo
  LogicFlow.use(BpmnElement);
  // Start the right-click menu
  LogicFlow.use(Menu);
  LogicFlow.use(SelectionSelect);

  lfInstance.value = new LogicFlow({
    ...unref(getFlowOptions),
    container: lfEl,
  });
  const lf = unref(lfInstance)!;
  // 修复导出报错
  lf.extension.snapshot.useGlobalRules = false;
  lf.extension.snapshot.customCssRules = `
    .lf-node-text-auto-wrap-content{
      line-height: 1.2;
      background: transparent;
      text-align: center;
      word-break: break-all;
      width: 100%;
    }
    .lf-canvas-overlay {
      background: transparent;
    }
  `;
  // 修复导出报错end
  lf?.setDefaultEdgeType('line');
  onRender();
  lf?.setPatternItems(props.patternItems || configDefaultDndPanel(lf));
}

async function onRender() {
  await nextTick();
  const lf = unref(lfInstance);
  if (!lf) {
    return;
  }
  const lFData = toLogicFlowData(props.data);

  lf.render(lFData);
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);

  &_lf {
    flex: 1;
  }
}
</style>
