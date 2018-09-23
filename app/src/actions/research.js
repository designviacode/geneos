import axios from 'axios';

import { API_BASE } from '../constants/api';
import UserStore from '../store/user';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 300000
});

export function getListings(formData) {
  return api.post('/listings', { formData })
    .then(response => response.data);
}

export function requestData(formData) {
  const user = UserStore.getUser();
  if (!user) return Promise.reject('No user is logged in');

  const options = {
    user,
    formData,
  };

  return api.post('/subscriptions', options)
    .then(response => response.data);
}

export function rejectRequest(request) {
  const user = UserStore.getUser();
  if (!user) return Promise.reject('No user is logged in');

  const options = {
    user,
    request,
  };

  return api.post(`/subscriptions/${user.name}/reject`, options)
    .then(response => response.data);
}

export function acceptRequest(request) {
  const user = UserStore.getUser();
  if (!user) return Promise.reject('No user is logged in');

  const options = {
    user,
    request,
  };

  return api.post(`/subscriptions/${user.name}/accept`, options)
    .then(response => response.data);
}
