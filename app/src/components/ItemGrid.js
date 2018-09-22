import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

export default class ItemGrid extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string
        })
      )
    })
  };

  renderFallback() {
    return <span>No data available</span>;
  }

  renderError(error) {
    return <span>An error occurred, please try again: {error}</span>;
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return this.renderFallback();
    }

    if (data.error) {
      return this.renderError(data.error);
    }

    return (
      <Nav>
        {data.data.map(item => (
          <NavItem>
            <NavLink href="#">{item.name}</NavLink>
          </NavItem>
        ))}
      </Nav>
    );
  }
}
