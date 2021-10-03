import axios from 'axios';

const apiRequest = async ({ method = 'get', url, body }) => {
  // make request and get response
  const res = await axios[method](url, body).catch((err) => console.log(err));
  return res.data;
};

export default apiRequest;
