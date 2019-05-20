import axios from 'axios';

// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.url = 'http://127.0.0.1:3000' + config.url;
  console.log(config);
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios;
