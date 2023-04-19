<template>
  <ul class="sort t-color" @click="navigat">
    <li name="profileSort">
      <el-icon class="mright-10"><UserFilled /></el-icon>profile
    </li>
    <li name="basicInfo">
      <el-icon class="mright-10"><Document /></el-icon>Basic Info
    </li>
    <li name="changePwd">
      <el-icon class="mright-10"><Lock /></el-icon>Change Password
    </li>
    <li name="sessionsSort">
      <el-icon class="mright-10"><Tools /></el-icon>Sessions
    </li>
    <li name="accountDel">
      <el-icon class="mright-10"><DeleteFilled /></el-icon>Delete Account
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>
<script lang="ts" setup>
const emit = defineEmits(['navigat']);

const navigat = (e: MouseEvent) => {
  const tar = e.target as HTMLLIElement;
  const name = getArrtributeName(tar);

  emit('navigat', name);
};

const getArrtributeName = (tar: HTMLElement): string => {
  const name = tar.getAttribute('name');
  if (!name) {
    return getArrtributeName(tar.parentElement as HTMLElement);
  }
  return name;
};
</script>

<style scoped lang="less">
.sort {
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  li {
    display: flex;
    align-items: center;
    height: 2.6875rem;
    font-weight: 600;
    font-size: 14px;
    border-radius: 0.5rem;
    padding-left: 0.625rem;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
