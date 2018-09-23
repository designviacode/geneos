import React from 'react';
import { Container, Card, Row, Col, Form, Label, Input } from 'reactstrap';

import NavRow from './NavRow';

const ETHNICITIES = [
  '',
  'East Asian',
  'European',
  'South Asian',
  'West African',
  'Sub-Saharan African',
  'Native American'
];

const LOCATIONS = [
  '',
  'Blandaberg',
  'East Ashtonborough',
  'Kossview',
  'Los Angeles',
  'New Collin',
  'New York',
  'South Lamontmouth',
];

export default class SampleSelection extends React.Component {
  emitChange(name, value) {
    const { onChange, data } = this.props;

    const nextData = {
      ...data,
      [name]: value
    };

    onChange(nextData);
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.emitChange(name, value);
  };

  renderInput(label, name) {
    const { data } = this.props;

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col xs={6}>
          <Input
            name={name}
            onChange={this.handleChange}
            value={data[name] || ''}
          />
        </Col>
      </Row>
    );
  }

  renderRange(label, name) {
    const { data } = this.props;

    const [from, to] = data[name] || ['', ''];

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col xs={3}>
          <Input
            name={name}
            onChange={e => this.emitChange(name, [e.target.value, to])}
            value={from}
          />
        </Col>
        -
        <Col xs={3}>
          <Input
            name={name}
            onChange={e => this.emitChange(name, [from, e.target.value])}
            value={to}
          />
        </Col>
      </Row>
    );
  }

  renderSelect(label, name, options) {
    const { data } = this.props;

    return (
      <Row className="row-margin">
        <Col xs={3}>
          <Label>{label}</Label>
        </Col>
        <Col xs={6}>
          <Input
            name={name}
            type="select"
            onChange={this.handleChange}
            value={data[name] || ''}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Input>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <Card>
          <Row className="justify-content-center">
            <Form>
              {this.renderSelect('Genetics', 'ethnicity', ETHNICITIES)}
              {this.renderRange('Age', 'ageRange')}
              {this.renderSelect('Location', 'location', LOCATIONS)}
              {this.renderRange('Weight Range', 'weightRange')}
              {this.renderRange('Sleep Range', 'sleepRange')}
              {this.renderRange('Activity Level', 'activityRange')}
            </Form>
            <NavRow step={1} jumpToStep={this.props.jumpToStep} />
          </Row>
        </Card>
      </Container>
    );
  }
}
