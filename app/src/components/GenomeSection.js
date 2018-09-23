import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactVivus from 'react-vivus';

export default () => (
  <section>
    <a name="genome" />
    <h1>Genome</h1>
    <Card data-aos="fade-up" data-aos-delay="300">
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
                  <div className="card-number teal-bullet" data-aos="fade-up" data-aos-delay="100">52.4%</div>
                  <div>European</div>
                </div>

                <div className="legend-item">
                  <div className="card-number purple-bullet" data-aos="fade-up" data-aos-delay="200">16.4%</div>
                  <div>East Asian & Native American</div>
                </div>

                <div className="legend-item">
                  <div className="card-number orange-bullet" data-aos="fade-up" data-aos-delay="300">31.2%</div>
                  <div>Subsaharan African</div>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <img src="/static/ethnicity-map.svg" data-aos="fade-up" data-aos-delay="400" />
          </Col>
        </Row>
        <h4>Ancestry composition</h4>
        <Row>
          <Col data-aos="fade-up" data-aos-delay="400">
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
             
              
            </div>
          </Col>
          <Col data-aos="fade-up" data-aos-delay="500">
            <h4 className="text-muted">East Asian / American</h4>
            <div>
              <div>
                <span className="">Native American</span>
                <span className="float-right">32%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Manchurian / Mongolian</span>
                <span className="float-right">0.1%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Southeast Asian</span>
                <span className="float-right">0.1%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly East Asian</span>
                <span className="float-right">0.5%</span>
                <div className="clearfix" />
              </div>
             
              
            </div>
          </Col>
          <Col data-aos="fade-up" data-aos-delay="600">
            <h4 className="text-muted">Subsaharan African</h4>
            <div>
              <div>
                <span className="">West African</span>
                <span className="float-right">4.5%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">East African</span>
                <span className="float-right">0.1%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">African Hunter-Gatherer</span>
                <span className="float-right">0.1%</span>
                <div className="clearfix" />
              </div>
              <div>
                <span className="">Broadly Sub-Saharan African</span>
                <span className="float-right">0.6%</span>
                <div className="clearfix" />
              </div>
              
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </section>
);
