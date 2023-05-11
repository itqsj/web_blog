<template>
  <div>
    <div class="user">
      <div class="user_left">
        <CommonImg class="user_left_avatar" :src="userInfo?.user_pic" alt="" />
        <div class="user_left_text">
          <h3>{{ userInfo?.username }}</h3>
          <p>TEAM / {{ composeTeam }}</p>
        </div>
      </div>
      <div class="user_right">
        <!-- <commonTabs v-model:model-value="activeTab" :tabs="tabs" /> -->
      </div>
    </div>
    <div class="panel">
      <div class="panel_item">
        <SettingSort />
        <hr class="vertical_line" />
      </div>
      <div class="panel_item">
        <InformatSort :user-info="(userInfo as UserInfoInt)" />
        <hr class="vertical_line" />
      </div>
      <div>
        <ConversatSort :user-info="(userInfo as UserInfoInt)" />
      </div>
    </div>
    <div class="article">
      <h3 class="article_head">
        <h3>Articles</h3>
        <p class="font-12">Architects design houses</p>
      </h3>
      <div class="article_body">
        <ArticlePanel
          v-for="(item, index) in articles"
          :key="item._id"
          :data="item"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserInfo',
};
</script>
<script lang="ts" setup>
import { computed, onBeforeMount, ref, toRefs } from 'vue';

import commonTabs from '@/components/tabs/commonTabs.vue';
import SettingSort from './sort/SettingSort.vue';
import ConversatSort from './sort/ConversatSort.vue';
import InformatSort from './sort/InformatSort.vue';
import ArticlePanel from '@/components/panel/ArticlePanel.vue';
import CommonImg from '@/components/img/CommonImg.vue';

import { useUserStore } from '@/store/user';
import { articleList } from '@/api/api_article';
import type { ArticleListParams, ArticleInt } from '@/types/article';
import type { UserInfoInt } from '@/types/user';

const { userInfo } = toRefs(useUserStore());
const articles = ref<ArticleInt[]>([]);
const tabs = [
  {
    label: 'App',
    value: 1,
  },
  {
    label: 'Message',
    value: 2,
  },
  {
    label: 'Setting',
    value: 3,
  },
];
const activeTab = ref(1);

onBeforeMount(() => {
  getList();
});

const composeTeam = computed(() => {
  if (userInfo.value?.team?.name) {
    return userInfo.value.team?.name;
  }
  return '当前还未加入任何团队喔~';
});

const getList = async () => {
  const params: ArticleListParams = {
    page: 1,
    pageSize: 4,
    author_id: userInfo.value?._id,
  };

  const { code, data } = await articleList(params);

  if (code === 200) {
    articles.value = data.list || [];
  }
};
</script>

<style lang="less" scoped>
.user {
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

.panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem 0 1.5rem;
  div {
    min-height: 300px;
  }
  &_item {
    position: relative;
  }
}

.article {
  margin: 2rem 0 0;
  &_body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  &_head {
    padding-left: 1rem;
    h3 {
      font-family: Roboto, Helvetica, Arial, sans-serif;
      letter-spacing: 0.0075em;
      text-transform: capitalize;
      font-size: 1.125rem;
    }
    p {
      font-size: 0.875rem;
      font-weight: 300;
      color: rgb(123, 128, 154);
      line-height: 1.5;
      letter-spacing: 0.02857em;
      margin: 0.5rem 0 1rem;
    }
  }
}

.vertical_line {
  position: absolute;
  right: 0;
  top: 0;
  flex-shrink: 0;
  border-top: 0px solid rgba(0, 0, 0, 0.12);
  border-left: 0px solid rgba(0, 0, 0, 0.12);
  border-bottom: none;
  opacity: 0.25;
  background-color: transparent;
  width: 0.0625rem;
  height: 100%;
  margin: 0px 8px 0px -16px;
  border-right: none;
  background-image: linear-gradient(
    rgba(52, 71, 103, 0),
    rgba(52, 71, 103, 0.4),
    rgba(52, 71, 103, 0)
  ) !important;
}

@media screen and (max-width: 1300px) {
  .article_body {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 890px) {
  .user {
    margin-left: 1rem;
    // flex-direction: column;
    // gap: 1rem;
  }
  .panel {
    grid-template-columns: repeat(2, 1fr);
  }
  .article_body {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 640px) {
  .vertical_line {
    display: none;
  }
  .panel {
    grid-template-columns: repeat(1, 1fr);
  }
  .article_body {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
