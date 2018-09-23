import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactVivus from 'react-vivus';

export default () => (
  <section>
    <a name="genome" />
    <h1>Genome</h1>
    <Card>
      <CardBody>
        <h4>Ethnicity</h4>
        <Row>
          <Col>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ReactVivus
                id="ethnicity-pie"
                option={{
                  file: '/static/ethnicity-pie.svg',
                  animTimingFunction: 'EASEINOUT',
                  type: 'sync',
                  duration: 75
                }}
              />
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="card-number teal-bullet">52.4%</div>
                  <div>European</div>
                </div>

                <div className="legend-item">
                  <div className="card-number purple-bullet">16.4%</div>
                  <div>East Asian & Native American</div>
                </div>

                <div className="legend-item">
                  <div className="card-number orange-bullet">31.2%</div>
                  <div>Subsaharan African</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <img src="/static/ethnicity-map.svg" />
          </Col>
        </Row>
        <h4>Ancestry composition</h4>
        <Row>
          <Col>
            <h4 className="text-muted">European</h4>
            <div>
              <div>
                <span className="">Iberian</span>
                <span className="float-right">30%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Spain</span>
                <span className="float-right">31%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Ashkenazi</span>
                <span className="float-right">32%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Jewish</span>
                <span className="float-right">33%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Sardinian</span>
                <span className="float-right">34%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Southern European</span>
                <span className="float-right">35%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Northwestern European</span>
                <span className="float-right">36%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly European</span>
                <span className="float-right">37%</span>
                <div className="clearfix" />
              </div>
            </div>
          </Col>
          <Col>
            <h4 className="text-muted">East Asian & American</h4>
            <div>
              <div>
                <span className="">Iberian</span>
                <span className="float-right">30%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Spain</span>
                <span className="float-right">31%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Ashkenazi</span>
                <span className="float-right">32%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Jewish</span>
                <span className="float-right">33%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Sardinian</span>
                <span className="float-right">34%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Southern European</span>
                <span className="float-right">35%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Northwestern European</span>
                <span className="float-right">36%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly European</span>
                <span className="float-right">37%</span>
                <div className="clearfix" />
              </div>
            </div>
          </Col>
          <Col>
            <h4 className="text-muted">Subsaharan African</h4>
            <div>
              <div>
                <span className="">Iberian</span>
                <span className="float-right">30%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Spain</span>
                <span className="float-right">31%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Ashkenazi</span>
                <span className="float-right">32%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Jewish</span>
                <span className="float-right">33%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Sardinian</span>
                <span className="float-right">34%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Southern European</span>
                <span className="float-right">35%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Northwestern European</span>
                <span className="float-right">36%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly European</span>
                <span className="float-right">37%</span>
                <div className="clearfix" />
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </section>
);
