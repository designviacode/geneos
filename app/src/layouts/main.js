import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import React from 'react';
import Link from 'next/link';

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
          <Link href="/">
            <NavbarBrand href="/">Geneos</NavbarBrand>
          </Link>
          <Nav navbar className="mr-auto">
            <NavItem>
              <Link href="/">
                <NavLink href="/">My Data</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/my-benefits">
                <NavLink href="/my-benefits">My Benefits</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/my-insights">
                <NavLink href="/my-insights">My Insights</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/research">
                <NavLink href="/research">Create project</NavLink>
              </Link>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto">
            <NavItem>
              <User />
            </NavItem>
          </Nav>
        </Navbar>
        {hasUser ? children : <span>Please login first</span>}
      </div>
    );
  }
}
