import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import User from '../components/User';
import UserStore from '../store/user';
import { iconBell } from '../utils/fontawesome';
import Earnings from '../components/Earnings';

export default class extends React.Component {
  componentDidMount() {
    UserStore.on('change', this.handleUserChanged);

    const routeName = document.location.pathname.replace(/\//g, '');
    document.getElementsByTagName('body')[0].className = `page-${routeName}`;
  }

  componentWillUnmount() {
    UserStore.removeListener('change', this.handleUserChanged);
  }

  handleUserChanged = () => {
    this.setRoute();
  };

  setRoute() {
    const user = UserStore.getUser();

    if (user.isResearcher) {
      Router.push('/research');
    } else {
      Router.push('/');
    }
  }

  render() {
    const { children } = this.props;

    const user = UserStore.getUser();

    return (
      <div>
        <Navbar dark color="dark" expand="sm">
          <Link href="/">
            <NavbarBrand href="/">
            <img src="/static/geneos-logo.svg" width="50" className="nav-logo" /> GENEOS
            </NavbarBrand>
          </Link>
          {user && user.isResearcher && (
            <Nav navbar className="mr-auto">
              <NavItem>
                <Link href="/research">
                  <NavLink href="/research">Create project</NavLink>
                </Link>
              </NavItem>
            </Nav>
          )}
          {user && !user.isResearcher && (
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
            </Nav>
          )}
          <Nav navbar className="ml-auto">
            <NavItem className="nav-item-balance">
              <Earnings/>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto navbar-nav-right">
            <NavItem>
              <Link href="/">
                <NavLink href="/" className="nav-link-icon">
                  <FontAwesomeIcon icon={iconBell} size="2x" />
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <User />
            </NavItem>
          </Nav>
        </Navbar>
        {user ? children : <span>Please login first</span>}
      </div>
    );
  }
}
