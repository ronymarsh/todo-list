import apiRequest from './apiRequest';
import storeTokens from './storeTokens';

const authApiRequest = async ({ method = 'GET', url, data, extraHeaders }) => {
  const oldRefreshToken = localStorage.getItem('refreshToken');
  const res = await apiRequest({ method, url, data, extraHeaders });
  if (res.status === 440) {
    var refreshRes = await apiRequest({
      method: 'POST',
      url: '/api/users/refresh',
      data: { oldRefreshToken },
    });
    if (refreshRes.status === 201) {
      // if refresh worked as expected
      // store new tokens locally
      storeTokens({
        accessToken: refreshRes.data.accessToken,
        refreshToken: refreshRes.data.refreshToken,
      });
      // perform original request with new access token
      var retryRes = await authApiRequest({
        method,
        url,
        data,
        extraHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });
      return retryRes;
    }
    // else refresh didn't work as expected
    else {
      await apiRequest({
        method: 'POST',
        url: '/api/users/signout',
        data: { refreshToken: oldRefreshToken },
      });
      return { data: { currentUser: null } };
    }
  }
  // else original request is good
  else return res;
};

export default authApiRequest;
