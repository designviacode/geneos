import React from 'react';
import { Row, Col } from 'reactstrap';

export default class ProjectDetails extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col><h4>Congratulations</h4></Col>
        </Row>
        <Row>
          <Col>Project has begun</Col>
        </Row>
      </div>
    );
  }
}
