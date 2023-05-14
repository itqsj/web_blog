import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders,
} from 'axios';

import { h } from 'vue';
import { ElNotification } from 'element-plus';
import { ResInt } from '@/types/index';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

interface MyAxiosHeaders {
  [key: string]: string | undefined;
}

interface ReqInt {
  url: string;
  method?: string;
  data?: object;
  params?: object;
  headers?: MyAxiosHeaders;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
});
service.defaults.timeout = 20000; // 请求超时时间
// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = Object.assign(
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token')?.trim() ?? '',
      },
      config.headers,
    );
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    if (response.status === 200) {
      if (response.data.code !== 200) {
        ElNotification({
          title: '提示',
          type: 'error',
          message: h('i', { style: 'color: teal' }, response.data.message),
        });
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      ElNotification({
        title: '提示',
        type: 'error',
        message: h('i', { style: 'color: teal' }, error.response.statusText),
      });
      userStore.loginOut();
    }
    // do something
    return Promise.reject(error);
  },
);

function http<T>({
  url,
  method = 'post',
  data,
  params,
  headers,
}: ReqInt): Promise<ResInt<T>> {
  return new Promise((resolve, reject) => {
    service({ url, method, data, params, headers })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
}

export default http;
