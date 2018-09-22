import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default ({ children }) => (
  <div>
    <Navbar dark color="dark">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <Nav navbar className="mr-auto">
        <NavItem>
          <NavLink href="/">My Data</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/my-account">My Account</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    {children}
  </div>
);
