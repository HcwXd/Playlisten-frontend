import api from '../api';

const AuthAPI = {};
AuthAPI.getFacebookSignupInfo = query => {
  const url = `${process.env.API_URI}/auth/facebook/user`;
  return api.fire({
    url,
    method: 'get',
  });
};

export default AuthAPI;
