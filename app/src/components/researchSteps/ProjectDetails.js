import React from 'react';
import { Form, Row, Col, Button, Input, Label } from 'reactstrap';
import { noop } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { iconEdit } from '../../utils/fontawesome';

export default class ProjectDetails extends React.Component {
  static defaultProps = {
    onChange: noop,
    data: {},
  };

  isValidated() {
    const { data } = this.props;

    return data.researchArea && data.researchName && data.duration;
  }

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

  render() {
    return (
      <div>
        <Form>
          {this.renderInput('Project Name', 'researchName')}
          {this.renderInput('Project Subject', 'researchArea')}
          {this.renderDuration('Project Duration', 'duration')}
        </Form>
      </div>
    );
  }
}
