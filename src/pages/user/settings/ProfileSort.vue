<template>
  <div>
    <div class="sort t-color">
      <div class="sort_left">
        <img
          class="sort_left_avatar"
          src="https://demos.creative-tim.com/otis-admin-pro/static/media/bruce-mars.8a606c4a6dab54c9ceff.jpg"
          alt=""
        />
        <div class="sort_left_text">
          <h3>Richard Davis</h3>
          <p>CEO / Co-Founder</p>
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
<script lang="ts" setup></script>

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
