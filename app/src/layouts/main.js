import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import User from '../components/User';
import UserStore from '../store/user';
import { iconUser, iconBell } from '../utils/fontawesome';

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

    const user = UserStore.getUser();
    const hasUser = !!user;

    return (
      <div>
        <Navbar dark color="dark" expand="sm">
          <Link href="/">
            <NavbarBrand href="/">Geneos</NavbarBrand>
          </Link>
          {user && user.name === 'Jens' ? (
            <Nav navbar className="mr-auto">
              <NavItem>
                <Link href="/research">
                  <NavLink href="/research">Create project</NavLink>
                </Link>
              </NavItem>
            </Nav>
          ) : (
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
              <div className="d-flex align-items-center">
                <img
                  src="/static/eos.svg"
                  style={{ width: 25, marginRight: 15 }}
                />
                <div>
                  <div>
                    <span className="text-white">812</span><span className="card-heading">EOS</span>
                  </div>
                  <div className="card-heading white-text">earned</div>
                </div>
              </div>
            </NavItem>
          </Nav>
          <Nav navbar className="ml-auto navbar-nav-right">
            <NavItem>
              <Link href="/research">
                <NavLink href="/research" className="nav-link-icon">
                  <FontAwesomeIcon icon={iconBell} size="2x" />
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/research">
                <NavLink href="/research" className="nav-link-icon">
                  <FontAwesomeIcon icon={iconUser} size="2x" />
                </NavLink>
              </Link>
            </NavItem>
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
