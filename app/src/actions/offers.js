import axios from 'axios';

import { API_BASE } from '../constants/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 1000
});

export function getOffers(user) {
  return api.get(`/offers/${user.name}`).then(response => response.data);
}

export function getTransactions(user) {
  return api.get(`/transactions/${user.name}`).then(response => response.data);
}
