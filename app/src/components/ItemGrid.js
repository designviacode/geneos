import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import Item from './Item';

export default class ItemGrid extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }))
    }),
  };

  renderFallback() {
    return (
      <span>No data available</span>
    );
  }

  renderError(error) {
    return (
      <span>An error occurred, please try again: {error}</span>
    );
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
      <Row>
        {data.data.map(item => (
          <Col><Item data={item}/></Col>
        ))}
      </Row>
    )
  }
}
