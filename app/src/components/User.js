import React from 'react';
import { UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/user.scss';
import { offDataRequest, onDataRequest } from '../utils/sockets';
import { getUsers } from '../actions/users';
import userStore from '../store/user';
import PurchaseConfirmation from './PurchaseConfirmation';
import { acceptRequest, rejectRequest } from '../actions/research';
import { getOffers } from '../actions/offers';
import { iconUser } from '../utils/fontawesome';

export default class User extends React.Component {
  state = {
    users: [],
    dataRequests: [],
  };

  componentDidMount() {
    this.mounted = true;
    onDataRequest(this.handleDataRequest);

    getUsers().then(response => {
      if (!this.mounted) return;
      this.setState({
        users: response.data || [],
      })
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    offDataRequest(this.handleDataRequest);
  }

  handleDataRequest = (data) => {
    if (!this.mounted) return;
    this.setState(prevState => ({
      dataRequests: [...prevState.dataRequests, data],
    }));
  };

  handleSelectUser(user) {
    userStore.setUser(user);

    getOffers(user).then(response => {
      if (!this.mounted) return;
      this.setState({ dataRequests: response.data });
    })
  }

  removeCurrentRequest = () => {
    this.setState(prevState => {
      const dataRequests = prevState.dataRequests.slice(1);
      return {
        dataRequests,
      };
    });
  };

  handleRejectRequest = (request) => {
    rejectRequest(request).then(() => {
      this.removeCurrentRequest();
    });
  };

  handleAcceptRequest = (request) => {
    acceptRequest(request).then(() => {
      this.removeCurrentRequest();
    });
  };

  renderDataRequests() {
    const { dataRequests } = this.state;
    if (!dataRequests.length) {
      return null;
    }

    const request = dataRequests[0];
    return (
      <PurchaseConfirmation
        key={request.id}
        isOpen={true}
        request={request}
        onReject={this.handleRejectRequest}
        onAccept={this.handleAcceptRequest}
      />
    )
  }

  render() {
    const { users } = this.state;

    const user = userStore.getUser();

    return (
      <div className="user">
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="nav-link nav-link-icon">
            <div className="user-name">{user && user.name}</div> <FontAwesomeIcon icon={iconUser} size="2x" />
          </DropdownToggle>
          <DropdownMenu>
            {users.map(user => (
              <DropdownItem key={user.name} onClick={() => this.handleSelectUser(user)}>{user.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>
        {this.renderDataRequests()}
      </div>
    )
  }
}
