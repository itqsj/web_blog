<template>
  <v-dialog v-bind="$attrs">
    <template v-for="(value, name) in filterSlots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
    <v-card :title="title" class="t-boxshadow" :loading="loading" :text="text">
      <v-card-actions>
        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'DelConfirm',
};
</script>
<script lang="ts" setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useSlots, toRefs } from 'vue';
import type { Slots } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'DEL',
  },
  // subtitle: {
  //   type: String,
  //   default: 'DEL',
  // },
  text: {
    type: String,
    default:
      'This operation will permanently delete the item. Do you want to continue?',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const slots: Readonly<Slots> = useSlots();
const filterSlots = ref<Partial<Slots>>({});

const { title, text } = toRefs(props);
onMounted(() => {
  const entries = Object.entries(slots);
  for (const [key, value] of entries) {
    if (key !== 'actions') {
      filterSlots.value[key] = value;
    }
  }
});
</script>

<style lang="less" scoped></style>
