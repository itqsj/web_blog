import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

import { h } from 'vue';
import { ElNotification } from 'element-plus';

interface ReqInt {
  url: string;
  method?: string;
  data?: object;
  params?: object;
}

const service = axios.create();
service.defaults.timeout = 10000; // 请求超时时间
// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: window.sessionStorage.getItem('token'),
    };
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
          message: h('i', { style: 'color: teal' }, response.data.msg),
        });
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error: AxiosError) => {
    // do something
    return Promise.reject(error);
  },
);

function http({ url, method = 'post', data, params }: ReqInt) {
  return new Promise((resolve, reject) => {
    service({ url, method, data, params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default http;
