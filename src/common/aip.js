import rpserver from '../axios/rpserverr';
import axios from '../axios/axios';

const aip = {
  getToken: function (success, error) {
    rpserver.get('/aip/token').then(success).catch(error);
  },
  getTags: function (options, success, error) {
    rpserver.post(
      '/aip/tags',
      {
        title: options.title,
        content: options.content,
        access_token: options.access_token
      }
    ).then(success).catch(error);
  }
};

export default aip;
