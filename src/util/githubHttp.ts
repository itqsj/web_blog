import { createFetch } from '@vueuse/core';
import { ElNotification } from 'element-plus';

const useGithubFetch = createFetch({
  baseUrl: 'https://api.github.com',
  options: {
    timeout: 20000,
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Authorization: `${import.meta.env.VITE_APP_GITHUB_ACCESS_KEY}`,
      };

      return { options };
    },
    onFetchError({ data, error }) {
      ElNotification({
        type: 'error',
        message: error,
      });
      return { data, error };
    },
  },
});

export default useGithubFetch;
