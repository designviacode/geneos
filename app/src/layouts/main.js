import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import React from 'react';

import User from '../components/User';
import UserStore from '../store/user';

export default class extends React.Component {
  componentDidMount() {
    UserStore.on('change', this.handleUserChanged);
  }

  componentWillUnmount() {
    UserStore.removeListener('change', this.handleUserChanged);
  }

  handleUserChanged = () => {
    this.forceUpdate();
  };

  render() {
    const { children } = this.props;

    const hasUser = !!UserStore.getUser();

    return (
      <div>
        <Navbar dark color="dark" expand="sm">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Nav navbar className="mr-auto">
            <NavItem>
              <NavLink href="/">My Data</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/my-account">My Account</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem>
              <User/>
            </NavItem>
          </Nav>
        </Navbar>
        {hasUser ? children : <span>Please login first</span>}
      </div>
    );
  }
}
