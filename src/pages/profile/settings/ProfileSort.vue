<template>
  <div>
    <div class="sort t-color">
      <div class="sort_left">
        <CommonImg class="sort_left_avatar" :src="userInfo.user_pic" alt="" />
        <div class="sort_left_text">
          <h3>{{ userInfo.username }}</h3>
          <p>TEAM / {{ composeTeam }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProfileSort',
};
</script>
<script lang="ts" setup>
import { toRefs, computed } from 'vue';

import CommonImg from '@/components/img/CommonImg.vue';

import type { UserInfoInt } from '@/types/user';

const props = defineProps({
  userInfo: {
    type: Object as () => UserInfoInt,
    default: null,
  },
});
const { userInfo } = toRefs(props);

const composeTeam = computed(() => {
  if (userInfo.value?.team?.name) {
    return userInfo.value.team?.name;
  }
  return '当前还未加入任何团队喔~';
});
</script>

<style scoped lang="less">
.sort {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &_left {
    display: flex;
    align-items: center;
    gap: 24px;
    h3 {
      font-size: 1.25rem;
    }
    p {
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    &_avatar {
      width: 74px;
      height: 74px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}
</style>
