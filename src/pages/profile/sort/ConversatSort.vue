<template>
  <div class="sort">
    <h3>Platform Settings</h3>
    <ul>
      <li class="item">
        <div class="item_left">
          <img
            src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
            alt=""
          />
          <div>
            <h5 class="t-color">Sophie B.</h5>
            <span>Hi! I need more information..</span>
          </div>
        </div>
        <el-button>reply</el-button>
      </li>
      <li class="item">
        <div class="item_left">
          <img
            src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
            alt=""
          />
          <div>
            <h5 class="t-color">Sophie B.</h5>
            <span>Hi! I need more information..</span>
          </div>
        </div>
        <el-button>reply</el-button>
      </li>
      <li class="item">
        <div class="item_left">
          <img
            src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
            alt=""
          />
          <div>
            <h5 class="t-color">Sophie B.</h5>
            <span>Hi! I need more information..</span>
          </div>
        </div>
        <el-button>reply</el-button>
      </li>
      <li class="item">
        <div class="item_left">
          <img
            src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
            alt=""
          />
          <div>
            <h5 class="t-color">Sophie B.</h5>
            <span>Hi! I need more information..</span>
          </div>
        </div>
        <el-button>reply</el-button>
      </li>
      <li class="item">
        <div class="item_left">
          <img
            src="	https://demos.creative-tim.com/otis-admin-pro/static/media/marie.c28f32663b6432b46f78.jpg"
            alt=""
          />
          <div>
            <h5 class="t-color">Sophie B.</h5>
            <span>Hi! I need more information..</span>
          </div>
        </div>
        <el-button>reply</el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ConversatSort',
};
</script>
<script lang="ts" setup></script>

<style lang="less" scoped>
.sort {
  padding: 0 1rem 0.5rem;
  box-sizing: border-box;
  h3 {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.0075em;
    text-transform: capitalize;
    font-size: 1.125rem;
  }
  ul {
    margin-top: 1rem;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      margin-bottom: 0.5rem;
      img {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
      }
      &_left {
        display: flex;
        align-items: center;
        div {
          margin-left: 0.625rem;
          h5 {
            font-size: 0.875rem;
            line-height: 1.5;
            letter-spacing: 0.02857em;
            // color: rgb(52, 71, 103);
            font-weight: 600;
          }
          span {
            font-size: 0.75rem;
            font-weight: 300;
            line-height: 1.25;
            letter-spacing: 0.03333em;
            color: rgb(123, 128, 154);
            margin-top: 0.5rem;
          }
        }
      }
      .el-button {
        border: none;
      }
    }
  }
}
</style>
