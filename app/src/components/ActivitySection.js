import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import Dot from './Dot';

export default () => (
  <section>
    <a name="activity" />
    <h1>Activity</h1>
    <Card>
      <CardBody>
        <Row>
          <Col className="col-lg-4">
            <h4>Steps</h4>
            <img src="/static/steps.svg" />
            <hr />
            <div className="d-flex align-items-center">
              <div className="first-activity-stat">
                <Dot color="turquoise" />
                <div>6.43%</div>
                Increase in steps
              </div>
              <div>
                <Dot color="turquoise" />
                <div>483</div>
                Weekly avg
              </div>
            </div>
          </Col>
          <Col className="col-lg-4">
            <h4>Distance walked</h4>
            <img src="/static/distance-walked.svg" />
            <hr />
            <div className="d-flex align-items-center">
              <div className="first-activity-stat">
                <Dot color="orange" />
                <div>6.43%</div>
                Increase in steps
              </div>
              <div>
                <Dot color="orange" />
                <div>483</div>
                Weekly avg
              </div>
            </div>
          </Col>
          <Col className="col-lg-4">
            <h4>Exercise time</h4>
            <img src="/static/exercise-time.svg" />
            <hr />
            <div className="d-flex align-items-center">
              <div className="first-activity-stat">
                <Dot color="purple" />
                <div>6.43%</div>
                Increase in steps
              </div>
              <div>
                <Dot color="purple" />
                <div>483</div>
                Weekly avg
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </section>
);
