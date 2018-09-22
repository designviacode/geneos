import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Item extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  };

  render() {
    const { data } = this.props;

    if (!data) return null;

    const { name } = data;

    return (
      <Card>
        <CardImg/>
        <CardBody>
          <CardTitle>{name}</CardTitle>
        </CardBody>
      </Card>
    )
  }
}
