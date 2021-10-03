import apiRequest from './apiRequest';
import axios from 'axios';

const getCurrentUser = async () => {
  await axios.post('/api/users/signin', {
    email: 'test11@test.com',
    password: 'asdf',
  });

  const res = await apiRequest({ url: '/api/users/currentuser' });
  return res.currentUser;
};

export default getCurrentUser;
