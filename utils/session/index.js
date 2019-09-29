import cookie from 'js-cookie';

const getCookieFromBrowser = key => {
  return cookie.get(key);
};
const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return '';
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return '';
  }
  return rawCookie.split('=')[1];
};

export const getCookie = (key, req) => {
  return req ? getCookieFromServer(key, req) : getCookieFromBrowser(key);
};

export const checkExpire = expireTimestamp => {
  let result = false;
  const current_time = Date.now().valueOf() / 1000;

  if (expireTimestamp > current_time) {
    result = true;
  }
  return result;
};
