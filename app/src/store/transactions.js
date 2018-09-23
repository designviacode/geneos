import { EventEmitter } from 'events';

import { getTransactions } from '../actions/offers';
import UserStore from './user';

class TransactionsStore extends EventEmitter {
  earnings = null;
  transactions = null;

  constructor() {
    super();
    UserStore.on('change', this.updateEarnings);
    this.updateEarnings();
  }

  updateEarnings = () => {
    const user = UserStore.getUser();
    if (user) {
      getTransactions(user).then(response => {
        const earnings = response.data.reduce((total, transaction) => {
          const price = parseFloat(transaction.price);
          return total + (isNaN(price) ? 0 : price);
        }, 0);

        this.transactions = response.data;
        this.earnings = earnings;
        this.emit('change');
      });
    }
  };
}

export default new TransactionsStore();
