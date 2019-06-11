import axios from 'axios';
import utils from '../common/utils';

const rpserver = axios.create({
  withCredentials: true
});

// 请求拦截器
rpserver.interceptors.request.use(function (config) {
  utils.isDev() ? config.url = 'https://127.0.0.1:3000' + config.url
    : config.url = 'https://ruphi.online:3000' + config.url;

  return config;
}, function (error) {
  return Promise.reject(error);
});

export default rpserver;
