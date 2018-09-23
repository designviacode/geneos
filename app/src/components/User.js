import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
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
    userOpen: false,
    users: [],
    dataRequests: [],
  };

  componentDidMount() {
    onDataRequest(this.handleDataRequest);

    getUsers().then(response => {
      this.setState({
        users: response.data || [],
      })
    });
  }

  componentWillUnmount() {
    offDataRequest(this.handleDataRequest);
  }

  handleDataRequest = (data) => {
    this.setState(prevState => ({
      dataRequests: [...prevState.dataRequests, data],
    }));
  };

  handleSelectUser(user) {
    userStore.setUser(user);

    getOffers(user).then(response => {
      this.setState({ dataRequests: response.data });
    })
  }

  handleToggleUser = () => {
    this.setState(prevState => ({
      userOpen: !prevState.userOpen
    }));
  };

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
    const { userOpen, users } = this.state;

    const user = userStore.getUser();

    return (
      <div className="user">
        <Dropdown isOpen={userOpen} toggle={this.handleToggleUser}>
          <DropdownToggle tag="a" className="nav-link nav-link-icon">
            <div className="user-name">{user && user.name}</div> <FontAwesomeIcon icon={iconUser} size="2x" />
          </DropdownToggle>
          <DropdownMenu>
            {users.map(user => (
              <DropdownItem key={user.name} onClick={() => this.handleSelectUser(user)}>{user.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {this.renderDataRequests()}
      </div>
    )
  }
}
