import rpserver from '../axios/rpserver';

const aip = {
  getToken: function (success, error) {
    rpserver.get('/api/aip/token').then(success).catch(error);
  },
  getTags: function (options, success, error) {
    rpserver.post(
      '/api/aip/tags',
      {
        title: options.title,
        content: options.content,
        access_token: options.access_token
      }
    ).then(success).catch(error);
  }
};

export default aip;
