import React from 'react';
import { Form, Row, Col, Button, Input, Label } from 'reactstrap';
import { noop } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { iconArrowLeft, iconArrowRight, iconEdit } from '../../utils/fontawesome';
import NavRow from './NavRow';
import { Card, Container } from 'reactstrap';
import LayoutMain from '../../layouts/main';


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

    const durations = ['3 Months', '6 Months'];

    return (
      <Row className="row-margin">
        <Col xs={3}><Label>{label}</Label></Col>
        <div className="overflow-buttons">
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
            Custom
          </Button>
        </div>
      </Row>
    );
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center">
          <Col lg="6">
            <Card>
              <Form>
                {this.renderInput('Project Name', 'researchName')}
                {this.renderInput('Project Subject', 'researchArea')}
                {this.renderDuration('Project Duration', 'duration')}
              </Form>
              <NavRow step={0} jumpToStep={step => this.isValidated() && this.props.jumpToStep(step)} />
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}
