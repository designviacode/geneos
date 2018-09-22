import React from 'react';
import { Form, Row, Col, Button, Input, Label } from 'reactstrap';
import { noop } from 'lodash';

import { getTargetAudience } from '../../actions/research';

export default class ProjectDetails extends React.Component {
  static defaultProps = {
    onChange: noop,
    data: {},
  };

  state = {
    audience: null,
    refreshing: false,
  };

  isValidated() {
    const { data } = this.props;

    return !!data.researchArea;
  }

  handleRefreshClick = () => {
    this.setState({ refreshing: true });
    getTargetAudience().then(data => {
      this.setState({
        audience: data.data.count,
        refreshing: false,
      })
    });
  };

  handleChange = (e) => {
    const { onChange, data } = this.props;

    const name = e.target.name;
    const value = e.target.value;

    const nextData = {
      ...data,
      [name]: value,
    };

    onChange(nextData);
  };

  renderReach() {
    const { audience } = this.state;
    if (!audience) {
      return 'Please refresh';
    }

    return `${audience} users`;
  }

  renderInput(label, name) {
    const { data } = this.props;

    return (
      <Row>
        <Col xs={3}><Label>{label}</Label></Col>
        <Col xs={3}>
          <Input name={name} onChange={this.handleChange} value={data[name]} />
        </Col>
      </Row>
    );
  }

  render() {
    const { refreshing } = this.state;

    return (
      <div>
        <Form>
          {this.renderInput('Project Subject', 'researchArea')}
          <Row>
            <Col xs={3}>Reach: {this.renderReach()}</Col>
            <Col xs={3}>
              <Button onClick={this.handleRefreshClick} disabled={refreshing}>Refresh</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
