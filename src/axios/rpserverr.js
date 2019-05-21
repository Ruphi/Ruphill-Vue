import axios from 'axios';

const rpserver = axios.create({

});

// 请求拦截器
rpserver.interceptors.request.use(function (config) {
  config.url = 'http://127.0.0.1:3000' + config.url;
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default rpserver;
