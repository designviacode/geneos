import React from 'react';
import CountUp from 'react-countup';

import TransactionsStore from '../store/transactions';

export default class Earnings extends React.Component {
  state = {
    earnings: 0,
  };

  componentDidMount() {
    this.updateEarnings();
    this.mounted = true;
    TransactionsStore.on('change', this.updateEarnings);
  }

  componentWillUnmount() {
    this.mounted = false;
    TransactionsStore.removeListener('change', this.updateEarnings);
  }

  updateEarnings = () => {
    if (!this.mounted) return;

    this.setState({
      earnings: TransactionsStore.earnings,
    });
  };

  render() {
    const { earnings } = this.state;

    return (
      <div className="d-flex align-items-center">
        <img
          src="/static/eos.svg"
          style={{ width: 25, marginRight: 15 }}
        />
        <div>
          <div>
            <CountUp
              component="span"
              initialValue={0}
              end={earnings}
              className="text-white"
              duration={2}
            />
            <span className="card-heading">EOS</span>
          </div>
          <div className="card-heading white-text">earned</div>
        </div>
      </div>
    );
  }
}
