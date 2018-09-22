import React from 'react';
import { Row, Col } from 'reactstrap';
import { getTargetAudience } from '../../actions/research';

export default class ProjectDetails extends React.Component {
  state = {
    audience: null,
    loading: false,
  };

  componentDidMount() {
    this.loadAudience();
  }

  loadAudience() {
    this.setState({ loading: true });
    getTargetAudience().then(data => {
      this.setState({
        audience: data.data,
        loading: false,
      })
    });
  };

  renderAudienceMember() {

  }

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
