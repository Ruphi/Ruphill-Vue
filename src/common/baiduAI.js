import axios from 'axios';

const baiduAI = {
  getToken: function (success, error) {
    axios.post('https://aip.baidubce.com/oauth/2.0/token', {
      grant_type: 'client_credentials',
      client_id: 'c7VHgEW22uhOGOIDh0XnuyAA',
      client_secret: 'qK2g7GuzAFXoyucFscVbWzn7Pekre3TN'
    }).then(success).catch(error)
  }
};

export default baiduAI;
