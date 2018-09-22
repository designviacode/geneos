import React from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

export default class DataPanelList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string
        })
      )
    })
  };

  renderFallback() {
    return <span>No data available</span>;
  }

  renderError(error) {
    return <span>An error occurred, please try again: {error}</span>;
  }

  render() {
    const { data } = this.props;

    if (!data) {
      return this.renderFallback();
    }

    if (data.error) {
      return this.renderError(data.error);
    }

    return (
      <div>
        <Nav>
          {data.data.map(item => (
            <NavItem key={item.id}>
              <NavLink href={`#${item.slug}`}>{item.name}</NavLink>
            </NavItem>
          ))}
        </Nav>
        <section>
          <h1>Genome</h1>
          <Card>
            <CardBody>
              <h4>Ethnicity</h4>
              <Row>
                <Col>
                  {/* <img src={require('../images/ethnicity-pie.svg')} /> */}
                  <div>52.4%</div>
                  <div>European</div>
                  <div>16.4%</div>
                  <div>East Asian & Native American</div>
                  <div>31.2%</div>
                  <div>Subsaharan African</div>
                </Col>
                <Col />
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
        <section>
          <h1>Activity</h1>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <h4>Steps</h4>
                </Col>
                <Col>
                  <h4>Distance walked</h4>
                </Col>
                <Col>
                  <h4>Exercise time</h4>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </section>
      </div>
    );
  }
}
