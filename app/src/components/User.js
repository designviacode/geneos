import React from 'react';

import '../styles/user.scss';
import { emitLogin, getCurrentUser, offDataRequest, onDataRequest } from '../utils/sockets';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { getUsers } from '../actions/users';
import userStore from '../store/user';

export default class User extends React.Component {
  state = {
    userOpen: false,
    users: [],
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

  handleDataRequest() {
    alert('Would you like to share your data for shitloads of money?');
  }

  handleSelectUser(user) {
    userStore.setUser(user);
  }

  handleToggleUser = () => {
    this.setState(prevState => ({
      userOpen: !prevState.userOpen
    }));
  };

  render() {
    const { userOpen, users } = this.state;

    const user = userStore.getUser();

    return (
      <div className="user">
        <Dropdown isOpen={userOpen} toggle={this.handleToggleUser}>
          <DropdownToggle caret>
            {(user && user.name) || 'Click to login'}
          </DropdownToggle>
          <DropdownMenu>
            {users.map(user => (
              <DropdownItem key={user.name} onClick={() => this.handleSelectUser(user)}>{user.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
