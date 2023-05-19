<script setup lang="ts" name="ChatBot">
import { ref, watch, computed } from 'vue';

import AnimationChat from './AnimationChat.vue';
import MdEditor from 'md-editor-v3';
import CommonDialog from '@/components/dialog/CommonDialog.vue';

import { ElNotification } from 'element-plus';
import 'md-editor-v3/lib/style.css';
import { nextTick } from 'vue';
import { read, countAndCompleteCodeBlocks } from '@/util/aiUtils';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

// Message List
const messages = ref<Message[]>([]);
// User Input Message
const userMessage = ref('');
const isLoading = ref(false);
const dialogShow = ref(false);
const apiKey = ref('');
const inputApiKey = ref('');
//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
// Send Messsage
const sendMessage = async () => {
  if (isLoading.value) {
    return;
  }
  if (userMessage.value) {
    // Add the message to the list
    messages.value.push({
      content: userMessage.value,
      role: 'user',
    });

    // Clear the input
    userMessage.value = '';

    // Create a completion
    await createCompletion();
  }
};

const createCompletion = async () => {
  // Check if the API key is set
  if (!apiKey.value) {
    // ElNotification({
    //   type: 'info',
    //   message: '请先输入apiKey！',
    // });
    dialogShow.value = true;
    return;
  }
  isLoading.value = true;

  try {
    // Create a completion (axios is not used here because it does not support streaming)
    const completion = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey.value}`,
        },
        method: 'POST',
        body: JSON.stringify({
          messages: messages.value,
          model: 'gpt-3.5-turbo',
          stream: true,
        }),
      },
    );

    // Handle errors
    if (!completion.ok) {
      const errorData = await completion.json();
      ElNotification({
        type: 'info',
        message: errorData.error.message,
      });
      return;
    }

    // Create a reader
    const reader = completion.body?.getReader();
    if (!reader) {
      ElNotification({
        type: 'info',
        message: 'Cannot read the stream.',
      });
    }

    // Add the bot message
    messages.value.push({
      content: '',
      role: 'assistant',
    });

    // Read the stream
    await read(reader, messages);
    isLoading.value = false;
  } catch (error: any) {
    ElNotification({
      type: 'error',
      message: error.message,
    });
  }
};

watch(
  () => messages.value,
  (val) => {
    if (val) {
      nextTick(() => {
        const tar = document.querySelector('.message-last');

        tar?.scrollIntoView({
          behavior: 'smooth', // 定义动画过渡效果， "auto"或 "smooth" 之一。默认为 "auto"
          block: 'start', // 定义垂直方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "start"
          inline: 'nearest', // 定义水平方向的对齐， "start", "center", "end", 或 "nearest"之一。默认为 "nearest"
        });
      });
    }
  },
  {
    deep: true,
  },
);

const displayMessages = computed(() => {
  const messagesCopy = messages.value.slice(); // 创建原始数组的副本
  const lastMessage = messagesCopy[messagesCopy.length - 1];
  const updatedLastMessage = {
    ...lastMessage,
    content: countAndCompleteCodeBlocks(lastMessage.content),
  };
  messagesCopy[messagesCopy.length - 1] = updatedLastMessage;
  return messagesCopy;
});
</script>

<template>
  <div class="chat-bot">
    <div class="messsage-area">
      <div v-if="messages.length > 0" class="message-container">
        <div
          v-for="(message, index) in displayMessages"
          :key="index"
          :class="{ 'message-last': index === displayMessages.length - 1 }"
        >
          <div
            v-if="message.role === 'user'"
            class="pa-4 user-message message-item"
          >
            <v-avatar class="ml-4" rounded="sm" variant="elevated">
              <img src="@/assets/img/avatar_assistant.jpg" alt="alt" />
            </v-avatar>
            <v-card class="gradient gray flex-center message-card" theme="dark">
              <v-card-text>
                <b> {{ message.content }}</b>
              </v-card-text>
            </v-card>
          </div>
          <div v-else class="pa-2 pa-md-5 assistant-message message-item">
            <v-avatar
              class="d-none d-md-block mr-2 mr-md-4"
              rounded="sm"
              variant="elevated"
            >
              <img src="@/assets/img/avatar_assistant.jpg" alt="alt" />
            </v-avatar>
            <v-card>
              <div>
                <md-editor
                  v-model="message.content"
                  class="font-1"
                  preview-only
                />
              </div>
            </v-card>
          </div>
        </div>
        <!-- <div v-if="isLoading">
          <div class="pa-6">
            <div class="message">
              <AnimationChat
                link="https://assets6.lottiefiles.com/packages/lf20_ofa3xwo7.json"
                :size="100"
              />
            </div>
          </div>
        </div> -->
      </div>
      <div v-else class="no-message-container">
        <h1 class="text-h4 text-md-h2 text-blue-lighten-1 font-weight-bold">
          Chat With Me
        </h1>
        <AnimationChat :size="300" />
      </div>
    </div>
    <div class="input-area">
      <v-sheet elevation="0" class="input-panel">
        <v-text-field
          ref="input"
          v-model="userMessage"
          color="primary"
          type="text"
          clearable
          variant="solo"
          placeholder="SendMessage"
          hide-details
          @keyup.enter="sendMessage"
        >
          <template #prepend-inner>
            <v-icon>mdi-microphone</v-icon>
          </template>
          <template #append-inner>
            <v-fade-transition leave-absolute>
              <v-icon color="primary" @click="sendMessage">mdi-send</v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-sheet>
    </div>
    <CommonDialog
      v-model="dialogShow"
      style="max-width: 800px; min-width: 340px"
      draggable
      title="apiKey Input"
    >
      <v-text-field
        v-model="inputApiKey"
        label="apiKey input"
        hide-details="auto"
      ></v-text-field>
    </CommonDialog>
  </div>
</template>

<style scoped lang="less">
.chat-bot {
  height: calc(100vh - 5rem - 6rem);
  padding: 1rem 0;
  background-image: url('@/assets/img/chat-bg-2.png');
  background-repeat: repeat;
  box-sizing: border-box;
  .messsage-area {
    overflow-y: scroll;
    height: calc(100% - 90px - 1rem);
  }
  .input-area {
    // position: fixed;
    // left: 0;
    // bottom: 3rem;
    padding: 1rem;
    height: 90px;

    align-items: center;
    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}

.message-card {
  padding: 1rem;
  line-height: 20px;
  font-size: 16px;
}

.user-message {
  display: flex;
  align-content: center;
  justify-content: end;
  flex-direction: row-reverse;
}

.assistant-message {
  display: flex;
  align-content: center;
  justify-content: start;
  flex-direction: row;
}

.message {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
}

.message-container {
  height: 100%;
  background-image: url('@/assets/img/chat-bg-2.png');
  background-repeat: repeat;
}

.no-message-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
}

:deep(.md-editor-preview-wrapper) {
  padding: 5px 15px;
}

.font-1 {
  font-size: 13px !important;
}

@media screen and (max-width: 768px) {
  :deep(#md-editor-v3-preview),
  .user-message {
    font-size: 14px !important;
  }
}
</style>
