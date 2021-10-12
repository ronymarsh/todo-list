import axios from 'axios';

const BASE_HEADERS = { 'Content-type': 'application/json' };

const apiRequest = async ({ method = 'GET', url, data, extraHeaders }) => {
  // make request and get response
  const res = await axios({
    method,
    url,
    data,
    headers: {
      ...BASE_HEADERS,
      ...extraHeaders,
    },
  }).catch((err) => err.response);

  return res;
};

export default apiRequest;
