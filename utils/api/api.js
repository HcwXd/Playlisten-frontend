import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = {};
export const instance = axios.create({
  timeout: 5000,
  withCredentials: true,
  onUploadProgress: progressEvent => {
    document.body.style.cursor =
      progressEvent.loaded === progressEvent.total ? 'default' : 'progress';
  },
});

api.fire = async options => {
  return instance.request(options);
};

export default api;
