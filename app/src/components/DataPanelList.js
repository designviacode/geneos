import React from 'react';
import { Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
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
        {data.data.map(item => (
          <div key={item.id}>
            <a name={item.slug} />
            <Card className="mb-3">
              <CardBody>
                <h4>{item.name}</h4>
                <img
                  src="http://designplaygrounds.com/wp-content/uploads/2010/01/data-visualization-processing.jpg"
                  responsive="true"
                />
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
