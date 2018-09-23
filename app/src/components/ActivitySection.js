import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactVivus from 'react-vivus';

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
            <ReactVivus
              id="steps"
              option={{
                file: '/static/steps.svg',
                animTimingFunction: 'EASE_OUT',
                reverseStack: true,
                type: 'sync',
                duration: 75
              }}
            />
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
            <ReactVivus
              id="steps"
              option={{
                file: '/static/distance-walked.svg',
                animTimingFunction: 'EASE_OUT',
                reverseStack: true,
                type: 'sync',
                duration: 75
              }}
            />
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
            <ReactVivus
              id="steps"
              option={{
                file: '/static/exercise-time.svg',
                animTimingFunction: 'EASE_OUT',
                reverseStack: true,
                type: 'sync',
                duration: 75
              }}
            />
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
