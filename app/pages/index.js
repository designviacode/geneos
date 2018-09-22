import React, { Component } from 'react'
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import Meta from '../src/components/Meta'
import { getMyItems } from '../src/actions/my';
import ItemGrid from '../src/components/ItemGrid';

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({}),
  };

  state = {};

  componentDidMount() {
    getMyItems().then(data => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <Meta title="My Data" />

        <main>
          <Container>
            <ItemGrid data={data} />
          </Container>
        </main>
      </div>
    );
  }
}
