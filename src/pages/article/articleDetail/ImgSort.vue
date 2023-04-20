<template>
  <div class="sort">
    <img
      class="sort_img"
      src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
      alt=""
    />
    <div class="sort_imgs">
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
      <img
        src="	https://bobbyhadz.com/images/blog/typescript-no-overload-matches-this-call/banner.webp"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ImgSort',
};
</script>

<script lang="ts" setup></script>

<style lang="less" scoped>
.sort {
  &_img {
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: rgb(0 0 0 / 10%) 0rem 0.625rem 0.9375rem -0.1875rem,
      rgb(0 0 0 / 5%) 0rem 0.25rem 0.375rem -0.125rem;
    object-fit: contain;
  }
  &_imgs {
    overflow: auto;
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    width: 100%;
    height: 5rem;
    margin-top: 1.5rem;
    img {
      height: 100%;
      object-fit: contain;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
