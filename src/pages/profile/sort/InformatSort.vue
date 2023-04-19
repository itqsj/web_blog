<template>
  <div class="sort">
    <h3>Platform Settings</h3>
    <p class="sort_introd">
      Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no.
      If two equally difficult paths, choose the one more painful in the short
      term (pain avoidance is creating an illusion of equality).
    </p>
    <ul>
      <li class="sort_li">
        <span class="sort_li_left t-color">Full Name: </span>
        <span class="sort_li_right"> Alec M. Thompson</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Mobile: </span>
        <span class="sort_li_right">(44) 123 1234 123</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Email: </span>
        <span class="sort_li_right">(44) 123 1234 123</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Location: </span>
        <span class="sort_li_right">USA</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Location: </span>
        <span class="sort_li_right">USA</span>
      </li>
      <li class="sort_li">
        <span class="sort_li_left t-color">Full Name: </span>
        <span class="sort_li_right"> Alec M. Thompson</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'InformatSort',
};
</script>
<script lang="ts" setup></script>

<style lang="less" scoped>
.sort {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  padding: 0 1rem 0.5rem;
  box-sizing: border-box;
  h3 {
    letter-spacing: 0.0075em;
    text-transform: capitalize;
    font-size: 1.125rem;
  }
  &_introd {
    font-size: 0.875rem;
    line-height: 1.8;
    letter-spacing: 0.02857em;
    opacity: 1;
    text-transform: none;
    vertical-align: unset;
    text-decoration: none;
    color: rgb(123, 128, 154);
    font-weight: 300;
    margin: 1rem 0;
  }

  &_li {
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: 0.02857em;
    padding: 0.5rem 0;
    &_left {
      // color: rgb(52, 71, 103);
      font-weight: 700;
    }
    &_right {
      margin-left: 0.5rem;
      color: rgb(123, 128, 154);
    }
  }
}
</style>
