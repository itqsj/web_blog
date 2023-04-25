<template>
  <div>
    <div class="item t-color t-background t-boxshadow">
      <img
        class="item_img mbottom-15"
        src="https://demos.creative-tim.com/otis-admin-pro/static/media/office-dark.1a5b950b43ac88b815d5.jpg"
        alt=""
      />
      <p class="mbottom-10">{{ data.name }}</p>
      <ul class="item_tags">
        <li :class="{ item_tags_err: true }">DELECT</li>
        <li :class="{ item_tags_updata: true }" @click="handleUpdate">
          UPDATES
        </li>
        <li :class="{ item_tags_review: true }">REVIEW</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TaskItem',
};
</script>
<script lang="ts" setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

import type { TaskInt } from '@/types/task';

const props = defineProps({
  data: {
    type: Object as () => TaskInt,
    default: () => ({}),
  },
});

const router = useRouter();
const { data } = toRefs(props);

const handleUpdate = () => {
  const query = {
    id: data.value._id,
  };
  router.push({
    path: '/addTask',
    query,
  });
};
</script>

<style lang="less" scoped>
.item {
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
  &_img {
    width: 100%;
    object-fit: contain;
    border-radius: 8px;
  }
  &_tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    &_err {
      background: linear-gradient(195deg, rgb(239, 83, 80), rgb(229, 57, 53));
    }
    &_updata {
      background: linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232));
    }
    &_review {
      background: linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71));
    }
    li {
      padding: 0.45em 0.775em;
      font-size: 0.65rem;
      font-weight: 700;
      border-radius: 0.375rem;
      color: rgb(255, 255, 255);
      cursor: pointer;
    }
  }
}
</style>
