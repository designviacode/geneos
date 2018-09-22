import React from 'react';
import { Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import GenomeSection from './GenomeSection';

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
        <GenomeSection />
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
