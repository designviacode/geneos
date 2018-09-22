import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import GenomeSection from './GenomeSection';
import ActivitySection from './ActivitySection';
import HeartRateSection from './HeartRateSection';

export default class DataPanelList extends React.PureComponent {
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
      <div>
        <Nav>
          {data.data.map(item => (
            <NavItem key={item.id}>
              <NavLink href={`#${item.slug}`}>{item.name}</NavLink>
            </NavItem>
          ))}
        </Nav>
        <GenomeSection />
        <ActivitySection />
        <HeartRateSection />
      </div>
    );
  }
}
