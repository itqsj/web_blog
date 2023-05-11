<template>
  <div>
    <div class="item t-color t-background t-boxshadow">
      <CommonImg v-if="cover" class="item_img mbottom-15" :src="cover" alt="" />
      <p class="mbottom-10">{{ data.name }}</p>
      <p v-if="type === 3 || type === 4" class="mbottom-10 item_time t-color">
        completeTime:&nbsp;&nbsp;&nbsp;{{ formatDate(data.completeTime) }}
      </p>
      <v-progress-linear
        v-if="type === 2"
        :model-value="taskSlider"
        :color="progressColor"
        height="20"
        striped
      >
        <template #default="{ value }">
          <span>时间已使用{{ Math.ceil(value) }}%</span>
        </template>
      </v-progress-linear>
      <ul class="item_tags">
        <delConfirm
          v-model="showDel"
          persistent
          width="360"
          :loading="delLoading"
        >
          <template #activator="{ props }">
            <v-btn
              size="small"
              v-bind="props"
              color="indigo-darken-3"
              :class="{ item_tags_err: true }"
              >DELECT</v-btn
            >
          </template>
          <template #actions>
            <v-btn variant="text" color="teal-accent-4" @click="closeDel"
              >CANCEL</v-btn
            >
            <v-btn variant="text" color="teal-accent-4" @click="handleDel"
              >COMFIRM</v-btn
            >
          </template>
        </delConfirm>

        <v-btn
          size="small"
          color="indigo-darken-3"
          :class="{ item_tags_updata: true }"
          @click="handleUpdate"
        >
          UPDATES
        </v-btn>
        <v-btn
          size="small"
          color="indigo-darken-3"
          class="item_tags_review"
          @click="goPreview"
          >REVIEW</v-btn
        >
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
import { toRefs, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import delConfirm from '@/components/delConfirm/delConfirm.vue';
import { ElNotification } from 'element-plus';
import CommonImg from '@/components/img/CommonImg.vue';

import type { TaskInt } from '@/types/task';
import { taskDel } from '@/api/api_task';
import formatDate from '@/util/formatDate';

const emit = defineEmits(['del']);
const props = defineProps({
  data: {
    type: Object as () => TaskInt,
    default: () => ({}),
  },
  type: {
    //1 待执行 2.进行中 3已完成 4需复习
    type: Number,
    default: 1,
  },
});

const router = useRouter();
const { data } = toRefs(props);
const showDel = ref(false);
const delLoading = ref(false);

const cover = computed(() => {
  const imgArr = (data.value.imgs ?? '').split(',');
  if (imgArr.length) {
    return imgArr[0];
  }
  return '';
});

const taskSlider = computed(() => {
  const useTime = data.value.usageTime.reduce((total, item) => {
    if (item.length === 2) {
      return (total += item[1] - item[0]);
    } else if (item.length === 1) {
      return (total += Date.now() - item[0]);
    } else {
      return total;
    }
  }, 0);
  let percentage = (useTime / data.value.needTime) * 100;
  // if (percentage > 100) {
  //   percentage = 100;
  // }

  return percentage;
});

const progressColor = computed(() => {
  if (taskSlider.value < 20) return 'indigo';
  if (taskSlider.value < 40) return 'teal';
  if (taskSlider.value < 60) return 'green';
  if (taskSlider.value < 80) return 'orange';
  return 'red';
});

const handleDel = async () => {
  delLoading.value = true;
  const params = {
    _id: data.value._id,
  };
  const { code, message } = await taskDel(params);
  if (code === 200) {
    emit('del', data.value._id);
    ElNotification({
      type: 'success',
      title: '提示',
      message,
    });
  }
  delLoading.value = false;
};

const closeDel = () => {
  if (!delLoading.value) {
    showDel.value = false;
  }
};

const goPreview = () => {
  const query = {
    id: data.value._id,
  };
  router.push({
    path: '/taskDetail',
    query,
  });
};

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
  margin-bottom: 1.25rem;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  cursor: move;
  &::marker {
    display: none;
  }
  &_time {
    font-size: 0.875rem;
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
  .v-progress-linear {
    border-radius: 5px;
    margin-bottom: 12px;
  }
}
</style>
