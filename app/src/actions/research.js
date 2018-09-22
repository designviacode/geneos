import axios from 'axios';

import { API_BASE } from '../constants/api';
import UserStore from '../store/user';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 1000
});

export function getTargetAudience(options) {
  return api.get('/subscriptions', options)
    .then(response => response.data);
}

export function requestData(formData) {
  const user = UserStore.getUser();
  if (!user) return Promise.reject('No user is logged in');

  const options = {
    user: user.privateKey,
    formData,
  };

  return api.post('/subscriptions', options)
    .then(response => response.data);
}
