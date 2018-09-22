import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

import Meta from '../components/Meta'

export default class extends Component {
  render() {
    return (
      <div>
        <Meta title="My Data" />

        <main>
          <Container>
            <Row>
              <Col xs={12}>Hi :)</Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }
}
