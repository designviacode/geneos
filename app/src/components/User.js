import React from 'react';
import { emitLogin, offDataRequest, onDataRequest } from '../utils/sockets';

export default class User extends React.Component {
  componentDidMount() {
    onDataRequest(this.handleDataRequest);
    // TODO: do actual login an send the correct public key
    emitLogin({
      publicKey: 'PUBKEY'
    });
  }

  componentWillUnmount() {
    offDataRequest(this.handleDataRequest);
  }

  handleDataRequest() {
    alert('Would you like to share your data for shitloads of money?');
  }

  render() {
    return (
      <span>User</span>
    )
  }
}
