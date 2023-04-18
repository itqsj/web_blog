<template>
  <ul class="sort t-color">
    <li>
      <el-icon class="mright-10"><UserFilled /></el-icon>profile
    </li>
    <li>
      <el-icon class="mright-10"><Document /></el-icon>Basic Info
    </li>
    <li>
      <el-icon class="mright-10"><Lock /></el-icon>Change Password
    </li>
    <li>
      <el-icon class="mright-10"><Tools /></el-icon>Sessions
    </li>
    <li>
      <el-icon class="mright-10"><DeleteFilled /></el-icon>Delete Account
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>
<script lang="ts" setup></script>

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
