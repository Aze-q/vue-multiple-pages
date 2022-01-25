//对 axios 进行封装
import axios from 'axios';
//引入 message
import { Message } from 'element-ui';
//引入 cookies
import { getCookie } from '@/utils/cookie.js';

//创建 axios 的实例
//基础url路径  //process.env.VUE_APP_API_URL+'/Api'
let baseURL = ''; // 基础服务地址
if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.VUE_APP_BASE_URL || '';
}
const service = axios.create({
  baseURL,
  timeout: 60000 //请求超时时间
});

//请求拦截
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    //token验证
    if (getCookie('loginToken')) {
      config.headers.Authorization = getCookie('loginToken');
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  response => {
    //判断错误类型：400 401 402 403 405 301 302 304
    if (response.status !== 200) {
      //提示错误
      Message.error('请求失败');
      return Promise.reject(response);
    } else {
      return response.data;
    }
  },
  error => {
    Message.error('请求错误');
    return Promise.reject(error);
  }
);

//输出
export default service;