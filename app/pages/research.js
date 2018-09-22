import React, { Component } from 'react'
import { Button, Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';

import LayoutMain from '../src/layouts/main';
import Meta from '../src/components/Meta'
import { getTargetAudience, requestData } from '../src/actions/research';

export default class extends Component {
  static propTypes = {
    data: PropTypes.shape({})
  };

  state = {
    audience: null,
    form: {
      duration: '3 Months',
      payout: 25,
      researchArea: 'Cancer',
    },
    refreshing: false,
    requesting: false,
  };

  handleRefreshClick = () => {
    this.setState({ refreshing: true });
    getTargetAudience().then(data => {
      this.setState({
        audience: data.data.count,
        refreshing: false,
      })
    });
  };

  handleRequestClick = () => {
    const { form } = this.state;

    this.setState({ requesting: true });
    requestData(form).then(() => {
      this.setState({ requesting: false })
    });
  };

  renderReach() {
    const { audience } = this.state;
    if (!audience) {
      return 'Please refresh';
    }

    return `${audience} users`;
  }

  render() {
    const { refreshing, requesting } = this.state;

    return (
      <LayoutMain>
        <Meta title="Research" />

        <Container>
          <Row>
            <Col>Reach: {this.renderReach()}</Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Button onClick={this.handleRefreshClick} disabled={refreshing}>Refresh</Button>
            </Col>
            <Col xs={6}>
              <Button onClick={this.handleRequestClick} disabled={requesting}>Request data</Button>
            </Col>
          </Row>
        </Container>
      </LayoutMain>
    );
  }
}
