import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { getTargetAudience } from '../../actions/research';

export default class ProjectDetails extends React.Component {
  state = {
    audience: null,
    refreshing: false,
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

  renderReach() {
    const { audience } = this.state;
    if (!audience) {
      return 'Please refresh';
    }

    return `${audience} users`;
  }

  render() {
    const { refreshing } = this.state;

    return (
      <Row>
        <Col xs={3}>Reach: {this.renderReach()}</Col>
        <Col xs={3}>
          <Button onClick={this.handleRefreshClick} disabled={refreshing}>Refresh</Button>
        </Col>
      </Row>
    );
  }
}
