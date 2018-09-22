import React from 'react';
import { Row, Col, Button, Form, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getTargetAudience } from '../../actions/research';
import { iconEdit } from '../../utils/fontawesome';

export default class SampleSelection extends React.Component {
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

  emitChange(name, value) {
    const { onChange, data } = this.props;

    const nextData = {
      ...data,
      [name]: value,
    };

    onChange(nextData);
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.emitChange(name, value);
  };

  renderInput(label, name) {
    const { data } = this.props;

    return (
      <Row className="row-margin">
        <Col xs={3}><Label>{label}</Label></Col>
        <Col xs={6}>
          <Input name={name} onChange={this.handleChange} value={data[name] || ''} />
        </Col>
      </Row>
    );
  }

  renderDuration(label, name) {
    const { data } = this.props;

    const { [name]: duration } = data || {};

    const durations = ['1 Month', '3 Months', '1 Year'];

    return (
      <Row className="row-margin">
        <Col xs={3}><Label>{label}</Label></Col>
        <Col xs={6}>
          {durations.map(label => (
            <Button
              key={label}
              type="button"
              onClick={() => this.emitChange(name, label)}
              color={duration === label ? 'primary' : 'secondary'}
            >
              {label}
            </Button>
          ))}
          <Button type="button">
            <FontAwesomeIcon icon={iconEdit} />
            Custom
          </Button>
        </Col>
      </Row>
    );
  }

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
      <div>
        <Form>
          {this.renderInput('Genetics', 'genetics')}
          {this.renderDuration('Age', 'age')}
          {this.renderInput('Location', 'location')}
          {this.renderInput('Weight Range', 'weightRange')}
          {this.renderInput('Sleep Range', 'sleepRange')}
          {this.renderInput('Activity Level', 'activityLevel')}
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
