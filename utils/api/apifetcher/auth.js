import api from '../api';

const AuthAPI = {};
AuthAPI.getFacebookSignupInfo = query => {
  const url = `${process.env.API_URI}/auth/facebook/user`;
  return api.fire({
    url,
    method: 'get',
  });
};

AuthAPI.signOut = query => {
  const url = `${process.env.API_URI}/auth/signOut`;
  return api.fire({
    url,
    method: 'post',
  });
};

export default AuthAPI;
