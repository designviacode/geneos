import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import React from 'react';

import User from '../components/User';

export default ({ children }) => (
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
    {children}
  </div>
);
