import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactVivus from 'react-vivus';
import CountUp from 'react-countup';

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
            <div className="d-flex activity-center">
              <div className="first-activity-stat">
                <div className="card-number teal-plus">
                  <CountUp
                    component="span"
                    delay={3}
                    end={6.43}
                    className="text-white"
                    duration={2}
                    decimals={2}
                  />%
                </div>
                <span className="subtle-text">Increase in steps</span>
              </div>
              <div>
                <div className="card-number">
                  <CountUp
                    component="span"
                    delay={3}
                    end={483}
                    className="text-white"
                    duration={2}
                  />
                </div>
                <span className="subtle-text">Weekly avg</span>
              </div>
            </div>
          </Col>
          <Col className="col-lg-4">
            <h4>Distance walked</h4>
            <ReactVivus
              id="distance-walked"
              option={{
                file: '/static/distance-walked.svg',
                animTimingFunction: 'EASE_OUT',
                reverseStack: true,
                type: 'sync',
                duration: 75
              }}
            />
            <hr />
            <div className="d-flex activity-center">
              <div className="first-activity-stat">
                <div className="card-number orange-plus">
                  <CountUp
                    component="span"
                    delay={4}
                    end={6.43}
                    className="text-white"
                    duration={2}
                    decimals={2}
                  />%
                </div>
                <span className="subtle-text">Increase in steps</span>
              </div>
              <div>
                <div className="card-number">
                  <CountUp
                    component="span"
                    delay={4}
                    end={483}
                    className="text-white"
                    duration={2}
                  />
                </div>
                <span className="subtle-text">Weekly avg</span>
              </div>
            </div>
          </Col>
          <Col className="col-lg-4">
            <h4>Exercise time</h4>
            <ReactVivus
              id="exercise-time"
              option={{
                file: '/static/exercise-time.svg',
                animTimingFunction: 'EASE_OUT',
                reverseStack: true,
                type: 'sync',
                duration: 75
              }}
            />
            <hr />
            <div className="d-flex activity-center">
              <div className="first-activity-stat">
                <div className="card-number purple-plus">
                  <CountUp
                    component="span"
                    delay={5}
                    end={6.43}
                    className="text-white"
                    duration={2}
                    decimals={2}
                  />%
                </div>
                <span className="subtle-text">Increase in steps</span>
              </div>
              <div>
              <div className="card-number">
                <CountUp
                  component="span"
                  delay={5}
                  end={483}
                  className="text-white"
                  duration={2}
                />
              </div>
              <span className="subtle-text">Weekly avg</span>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </section>
);
